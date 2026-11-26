import { Item } from "./types";

export const ITEMS: Record<Item, { label: string; text: string }> = {
  paper: {
    label: "Torn Paper",
    text: "the lights are sending a message",
  },
  flashlight: {
    label: "UV Flashlight",
    text: "Reveals prints",
  },
};
