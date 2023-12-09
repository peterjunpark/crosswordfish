import { createStore } from "zustand";
import type { Grid, Clues, CellValue } from "@/lib/types";
import {
  createFocusSlice,
  type FocusState,
  type FocusActions,
} from "./slices/focus";
import {
  createGameInstanceSlice,
  type GameInstanceState,
  type GameInstanceActions,
} from "./slices/game-instance";

export interface GameProps {
  initGrid: Grid;
  clues: Clues;
}

export interface GameState
  extends GameProps,
    // GridState,
    FocusState,
    GameInstanceState {
  workingGrid: Grid;
  gridSize: { rows: number; cols: number };
}

//TODO: REfactor RESET
export interface GameActions
  // GridActions,
  extends FocusActions,
    GameInstanceActions {
  // reset: () => void;
  setCellValue: (value: CellValue, row: number, col: number) => void;
}

export type GameStore = ReturnType<typeof createGameStore>;

export const sliceResetters = new Set<() => void>();

const resetAllSlices = () => {
  sliceResetters.forEach((reset) => {
    reset();
  });
};

export const createGameStore = (initProps: GameProps) => {
  const { initGrid } = initProps;
  const workingGrid: Grid = initGrid.map((row) =>
    row.map((cell) => (cell === null ? null : "")),
  );
  const gridSize = { rows: initGrid.length, cols: initGrid[0]!.length };

  return createStore<GameState & GameActions>()((set, ...a) => ({
    ...initProps,
    // reset: () => set(initState),
    workingGrid,
    gridSize,
    setCellValue: (newValue, row, col) =>
      set((state) => ({
        // Loop through all the rows in the grid...
        workingGrid: state.workingGrid.map((rowArray, rowIndex) =>
          rowIndex !== row
            ? // If the cell to update is not in this row, leave the row as-is.
              rowArray
            : // If we're at the correct row, loop through the columns in the row...
              rowArray.map((value, colIndex) =>
                // Find the cell that needs to be updated, and update that one with the new value.
                colIndex === col ? newValue : value,
              ),
        ),
      })),
    ...createFocusSlice(set, ...a),
    ...createGameInstanceSlice(set, ...a),
  }));
};
