"use client";

import React from "react";
import { useGameStore } from "@/lib/store";
import { Stopwatch } from "./atoms/stopwatch";
import { ThemeToggle } from "../theme/toggle";
import { Button } from "../ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { FocusStateLogger, GameStateLogger } from "./debug/state-loggers";

export function CrosswordOptions() {
  const reset = useGameStore((state) => state.reset);

  const [resetConfirm, setResetConfirm] = React.useState(false);

  const handleReset = () => {
    if (resetConfirm) {
      reset();
      setResetConfirm(false);
    } else {
      setResetConfirm(true);
    }
  };

  React.useEffect(() => {
    if (resetConfirm) {
      const timeout = setTimeout(() => {
        setResetConfirm(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [resetConfirm]);

  return (
    <div className="flex w-full items-center justify-between p-6">
      <div className="flex items-center gap-4">
        <Stopwatch />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={handleReset}
          variant={resetConfirm ? "destructive" : "outline"}
          className="w-24"
        >
          {resetConfirm ? "You sure?" : "Reset"}
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" className="w-24 text-muted-foreground">
              Print
            </Button>
          </TooltipTrigger>
          <TooltipContent>Coming soon!</TooltipContent>
        </Tooltip>
        <ThemeToggle />
      </div>
      <>
        <FocusStateLogger />
        <GameStateLogger />
      </>
    </div>
  );
}
