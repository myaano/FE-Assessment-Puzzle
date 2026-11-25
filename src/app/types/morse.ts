export type Step = { on: boolean; ms: number };

const UNIT = 250;

const MORSE: Record<string, string> = {
  "6": "-....",
  "7": "--...",
};

export function toSteps(message: string): Step[] {
  const steps: Step[] = [];

  message.split("").forEach((char, i) => {
    const code = MORSE[char];

    code.split("").forEach((symbol, j) => {
      // light on: a dash lasts 3 units, a dot lasts 1
      steps.push({ on: true, ms: (symbol === "-" ? 3 : 1) * UNIT });

      // short gap between symbols inside one digit
      if (j < code.length - 1) {
        steps.push({ on: false, ms: 1 * UNIT });
      }
    });

    // longer gap between digits
    if (i < message.length - 1) {
      steps.push({ on: false, ms: 3 * UNIT });
    }
  });

  return steps;
}
