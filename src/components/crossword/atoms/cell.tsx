"use client";

import React from "react";
import { useGameContext } from "@/app/state/context";
import { type CellValue } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type CellProps = {
  solution: CellValue;
  row: number;
  col: number;
  number?: number;
  id?: string;
  innerLayoutClass: string;
};

export const CrosswordCell = React.forwardRef<HTMLInputElement, CellProps>(
  function CrosswordCell(
    { row, col, solution, number, id, innerLayoutClass: layoutClass },
    ref,
  ) {
    const workingGrid = useGameContext((state) => state.workingGrid);
    const setCellValue = useGameContext((state) => state.setCellValue);
    const cellValue = workingGrid[row]![col]!;

    const focusedDirection = useGameContext((state) => state.focusedDirection);
    const focusedRow = useGameContext((state) => state.focusedRow);
    const focusedCol = useGameContext((state) => state.focusedCol);
    const focusedWord = useGameContext((state) => state.focusedWord);
    const setFocusByCell = useGameContext((state) => state.setFocusByCell);
    const setFocusToNextCell = useGameContext(
      (state) => state.setFocusToNextCell,
    );
    const toggleFocusDirection = useGameContext(
      (state) => state.toggleFocusDirection,
    );
    const isFocusedCell = focusedRow === row && focusedCol === col;
    const isFocusedWord =
      focusedDirection === "across"
        ? focusedRow === row && focusedWord.includes(col)
        : focusedDirection === "down"
        ? focusedCol === col && focusedWord.includes(row)
        : false;

    const gameIsChecking = useGameContext((state) => state.isChecking);

    // Update state when the cell is focused.
    const handleFocus = () => {
      setFocusByCell(row, col, focusedDirection);
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
      <div className={cn(layoutClass, "relative")}>
        <label className="absolute left-[0.17rem] top-[0.13rem] hidden select-none font-mono text-xs opacity-70 md:inline">
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
            "h-full cursor-pointer select-all border bg-background p-0 text-center font-mono caret-transparent selection:bg-opacity-0 focus:border-brand-foreground focus-visible:ring-brand-foreground",
            "lg:text-lg",
            "xl:text-xl",
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
