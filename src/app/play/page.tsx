import { CrosswordGrid } from "@/components/crossword/grid";
import { CrosswordMenubar } from "@/components/crossword/menubar";
import { CrosswordClues } from "@/components/crossword/clues";
import { DUMMY_clues, DUMMY_grid } from "@/___tests___/dummy-data/";

export default function PlayPage() {
  return (
    <main className="flex h-full w-full flex-col items-center">
      <CrosswordMenubar />
      <div className="flex w-full justify-around">
        <CrosswordGrid grid={DUMMY_grid} />
        <CrosswordClues clues={DUMMY_clues} />
      </div>
    </main>
  );
}
