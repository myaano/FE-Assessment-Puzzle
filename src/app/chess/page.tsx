"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Chessboard } from "react-chessboard";
import { useGame } from "../reusable_components/GameContext";
import Room from "../reusable_components/Room";
import Modal from "../reusable_components/Modal";
import ChessPuzzle from "../reusable_components/ChessPuzzle";
import { PUZZLE_FEN } from "../types/puzzles";

export default function Chess() {
  const { state, solveChess } = useGame();
  const router = useRouter();
  const [boardOpen, setBoardOpen] = useState(false);
  const [escaped, setEscaped] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    if (!state.doorOpen) {
      router.replace("/hallway");
    }
  }, [state.doorOpen, router]);

  if (!state.doorOpen) return null;

  return (
    <>
      <Room plain>
        <div className="br-fixture on" />
        <div className="br-board">
          <div className="br-frame">
            <Chessboard options={{ position: PUZZLE_FEN }} />
            <button
              className="br-board-hit"
              aria-label="Open the chessboard"
              onClick={() => setBoardOpen(true)}
            />
          </div>
        </div>
      </Room>

      {boardOpen && (
        <Modal variant="chess" onClose={() => setBoardOpen(false)}>
          <ChessPuzzle
            onSolved={() => {
              setBoardOpen(false);
              setEscaped(true);
              solveChess();
            }}
          />
        </Modal>
      )}

      {escaped && (
        <div className="br-escaped">
          <h1>You escaped.</h1>
          <p>You escaped and warped into the real world.</p>
        </div>
      )}
    </>
  );
}
