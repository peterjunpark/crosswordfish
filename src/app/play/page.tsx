import { CrosswordGrid } from "@/components/crossword/grid";
import { CrosswordMenubar } from "@/components/crossword/menubar";
import { CrosswordClues } from "@/components/crossword/clues";
import { testClues } from "@/___tests___/clues-data";
import { testGrid } from "@/___tests___/grid-data";

export default function PlayPage() {
  return (
    <main className="flex h-full w-full flex-col items-center">
      <CrosswordMenubar />
      <div className="flex w-full justify-around">
        <CrosswordGrid grid={testGrid} />
        {/* <CrosswordClues data={testClues} /> */}
      </div>
    </main>
  );
}
