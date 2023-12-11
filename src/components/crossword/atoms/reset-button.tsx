"use client";

import React from "react";
import { useGameContext } from "@/app/state/context";
import { Button } from "@/components/ui/button";

export function ResetButton() {
  const reset = useGameContext((state) => state.reset);
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
    <Button
      onClick={handleReset}
      variant={resetConfirm ? "destructive" : "outline"}
    >
      {resetConfirm ? "You sure?" : "Reset"}
    </Button>
  );
}
