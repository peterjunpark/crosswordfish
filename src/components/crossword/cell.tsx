"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

type ClueData = {
  direction: "across" | "down";
  number: number;
  clue: string;
  coordinates: [number, number][];
};

export type CellData = {
  guess: string;
  answer: string;
} | null;

type CellProps = {
  data: CellData;
  id?: string;
  className?: string;
};

export function CrosswordCell({ data, id, className }: CellProps) {
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
        "aspect-square h-12 w-fit text-center font-mono text-lg caret-transparent focus:border-accent-foreground",
        className,
      )}
      maxLength={1}
      type="text"
      autoComplete="off"
      spellCheck={false}
    />
  );
}
