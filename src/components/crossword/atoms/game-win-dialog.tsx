"use client";

import Link from "next/link";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useGameContext } from "@/app/state/context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function GameWinDialog() {
  const { width, height } = useWindowSize();
  const isSolved = useGameContext((state) => state.isSolved);

  if (isSolved) {
    return (
      <>
        <Confetti width={width} height={height} />
        <Dialog defaultOpen>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>You win!</DialogTitle>
            </DialogHeader>
            Your vocabulary and trivia skills are unmatched.
            <DialogFooter>
              <Link href="/">
                <Button>Play again?</Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
