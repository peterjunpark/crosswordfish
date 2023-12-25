import { LoadingSpinner } from "@/components/crossword/atoms/loading-spinner";
export default function PlayLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
