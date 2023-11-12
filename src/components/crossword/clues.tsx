"use client";

import React from "react";
import { useGameStore } from "@/lib/store";
import { cn, stringifyRowCol } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function CrosswordClues() {
  const clues = useGameStore((state) => state.clues);
  const focus = useGameStore((state) => state.focus);
  const setFocusByClue = useGameStore((state) => state.setFocusByClue);

  return (
    <div className="flex">
      {/* ACROSS */}
      <div>
        <h3 className="pl-2 font-semibold tracking-tight">across</h3>
        <ScrollArea className="h-96 w-64 rounded-md border">
          {clues.across.map((clue, idx) => (
            <React.Fragment key={stringifyRowCol(clue.row, clue.cols)}>
              <Button
                variant="ghost"
                className={cn(
                  "flex h-fit w-full items-start justify-start gap-1 whitespace-normal rounded-none text-start text-sm font-normal",
                  {
                    "text-md bg-accent":
                      focus.clueNumber === clue.number &&
                      focus.direction === "across",
                  },
                )}
                onClick={() => {
                  setFocusByClue(clue.number, "across");
                }}
                tabIndex={-1}
              >
                <span className="font-bold opacity-70">{clue.number}.</span>
                <span>{clue.text}</span>
              </Button>
              {idx !== clues.across.length - 1 && (
                <Separator className="w-full" />
              )}
            </React.Fragment>
          ))}
        </ScrollArea>
      </div>
      {/* DOWN */}
      <div>
        <h3 className="pl-2 font-semibold tracking-tight">down</h3>
        <ScrollArea className="h-96 w-64 rounded-md border">
          {clues.down.map((clue, idx) => (
            <React.Fragment key={stringifyRowCol(clue.rows, clue.col)}>
              <Button
                variant="ghost"
                className={cn(
                  "flex h-fit w-full items-start justify-start gap-1 whitespace-normal rounded-none text-start text-sm font-normal",
                  {
                    "text-md bg-accent":
                      focus.clueNumber === clue.number &&
                      focus.direction === "down",
                  },
                )}
                onClick={() => {
                  setFocusByClue(clue.number, "down");
                }}
                tabIndex={-1}
              >
                <span className="font-bold opacity-70">{clue.number}.</span>
                <span>{clue.text}</span>
              </Button>
              {idx !== clues.down.length - 1 && (
                <Separator className="w-full" />
              )}
            </React.Fragment>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
