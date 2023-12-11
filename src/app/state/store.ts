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

export interface GameState extends GameProps, FocusState, GameInstanceState {
  workingGrid: Grid;
  gridSize: { rows: number; cols: number };
}

//TODO: REfactor RESET
export interface GameActions extends FocusActions, GameInstanceActions {
  setCellValue: (value: CellValue, row: number, col: number) => void;
  reset: () => void;
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
    workingGrid,
    gridSize,
    reset: () => {
      set({
        workingGrid,
      });
      resetAllSlices();
    },
    setCellValue: (newValue, row, col) =>
      set((state) => ({
        // Update value at the desired rowIndex and colIndex.
        workingGrid: state.workingGrid.map((rowArray, rowIndex) => {
          if (rowIndex !== row) return rowArray;

          return rowArray.map((value, colIndex) =>
            colIndex === col ? newValue : value,
          );
        }),
      })),
    ...createFocusSlice(set, ...a),
    ...createGameInstanceSlice(set, ...a),
  }));
};
