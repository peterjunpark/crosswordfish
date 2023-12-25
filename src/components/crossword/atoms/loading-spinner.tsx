import { cn } from "@/lib/utils";
import { TransparencyGridIcon } from "@radix-ui/react-icons";

type LoadingSpinnerProps = {
  className?: string;
};

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <TransparencyGridIcon className={cn("h-8 w-8 animate-spin", className)} />
    </div>
  );
}
