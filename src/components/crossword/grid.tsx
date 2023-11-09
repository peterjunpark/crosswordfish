"use client";

import React from "react";
import { useStore } from "@/lib/store";
import { stringifyRowCol } from "@/lib/utils";
import { CrosswordCell } from "./cell";

export function CrosswordGrid() {
  const { grid, clues } = useStore();

  const getCellNumber = (rowIdx: number, colIdx: number) => {
    // Check if there is a cell to the left.
    if (!grid.solution[rowIdx]?.[colIdx - 1]) {
      // If not, the rendered cell is the first letter of an ACROSS clue.
      // It should be numbered.
      const clue = clues.across.find((element) => {
        return element.row === rowIdx && element.cols[0] === colIdx;
      });

      return clue?.number;

      // Check if there is a cell above.
    } else if (!grid.solution[rowIdx - 1]?.[colIdx]) {
      // If not, the rendered cell is the first letter of a DOWN clue.
      // It should be numbered.
      const clue = clues.down.find((element) => {
        return element.col === colIdx && element.rows[0] === rowIdx;
      });

      return clue?.number;
    }
  };

  return (
    <div className={`grid h-full grid-cols-15 gap-px`}>
      {grid.working.map((row, rowIdx) =>
        row.map((cell, colIdx) => {
          const cellId = stringifyRowCol(rowIdx, colIdx);
          const cellNumber = getCellNumber(rowIdx, colIdx);

          if (cell !== null) {
            return (
              <CrosswordCell
                data={cell}
                number={cellNumber}
                id={cellId}
                key={cellId}
              />
            );
          } else {
            return (
              <div
                className="aspect-square w-full rounded-sm bg-muted-foreground"
                id={cellId}
                key={cellId}
              />
            );
          }
        }),
      )}
    </div>
  );
}
