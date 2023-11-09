"use client";

import React from "react";
import type { CellValue } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

type CellProps = {
  data: CellValue | "";
  number?: number;
  id?: string;
  className?: string;
};

export function CrosswordCell({
  data: cellAnswer,
  number,
  id,
  className,
}: CellProps) {
  const [cellValue, setCellValue] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value.replace(/[^a-z]/i, "");

    setCellValue(result.toUpperCase());
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
          { "bg-red-200": cellValue === cellAnswer },
        )}
        maxLength={1}
        type="text"
        autoComplete="off"
        spellCheck={false}
        tabIndex={-1} // Disable tabbing. Implement custom kbd navigation on the grid.
      />
    </div>
  );
}
