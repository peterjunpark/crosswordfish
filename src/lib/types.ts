import { z } from "zod"; //TODO: Add validation with Zod

export const cellValueSchema = z.string().max(1).toUpperCase().regex(/[A-Z]/);

export type CellValue = z.infer<typeof cellValueSchema>;

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
