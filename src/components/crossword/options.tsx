"use client";

import React from "react";
import { useGameStore } from "@/lib/store";
import { cn } from "@/lib/utils";
// import { Stopwatch } from "./atoms/stopwatch";
import { ThemeToggle } from "../theme/toggle";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
// import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
// import { FocusStateLogger, GameStateLogger } from "./debug/state-loggers";

type CrosswordOptionsProps = {
  outerLayoutClass: string;
};

export function CrosswordOptions({ outerLayoutClass }: CrosswordOptionsProps) {
  const reset = useGameStore((state) => state.reset);
  const gameIsChecking = useGameStore((state) => state.game.isChecking);
  const toggleIsChecking = useGameStore((state) => state.toggleGameIsChecking);

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
    <div className={cn(outerLayoutClass, "gap-3 rounded-md border")}>
      <div className="flex items-center gap-4">
        <div className="inline-flex w-32 items-center justify-center gap-2 whitespace-nowrap text-sm font-medium">
          <span>Check&nbsp;grid</span>
          <Switch checked={gameIsChecking} onCheckedChange={toggleIsChecking} />
        </div>
        <Button
          onClick={handleReset}
          variant={resetConfirm ? "destructive" : "outline"}
          className="w-24"
        >
          {resetConfirm ? "You sure?" : "Reset"}
        </Button>

        <ThemeToggle />
      </div>
      {/* <Stopwatch /> */}
      {/* <>
        <FocusStateLogger />
        <GameStateLogger />
      </> */}
    </div>
  );
}
