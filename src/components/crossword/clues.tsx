"use client";

import { Fragment } from "react";
import { useGameContext } from "@/app/state/context";
import type { GameState, GameActions } from "@/app/state/store";
import type { Focus } from "@/app/state/slices/focus";
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
  const clues = useGameContext((state) => state.clues);
  const focus = useGameContext((state) => state.focus);
  let focusedClueNumber;
  let focusedDirection;
  const setFocusByClue = useGameContext((state) => state.setFocusByClue);

  if (focus) {
    focusedClueNumber = focus.clueNumber;
    focusedDirection = focus.direction;
  }

  return (
    <div className={cn(outerLayoutClass)}>
      <CluesPanel
        direction="across"
        cluesList={clues.across}
        {...{
          focusedClueNumber,
          focusedDirection,
          setFocusByClue,
          innerLayoutClass,
        }}
      />
      {/* DOWN */}
      <CluesPanel
        direction="down"
        cluesList={clues.down}
        {...{
          focusedClueNumber,
          focusedDirection,
          setFocusByClue,
          innerLayoutClass,
        }}
      />
    </div>
  );
}

type CluesPanelProps = {
  direction: Focus["direction"];
  cluesList: GameState["clues"]["across"] | GameState["clues"]["down"];
  focusedClueNumber: Focus["clueNumber"] | undefined;
  focusedDirection: Focus["direction"] | undefined;
  setFocusByClue: GameActions["setFocusByClue"];
  innerLayoutClass: string;
};

function CluesPanel({
  direction,
  cluesList,
  focusedClueNumber,
  focusedDirection,
  setFocusByClue,
  innerLayoutClass,
}: CluesPanelProps) {
  return (
    <div className={innerLayoutClass}>
      <h3 className="pl-3 font-semibold tracking-tight">{direction}</h3>
      <ScrollArea className="max-h-full w-full shrink rounded-md border">
        {cluesList.map((clue, idx) => (
          <Fragment key={`${clue.number}-${direction}`}>
            <Button
              variant="ghost"
              className={cn(
                "h-fit w-full items-start justify-start gap-1 whitespace-normal rounded-none text-start font-normal",
                "md:text-[0.9rem]",
                {
                  "bg-accent lg:text-base":
                    focusedClueNumber === clue.number &&
                    focusedDirection === direction,
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
          </Fragment>
        ))}
      </ScrollArea>
    </div>
  );
}
