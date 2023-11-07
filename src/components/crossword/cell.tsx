"use client";

import React from "react";
import { atom, useAtom } from "jotai";
import type { CellValue } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

type CellProps = {
  data: Exclude<CellValue, null>;
  id?: string;
  className?: string;
};

export function CrosswordCell({ data: cellAnswer, id, className }: CellProps) {
  const [cellValue, setCellValue] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value.replace(/[^a-z]/i, "");

    setCellValue(result.toUpperCase());
  };

  return (
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
    />
  );
}
