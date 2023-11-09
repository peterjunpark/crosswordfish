import { z } from "zod"; //TODO: Add validation with Zod

export type CellValue =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
  | "";

export type SolutionGrid = (Omit<CellValue, ""> | null)[][];

export type WorkingGrid = (CellValue | null)[][];

interface Clue {
  number: number;
  text: string;
}

export interface AcrossClue extends Clue {
  row: number;
  cols: number[];
}

export interface DownClue extends Clue {
  col: number;
  rows: number[];
}

export type Clues = {
  across: AcrossClue[];
  down: DownClue[];
};
