export const PUZZLE_FEN = "5r1k/6pp/8/3QN3/2B5/8/5PPP/6K1 w - - 0 1";

export const SOLUTION = [
  { from: "d5", to: "g8" }, // White: queen sacrifice
  { from: "f8", to: "g8" }, // Black: rook takes (forced)
  { from: "e5", to: "f7" }, // White: knight delivers smothered mate
];
