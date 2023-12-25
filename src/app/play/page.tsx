"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGameContext } from "@/app/state/context";
import { clsx } from "clsx";
import { CrosswordGrid } from "@/components/crossword/grid";
import { CrosswordHeader } from "@/components/crossword/header";
import { CrosswordClues } from "@/components/crossword/clues";
import { CrosswordOptions } from "@/components/crossword/options";
import { GameWinDialog } from "@/components/crossword/atoms/game-win-dialog";

export default function PlayPage() {
  const router = useRouter();
  const isSolved = useGameContext((state) => state.isSolved);

  // Need to use router.refresh() to clear Next.js' router cache.
  // (Apparently that's the only way to clear it client-side)
  // So a new game can be started when the revisit this route
  useEffect(() => {
    if (isSolved) {
      router.refresh();
    }
  }, [isSolved, router]);

  // outer/innerLayoutClass props are to colocate layout classes.
  return (
    <main className={clsx("w-full pb-3", ["md:h-screen"])}>
      <GameWinDialog />
      <CrosswordHeader
        outerLayoutClass={clsx(
          "sticky top-0 flex w-full flex-col p-2",
          "md:p-6, md:h-fit md:gap-2 md:p-6 md:pb-3 md:pb-3",
        )}
      />
      <div
        className={clsx(
          "flex h-5/6 w-full flex-col justify-center gap-3 px-2",
          "md:flex-row",
        )}
      >
        <CrosswordGrid
          outerLayoutClass={clsx(
            "sticky top-[4.22rem] aspect-square h-auto w-full",
            "landscape:h-full landscape:w-auto",
          )}
          innerLayoutClass="aspect-square"
        />
        <div className="flex w-fit flex-col justify-between">
          <CrosswordClues
            outerLayoutClass={clsx(
              "flex h-[90%] gap-1",
              "md:w-full md:flex-col md:justify-between",
              "lg:w-full",
              "xl:w-full xl:flex-row xl:gap-3",
              "2xl:w-[40rem]",
            )}
            innerLayoutClass={clsx(
              "flex h-full w-1/2 flex-col",
              "md:h-1/2 md:h-[49%] md:w-full",
              "xl:h-full",
            )}
          />
          <CrosswordOptions
            outerLayoutClass={clsx("flex h-auto w-auto gap-3")}
            innerLayoutClass={clsx(
              "flex w-full items-center justify-around gap-3 rounded-md border",
              "md:flex-end md:h-full md:justify-end md:border-none",
              "xl:[&>*]:w-[5.5rem]",
            )}
          />
        </div>
      </div>
    </main>
  );
}
