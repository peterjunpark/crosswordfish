import { CrosswordCell, type CellData } from "./cell";
// import { atom, useAtom } from "jotai";

export type GridData = CellData[][];

type GridProps = {
  data: GridData;
};

// const gridAtom = atom<GridData>([]);

export function CrosswordGrid({ data }: GridProps) {
  return (
    <div className={`grid h-full grid-cols-mon gap-px`}>
      {data.map((row, rowIdx) =>
        row.map((cell, colIdx) => {
          const cellId = `[${rowIdx}, ${colIdx}]`;

          if (cell?.answer) {
            return <CrosswordCell data={cell} id={cellId} key={cellId} />;
          } else {
            return (
              <div
                className="aspect-square w-full rounded-sm bg-muted-foreground"
                key={cellId}
              />
            );
          }
        }),
      )}
    </div>
  );
}
