"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import type { Rules } from "@/lib/types";

export function GameSelector() {
  const [rules, setRules] = useState<Rules>("freeform");
  const handleSelect = (value: Rules) => {
    setRules(value);
  };

  return (
    <div className="flex items-center gap-6">
      <Select value={rules} onValueChange={handleSelect}>
        <SelectTrigger className="w-40">
          {" "}
          <SelectValue aria-label={rules} />{" "}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Crossword ruleset</SelectLabel>
            <SelectItem value="freeform" disabled>
              Freeform
            </SelectItem>
            <SelectItem value="american" disabled>
              American (coming soon)
            </SelectItem>
            <SelectItem value="cryptic" disabled>
              Cryptic (coming soon)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Link href="/play">
        <Button size="lg">Play</Button>
      </Link>
    </div>
  );
}
