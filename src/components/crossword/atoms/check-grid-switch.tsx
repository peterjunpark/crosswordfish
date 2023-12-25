import React from "react";
import { useGameContext } from "@/app/state/context";
import { Switch } from "@/components/ui/switch";

export function ShowErrorsSwitch() {
  const showingErrors = useGameContext((state) => state.showingErrors);
  const toggleShowErrors = useGameContext((state) => state.toggleShowErrors);
  return (
    <div className="inline-flex flex-col items-center gap-1 py-2 text-sm font-medium">
      <label htmlFor="show-errors">Show errors</label>
      <Switch
        id="show-errors"
        checked={showingErrors}
        onCheckedChange={toggleShowErrors}
      />
    </div>
  );
}
