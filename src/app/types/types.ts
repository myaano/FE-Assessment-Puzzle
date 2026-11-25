export type Item = "paper" | "flashlight";

export type GameState = {
  inventory: Item[];
  safeOpen: boolean;
  doorOpen: boolean;
  chessSolved: boolean;
};
