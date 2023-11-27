"use client";

import React from "react";
import { useGameStore } from "@/lib/store";
import { type CellValue } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Input } from "../../ui/input";

type CellProps = {
  solution: CellValue;
  row: number;
  col: number;
  number?: number;
  id?: string;
  className?: string;
};

export const CrosswordCell = React.forwardRef<HTMLInputElement, CellProps>(
  function CrosswordCell({ row, col, solution, number, id, className }, ref) {
    const workingGrid = useGameStore((state) => state.workingGrid);
    const setCellValue = useGameStore((state) => state.setCellValue);
    const cellValue = workingGrid[row]![col]!;

    const focus = useGameStore((state) => state.focus);
    const setFocusByCell = useGameStore((state) => state.setFocusByCell);
    const setFocusToNextCell = useGameStore(
      (state) => state.setFocusToNextCell,
    );
    const toggleFocusDirection = useGameStore(
      (state) => state.toggleFocusDirection,
    );
    const isFocusedCell = focus.row === row && focus.col === col;
    const isFocusedWord =
      focus.direction === "across"
        ? focus.row === row && focus.word.includes(col)
        : focus.direction === "down"
        ? focus.col === col && focus.word.includes(row)
        : false;

    const gameIsChecking = useGameStore((state) => state.game.isChecking);

    // Update state when the cell is focused.
    const handleFocus = () => {
      setFocusByCell(row, col, focus.direction);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^a-z]/i, "");
      if (value) {
        setCellValue(value.toUpperCase(), row, col);
        setFocusToNextCell(1);
      }
    };

    React.useEffect(() => {
      const backspace = (e: KeyboardEvent) => {
        if (e.key === "Backspace" && isFocusedCell) {
          // If the cell has a value, clear it.
          // Otherwise, move focus to the previous cell.
          cellValue ? setCellValue("", row, col) : setFocusToNextCell(-1);
        }
      };

      document.addEventListener("keydown", backspace);
      return () => document.removeEventListener("keydown", backspace);
    }, [row, col, cellValue, isFocusedCell, setFocusToNextCell, setCellValue]);

    return (
      <div className="relative">
        <label className="absolute left-[0.17rem] top-[0.13rem] select-none font-mono text-xs opacity-70">
          {number}
        </label>
        <Input
          ref={ref}
          value={cellValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onDoubleClick={toggleFocusDirection}
          id={id}
          className={cn(
            "aspect-square h-fit cursor-pointer select-all border-2 text-center font-mono text-lg caret-transparent selection:bg-opacity-0 focus:border-brand-foreground focus-visible:ring-brand-foreground",
            className,
            { "border-2 border-highlight": isFocusedWord },
            {
              "text-destructive-secondary":
                gameIsChecking && cellValue && cellValue !== solution,
            },
          )}
          maxLength={1}
          size={1}
          autoComplete="off"
          spellCheck={false}
          tabIndex={-1} // Disable tabbing and implement custom kbd navigation on the grid.
        />
      </div>
    );
  },
);
