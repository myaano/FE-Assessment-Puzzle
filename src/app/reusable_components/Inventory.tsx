"use client";

import { useGame } from "./GameContext";
import { ITEMS } from "../types/items";
import { Item } from "../types/types";

export default function Inventory({
  onSelect,
  equipped = null,
}: {
  onSelect: (item: Item) => void;
  equipped?: Item | null;
}) {
  const { state } = useGame();
  return (
    <div className="br-inventory">
      {state.inventory.map((item) => (
        <button
          key={item}
          className={item === equipped ? "br-slot equipped" : "br-slot"}
          aria-pressed={item === equipped}
          onClick={() => onSelect(item)}
        >
          {ITEMS[item].label}
        </button>
      ))}
    </div>
  );
}
