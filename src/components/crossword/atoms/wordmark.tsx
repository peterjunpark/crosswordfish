import Link from "next/link";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
};

export function Wordmark({ className }: WordmarkProps) {
  return (
    <h1
      className={cn(
        "text-2xl font-semibold tracking-tighter text-brand hover:text-brand-foreground md:text-5xl",
        className,
      )}
    >
      <Link href="/">crosswordfish</Link>
    </h1>
  );
}
