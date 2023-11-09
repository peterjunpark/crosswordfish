"use client";

import React from "react";
import { useStore } from "@/lib/store";
import { stringifyRowCol } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export function CrosswordClues() {
  const { clues } = useStore();

  return (
    <div className="flex">
      {/* ACROSS */}
      <div>
        <h3 className="pl-2 font-semibold tracking-tight">across</h3>
        <ScrollArea className="h-96 w-64 rounded-md border">
          <ol className="p-4">
            {clues.across.map((clue, idx) => (
              <React.Fragment key={stringifyRowCol(clue.row, clue.cols)}>
                <li
                  id={stringifyRowCol(clue.row, clue.cols)}
                  className="flex gap-1 text-sm"
                >
                  <span className="font-bold opacity-70">{clue.number}.</span>
                  <span>{clue.text}</span>
                </li>
                {idx !== clues.across.length - 1 && (
                  <Separator className="my-2 w-full" />
                )}
              </React.Fragment>
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
              <React.Fragment key={stringifyRowCol(clue.rows, clue.col)}>
                <li
                  id={stringifyRowCol(clue.rows, clue.col)}
                  className="flex gap-1 text-sm"
                >
                  <span className="font-bold opacity-70">{clue.number}.</span>
                  <span>{clue.text}</span>
                </li>
                {idx !== clues.down.length - 1 && (
                  <Separator className="my-2 w-full" />
                )}
              </React.Fragment>
            ))}
          </ol>
        </ScrollArea>
      </div>
    </div>
  );
}
