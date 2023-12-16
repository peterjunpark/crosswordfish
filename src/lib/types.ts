import type { CellValue } from "./schemas/grid";

export { CellValue };

export type Cell = CellValue | null;

export type Grid = readonly Cell[][];

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

export interface Clues {
  across: AcrossClue[];
  down: DownClue[];
}

export type AcrossWordWithMetadata = Omit<AcrossClue, "text"> & {
  word: string;
};
export type DownWordWithMetadata = Omit<DownClue, "text"> & { word: string };

export interface WordsWithMetadata {
  across: AcrossWordWithMetadata[];
  down: DownWordWithMetadata[];
}

export interface Words {
  across: string[];
  down: string[];
}
