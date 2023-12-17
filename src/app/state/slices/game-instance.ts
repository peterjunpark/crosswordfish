import type { StateCreator } from "zustand";
import { sliceResetters, type GameState, type GameActions } from "../store";

export interface GameInstanceState {
  isStarted: boolean;
  showingErrors: boolean;
}

export interface GameInstanceActions {
  setGameIsStarted: () => void;
  toggleShowErrors: () => void;
}

interface GameInstanceSlice extends GameInstanceState, GameInstanceActions {}

const initGameInstanceState = {
  isStarted: false,
  showingErrors: false,
};

export const createGameInstanceSlice: StateCreator<
  GameState & GameActions,
  [],
  [],
  GameInstanceSlice
> = (set) => {
  sliceResetters.add(() => set(initGameInstanceState));

  return {
    ...initGameInstanceState,
    setGameIsStarted: () => {
      set(() => ({
        isStarted: true,
      }));
    },
    toggleShowErrors: () => {
      set((state) => ({
        showingErrors: !state.showingErrors,
      }));
    },
  };
};
