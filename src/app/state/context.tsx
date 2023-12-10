"use client";

import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from "react";
import { useStore } from "zustand";
import {
  createGameStore,
  type GameProps,
  type GameState,
  type GameActions,
  type GameStore,
} from "./store";

export const GameContext = createContext<GameStore | null>(null);

type GameProviderProps = PropsWithChildren<GameProps>;

export function GameProvider({ children, ...props }: GameProviderProps) {
  const storeRef = useRef<GameStore>();

  if (!storeRef.current) {
    storeRef.current = createGameStore(props);
  }

  return (
    <GameContext.Provider value={storeRef.current}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext<T>(
  selector: (state: GameState & GameActions) => T,
): T {
  const store = useContext(GameContext);

  if (!store) throw new Error("Missing GameContext.Provider in the tree.");

  return useStore(store, selector);
}
