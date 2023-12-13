import type { StateCreator } from "zustand";
import type { AcrossClue, DownClue } from "@/lib/types";
import { sliceResetters, type GameState, type GameActions } from "../store";

export interface Focus {
  direction: "across" | "down";
  row: number;
  col: number;
  word: number[];
  clueNumber: number;
  clueText: string;
}

export interface FocusState {
  focus: Focus | null;
}
export interface FocusActions {
  setFocusByCell: (
    row: Focus["row"],
    col: Focus["col"],
    direction: Focus["direction"],
  ) => void;
  setFocusByClue: (
    clueNumber: Focus["clueNumber"],
    direction: Focus["direction"],
    targetCell?: "first" | "last",
  ) => void;
  findNextValidCell: (
    rowModifier: number,
    colModifier: number,
  ) => { row: number; col: number }; // helper
  toggleFocusDirection: () => void;
  setFocusToNextCell: (modifier: number) => void;
  setFocusToNextClue: (modifier: number, targetCell?: "first" | "last") => void;
  setFocusByKbd: (kbdBtn: string) => void;
}

interface FocusSlice extends FocusState, FocusActions {}

const initFocusState: FocusState = { focus: null };

export const createFocusSlice: StateCreator<
  GameState & GameActions,
  [],
  [],
  FocusSlice
> = (set, get) => {
  sliceResetters.add(() => set(initFocusState));

  return {
    ...initFocusState,
    setFocusByCell: (row, col, direction) => {
      let clueNumber: Focus["clueNumber"];
      let clueText: Focus["clueText"];
      let word: Focus["word"];

      if (direction === "across") {
        const clue = get().clues.across.find(
          (clue) => clue.row === row && clue.cols.includes(col),
        );
        if (!clue) {
          throw new Error(
            "Can't set focus by cell. Unable to find Across clue!",
          );
        }

        clueNumber = clue.number;
        clueText = clue.text;
        word = clue.cols;
      } else if (direction === "down") {
        const clue = get().clues.down.find(
          (clue) => clue.col === col && clue.rows.includes(row),
        );
        if (!clue) {
          throw new Error("Can't set focus by cell. Unable to find Down clue!");
        }

        clueNumber = clue.number;
        clueText = clue.text;
        word = clue.rows;
      } else {
        throw new Error("Can't set focus by cell. Invalid direction.");
      }

      set(() => ({
        focus: {
          direction,
          row,
          col,
          word,
          clueNumber,
          clueText,
        },
      }));
    },
    setFocusByClue: (clueNumber, direction, targetCell) => {
      let row: Focus["row"];
      let col: Focus["col"];
      let word: Focus["word"];
      let clueText: Focus["clueText"];

      if (direction === "across") {
        const clue = get().clues.across.find(
          (clue) => clue.number === clueNumber,
        );

        if (!clue) {
          throw new Error(
            "Can't set focus by clue. Unable to find Across clue from clue number!",
          );
        }

        row = clue.row;
        col = targetCell === "last" ? clue.cols.at(-1)! : clue.cols[0]!;
        clueText = clue.text;
        word = clue.cols;
      } else if (direction === "down") {
        const clue = get().clues.down.find(
          (clue) => clue.number === clueNumber,
        );

        if (!clue) {
          throw new Error(
            "Can't set focus by clue. Unable to find Down clue from clue number!",
          );
        }

        row = targetCell === "last" ? clue.rows.at(-1)! : clue.rows[0]!;
        col = clue.col;
        clueText = clue.text;
        word = clue.rows;
      } else {
        throw new Error("Can't set focus by clue. Invalid direction!");
      }

      set(() => ({
        focus: {
          direction,
          row,
          col,
          word,
          clueNumber,
          clueText,
        },
      }));
    },
    findNextValidCell: (rowModifier, colModifier) => {
      const { focus, initGrid, gridSize } = get();

      if (!focus)
        throw new Error("Can't find next valid cell. Current focus is null!");

      const { row, col } = focus;
      let nextRow = (row + rowModifier + gridSize.rows) % gridSize.rows;
      let nextCol = (col + colModifier + gridSize.cols) % gridSize.cols;

      while (!initGrid[nextRow]?.[nextCol]) {
        nextRow = (nextRow + rowModifier + gridSize.rows) % gridSize.rows;
        nextCol = (nextCol + colModifier + gridSize.cols) % gridSize.cols;
      }

      return { row: nextRow, col: nextCol };
    },
    toggleFocusDirection: () => {
      const focus = get().focus;

      if (!focus)
        throw new Error("Can't toggle focus direction. Current focus is null!");

      const { row, col, direction } = focus;
      const nextDirection = direction === "across" ? "down" : "across";

      get().setFocusByCell(row, col, nextDirection);
    },
    setFocusToNextCell: (modifier: number) => {
      const focus = get().focus;

      if (!focus)
        throw new Error("Can't set focus to next cell. Current focus is null!");

      const { row, col, direction, word } = focus;
      const move = modifier > 0 ? "next" : modifier < 0 ? "prev" : null;
      let nextRow: Focus["row"];
      let nextCol: Focus["col"];

      switch (true) {
        case move === "next" && direction === "across":
          if (col !== word.at(-1)) {
            // If we're not at the end of the word, move to the next cell in the word.
            ({ col: nextCol } = get().findNextValidCell(0, modifier));
            get().setFocusByCell(row, nextCol, direction);
          } else {
            // If we're at the end of the word, move to the next clue in the same direction.
            get().setFocusToNextClue(1);
          }
          break;
        case move === "next" && direction === "down":
          if (row !== word.at(-1)) {
            ({ row: nextRow } = get().findNextValidCell(modifier, 0));
            get().setFocusByCell(nextRow, col, direction);
          } else {
            get().setFocusToNextClue(1);
          }
          break;
        case move === "prev" && direction === "across":
          if (col !== word[0]) {
            ({ col: nextCol } = get().findNextValidCell(0, modifier));
            get().setFocusByCell(row, nextCol, direction);
          } else {
            get().setFocusToNextClue(-1, "last");
          }
          break;
        case move === "prev" && direction === "down":
          if (row !== word[0]) {
            ({ row: nextRow } = get().findNextValidCell(modifier, 0));
            get().setFocusByCell(nextRow, col, direction);
          } else {
            get().setFocusToNextClue(-1, "last");
          }
          break;
        case move === null:
          return;
        default:
          throw new Error(
            "Can't set focus to next cell. Invalid modifier or direction!",
          );
      }
    },
    setFocusToNextClue: (modifier: number, targetCell) => {
      const { focus, clues } = get();

      if (!focus)
        throw new Error("Can't set focus to next clue. Current focus is null!");

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
        throw new Error("Can't set focus to next clue. Invalid direction!");
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
          throw new Error("Can't set focus to next clue. Invalid modifier!");
        }
      }
    },
    setFocusByKbd: (kbdBtn) => {
      const focus = get().focus;

      if (!focus)
        throw new Error("Can't set focus by keyboard. Current focus is null!");

      const { row, col, direction } = focus;
      let nextRow: Focus["row"];
      let nextCol: Focus["col"];

      switch (kbdBtn) {
        case " ":
          get().toggleFocusDirection();
          break;
        case "ArrowUp":
          ({ row: nextRow } = get().findNextValidCell(-1, 0));
          get().setFocusByCell(nextRow, col, direction);
          break;
        case "ArrowLeft":
          ({ col: nextCol } = get().findNextValidCell(0, -1));
          get().setFocusByCell(row, nextCol, direction);
          break;
        case "ArrowDown":
          ({ row: nextRow } = get().findNextValidCell(1, 0));
          get().setFocusByCell(nextRow, col, direction);
          break;
        case "ArrowRight":
          ({ col: nextCol } = get().findNextValidCell(0, 1));
          get().setFocusByCell(row, nextCol, direction);
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
  };
};
