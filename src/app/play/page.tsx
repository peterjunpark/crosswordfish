import { CrosswordGrid, type GridData } from "@/components/crossword/grid";
import { CrosswordMenubar } from "@/components/crossword/menubar";
import { CrosswordClues } from "@/components/crossword/clues";

const data: GridData = [
  [
    null,
    { guess: "h", answer: "o" },
    null,
    null,
    null,
    null,
    { guess: "h", answer: "o" },
    null,
    null,
    null,
  ],
  [
    null,
    { guess: "h", answer: "o" },
    null,
    null,
    null,
    null,
    null,
    { guess: "h", answer: "o" },
    null,
    null,
  ],
  [
    null,
    { guess: "h", answer: "o" },
    null,
    null,
    null,
    null,
    null,
    { guess: "h", answer: "o" },
    null,
    null,
  ],
  [
    null,
    { guess: "h", answer: "o" },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    { guess: "h", answer: "o" },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    { guess: "h", answer: "o" },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    { guess: "h", answer: "o" },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    { guess: "h", answer: "o" },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    { guess: "h", answer: "o" },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    { guess: "h", answer: "o" },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
];

export default function PlayPage() {
  return (
    <main className="flex h-full w-full flex-col items-center">
      <CrosswordMenubar />
      <div className="flex w-full justify-around">
        <CrosswordGrid data={data} />
        <CrosswordClues />
      </div>
    </main>
  );
}
