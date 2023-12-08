import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex h-full max-h-screen w-full flex-col items-center bg-red-500">
      <Button size="lg">
        <Link href="/play">Play grid 1</Link>
      </Button>

      <Button size="lg">
        <Link href="/play">Play grid 2</Link>
      </Button>
    </main>
  );
}
