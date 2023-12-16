import type { Grid, WordsWithMetadata } from "@/lib/types";

/**
 * @returns {("across" | "down")[] | false} If the cell starts a word in either direction,
 * returns an array indicating the word's 'directions'.
 * If the cell is does not start a word, returns false.
 */
function getWordDirectionsFromStarter(
  grid: Grid,
  rowIdx: number,
  colIdx: number,
) {
  const cellAbove = grid[rowIdx - 1]?.[colIdx];
  const cellBelow = grid[rowIdx + 1]?.[colIdx];
  const cellToLeft = grid[rowIdx]?.[colIdx - 1];
  const cellToRight = grid[rowIdx]?.[colIdx + 1];
  const direction: ("across" | "down")[] = [];

  if (!cellAbove && cellBelow) direction.push("down");
  if (!cellToLeft && cellToRight) direction.push("across");
  return direction.length > 0 ? direction : false;
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

// O(n * m) time => n = number of rows, m = number of columns
export function getWords(grid: Grid) {
  const words: WordsWithMetadata = { across: [], down: [] };
  let number = 1;

  for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
    const row = grid[rowIdx];

    if (row) {
      for (let colIdx = 0; colIdx < row.length; colIdx++) {
        // Don't consider shaded cells.
        if (!row[colIdx]) continue;

        const directions = getWordDirectionsFromStarter(grid, rowIdx, colIdx);

        // Current cell starts a word.
        if (directions) {
          directions.forEach((direction) => {
            if (direction === "across") {
              const word = getAcrossWord(grid, rowIdx, colIdx);
              words.across.push({ ...word, number });
            } else if (direction === "down") {
              const word = getDownWord(grid, colIdx, rowIdx);
              words.down.push({ ...word, number });
            }
          });

          number++;
        }
      }
    }
  }
  return words;
}
