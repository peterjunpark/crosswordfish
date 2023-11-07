import React from "react";
import { atom } from "jotai";
import type { Clues } from "@/lib/types";
import { stringifyRowCol } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

type CluesProps = {
  clues: Clues;
};

export function CrosswordClues({ clues }: CluesProps) {
  return (
    <div className="flex">
      {/* ACROSS */}
      <div>
        <h3 className="pl-2 font-semibold tracking-tight">across</h3>
        <ScrollArea className="h-96 w-64 rounded-md border">
          <ol className="p-4">
            {clues.across.map((clue, idx) => (
              <>
                <li
                  key={stringifyRowCol(clue.row, clue.cols)}
                  className="flex gap-1 text-sm"
                >
                  <span className="font-bold opacity-70">{clue.number}.</span>
                  <span>{clue.text}</span>
                </li>
                {idx !== clues.across.length - 1 && (
                  <Separator className="my-2 w-full" />
                )}
              </>
            ))}
          </ol>
        </ScrollArea>
      </div>
      {/* DOWN */}
      <div>
        <h3 className="pl-2 font-semibold tracking-tight">down</h3>
        <ScrollArea className="h-96 w-64 rounded-md border">
          <ol className="p-4">
            {clues.down.map((clue, idx) => (
              <>
                <li
                  key={stringifyRowCol(clue.rows, clue.col)}
                  className="flex gap-1 text-sm"
                >
                  <span className="font-bold opacity-70">{clue.number}.</span>
                  <span>{clue.text}</span>
                </li>
                {idx !== clues.down.length - 1 && (
                  <Separator className="my-2 w-full" />
                )}
              </>
            ))}
          </ol>
        </ScrollArea>
      </div>
    </div>
  );
}
