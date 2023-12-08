import { createStore } from "zustand";
import type { Grid, Clues, AcrossClue, DownClue, CellValue } from "@/lib/types";

export interface GameProps {
  initGrid: Grid;
  clues: Clues;
}

export interface GameState extends GameProps {
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
  game: {
    isStarted: boolean;
    isChecking: boolean;
  };
}

//TODO: REfactor RESET
export interface GameActions {
  reset: () => void;
  findNextValidCell: (
    rowModifier: number,
    colModifier: number,
  ) => { row: number; col: number }; // helper
  setCellValue: (value: CellValue, row: number, col: number) => void;
  toggleFocusDirection: () => void;
  setFocusByCell: (
    row: GameState["focus"]["row"],
    col: GameState["focus"]["col"],
    direction: GameState["focus"]["direction"],
  ) => void;
  setFocusByClue: (
    clueNumber: GameState["focus"]["clueNumber"],
    direction: GameState["focus"]["direction"],
    targetCell?: "first" | "last",
  ) => void;
  setFocusToNextCell: (modifier: number) => void;
  setFocusToNextClue: (modifier: number, targetCell?: "first" | "last") => void;
  setFocusByKbd: (kbdBtn: string) => void;
  setGameIsStarted: () => void;
  toggleGameIsChecking: () => void;
}

export type GameStore = ReturnType<typeof createGameStore>;

// TODO: WILL NEED REFACTOR
export const createGameStore = (initProps: GameProps) => {
  const { initGrid, clues } = initProps;
  const initState: GameState = {
    initGrid,
    clues,
    workingGrid: initGrid.map((row) =>
      row.map((cell) => (cell === null ? null : "")),
    ),
    gridSize: { rows: initGrid.length, cols: initGrid[0]!.length },
    focus: {
      direction: "across",
      row: clues.across[0]!.row,
      col: clues.across[0]!.cols[0]!,
      word: clues.across[0]!.cols,
      clueNumber: clues.across[0]!.number,
      clueText: clues.across[0]!.text,
    },
    game: {
      isStarted: false,
      isChecking: false,
    },
  };

  return createStore<GameState & GameActions>()((set, get) => ({
    ...initState,
    workingGrid: initGrid.map((row) =>
      row.map((cell) => (cell === null ? null : "")),
    ),
    reset: () => set(initState),
    findNextValidCell: (rowModifier, colModifier) => {
      const { focus, initGrid, gridSize } = get();
      const { row: initialRow, col: initialCol } = focus;

      let nextRow = (initialRow + rowModifier + gridSize.rows) % gridSize.rows;
      let nextCol = (initialCol + colModifier + gridSize.cols) % gridSize.cols;

      while (!initGrid[nextRow]?.[nextCol]) {
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
      let clueNumber: GameState["focus"]["clueNumber"];
      let clueText: GameState["focus"]["clueText"];
      let word: GameState["focus"]["word"];

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
      let row: GameState["focus"]["row"];
      let col: GameState["focus"]["col"];
      let word: GameState["focus"]["word"];
      let clueText: GameState["focus"]["clueText"];

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
        const clue = get().clues.down.find(
          (clue) => clue.number === clueNumber,
        );

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
    toggleFocusDirection: () => {
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
      let nextRow: GameState["focus"]["row"];
      let nextCol: GameState["focus"]["col"];

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
      let nextRow: GameState["focus"]["row"];
      let nextCol: GameState["focus"]["col"];

      switch (kbdBtn) {
        case " ":
          get().toggleFocusDirection();
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
    setGameIsStarted: () => {
      set((state) => ({ game: { ...state.game, isStarted: true } }));
    },
    toggleGameIsChecking: () => {
      set((state) => ({
        game: { ...state.game, isChecking: !state.game.isChecking },
      }));
    },
  }));
};
