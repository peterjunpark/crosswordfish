"use client";

import { cn } from "@/lib/utils";
import { useGameContext } from "@/app/state/context";
import { Wordmark } from "./atoms/wordmark";

type CrosswordHeaderProps = {
  outerLayoutClass: string;
};

export function CrosswordHeader({ outerLayoutClass }: CrosswordHeaderProps) {
  const focus = useGameContext((state) => state.focus);
  let focusedClueNumber;
  let focusedClueText;
  let focusedDirection;

  if (focus) {
    focusedDirection = focus.direction;
    focusedClueNumber = focus.clueNumber;
    focusedClueText = focus.clueText;
  }

  return (
    <header className={cn(outerLayoutClass, "bg-background")}>
      <div
        className={cn(
          "flex flex-row-reverse justify-between text-2xl font-semibold tracking-tighter",
          "md:text-5xl",
        )}
      >
        <Wordmark />
        <span className="text-muted-foreground">
          {focusedClueNumber}&nbsp;{focusedDirection}{" "}
        </span>
      </div>
      <span
        className={cn(
          "line-clamp-1 text-sm font-semibold tracking-tight",
          "md:text-3xl md:font-semibold",
        )}
      >
        {focusedClueText}
      </span>
    </header>
  );
}
