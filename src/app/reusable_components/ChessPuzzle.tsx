"use client";

import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { PUZZLE_FEN, SOLUTION } from "../types/puzzles";

export default function ChessPuzzle({ onSolved }: { onSolved: () => void }) {
  const [fen, setFen] = useState(PUZZLE_FEN);
  const [step, setStep] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [message, setMessage] = useState("");

  // Opponent's turn: odd steps play automatically after a short pause
  useEffect(() => {
    const reply = SOLUTION[step];
    if (!reply || step % 2 === 0) return;

    const timer = setTimeout(() => {
      const game = new Chess(fen);
      game.move({ from: reply.from, to: reply.to, promotion: "q" });
      setFen(game.fen());
      setStep(step + 1);
    }, 700);

    return () => clearTimeout(timer);
  }, [step, fen]);

  function handleDrop({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: string;
    targetSquare: string | null;
  }) {
    if (!targetSquare) return false;
    if (step % 2 === 1) return false; // wait for the opponent

    const game = new Chess(fen);
    try {
      game.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
    } catch {
      return false; // illegal move: the piece snaps back
    }

    const expected = SOLUTION[step];
    if (sourceSquare !== expected.from || targetSquare !== expected.to) {
      setMistakes(mistakes + 1);
      setMessage("Legal, but that's not the way. Look for a forcing move.");
      return false;
    }

    setMessage("");
    setFen(game.fen());

    if (game.isCheckmate()) {
      onSolved();
    } else {
      setStep(step + 1);
    }
    return true;
  }

  function reset() {
    setFen(PUZZLE_FEN);
    setStep(0);
    setMistakes(0);
    setMessage("");
  }

  const hint =
    mistakes >= 3 ? "Hint: give up your strongest piece, with check." : "";

  return (
    <div className="br-puzzle">
      <Chessboard options={{ position: fen, onPieceDrop: handleDrop }} />
      <p className="br-hint">{message || "White to move. Mate in two."}</p>
      {hint && <p className="br-hint">{hint}</p>}
      {(step > 0 || mistakes > 0) && (
        <button className="br-reset" onClick={reset}>
          Reset
        </button>
      )}
    </div>
  );
}
