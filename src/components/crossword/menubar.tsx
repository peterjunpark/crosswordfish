"use client";

import { useGameStore } from "@/lib/store";
import { Button } from "../ui/button";

export function CrosswordMenubar() {
  const reset = useGameStore((state) => state.reset);
  const focus = useGameStore((state) => state.focus);

  return (
    <>
      <div className="flex w-full items-center justify-between p-6">
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
      </div>
      <div className="w-full px-6 text-start">
        <h3>{`Clue: ${focus.clueNumber} ${focus.direction}`}</h3>
      </div>
    </>
  );
}
