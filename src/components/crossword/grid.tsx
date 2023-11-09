"use client";

import React from "react";
import { useStore } from "@/lib/store";
import { CrosswordCell } from "./cell";

export function CrosswordGrid() {
  const { solutionGrid, clues } = useStore();

  // If there is no cell to the left or above the current cell,
  // the current cell is the first letter of an Across or Down clue.
  // It needs to be numbered on the grid.
  // Clue numbers are not stored in the grid data --- need to get from clues data.
  // TODO: I think this can be optimized.
  const getCellNumber = (rowIdx: number, colIdx: number) => {
    if (!solutionGrid[rowIdx]?.[colIdx - 1]) {
      const clue = clues.across.find((element) => {
        return element.row === rowIdx && element.cols[0] === colIdx;
      });

      return clue?.number;
    } else if (!solutionGrid[rowIdx - 1]?.[colIdx]) {
      const clue = clues.down.find((element) => {
        return element.col === colIdx && element.rows[0] === rowIdx;
      });

      return clue?.number;
    }
  };

  return (
    <div className={`grid h-full grid-cols-15 gap-px`}>
      {solutionGrid.map((row, rowIdx) =>
        row.map((solution, colIdx) => {
          const cellNumber = getCellNumber(rowIdx, colIdx);

          if (solution !== null) {
            return (
              <CrosswordCell
                row={rowIdx}
                col={colIdx}
                solution={solution}
                number={cellNumber}
                key={`${rowIdx}::${colIdx}`}
              />
            );
          } else {
            return (
              <div
                className="aspect-square w-full rounded-sm bg-muted-foreground"
                key={`${rowIdx}::${colIdx}`}
              />
            );
          }
        }),
      )}
    </div>
  );
}
