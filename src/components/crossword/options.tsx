"use client";

import { ShowErrorsSwitch } from "./atoms/check-grid-switch";
import { ResetButton } from "./atoms/reset-button";
import { RevealButton } from "./atoms/reveal-button";
import { HelpDialog } from "./atoms/help-dialog";
import { ThemeToggle } from "../theme/toggle";
// import {
//   FocusStateLogger,
//   GameInstanceStateLogger,
//   GridStateLogger,
// } from "./debug/state-loggers";

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
        <ShowErrorsSwitch />
        <RevealButton />
        <ResetButton />
        <HelpDialog />
        <ThemeToggle />
        {/* <FocusStateLogger />
        <GameInstanceStateLogger />
        <GridStateLogger /> */}
      </div>
    </div>
  );
}
