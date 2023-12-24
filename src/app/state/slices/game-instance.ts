import type { StateCreator } from "zustand";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import { sliceResetters, type GameActions, type GameState } from "../store";
import type { CellValue } from "@/lib/types";

export interface GameInstanceState {
  isStarted: boolean;
  isSolved: boolean;
  showingErrors: boolean;
}

export interface GameInstanceActions {
  setGameIsStarted: () => void;
  checkIfSolved: () => void;
  setCellValue: (value: CellValue, row: number, col: number) => void;
  toggleShowErrors: () => void;
  revealWord: () => void;
  revealGrid: () => void;
}

interface GameInstanceSlice extends GameInstanceState, GameInstanceActions {}

const initGameInstanceState = {
  isStarted: false,
  isSolved: false,
  showingErrors: false,
};

export const createGameInstanceSlice: StateCreator<
  GameState & GameActions,
  [],
  [],
  GameInstanceSlice
> = (set, get) => {
  sliceResetters.add(() => set(initGameInstanceState));

  return {
    ...initGameInstanceState,
    setGameIsStarted: () => {
      set(() => ({
        isStarted: true,
      }));
    },
    checkIfSolved: () => {
      const solutionGrid = get().grid;
      const workingGrid = get().workingGrid;

      if (isEqual(solutionGrid, workingGrid)) {
        set({ isSolved: true });
      }
    },
    setCellValue: (newValue, row, col) => {
      set((state) => ({
        // Update value at the desired rowIndex and colIndex.
        workingGrid: state.workingGrid.map((rowArray, rowIndex) => {
          if (rowIndex !== row) return rowArray;

          return rowArray.map((value, colIndex) =>
            colIndex === col ? newValue : value,
          );
        }),
      }));
      get().checkIfSolved();
    },
    toggleShowErrors: () => {
      set((state) => ({
        showingErrors: !state.showingErrors,
      }));
    },
    revealWord: () => {
      const focus = get().focus;
      const solutionGrid = get().grid;
      const workingGrid = cloneDeep(get().workingGrid);

      if (!focus) {
        throw new Error("Can't reveal word. Focus is missing.");
      }

      if (!solutionGrid) {
        throw new Error("Can't reveal word. Solution grid is missing.");
      }

      if (!workingGrid) {
        throw new Error("Can't reveal word. Working grid is missing.");
      }

      const { direction, row, col, word } = focus;

      if (direction === "across") {
        for (const idx of word) {
          workingGrid[row]![idx] = solutionGrid[row]![idx]!;
        }
      } else if (direction === "down") {
        for (const idx of word) {
          workingGrid[idx]![col] = solutionGrid[idx]![col]!;
        }
      }

      set({ workingGrid });
      get().checkIfSolved();
    },
    revealGrid: () => {
      set({ workingGrid: cloneDeep(get().grid) });
      get().checkIfSolved();
    },
  };
};
