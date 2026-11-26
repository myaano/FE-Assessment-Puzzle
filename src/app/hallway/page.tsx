"use client";

import { useState } from "react";
import Link from "next/link";
import { useGame } from "../reusable_components/GameContext";
import Room from "../reusable_components/Room";
import Inventory from "../reusable_components/Inventory";
import Modal from "../reusable_components/Modal";
import Keypad from "../reusable_components/Keypads";
import { useMorse } from "../hooks/useMorse";
import { ITEMS } from "../types/items";
import { Item } from "../types/types";
import { DOOR_CODE } from "../types/codes";
import { useRouter } from "next/navigation";

export default function Hallway() {
  const { state, addItem, unlockSafe, openDoor, startTimer, endsAt } =
    useGame();
  const [keypadOpen, setKeypadOpen] = useState(false);
  const [viewing, setViewing] = useState<Item | null>(null);
  const [equipped, setEquipped] = useState<Item | null>(null);
  const lit = useMorse("67");
  const flashlightOn = equipped === "flashlight";

  function handleSelect(item: Item) {
    if (item === "flashlight") {
      setEquipped((prev) => (prev === "flashlight" ? null : "flashlight"));
    } else {
      setViewing(item);
    }
  }
  const router = useRouter();
  const [doorKeypadOpen, setDoorKeypadOpen] = useState(false);

  return (
    <>
      <Room dim={!lit} flashlight={flashlightOn}>
        {!state.inventory.includes("paper") && (
          <button
            className="br-paper"
            aria-label="Torn paper on the wall"
            onClick={() => addItem("paper")}
          />
        )}

        <button
          className="br-safe"
          aria-label="Wall safe"
          onClick={() => setKeypadOpen(true)}
        />
        <button
          className="br-door"
          aria-label="Maintenance door"
          onClick={() => {
            if (state.doorOpen) {
              router.push("/chess");
            } else {
              setDoorKeypadOpen(true);
            }
          }}
        />
        <div className={lit ? "br-fixture on" : "br-fixture"} />

        {flashlightOn && (
          <div className="br-secret">
            <span>{DOOR_CODE}</span>
          </div>
        )}

        <Inventory onSelect={handleSelect} equipped={equipped} />
      </Room>

      {viewing && (
        <Modal onClose={() => setViewing(null)}>
          <p>{ITEMS[viewing].text}</p>
        </Modal>
      )}

      {keypadOpen && (
        <Modal variant="metal" onClose={() => setKeypadOpen(false)}>
          {state.safeOpen ? (
            <p>The safe is empty.</p>
          ) : (
            <Keypad
              code="67"
              onSuccess={() => {
                unlockSafe();
                setKeypadOpen(false);
              }}
            />
          )}
        </Modal>
      )}
      {doorKeypadOpen && (
        <Modal variant="metal" onClose={() => setDoorKeypadOpen(false)}>
          <p className="br-plate">Door Lock</p>
          <Keypad
            code={DOOR_CODE}
            onSuccess={() => {
              openDoor();
              setDoorKeypadOpen(false);
              router.push("/chess");
            }}
          />
        </Modal>
      )}
      {endsAt === null && (
        <div
          className="br-intro"
          role="dialog"
          aria-modal="true"
          aria-label="Introduction"
        >
          <p>You warped to a wall and got stuck in a liminal space.</p>
          <p>You must solve the puzzles within to escape.</p>
          <button autoFocus onClick={startTimer}>
            Begin
          </button>
        </div>
      )}
    </>
  );
}
