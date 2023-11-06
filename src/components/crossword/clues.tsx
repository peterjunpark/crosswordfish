import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const clues = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export function CrosswordClues() {
  return (
    <div className="flex">
      <div>
        <h3 className="pl-2 font-semibold tracking-tight">across</h3>
        <ScrollArea className="h-72 w-48 rounded-md border">
          <ol className="p-4">
            {clues.map((clue, idx) => (
              <>
                <li key={`across-${idx}`} className="text-sm">
                  {clue}
                </li>
                {idx !== clues.length - 1 && (
                  <Separator className="my-2 w-full" />
                )}
              </>
            ))}
          </ol>
        </ScrollArea>
      </div>
      <div>
        <h3 className="pl-2 font-semibold tracking-tight">down</h3>
        <ScrollArea className="h-72 w-48 rounded-md border">
          <ol className="p-4">
            {clues.map((clue, idx) => (
              <>
                <li key={`down=${idx}`} className="text-sm">
                  {clue}
                </li>
                {idx !== clues.length - 1 && (
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
