import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Clues } from "@/lib/types";
import { stringifyRowCol } from "@/lib/utils";

type CluesProps = {
  clues: Clues;
};

export function CrosswordClues({ clues }: CluesProps) {
  return (
    <div className="flex">
      {/* ACROSS */}
      <div>
        <h3 className="pl-2 font-semibold tracking-tight">across</h3>
        <ScrollArea className="h-96 w-64 rounded-md border">
          <ol className="p-4">
            {clues.across.map((clue, idx) => (
              <>
                <li
                  key={stringifyRowCol(clue.row, clue.cols)}
                  className="flex gap-1 text-sm"
                >
                  <span className="font-semibold opacity-70">
                    {clue.number}.
                  </span>
                  <span>{clue.text}</span>
                </li>
                {idx !== clues.across.length - 1 && (
                  <Separator className="my-2 w-full" />
                )}
              </>
            ))}
          </ol>
        </ScrollArea>
      </div>
      {/* DOWN */}
      <div>
        <h3 className="pl-2 font-semibold tracking-tight">down</h3>
        <ScrollArea className="h-96 w-64 rounded-md border">
          <ol className="p-4">
            {clues.down.map((clue, idx) => (
              <>
                <li
                  key={stringifyRowCol(clue.rows, clue.col)}
                  className="flex gap-1 text-sm"
                >
                  <span className="font-semibold opacity-70">
                    {clue.number}.
                  </span>
                  <span>{clue.text}</span>
                </li>
                {idx !== clues.down.length - 1 && (
                  <Separator className="my-2 w-full" />
                )}
              </>
            ))}
          </ol>
        </ScrollArea>
      </div>
    </div>
  );
}

// import { ScrollArea } from "../ui/scroll-area";
// import { Separator } from "../ui/separator";

// export function CrosswordClues() {
//   return (
//     <div className="flex gap-4">
//       <ScrollArea>
//         <h2 className="font-bold">Across</h2>
//         <ol className="ml-5 list-decimal">
//           <li>Clue for the first across word.</li>
//           <Separator />
//           <li>Clue for the second across word.</li>
//           <li>Clue for the second across word.</li>
//           <li>Clue for the second across word.</li>
//           <li>Clue for the second across word.</li>
//           <li>Clue for the second across word.</li>
//           <li>Clue for the second across word.</li>
//           <li>Clue for the second across word.</li>
//           <li>Clue for the second across word.</li>
//           <li>Clue for the second across word.</li>
//           <li>Clue for the second across word.</li>
//           <li>Clue for the second across word.</li>
//           <li>Clue for the second across word.</li>
//           <li>Clue for the second across word.</li>
//           <li>Clue for the second across word.</li>
//         </ol>
//       </ScrollArea>
//       <div>
//         <h2 className="font-bold">Down</h2>
//         <ol className="ml-5 list-decimal">
//           <li>Clue for the first down word.</li>
//           <li>Clue for the second down word.</li>
//           <li>Clue for the second down word.</li>
//           <li>Clue for the second down word.</li>
//           <li>Clue for the second down word.</li>
//           <li>Clue for the second down word.</li>
//           <li>Clue for the second down word.</li>
//           <li>Clue for the second down word.</li>
//           <li>Clue for the second down word.</li>
//           <li>Clue for the second down word.</li>
//           <li>Clue for the second down word.</li>
//           <li>Clue for the second down word.</li>
//           <li>Clue for the second down word.</li>
//           <li>Clue for the second down word.</li>
//           <li>Clue for the second down word.</li>
//         </ol>
//       </div>
//     </div>
//   );
// }
