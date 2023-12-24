"use client";

import React from "react";
import { useGameContext } from "@/app/state/context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type RevealButtonProps = {
  className?: string;
};

export function RevealButton({ className }: RevealButtonProps) {
  const revealWord = useGameContext((state) => state.revealWord);
  const revealGrid = useGameContext((state) => state.revealGrid);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Reveal</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={revealWord}>Reveal word</DropdownMenuItem>
        <DropdownMenuItem onClick={revealGrid}>Reveal grid</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
