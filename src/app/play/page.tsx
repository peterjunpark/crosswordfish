import { CrosswordGrid } from "@/components/crossword/grid";
import { CrosswordHeader } from "@/components/crossword/header";
import { CrosswordClues } from "@/components/crossword/clues";
import { CrosswordOptions } from "@/components/crossword/options";

export default function PlayPage() {
  return (
    <main className="flex h-full w-full flex-col items-center">
      <CrosswordHeader />
      <div className="flex h-fit w-full items-center justify-around">
        <CrosswordGrid />
        <div className="flex h-full flex-col">
          <CrosswordClues />
          <CrosswordOptions />
        </div>
      </div>
    </main>
  );
}
