"use client";

import { useGameStore } from "@/lib/store";
import { Button } from "../ui/button";

export function CrosswordMenubar() {
  const reset = useGameStore((state) => state.reset);
  const focus = useGameStore((state) => state.focus);

  return (
    <>
      {/* <div className="flex w-full items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="select-none">
              Timer: <span className="font-bold">00:00:00</span>
            </h3>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => {
              console.log({ focus });
            }}
          >
            Log focus
          </Button>
          <Button variant="outline">Reveal letter</Button>
          <Button onClick={reset} variant="outline">
            Reset puzzle
          </Button>
          <Button onClick={reset} variant="outline" disabled>
            Print
          </Button>
        </div>
      </div> */}
      <div className="w-full p-6">
        <span className="text-6xl font-semibold tracking-tighter text-muted-foreground">
          <span>
            {focus.clueNumber} {focus.direction}{" "}
          </span>
        </span>
        <span className="hyphens-auto text-5xl font-semibold tracking-tight">
          {focus.clueText}
        </span>
      </div>
    </>
  );
}
