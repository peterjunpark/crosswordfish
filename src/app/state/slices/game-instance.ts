import type { StateCreator } from "zustand";
import { sliceResetters, type GameState, type GameActions } from "../store";

export interface GameInstanceState {
  isStarted: boolean;
  isChecking: boolean;
}

export interface GameInstanceActions {
  setGameIsStarted: () => void;
  toggleGameIsChecking: () => void;
}

interface GameInstanceSlice extends GameInstanceState, GameInstanceActions {}

const initGameInstanceState = {
  isStarted: false,
  isChecking: false,
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
    toggleGameIsChecking: () => {
      set((state) => ({
        isChecking: !state.isChecking,
      }));
    },
  };
};
