"use client";

import React from "react";
import { useGameStore } from "@/lib/store";
import { Button } from "../../ui/button";

export function FocusStateLogger() {
  const focusState = useGameStore((state) => state.focus);

  return (
    <Button
      variant="outline"
      onClick={() => {
        console.log({ focusState });
      }}
    >
      Log focus
    </Button>
  );
}

export function GameStateLogger() {
  const gameState = useGameStore((state) => state.game);

  return (
    <Button
      variant="outline"
      onClick={() => {
        console.log({ gameState });
      }}
    >
      Log game state
    </Button>
  );
}
