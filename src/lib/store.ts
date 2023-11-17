import { create } from "zustand";
import type { Grid, Clues, CellValue } from "./types";
import { DUMMY_clues, DUMMY_grid } from "@/___tests___/dummy-data";

//TODO: Will probably need to initialize the store with props? I.e., generated crossword grid.

const grid = DUMMY_grid;
const clues = DUMMY_clues;

type State = {
  clues: Clues;
  solutionGrid: Grid;
  workingGrid: Grid;
  gridSize: { rows: number; cols: number };
  focus: {
    direction: "across" | "down";
    row: number;
    col: number;
    word: number[];
    clueNumber: number;
  };
};

type Action = {
  reset: () => void;
  findNextValidCell: (
    rowModifier: number,
    colModifier: number,
  ) => { row: number; col: number }; // helper
  setCellValue: (value: CellValue, row: number, col: number) => void;
  switchFocusDirection: () => void;
  setFocusByCell: (
    row: State["focus"]["row"],
    col: State["focus"]["col"],
    direction: State["focus"]["direction"],
  ) => void;
  setFocusByClue: (
    clueNumber: State["focus"]["clueNumber"],
    direction: State["focus"]["direction"],
  ) => void;
  setFocusToNext: () => void;
  setFocusByKbd: (kbdBtn: string) => void;
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
  findNextValidCell: (rowModifier, colModifier) => {
    const { focus, solutionGrid, gridSize } = get();
    const { row: initialRow, col: initialCol } = focus;

    let nextRow = (initialRow + rowModifier + gridSize.rows) % gridSize.rows;
    let nextCol = (initialCol + colModifier + gridSize.cols) % gridSize.cols;

    while (!solutionGrid[nextRow]?.[nextCol]) {
      nextRow = (nextRow + rowModifier + gridSize.rows) % gridSize.rows;
      nextCol = (nextCol + colModifier + gridSize.cols) % gridSize.cols;
    }

    return { row: nextRow, col: nextCol };
  },
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
  setFocusByCell: (row, col, direction) => {
    const errorPrefix = "Error setting focus by cell: ";
    let clueNumber: State["focus"]["clueNumber"];
    let word: State["focus"]["word"];

    if (direction === "across") {
      const clue = get().clues.across.find(
        (clue) => clue.row === row && clue.cols.includes(col),
      );
      if (!clue) {
        throw new Error(errorPrefix + "couldn't find Across clue.");
      }

      clueNumber = clue.number;
      word = clue.cols;
    } else if (direction === "down") {
      const clue = get().clues.down.find(
        (clue) => clue.col === col && clue.rows.includes(row),
      );
      if (!clue) {
        throw new Error(errorPrefix + "couldn't find Down clue.");
      }

      clueNumber = clue.number;
      word = clue.rows;
    } else {
      throw new Error(errorPrefix + "invalid direction.");
    }

    set(() => ({
      focus: { row, col, word, clueNumber, direction },
    }));
  },
  setFocusByClue: (clueNumber, direction) => {
    const errorPrefix = "Error setting focus by clue number: ";
    let row: State["focus"]["row"];
    let col: State["focus"]["col"];
    let word: State["focus"]["word"];

    if (direction === "across") {
      const clue = get().clues.across.find(
        (clue) => clue.number === clueNumber,
      );
      if (!clue) {
        throw new Error(
          errorPrefix + "couldn't find Across clue from clue number.",
        );
      }

      row = clue.row;
      col = clue.cols[0]!;
      word = clue.cols;
    } else if (direction === "down") {
      const clue = get().clues.down.find((clue) => clue.number === clueNumber);
      if (!clue) {
        throw new Error(
          errorPrefix + "couldn't find Down clue from clue number.",
        );
      }

      row = clue.rows[0]!;
      col = clue.col;
      word = clue.rows;
    } else {
      throw new Error(errorPrefix + "invalid direction.");
    }

    set(() => ({
      focus: { row, col, word, clueNumber, direction },
    }));
  },
  switchFocusDirection: () => {
    const { focus } = get();
    const { row, col, direction: initialDirection } = focus;
    const direction = initialDirection === "across" ? "down" : "across";

    get().setFocusByCell(row, col, direction);
  },
  setFocusToNext: () => {
    const errorPrefix = "Error setting focus by prev or next clue: ";
    // const { focus, clues } = get();
    // const { clueNumber, direction } = focus;

    // get().setFocusByClue(nextClueNumber, direction);
  },
  setFocusByKbd: (kbdBtn) => {
    let nextRow: number;
    let nextCol: number;

    switch (kbdBtn) {
      case " ":
        get().switchFocusDirection();
        break;
      case "ArrowUp":
        ({ row: nextRow } = get().findNextValidCell(-1, 0));
        set((state) => ({ focus: { ...state.focus, row: nextRow } }));
        break;
      case "ArrowLeft":
        ({ col: nextCol } = get().findNextValidCell(0, -1));
        set((state) => ({ focus: { ...state.focus, col: nextCol } }));
        break;
      case "ArrowDown":
        ({ row: nextRow } = get().findNextValidCell(1, 0));
        set((state) => ({ focus: { ...state.focus, row: nextRow } }));
        break;
      case "ArrowRight":
        ({ col: nextCol } = get().findNextValidCell(0, 1));
        set((state) => ({ focus: { ...state.focus, col: nextCol } }));
        break;
    }
  },
}));
