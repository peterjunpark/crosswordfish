"use client";

import React from "react";
import { useGameStore } from "@/lib/store";
import { type CellValue } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

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
    const isFocusedCell = focus.row === row && focus.col === col;
    const isFocusedWord =
      focus.direction === "across"
        ? focus.row === row && focus.word.includes(col)
        : focus.direction === "down"
        ? focus.col === col && focus.word.includes(row)
        : false;

    // Update state when the cell is focused.
    const handleFocus = () => {
      setFocusByCell(row, col, focus.direction);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^a-z]/i, "");

      setCellValue(value.toUpperCase(), row, col);

      if (value) {
        focus.direction === "across"
          ? setFocusByCell(row, col + 1, "across")
          : setFocusByCell(row + 1, col, focus.direction);
      }
    };

    React.useEffect(() => {
      const backspace = (e: KeyboardEvent) => {
        if (e.key === "Backspace" && !cellValue && isFocusedCell) {
          console.log("hi");
        }
      };

      document.addEventListener("keydown", backspace);
      return () => document.removeEventListener("keydown", backspace);
    }, [cellValue, isFocusedCell]);

    return (
      <div className="relative">
        <label className="absolute left-[0.17rem] top-[0.17rem] font-mono text-xs opacity-70">
          {number}
        </label>
        <Input
          ref={ref}
          value={cellValue}
          onChange={handleChange}
          onFocus={handleFocus}
          id={id}
          className={cn(
            "aspect-square h-10 w-fit cursor-pointer select-none text-center font-mono text-lg caret-transparent focus:border-brand-foreground focus-visible:ring-brand-foreground",
            className,
            { "border-2 border-brand": isFocusedWord },
            { "bg-red-200": cellValue === solution },
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
