import { CrosswordCell } from "./cell";
import { stringifyRowCol } from "@/lib/utils";
import type { Grid } from "@/lib/types";
// import { atom, useAtom } from "jotai";

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
