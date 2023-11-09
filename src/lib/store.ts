import { create } from "zustand";
import type { SolutionGrid, WorkingGrid, Clues } from "./types";
import { DUMMY_clues, DUMMY_grid } from "@/___tests___/dummy-data";

const grid = DUMMY_grid;
const clues = DUMMY_clues;
// const workingGrid =

type State = {
  grid: {
    solution: SolutionGrid;
    working: WorkingGrid;
  };
  clues: Clues;
};

// type Action = {};

export const useStore = create<State>(() => ({
  clues: clues,
  grid: {
    solution: grid,
    working: grid.map((row) => row.map((cell) => (cell === null ? null : ""))),
  },
}));
