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
  | null;

export type Grid = CellValue[][];

interface AcrossCoords {
  row: number;
  cols: number[];
}

interface DownCoords {
  col: number;
  rows: number[];
}

/** If the clue is Across, it will have row and cols props.
 * If the clue is Down, it will have col and rows props.
 */
export type Clue = {
  number: number;
  clue: string;
} & (AcrossCoords | DownCoords);
