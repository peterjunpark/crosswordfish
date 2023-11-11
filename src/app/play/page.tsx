import { CrosswordGrid } from "@/components/crossword/grid";
import { CrosswordMenubar } from "@/components/crossword/menubar";
import { CrosswordClues } from "@/components/crossword/clues";

export default function PlayPage() {
  return (
    <main className="flex h-full w-full flex-col items-center">
      <CrosswordMenubar />
      <div className="flex h-fit w-full items-center justify-around">
        <CrosswordGrid />
        <CrosswordClues />
      </div>
    </main>
  );
}
