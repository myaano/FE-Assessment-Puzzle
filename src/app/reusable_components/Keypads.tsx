"use client";

import { useState } from "react";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "OK"];

export default function Keypad({
  code,
  onSuccess,
}: {
  code: string;
  onSuccess: () => void;
}) {
  const [entry, setEntry] = useState("");
  const [wrong, setWrong] = useState(false);

  function press(key: string) {
    if (key === "C") {
      setEntry("");
      setWrong(false);
      return;
    }
    if (key === "OK") {
      if (entry === code) {
        onSuccess();
      } else {
        setEntry("");
        setWrong(true);
      }
      return;
    }
    if (entry.length < code.length) {
      setEntry(entry + key);
      setWrong(false);
    }
  }

  return (
    <div className="br-keypad">
      <div
        className={wrong ? "br-screen br-error" : "br-screen"}
        aria-live="polite"
      >
        {wrong ? "ERROR" : entry || "\u00a0"}
      </div>
      <div className="br-keys">
        {KEYS.map((k) => (
          <button key={k} onClick={() => press(k)}>
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
