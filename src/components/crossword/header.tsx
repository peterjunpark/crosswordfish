"use client";

import Link from "next/link";
import { useGameStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type CrosswordHeaderProps = {
  outerLayoutClass: string;
};

export function CrosswordHeader({ outerLayoutClass }: CrosswordHeaderProps) {
  const focus = useGameStore((state) => state.focus);

  return (
    <header className={cn(outerLayoutClass, ["md:gap-2 md:p-6 md:pb-3"])}>
      <div
        className={cn(
          "flex flex-row-reverse justify-between text-2xl font-semibold tracking-tighter",
          ["md:text-5xl"],
        )}
      >
        <h1 className="text-brand hover:text-brand-foreground">
          <Link href="/">crosswordfish</Link>
        </h1>
        <span className="text-muted-foreground">
          {focus.clueNumber}&nbsp;{focus.direction}{" "}
        </span>
      </div>
      <span
        className={cn("text-sm font-semibold tracking-tight", [
          "md:line-clamp-1 md:text-3xl md:font-semibold",
        ])}
      >
        {focus.clueText}
      </span>
    </header>
  );
}
