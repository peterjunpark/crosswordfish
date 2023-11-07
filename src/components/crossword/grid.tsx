"use client";

import React from "react";
import { atom } from "jotai";
import type { Grid } from "@/lib/types";
import { stringifyRowCol } from "@/lib/utils";
import { CrosswordCell } from "./cell";

type GridProps = {
  grid: Grid;
};

export function CrosswordGrid({ grid }: GridProps) {
  return (
    <div className={`grid-cols-15 grid h-full gap-px`}>
      {grid.map((row, rowIdx) =>
        row.map((cell, colIdx) => {
          const cellId = stringifyRowCol(rowIdx, colIdx);

          if (cell !== null) {
            return <CrosswordCell data={cell} id={cellId} key={cellId} />;
          } else {
            return (
              <div
                className="aspect-square w-full rounded-sm bg-muted-foreground"
                id={cellId}
                key={cellId}
              />
            );
          }
        }),
      )}
    </div>
  );
}
