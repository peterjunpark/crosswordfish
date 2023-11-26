"use client";

import React from "react";
import { useGameStore } from "@/lib/store";
import { CrosswordCell } from "./cell";
import type { AcrossClue, DownClue } from "@/lib/types";

type CellRef = HTMLInputElement | null;
type GridRef = Array<Array<CellRef>>;

export function CrosswordGrid() {
  const solutionGrid = useGameStore((state) => state.solutionGrid);
  const clues = useGameStore((state) => state.clues);

  const focus = useGameStore((state) => state.focus);
  const setFocusByKbd = useGameStore((state) => state.setFocusByKbd);

  // Initialize gridRef with an array of arrays.
  const gridRef = React.useRef<GridRef>(
    Array.from({ length: solutionGrid.length }, () =>
      Array.from({ length: solutionGrid[0]!.length }, () => null),
    ),
  );

  // gridRef.current will be a matrix of refs to each cell in the grid.
  const attachRefToCell = (elem: CellRef, row: number, col: number) => {
    if (elem && !gridRef.current[row]?.[col]) {
      gridRef.current[row]![col] = elem;
    }
  };

  // TODO: I think this can be optimized.
  const getCellNumber = (rowIdx: number, colIdx: number) => {
    // If there is no cell to the left or above the current cell,
    // the current cell is the first letter of an Across or Down clue.
    // It needs to be numbered on the grid.
    let clue: AcrossClue | DownClue | undefined;

    if (!solutionGrid[rowIdx]?.[colIdx - 1]) {
      clue = clues.across.find(
        (element) => element.row === rowIdx && element.cols[0] === colIdx,
      );
    } else if (!solutionGrid[rowIdx - 1]?.[colIdx]) {
      clue = clues.down.find(
        (element) => element.col === colIdx && element.rows[0] === rowIdx,
      );
    }
    return clue?.number;
  };

  // Focus and select the cell in the DOM when focus state changes.
  React.useEffect(() => {
    gridRef.current[focus.row]![focus.col]?.focus();
    gridRef.current[focus.row]![focus.col]?.select();
  }, [focus, clues]);

  // Handle kbd navigation.
  React.useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      setFocusByKbd(e.key);
      gridRef.current[focus.row]![focus.col]?.select();

      if (e.key === "Tab") {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [setFocusByKbd, focus]);

  return (
    <div className={`grid h-full w-1/2 min-w-fit grid-cols-15 gap-px`}>
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
                className="aspect-square w-full rounded-sm bg-muted"
                key={`${rowIdx}::${colIdx}`}
              />
            );
          }
        }),
      )}
    </div>
  );
}
