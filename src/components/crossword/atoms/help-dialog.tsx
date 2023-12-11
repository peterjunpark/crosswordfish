"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

import React from "react";

export function HelpDialog() {
  const keyboardShortcuts = [
    { key: "Spacebar", desc: "Switch clue direction" },
    { key: "Tab / . (period)", desc: "Move to next clue" },
    { key: ", (comma)", desc: "Move to previous clue" },
    {
      key: "Backspace",
      desc: "Delete / move to previous cell",
    },
    { key: "Arrow keys", desc: "Move up / right / down / left" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <QuestionMarkIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>
            ... for an improved crosswording experience.
          </DialogDescription>
        </DialogHeader>
        <table className="text-sm">
          <tbody>
            {keyboardShortcuts.map((value) => (
              <React.Fragment key={value.key}>
                <tr className="border-b">
                  <th className="py-2 pr-4 text-right">{value.key}</th>
                  <td>{value.desc}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
}
