import { Navbar } from "@/components/navbar";
import { Crossword } from "@/components/crossword";

export default function HomePage() {
  return (
    <div className="flex">
      <Navbar />
      <Crossword />
    </div>
  );
}
