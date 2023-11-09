"use client";

import React from "react";
import { useStore } from "@/lib/store";
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

export function CrosswordCell({
  row,
  col,
  solution,
  number,
  id,
  className,
}: CellProps) {
  const { workingGrid, setCellValue } = useStore();
  const cellValue = workingGrid[row]![col]!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value.replace(/[^a-z]/i, "");

    setCellValue(result.toUpperCase(), row, col);
  };

  return (
    <div className="relative">
      <label className="absolute left-[0.17rem] top-[0.17rem] font-mono text-xs opacity-70">
        {number}
      </label>
      <Input
        value={cellValue}
        onChange={handleChange}
        id={id}
        className={cn(
          "aspect-square h-10 w-fit text-center font-mono text-lg caret-transparent focus:border-accent-foreground",
          className,
          { "bg-red-200": cellValue === solution },
        )}
        maxLength={1}
        type="text"
        autoComplete="off"
        spellCheck={false}
        tabIndex={-1} // Disable tabbing and implement custom kbd navigation on the grid.
      />
    </div>
  );
}
