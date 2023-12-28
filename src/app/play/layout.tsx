import { TooltipProvider } from "@/components/ui/tooltip";
import { GameProvider } from "../state/context";
import { Crossword } from "@/server/crossword";

export const revalidate = 0;

export const maxDuration = 300;

export default async function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const crossword = new Crossword(15, 15, "freeform");
  await crossword.writeGrid();
  await crossword.writeClues();
  const { grid, clues, rules } = crossword;

  return (
    <GameProvider {...{ grid, clues, rules }}>
      <TooltipProvider>{children}</TooltipProvider>
    </GameProvider>
  );
}
