import { Button } from "./ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "./ui/select";

function CrosswordMenubar() {
  return (
    <div className="mb-4 flex w-full items-center justify-between p-6 shadow-lg">
      <div className="flex gap-4">
        <Button variant="outline">Check Puzzle</Button>
        <Button variant="outline">Reveal Letter</Button>
        <Button variant="outline">Reset Puzzle</Button>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <h3>
            Timer: <span className="font-bold">00:00:00</span>
          </h3>
        </div>
        <div>
          <h3>
            Score: <span className="font-bold">0</span>
          </h3>
        </div>
      </div>

      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Difficulty</SelectLabel>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
            <SelectItem value="harder">Evil</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function CrosswordGrid() {
  return (
    <div className="grid grid-cols-5 gap-2 rounded-lg p-4">
      <div className="bg-gray-300">1</div>
      <input className="text-center" maxLength={1} type="text" />
      <input className="text-center" maxLength={1} type="text" />
      <input className="text-center" maxLength={1} type="text" />
      <input className="text-center" maxLength={1} type="text" />
      <input className="text-center" maxLength={1} type="text" />
      <div className="bg-gray-300">2</div>
      <input className="text-center" maxLength={1} type="text" />
      <input className="text-center" maxLength={1} type="text" />
      <input className="text-center" maxLength={1} type="text" />
      <input className="text-center" maxLength={1} type="text" />
    </div>
  );
}

function CrosswordClues() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-bold">Across</h2>
        <ol className="ml-5 list-decimal">
          <li>Clue for the first across word.</li>
          <li>Clue for the second across word.</li>
        </ol>
      </div>
      <div>
        <h2 className="font-bold">Down</h2>
        <ol className="ml-5 list-decimal">
          <li>Clue for the first down word.</li>
          <li>Clue for the second down word.</li>
        </ol>
      </div>
    </div>
  );
}

export function Crossword() {
  return (
    <main className="flex h-screen w-full flex-col items-center">
      <CrosswordMenubar />
      <div className="flex gap-4 p-6 shadow-lg">
        <CrosswordGrid />
        <CrosswordClues />
      </div>
    </main>
  );
}
