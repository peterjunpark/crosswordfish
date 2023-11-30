import { CrosswordGrid } from "@/components/crossword/grid";
import { CrosswordHeader } from "@/components/crossword/header";
import { CrosswordClues } from "@/components/crossword/clues";
import { CrosswordOptions } from "@/components/crossword/options";
import { clsx } from "clsx"; // clsx doesn't do anything here...
// I'm only using it to visually organize tw classes at different breakpoints.

export default function PlayPage() {
  // outer/innerLayoutClass props are only to colocate layout classes.
  return (
    <main className={clsx("w-full pb-3", ["md:h-screen"])}>
      <CrosswordHeader
        outerLayoutClass={clsx("flex w-full flex-col p-2", [
          "md:p-6, md:h-fit md:pb-3",
        ])}
      />
      <div
        className={clsx("flex h-5/6 w-full flex-col justify-center gap-3", [
          "md:flex-row",
        ])}
      >
        <CrosswordGrid
          outerLayoutClass="aspect-square h-auto w-full landscape:h-full landscape:w-auto"
          innerLayoutClass="aspect-square"
        />
        <div className={clsx("flex w-auto flex-col", ["md:h-full"])}>
          <CrosswordClues
            outerLayoutClass={clsx(
              "flex h-5/6",
              ["md:w-[10rem]"],
              ["lg:w-[15rem]"],
              ["xl:w-[34rem]"],
              ["2xl:w-[50rem]"],
            )}
            innerLayoutClass="h-full w-1/2"
          />
          {/* <CrosswordOptions outerLayoutClass="flex h-1/6 w-fit flex-col items-start p-6" /> */}
        </div>
      </div>
    </main>
  );
}
