"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { GameState, Item } from "../types/types";

type GameContextType = {
  state: GameState;
  addItem: (item: Item) => void;
  unlockSafe: () => void;
  openDoor: () => void;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    inventory: [],
    safeOpen: false,
    doorOpen: false,
    chessSolved: false,
  });

  function addItem(item: Item) {
    setState((prev) => {
      if (prev.inventory.includes(item)) {
        return prev;
      }
      return { ...prev, inventory: [...prev.inventory, item] };
    });
  }
  function unlockSafe() {
    setState((prev) => {
      if (prev.safeOpen) {
        return prev;
      }
      return {
        ...prev,
        safeOpen: true,
        inventory: [...prev.inventory, "flashlight"],
      };
    });
  }
  function openDoor() {
    setState((prev) => {
      if (prev.doorOpen) {
        return prev;
      }
      return { ...prev, doorOpen: true };
    });
  }
  return (
    <GameContext.Provider value={{ state, addItem, unlockSafe, openDoor }}>
      {children}
    </GameContext.Provider>
  );
}

// PART 4: the shortcut pages use to open the backpack
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}
