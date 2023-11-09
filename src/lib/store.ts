import { create } from "zustand";
import type { Grid, Clues, CellValue } from "./types";
import { DUMMY_clues, DUMMY_grid } from "@/___tests___/dummy-data";

//TODO: Will probably need to initialize the store with props? I.e., generated crossword grid.

const grid = DUMMY_grid;
const clues = DUMMY_clues;

type State = {
  solutionGrid: Grid;
  workingGrid: Grid;
  clues: Clues;
  focus: { cell: [number, number]; direction: "ACROSS" | "DOWN" };
};

type Action = {
  reset: () => void;
  setCellValue: (value: CellValue, row: number, col: number) => void;
};

const initialState: State = {
  clues: clues,
  solutionGrid: grid,
  workingGrid: grid.map((row) =>
    row.map((cell) => (cell === null ? null : "")),
  ),
  focus: { cell: [0, 0], direction: "ACROSS" },
};

// TODO: Refactor to use immer
export const useStore = create<State & Action>()((set) => ({
  ...initialState,
  // ACTIONS
  reset: () => set(initialState),
  setCellValue: (newValue, row, col) =>
    set((state) => ({
      workingGrid: state.workingGrid.map((rowArray, rowIndex) =>
        rowIndex !== row
          ? // If the row index is not the row we want to update, return the row as-is
            rowArray
          : // If the row index is the row we want to update...
            rowArray.map((value, colIndex) =>
              // If the column index is not the column we want to update, return the value as-is
              // Else, if the column index is the column we want to update, use the newValue.
              colIndex === col ? newValue : value,
            ),
      ),
    })),
}));
