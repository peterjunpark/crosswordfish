"use client";

import { useStore } from "@/lib/store";
import { Button } from "../ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "../ui/select";

export function CrosswordMenubar() {
  // const { reset } = useStore();

  const reset = useStore((state) => state.reset);

  return (
    <div className="flex w-full items-center justify-between p-6">
      <div className="flex items-center gap-4">
        <div>
          <h3>
            Timer: <span className="font-bold">00:00:00</span>
          </h3>
        </div>
        <div>
          <h3>
            Score: <span className="font-bold">0</span>
          </h3>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline">Check puzzle</Button>
        <Button variant="outline">Reveal letter</Button>
        <Button onClick={reset} variant="outline">
          Reset puzzle
        </Button>
      </div>

      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Difficulty</SelectLabel>
            <SelectItem value="mon">Monday</SelectItem>
            <SelectItem value="tue">Tuesday</SelectItem>
            <SelectItem value="wed">Wednesday</SelectItem>
            <SelectItem value="thu">Thursday</SelectItem>
            <SelectItem value="fri">Friday</SelectItem>
            <SelectItem value="sat">Saturday</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
