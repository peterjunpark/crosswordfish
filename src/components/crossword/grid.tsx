"use client";

import React from "react";
import { useGameStore } from "@/lib/store";
import { CrosswordCell } from "./cell";

export type CellRef = HTMLInputElement | null;
type GridRef = Array<Array<CellRef>>;

export function CrosswordGrid() {
  const solutionGrid = useGameStore((state) => state.solutionGrid);
  const clues = useGameStore((state) => state.clues);

  // Initialize gridRef with an array of arrays.
  const gridRef = React.useRef<GridRef>(
    Array.from({ length: solutionGrid.length }, () =>
      Array.from({ length: solutionGrid[0]!.length }, () => null),
    ),
  );

  // TODO: I think this can be optimized.
  const getCellNumber = (rowIdx: number, colIdx: number) => {
    // If there is no cell to the left or above the current cell,
    // the current cell is the first letter of an Across or Down clue.
    // It needs to be numbered on the grid.
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

  const attachRefToCell = (elem: CellRef, row: number, col: number) => {
    if (elem && !gridRef.current[row]?.[col]) {
      gridRef.current[row]![col] = elem;
    }
  };

  React.useEffect(() => {
    console.log(gridRef.current);
  }, []);

  return (
    <div className={`grid h-full grid-cols-15 gap-px`}>
      {solutionGrid.map((row, rowIdx) =>
        row.map((solution, colIdx) => {
          const cellNumber = getCellNumber(rowIdx, colIdx);

          if (solution !== null) {
            return (
              <CrosswordCell
                id={`${rowIdx}::${colIdx}`}
                ref={(elem) => attachRefToCell(elem, rowIdx, colIdx)}
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
