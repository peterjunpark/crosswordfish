import { createStore } from "zustand";
import type { Grid, Clues, AcrossClue, DownClue, CellValue } from "./types";

interface GameProps {}

interface GameState extends GameProps {}

type GameStore = ReturnType<typeof createGameStore>;

const createGameStore = (initProps?: Partial<GameProps>) => {
  const DEFAULT_PROPS: GameProps = {};

  return createStore<GameState>()((set, get) => {});
};
