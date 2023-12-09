"use client";

import React from "react";
import { useGameContext } from "@/app/state/context";
import { cn } from "@/lib/utils";
import { CrosswordCell } from "./atoms/cell";
import type { AcrossClue, DownClue } from "@/lib/types";

type CellRef = HTMLInputElement | null;
type GridRef = Array<Array<CellRef>>;

type CrosswordGridProps = {
  outerLayoutClass: string;
  innerLayoutClass: string;
};

export function CrosswordGrid({
  outerLayoutClass,
  innerLayoutClass,
}: CrosswordGridProps) {
  // Gameboard state
  const initGrid = useGameContext((state) => state.initGrid);
  const clues = useGameContext((state) => state.clues);
  // Player focus state
  const focusedRow = useGameContext((state) => state.focusedRow);
  const focusedCol = useGameContext((state) => state.focusedCol);
  const setFocusByKbd = useGameContext((state) => state.setFocusByKbd);
  // Game state
  // const isStarted = useGameStore((state) => state.game.isStarted);
  // const setIsStarted = useGameStore((state) => state.setGameIsStarted);

  // Initialize gridRef with an array of arrays.
  const gridRef = React.useRef<GridRef>(
    Array.from({ length: initGrid.length }, () =>
      Array.from({ length: initGrid[0]!.length }, () => null),
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

    if (!initGrid[rowIdx]?.[colIdx - 1]) {
      clue = clues.across.find(
        (element) => element.row === rowIdx && element.cols[0] === colIdx,
      );
    } else if (!initGrid[rowIdx - 1]?.[colIdx]) {
      clue = clues.down.find(
        (element) => element.col === colIdx && element.rows[0] === rowIdx,
      );
    }
    return clue?.number;
  };

  // Focus and select the cell in the DOM when focus state changes.
  React.useEffect(() => {
    gridRef.current[focusedRow]![focusedCol]?.focus();
    gridRef.current[focusedRow]![focusedCol]?.select();
  }, [focusedRow, focusedCol, clues]);

  // Handle kbd navigation.
  React.useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      setFocusByKbd(e.key);
      gridRef.current[focusedRow]![focusedCol]?.select();

      if (e.key === "Tab") e.preventDefault();
    };

    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [focusedRow, focusedCol, setFocusByKbd]);

  return (
    <div
      className={cn(outerLayoutClass, "grid grid-cols-15 rounded-md bg-muted", [
        "md:gap-px md:p-1",
      ])}
    >
      {initGrid.map((row, rowIdx) =>
        row.map((solution, colIdx) => {
          const cellNumber = getCellNumber(rowIdx, colIdx);

          if (solution !== null) {
            return (
              <CrosswordCell
                id={`${rowIdx}/${colIdx}`}
                ref={(elem) => attachRefToCell(elem, rowIdx, colIdx)}
                row={rowIdx}
                col={colIdx}
                solution={solution}
                number={cellNumber}
                key={`${rowIdx}/${colIdx}`}
                innerLayoutClass={innerLayoutClass}
              />
            );
          } else {
            return <div key={`${rowIdx}/${colIdx}`} />;
          }
        }),
      )}
    </div>
  );
}
