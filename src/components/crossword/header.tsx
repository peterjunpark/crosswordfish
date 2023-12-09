"use client";

import Link from "next/link";
import { useGameContext } from "@/app/state/context";
import { cn } from "@/lib/utils";

type CrosswordHeaderProps = {
  outerLayoutClass: string;
};

export function CrosswordHeader({ outerLayoutClass }: CrosswordHeaderProps) {
  const focusedClueNumber = useGameContext((state) => state.focusedClueNumber);
  const focusedClueText = useGameContext((state) => state.focusedClueText);
  const focusedDirection = useGameContext((state) => state.focusedDirection);

  return (
    <header className={cn(outerLayoutClass, "bg-background")}>
      <div
        className={cn(
          "flex flex-row-reverse justify-between text-2xl font-semibold tracking-tighter",
          "md:text-5xl",
        )}
      >
        <h1 className="text-brand hover:text-brand-foreground">
          <Link href="/">crosswordfish</Link>
        </h1>
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
