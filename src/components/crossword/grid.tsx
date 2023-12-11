"use client";

import { useEffect, useRef } from "react";
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
  const focus = useGameContext((state) => state.focus);
  const setFocusByClue = useGameContext((state) => state.setFocusByClue);
  const setFocusByKbd = useGameContext((state) => state.setFocusByKbd);
  // Game state
  // const isStarted = useGameStore((state) => state.game.isStarted);
  // const setIsStarted = useGameStore((state) => state.setGameIsStarted);

  // Initialize gridRef with an array of arrays.
  const gridRef = useRef<GridRef>(
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

  const getCellNumber = (rowIdx: number, colIdx: number) => {
    const cellAbove = typeof initGrid[rowIdx - 1]?.[colIdx] === "string";
    const cellToLeft = typeof initGrid[rowIdx]?.[colIdx - 1] === "string";

    if (cellAbove && cellToLeft) return null;

    if (!cellToLeft) {
      return (
        clues.across.find(
          (element) => element.row === rowIdx && element.cols[0] === colIdx,
        )?.number ?? null
      );
    }

    return (
      clues.down.find(
        (element) => element.col === colIdx && element.rows[0] === rowIdx,
      )?.number ?? null
    );
  };

  // Focus and select the cell in the DOM when focus state changes.
  useEffect(() => {
    if (focus) {
      const focusedCell = gridRef.current[focus.row]![focus.col]!;
      focusedCell.focus();
      focusedCell.select();
    } else {
      // This handle initial state (i.e., where focus is null)
      setFocusByClue(1, "across", "first");
    }
  }, [focus, clues, setFocusByClue]);

  // Handle kbd navigation.
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      setFocusByKbd(e.key);
      if (focus) {
        gridRef.current[focus.row]![focus.col]?.select();
      }

      if (e.key === "Tab") e.preventDefault();
    };

    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [focus, setFocusByKbd]);

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
