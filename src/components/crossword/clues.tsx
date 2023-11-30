"use client";

import React from "react";
import { useGameStore, type State, type Action } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type CrosswordCluesProps = {
  outerLayoutClass: string;
  innerLayoutClass: string;
};

export function CrosswordClues({
  outerLayoutClass,
  innerLayoutClass,
}: CrosswordCluesProps) {
  const clues = useGameStore((state) => state.clues);
  const focus = useGameStore((state) => state.focus);
  const setFocusByClue = useGameStore((state) => state.setFocusByClue);

  return (
    <div className={cn(outerLayoutClass)}>
      <CluesPanel
        direction="across"
        cluesList={clues.across}
        {...{ focus, setFocusByClue, innerLayoutClass }}
      />
      {/* DOWN */}
      <CluesPanel
        direction="down"
        cluesList={clues.down}
        {...{ focus, setFocusByClue, innerLayoutClass }}
      />
    </div>
  );
}

type CluesPanelProps = {
  direction: State["focus"]["direction"];
  cluesList: State["clues"]["across"] | State["clues"]["down"];
  focus: State["focus"];
  setFocusByClue: Action["setFocusByClue"];
  innerLayoutClass: string;
};

function CluesPanel({
  direction,
  cluesList,
  focus,
  setFocusByClue,
  innerLayoutClass,
}: CluesPanelProps) {
  return (
    <div className={innerLayoutClass}>
      <h3 className="pl-3 font-semibold tracking-tight">{direction}</h3>
      <ScrollArea className="h-full w-full shrink rounded-md border">
        {cluesList.map((clue, idx) => (
          <React.Fragment key={`${clue.number}-${direction}`}>
            <Button
              variant="ghost"
              className={cn(
                "h-fit w-full items-start justify-start gap-1 whitespace-normal rounded-none text-start font-normal",
                "md:text-[0.9rem]",
                {
                  "bg-accent lg:text-base":
                    focus.clueNumber === clue.number &&
                    focus.direction === direction,
                },
              )}
              onClick={() => {
                setFocusByClue(clue.number, direction);
              }}
            >
              <span className="font-bold opacity-70">{clue.number}.</span>
              <span className="w-fit">{clue.text}</span>
            </Button>
            {idx !== cluesList.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </ScrollArea>
    </div>
  );
}
