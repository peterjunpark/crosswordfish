import { createStore } from "zustand";
import type { Grid, Clues, Rules } from "@/lib/types";
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
  grid: Grid;
  clues: Clues;
  rules: Rules;
}
export interface GameState extends GameProps, FocusState, GameInstanceState {
  workingGrid: Grid;
  gridSize: { rows: number; cols: number };
}

export interface GameActions extends FocusActions, GameInstanceActions {
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
  const { grid: initGrid } = initProps;
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
    ...createFocusSlice(set, ...a),
    ...createGameInstanceSlice(set, ...a),
  }));
};
