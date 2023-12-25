import { GameSelector } from "@/components/crossword/game-selector";
import { Wordmark } from "@/components/crossword/atoms/wordmark";
import { ThemeToggle } from "@/components/theme/toggle";

export default function HomePage() {
  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center">
      <Wordmark className="py-6 text-4xl" />
      <GameSelector />
      <ThemeToggle className="absolute right-3 top-3" />
    </main>
  );
}
