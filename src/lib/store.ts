import { create } from "zustand";
import type { Grid, Clues, CellValue } from "./types";
import { DUMMY_clues, DUMMY_grid } from "@/___tests___/dummy-data";

//TODO: Will probably need to initialize the store with props? I.e., generated crossword grid.

const grid = DUMMY_grid;
const clues = DUMMY_clues;

type WordDirection = "across" | "down";

type State = {
  clues: Clues;
  solutionGrid: Grid;
  workingGrid: Grid;
  gridSize: { rows: number; cols: number };
  focus: {
    direction: WordDirection;
    row: number;
    col: number;
    word: number[];
    clueNumber: number;
  };
};

type Action = {
  reset: () => void;
  setCellValue: (value: CellValue, row: number, col: number) => void;
  setFocusByCell: (row: number, col: number, direction: WordDirection) => void;
  setFocusByClue: (clueNumber: number, direction: WordDirection) => void;
};

const initialGameState: State = {
  clues: clues,
  solutionGrid: grid,
  workingGrid: grid.map((row) =>
    row.map((cell) => (cell === null ? null : "")),
  ),
  gridSize: { rows: grid.length, cols: grid[0]!.length },
  focus: {
    row: clues.across[0]!.row,
    col: clues.across[0]!.cols[0]!,
    word: clues.across[0]!.cols,
    clueNumber: clues.across[0]!.number,
    direction: "across",
  },
};
// TODO: Refactor to use immer
export const useGameStore = create<State & Action>()((set, get) => ({
  ...initialGameState,
  // ACTIONS
  reset: () => set(initialGameState),
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
  setFocusByCell: (row, col, direction) => {
    let clueNumber: number;
    let word: number[];

    if (direction === "across") {
      const clue = get().clues.across.find(
        (clue) => clue.row === row && clue.cols.includes(col),
      )!;

      clueNumber = clue.number;
      word = clue.cols;
    } else if (direction === "down") {
      const clue = get().clues.down.find(
        (clue) => clue.col === col && clue.rows.includes(row),
      )!;

      clueNumber = clue.number;
      word = clue.rows;
    } else {
      throw new Error("Invalid direction");
    }

    set(() => ({
      focus: { direction, row, col, word, clueNumber },
    }));
  },
  setFocusByClue: (clueNumber, direction) => {
    let row: number;
    let col: number;
    let word: number[];

    if (direction === "across") {
      const clue = get().clues.across.find(
        (clue) => clue.number === clueNumber,
      )!;

      row = clue.row;
      col = clue.cols[0]!;
      word = clue.cols;
    } else if (direction === "down") {
      const clue = get().clues.down.find((clue) => clue.number === clueNumber)!;

      row = clue.rows[0]!;
      col = clue.col;
      word = clue.rows;
    } else {
      throw new Error("Invalid direction");
    }

    set(() => ({
      focus: { direction, row, col, word, clueNumber },
    }));
  },
}));
