"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "./theme/toggle";

export function Sidebar() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="flex h-full flex-row-reverse rounded-r-md bg-card shadow-md shadow-muted-foreground"
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="group h-full rounded-l-none py-6">
          <div className="flex h-full flex-col items-center justify-between">
            <h1 className="text-orientation-vertical-rl text-4xl font-semibold lowercase tracking-tight">
              Crosswordfish
            </h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <CaretSortIcon
                  className={cn("rotate-90 scale-125 group-hover:scale-150", {
                    "scale-150": open,
                  })}
                  aria-hidden="true"
                />
              </TooltipTrigger>
              <TooltipContent>⌘ + b</TooltipContent>
            </Tooltip>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex-col">
        Yes. Free to use for personal and commercial projects. No attribution
        required.
        <ThemeToggle />
      </CollapsibleContent>
    </Collapsible>
  );
}
