import type { Grid } from "@/lib/types";

interface Word {
  word: string;
  number: number;
  direction: "across" | "down";
}

interface AcrossWord extends Word {
  row: number;
  cols: number[];
}

interface DownWord extends Word {
  col: number;
  rows: number[];
}

interface Words {
  across: AcrossWord[];
  down: DownWord[];
}

/**
 * @returns {("across" | "down")[]} an array indicating the word's 'directions' if the cell is the first letter of a
 * word. If the cell is not the first letter of a word, returns an empty array.
 */
function getDirectionIfCellIsFirstLetter(
  grid: Grid,
  rowIdx: number,
  colIdx: number,
) {
  const cellAbove = grid[rowIdx - 1]?.[colIdx];
  const cellToLeft = grid[rowIdx]?.[colIdx - 1];
  const direction: Word["direction"][] = [];

  if (!cellAbove) direction.push("down");
  if (!cellToLeft) direction.push("across");
  return direction;
}

function getNumbersInRange(start: number, end: number) {
  return Array.from({ length: end - start }, (_, index) => start + index);
}

function getAcrossWord(grid: Grid, rowIdx: number, startColIdx: number) {
  const row = grid[rowIdx];

  if (!row) throw new Error("Can't get Across word. Row does not exist.");

  const endColIdx = row.indexOf(null, startColIdx);
  const word = row
    .slice(startColIdx, endColIdx !== -1 ? endColIdx : undefined)
    .join("");
  const cols = getNumbersInRange(
    startColIdx,
    endColIdx !== -1 ? endColIdx : row.length,
  );

  return {
    word,
    row: rowIdx,
    cols,
  };
}

function getDownWord(grid: Grid, colIdx: number, startRowIdx: number) {
  const col = grid.map((row) => row[colIdx]);

  if (!col) throw new Error("Can't get Down word. Col does not exist.");

  const endRowIdx = col.indexOf(null, startRowIdx);
  const word = col
    .slice(startRowIdx, endRowIdx !== -1 ? endRowIdx : undefined)
    .join("");
  const rows = getNumbersInRange(
    startRowIdx,
    endRowIdx !== -1 ? endRowIdx : col.length,
  );

  return {
    word,
    col: colIdx,
    rows,
  };
}

// O(n) time, n = number of cells in grid
export function getWords(grid: Grid) {
  const words: Words = { across: [], down: [] };
  let number = 1;

  for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
    const row = grid[rowIdx];

    if (row) {
      for (let colIdx = 0; colIdx < row.length; colIdx++) {
        if (!row[colIdx]) continue;

        const wordDirections = getDirectionIfCellIsFirstLetter(
          grid,
          rowIdx,
          colIdx,
        );

        if (!wordDirections.length) continue;

        wordDirections.forEach((direction) => {
          if (direction === "across") {
            const word = getAcrossWord(grid, rowIdx, colIdx);
            words.across.push({ ...word, number, direction });
          } else if (direction === "down") {
            const word = getDownWord(grid, colIdx, rowIdx);
            words.down.push({ ...word, number, direction });
          }
        });

        number++;
      }
    }
  }
  return words;
}
