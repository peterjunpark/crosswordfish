"use client";

import Link from "next/link";
import { useGameStore } from "@/lib/store";

export function CrosswordHeader() {
  const focus = useGameStore((state) => state.focus);

  return (
    <header className="flex w-full flex-col gap-2 p-6 pb-0">
      <div className="flex flex-row-reverse justify-between text-5xl font-semibold tracking-tighter">
        <h1 className="text-brand">
          <Link href="/">crosswordfish</Link>
        </h1>
        <span className="text-muted-foreground">
          {focus.clueNumber}&nbsp;{focus.direction}{" "}
        </span>
      </div>
      <span className="text-3xl font-semibold tracking-tight">
        {focus.clueText}
      </span>
    </header>
  );
}
