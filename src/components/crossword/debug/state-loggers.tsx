"use client";

import React from "react";
import { useGameContext } from "@/app/state/context";
import { Button } from "../../ui/button";

export function FocusStateLogger() {
  const focus = useGameContext((state) => state.focus);

  return (
    <Button
      variant="outline"
      onClick={() => {
        console.log({ focusState: focus });
      }}
    >
      Log focus
    </Button>
  );
}

export function GameInstanceStateLogger() {
  const gameIsStarted = useGameContext((state) => state.isStarted);
  const gameIsChecking = useGameContext((state) => state.isChecking);

  return (
    <Button
      variant="outline"
      onClick={() => {
        console.log({ gameInstanceState: { gameIsStarted, gameIsChecking } });
      }}
    >
      Log game state
    </Button>
  );
}

export function GridStateLogger() {
  const initGrid = useGameContext((state) => state.initGrid);
  const workingGrid = useGameContext((state) => state.workingGrid);

  return (
    <Button
      variant="outline"
      onClick={() => {
        console.log({ gridState: { initGrid, workingGrid } });
      }}
    >
      Log grid state
    </Button>
  );
}
