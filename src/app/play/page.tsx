import { CrosswordGrid } from "@/components/crossword/grid";
import { CrosswordHeader } from "@/components/crossword/header";
import { CrosswordClues } from "@/components/crossword/clues";
import { CrosswordOptions } from "@/components/crossword/options";
import { clsx } from "clsx"; // clsx doesn't do anything here...
// Only using it to visually organize tw classes at different viewport breakpoints.

export default function PlayPage() {
  // outer/innerLayoutClass props are to colocate layout classes.
  return (
    <main className={clsx("w-full pb-3", ["md:h-screen"])}>
      <CrosswordHeader
        outerLayoutClass={clsx(
          "sticky top-0 z-50 flex w-full flex-col p-2",
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
          outerLayoutClass="sticky top-[4.22rem] z-50 aspect-square h-auto w-full landscape:h-full landscape:w-auto"
          innerLayoutClass="aspect-square"
        />
        <CrosswordOptions
          outerLayoutClass={clsx("flex h-auto w-auto gap-3", "md:flex-col")}
          innerLayoutClass={clsx(
            "flex w-full items-center justify-around gap-4 rounded-md border",
            "md:flex-end md:h-full md:flex-col md:justify-end md:border-none",
            "xl:[&>*]:w-[5.5rem]",
          )}
        />
        <CrosswordClues
          outerLayoutClass={clsx(
            "flex h-full gap-1",
            "md:w-[10rem] md:flex-col md:justify-between",
            "lg:w-[20rem]",
            "xl:w-[20rem]",
            "2xl:w-[40rem] 2xl:flex-row 2xl:gap-3",
          )}
          innerLayoutClass={clsx(
            "flex h-full w-1/2 flex-col",
            "md:h-1/2 md:h-[49%] md:w-full",
            "2xl:h-full",
          )}
        />
      </div>
    </main>
  );
}
