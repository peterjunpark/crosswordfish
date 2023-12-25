"use client";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useGameContext } from "@/app/state/context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
            Your vocabulary and trivia skills are unmatched. Play again?
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
