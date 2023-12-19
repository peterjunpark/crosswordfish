import Link from "next/link";
import { Wordmark } from "@/components/crossword/atoms/wordmark";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <Wordmark className="py-6 text-4xl" />
      <Button size="lg">
        <Link href="/play">Play</Link>
      </Button>
    </main>
  );
}
