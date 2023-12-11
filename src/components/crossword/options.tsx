"use client";

// import { Stopwatch } from "./atoms/stopwatch";
import { CheckGridSwitch } from "./atoms/check-grid-switch";
import { ResetButton } from "./atoms/reset-button";
import { HelpDialog } from "./atoms/help-dialog";
import { ThemeToggle } from "../theme/toggle";
// import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
// import { FocusStateLogger, GameStateLogger } from "./debug/state-loggers";

type CrosswordOptionsProps = {
  outerLayoutClass: string;
  innerLayoutClass: string;
};

export function CrosswordOptions({
  outerLayoutClass,
  innerLayoutClass,
}: CrosswordOptionsProps) {
  return (
    <div className={outerLayoutClass}>
      <div className={innerLayoutClass}>
        <CheckGridSwitch />
        <ResetButton />
        <HelpDialog />
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
