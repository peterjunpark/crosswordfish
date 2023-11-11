"use client";

import { useGameStore } from "@/lib/store";
import { Button } from "../ui/button";

export function CrosswordMenubar() {
  const reset = useGameStore((state) => state.reset);

  return (
    <div className="flex w-full items-center justify-between p-6">
      <div className="flex items-center gap-4">
        <div>
          <h3>
            Timer: <span className="font-bold">00:00:00</span>
          </h3>
        </div>
        <div>
          <h3>
            Score: <span className="font-bold">0</span>
          </h3>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline">Check puzzle</Button>
        <Button variant="outline">Reveal letter</Button>
        <Button onClick={reset} variant="outline">
          Reset puzzle
        </Button>
        <Button onClick={reset} variant="outline" disabled>
          Print
        </Button>
      </div>
    </div>
  );
}
