import { create } from "zustand";
import type { Grid, Clues, AcrossClue, DownClue, CellValue } from "./types";
import {
  testGrid1,
  testClues1,
  testGrid2,
  testClues2,
} from "@/___tests___/test-data";

//TODO: Will probably need to initialize the store with props? I.e., generated crossword grid.

const grid = testGrid2;
const clues = testClues2;

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
    clueText: string;
  };
  // game: {
  //   isStarted: boolean;
  //   isChecking: boolean;
  // };
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
    targetCell?: "first" | "last",
  ) => void;
  setFocusToNextCell: (modifier: number) => void;
  setFocusToNextClue: (modifier: number, targetCell?: "first" | "last") => void;
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
    direction: "across",
    row: clues.across[0]!.row,
    col: clues.across[0]!.cols[0]!,
    word: clues.across[0]!.cols,
    clueNumber: clues.across[0]!.number,
    clueText: clues.across[0]!.text,
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
    let clueText: State["focus"]["clueText"];
    let word: State["focus"]["word"];

    if (direction === "across") {
      const clue = get().clues.across.find(
        (clue) => clue.row === row && clue.cols.includes(col),
      );
      if (!clue) {
        throw new Error(errorPrefix + "couldn't find Across clue.");
      }

      word = clue.cols;
      clueNumber = clue.number;
      clueText = clue.text;
    } else if (direction === "down") {
      const clue = get().clues.down.find(
        (clue) => clue.col === col && clue.rows.includes(row),
      );
      if (!clue) {
        throw new Error(errorPrefix + "couldn't find Down clue.");
      }

      word = clue.rows;
      clueNumber = clue.number;
      clueText = clue.text;
    } else {
      throw new Error(errorPrefix + "invalid direction.");
    }

    set(() => ({
      focus: { direction, row, col, word, clueNumber, clueText },
    }));
  },
  setFocusByClue: (clueNumber, direction, targetCell) => {
    const errorPrefix = "Error setting focus by clue number: ";
    let row: State["focus"]["row"];
    let col: State["focus"]["col"];
    let word: State["focus"]["word"];
    let clueText: State["focus"]["clueText"];

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
      col = targetCell === "last" ? clue.cols.at(-1)! : clue.cols[0]!;
      word = clue.cols;
      clueText = clue.text;
    } else if (direction === "down") {
      const clue = get().clues.down.find((clue) => clue.number === clueNumber);

      if (!clue) {
        throw new Error(
          errorPrefix + "couldn't find Down clue from clue number.",
        );
      }

      row = targetCell === "last" ? clue.rows.at(-1)! : clue.rows[0]!;
      col = clue.col;
      word = clue.rows;
      clueText = clue.text;
    } else {
      throw new Error(errorPrefix + "invalid direction.");
    }

    set(() => ({
      focus: { direction, row, col, word, clueNumber, clueText },
    }));
  },
  switchFocusDirection: () => {
    const { focus } = get();
    const { row, col, direction: initialDirection } = focus;
    const direction = initialDirection === "across" ? "down" : "across";

    get().setFocusByCell(row, col, direction);
  },
  setFocusToNextCell: (modifier: number) => {
    const errorPrefix = "Error setting focus to next cell: ";
    const { focus } = get();
    const { row, col, direction, word } = focus;
    const move = modifier > 0 ? "next" : modifier < 0 ? "prev" : null;
    let nextRow: State["focus"]["row"];
    let nextCol: State["focus"]["col"];

    switch (true) {
      case move === "next" && direction === "across":
        if (col !== word.at(-1)) {
          // If we're not at the end of the word, move to the next cell in the word.
          ({ col: nextCol } = get().findNextValidCell(0, modifier));
          set((state) => ({ focus: { ...state.focus, col: nextCol } }));
        } else {
          // If we're at the end of the word, move to the next clue in the same direction.
          get().setFocusToNextClue(1);
        }
        break;
      case move === "next" && direction === "down":
        if (row !== word.at(-1)) {
          ({ row: nextRow } = get().findNextValidCell(modifier, 0));
          set((state) => ({ focus: { ...state.focus, row: nextRow } }));
        } else {
          get().setFocusToNextClue(1);
        }
        break;
      case move === "prev" && direction === "across":
        if (col !== word[0]) {
          ({ col: nextCol } = get().findNextValidCell(0, modifier));
          set((state) => ({ focus: { ...state.focus, col: nextCol } }));
        } else {
          get().setFocusToNextClue(-1, "last");
        }
        break;
      case move === "prev" && direction === "down":
        if (row !== word[0]) {
          ({ row: nextRow } = get().findNextValidCell(modifier, 0));
          set((state) => ({ focus: { ...state.focus, row: nextRow } }));
        } else {
          get().setFocusToNextClue(-1, "last");
        }
        break;
      case move === null:
        return;
      default:
        throw new Error(errorPrefix + "invalid modifier or direction.");
    }
  },
  setFocusToNextClue: (modifier: number, targetCell) => {
    const errorPrefix = "Error setting focus to next clue: ";
    const { focus, clues } = get();
    const { clueNumber, direction } = focus;
    const move = modifier > 0 ? "next" : modifier < 0 ? "prev" : null;
    let nextClue: AcrossClue | DownClue | undefined;

    if (direction === "across") {
      const currentClueIdx = clues.across.findIndex(
        (elem) => elem.number === clueNumber,
      );

      nextClue = clues.across[currentClueIdx + modifier];
    } else if (direction === "down") {
      const currentClueIdx = clues.down.findIndex(
        (elem) => elem.number === clueNumber,
      );

      nextClue = clues.down[currentClueIdx + modifier];
    } else {
      throw new Error(errorPrefix + "invalid direction.");
    }

    if (nextClue) {
      get().setFocusByClue(nextClue.number, direction, targetCell);
    } else {
      // If there is no next clue in the current direction, switch directions and go to the first clue in that direction.
      if (move === "next") {
        get().setFocusByClue(1, direction === "across" ? "down" : "across");
        return;
      } else if (move === "prev") {
        get().setFocusByClue(
          direction === "across"
            ? clues.down.at(-1)!.number
            : clues.across.at(-1)!.number,
          direction === "across" ? "down" : "across",
          targetCell,
        );
      } else {
        throw new Error(errorPrefix + "invalid modifier.");
      }
    }
  },
  setFocusByKbd: (kbdBtn) => {
    let nextRow: State["focus"]["row"];
    let nextCol: State["focus"]["col"];

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
      case ".": // Go to next clue
      case "Tab":
        get().setFocusToNextClue(1);
        break;
      case ",": // Go to prev clue
        get().setFocusToNextClue(-1, "first");
        break;
    }
  },
}));
