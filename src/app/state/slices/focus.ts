import type { StateCreator } from "zustand";
import type { AcrossClue, DownClue } from "@/lib/types";
import { sliceResetters, type GameState, type GameActions } from "../store";

export interface FocusState {
  focusedDirection: "across" | "down";
  focusedRow: number;
  focusedCol: number;
  focusedWord: number[];
  focusedClueNumber: number;
  focusedClueText: string;
}
// TODO: RENAME FOCUS PROPS
export interface FocusActions {
  setFocusByCell: (
    row: FocusState["focusedRow"],
    col: FocusState["focusedCol"],
    direction: FocusState["focusedDirection"],
  ) => void;
  setFocusByClue: (
    clueNumber: FocusState["focusedClueNumber"],
    direction: FocusState["focusedDirection"],
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

export const createFocusSlice: StateCreator<
  GameState & GameActions,
  [],
  [],
  FocusSlice
> = (set, get) => {
  sliceResetters.add(() => set(initFocusState));

  // const { clues } = get();

  console.log(get());

  // const initFocusState: FocusState = {
  //   focusedDirection: "across",
  //   focusedRow: get().clues.across[0]!.row,
  //   focusedCol: get().clues.across[0]!.cols[0]!,
  //   focusedWord: get().clues.across[0]!.cols,
  //   focusedClueNumber: get().clues.across[0]!.number,
  //   focusedClueText: get().clues.across[0]!.text,
  // };

  const initFocusState: FocusState = {
    focusedDirection: "across",
    focusedRow: 0,
    focusedCol: 0,
    focusedWord: [0, 1, 2],
    focusedClueNumber: 2,
    focusedClueText: "hellO",
  };

  return {
    ...initFocusState,
    setFocusByCell: (nextRow, nextCol, focusedDirection) => {
      const errorPrefix = "Error setting focus by cell: ";
      let nextClueNumber: FocusState["focusedClueNumber"];
      let nextClueText: FocusState["focusedClueText"];
      let nextWord: FocusState["focusedWord"];

      if (focusedDirection === "across") {
        const clue = get().clues.across.find(
          (clue) => clue.row === nextRow && clue.cols.includes(nextCol),
        );
        if (!clue) {
          throw new Error(errorPrefix + "couldn't find Across clue.");
        }

        nextWord = clue.cols;
        nextClueNumber = clue.number;
        nextClueText = clue.text;
      } else if (focusedDirection === "down") {
        const clue = get().clues.down.find(
          (clue) => clue.col === nextCol && clue.rows.includes(nextRow),
        );
        if (!clue) {
          throw new Error(errorPrefix + "couldn't find Down clue.");
        }

        nextWord = clue.rows;
        nextClueNumber = clue.number;
        nextClueText = clue.text;
      } else {
        throw new Error(errorPrefix + "invalid direction.");
      }

      set(() => ({
        focusedDirection,
        focusedRow: nextRow,
        focusedCol: nextCol,
        focusedWord: nextWord,
        focusedClueNumber: nextClueNumber,
        focusedClueText: nextClueText,
      }));
    },
    setFocusByClue: (nextClueNumber, focusedDirection, targetCell) => {
      const errorPrefix = "Error setting focus by clue number: ";
      let nextRow: FocusState["focusedRow"];
      let nextCol: FocusState["focusedCol"];
      let nextWord: FocusState["focusedWord"];
      let nextClueText: FocusState["focusedClueText"];

      if (focusedDirection === "across") {
        const clue = get().clues.across.find(
          (clue) => clue.number === nextClueNumber,
        );

        if (!clue) {
          throw new Error(
            errorPrefix + "couldn't find Across clue from clue number.",
          );
        }

        nextRow = clue.row;
        nextCol = targetCell === "last" ? clue.cols.at(-1)! : clue.cols[0]!;
        nextWord = clue.cols;
        nextClueText = clue.text;
      } else if (focusedDirection === "down") {
        const clue = get().clues.down.find(
          (clue) => clue.number === nextClueNumber,
        );

        if (!clue) {
          throw new Error(
            errorPrefix + "couldn't find Down clue from clue number.",
          );
        }

        nextRow = targetCell === "last" ? clue.rows.at(-1)! : clue.rows[0]!;
        nextCol = clue.col;
        nextWord = clue.rows;
        nextClueText = clue.text;
      } else {
        throw new Error(errorPrefix + "invalid direction.");
      }

      set(() => ({
        focusedDirection,
        focusedRow: nextRow,
        focusedCol: nextCol,
        focusedWord: nextWord,
        focusedClueNumber: nextClueNumber,
        focusedClueText: nextClueText,
      }));
    },
    findNextValidCell: (rowModifier, colModifier) => {
      const {
        focusedRow: initialRow,
        focusedCol: initialCol,
        initGrid,
        gridSize,
      } = get();

      let nextRow = (initialRow + rowModifier + gridSize.rows) % gridSize.rows;
      let nextCol = (initialCol + colModifier + gridSize.cols) % gridSize.cols;

      while (!initGrid[nextRow]?.[nextCol]) {
        nextRow = (nextRow + rowModifier + gridSize.rows) % gridSize.rows;
        nextCol = (nextCol + colModifier + gridSize.cols) % gridSize.cols;
      }

      return { row: nextRow, col: nextCol };
    },
    toggleFocusDirection: () => {
      const {
        focusedRow,
        focusedCol,
        focusedDirection: initialDirection,
      } = get();
      const direction = initialDirection === "across" ? "down" : "across";

      get().setFocusByCell(focusedRow, focusedCol, direction);
    },
    setFocusToNextCell: (modifier: number) => {
      const errorPrefix = "Error setting focus to next cell: ";
      const { focusedRow, focusedCol, focusedDirection, focusedWord } = get();
      const move = modifier > 0 ? "next" : modifier < 0 ? "prev" : null;
      let nextRow: FocusState["focusedRow"];
      let nextCol: FocusState["focusedCol"];

      switch (true) {
        case move === "next" && focusedDirection === "across":
          if (focusedCol !== focusedWord.at(-1)) {
            // If we're not at the end of the word, move to the next cell in the word.
            ({ col: nextCol } = get().findNextValidCell(0, modifier));
            set(() => ({ focusedCol: nextCol }));
          } else {
            // If we're at the end of the word, move to the next clue in the same direction.
            get().setFocusToNextClue(1);
          }
          break;
        case move === "next" && focusedDirection === "down":
          if (focusedRow !== focusedWord.at(-1)) {
            ({ row: nextRow } = get().findNextValidCell(modifier, 0));
            set(() => ({ focusedRow: nextRow }));
          } else {
            get().setFocusToNextClue(1);
          }
          break;
        case move === "prev" && focusedDirection === "across":
          if (focusedCol !== focusedWord[0]) {
            ({ col: nextCol } = get().findNextValidCell(0, modifier));
            set(() => ({ focusedCol: nextCol }));
          } else {
            get().setFocusToNextClue(-1, "last");
          }
          break;
        case move === "prev" && focusedDirection === "down":
          if (focusedRow !== focusedWord[0]) {
            ({ row: nextRow } = get().findNextValidCell(modifier, 0));
            set(() => ({ focusedRow: nextRow }));
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
      const { focusedClueNumber, focusedDirection, clues } = get();
      const move = modifier > 0 ? "next" : modifier < 0 ? "prev" : null;
      let nextClue: AcrossClue | DownClue | undefined;

      if (focusedDirection === "across") {
        const currentClueIdx = clues.across.findIndex(
          (elem) => elem.number === focusedClueNumber,
        );

        nextClue = clues.across[currentClueIdx + modifier];
      } else if (focusedDirection === "down") {
        const currentClueIdx = clues.down.findIndex(
          (elem) => elem.number === focusedClueNumber,
        );

        nextClue = clues.down[currentClueIdx + modifier];
      } else {
        throw new Error(errorPrefix + "invalid direction.");
      }

      if (nextClue) {
        get().setFocusByClue(nextClue.number, focusedDirection, targetCell);
      } else {
        // If there is no next clue in the current direction, switch directions and go to the first clue in that direction.
        if (move === "next") {
          get().setFocusByClue(
            1,
            focusedDirection === "across" ? "down" : "across",
          );
          return;
        } else if (move === "prev") {
          get().setFocusByClue(
            focusedDirection === "across"
              ? clues.down.at(-1)!.number
              : clues.across.at(-1)!.number,
            focusedDirection === "across" ? "down" : "across",
            targetCell,
          );
        } else {
          throw new Error(errorPrefix + "invalid modifier.");
        }
      }
    },
    setFocusByKbd: (kbdBtn) => {
      let nextRow: FocusState["focusedRow"];
      let nextCol: FocusState["focusedCol"];

      switch (kbdBtn) {
        case " ":
          get().toggleFocusDirection();
          break;
        case "ArrowUp":
          ({ row: nextRow } = get().findNextValidCell(-1, 0));
          set(() => ({ focusedRow: nextRow }));
          break;
        case "ArrowLeft":
          ({ col: nextCol } = get().findNextValidCell(0, -1));
          set(() => ({ focusedCol: nextCol }));
          break;
        case "ArrowDown":
          ({ row: nextRow } = get().findNextValidCell(1, 0));
          set(() => ({ focusedRow: nextRow }));
          break;
        case "ArrowRight":
          ({ col: nextCol } = get().findNextValidCell(0, 1));
          set(() => ({ focusedCol: nextCol }));
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
