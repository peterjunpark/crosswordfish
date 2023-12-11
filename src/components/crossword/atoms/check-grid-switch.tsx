import React from "react";
import { useGameContext } from "@/app/state/context";
import { Switch } from "@/components/ui/switch";

export function CheckGridSwitch() {
  const gameIsChecking = useGameContext((state) => state.isChecking);
  const toggleIsChecking = useGameContext(
    (state) => state.toggleGameIsChecking,
  );
  return (
    <div className="inline-flex flex-col items-center gap-1 py-2 text-sm font-medium">
      <label htmlFor="check-grid">Check&nbsp;grid</label>
      <Switch
        id="check-grid"
        checked={gameIsChecking}
        onCheckedChange={toggleIsChecking}
      />
    </div>
  );
}
