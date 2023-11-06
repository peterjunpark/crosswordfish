type CellCoordinates = [number, number];

interface Clue {
  number: number;
  clue: string;
  direction: "ACROSS" | "DOWN";
  cells: CellCoordinates[];
}

export const testClues: Clue[] = [
  {
    number: 1,
    clue: "Opera highlight",
    direction: "ACROSS",
    cells: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  },
  {
    number: 5,
    clue: "Spanish Mrs.",
    direction: "ACROSS",
    cells: [
      [0, 5],
      [0, 6],
      [0, 7],
    ],
  },
  {
    number: 8,
    clue: "Yin and ___",
    direction: "ACROSS",
    cells: [
      [0, 9],
      [0, 10],
      [0, 11],
      [0, 12],
    ],
  },
  {
    number: 12,
    clue: "Place in a house where one might find a cue or Clue",
    direction: "ACROSS",
    cells: [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
    ],
  },
  {
    number: 14,
    clue: "Sherlock's sister, per two Netflix films",
    direction: "ACROSS",
    cells: [
      [1, 9],
      [1, 10],
      [1, 11],
      [1, 12],
      [1, 13],
    ],
  },
];
