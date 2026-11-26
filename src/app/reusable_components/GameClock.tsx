"use client";

import { useEffect, useState } from "react";
import { useGame } from "./GameContext";

export default function GameClock() {
  const { state, endsAt } = useGame();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (endsAt === null || state.chessSolved) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [endsAt, state.chessSolved]);

  if (endsAt === null) return null;

  const msLeft = Math.max(0, endsAt - now);
  const secs = Math.ceil(msLeft / 1000);
  const text = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  const timeUp = msLeft === 0 && !state.chessSolved;

  return (
    <>
      <div className={secs <= 60 ? "br-clock low" : "br-clock"} role="timer">
        {text}
      </div>
      {timeUp && (
        <div className="br-timeup" role="alert">
          <h1>Time&rsquo;s up.</h1>
          <p>You transform into one of the entities living within</p>
          <button onClick={() => (window.location.href = "/hallway")}>
            Try again
          </button>
        </div>
      )}
    </>
  );
}
