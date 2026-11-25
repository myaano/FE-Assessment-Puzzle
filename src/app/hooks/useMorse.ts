import { useEffect, useState } from "react";
import { toSteps } from "../types/morse";

export function useMorse(message: string, pauseMs = 3000) {
  const [lit, setLit] = useState(true);

  useEffect(() => {
    const steps = toSteps(message);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    function play() {
      // reached the end: go dark, wait, then start over
      if (i >= steps.length) {
        setLit(false);
        i = 0;
        timer = setTimeout(play, pauseMs);
        return;
      }

      const step = steps[i];
      setLit(step.on);
      i++;
      timer = setTimeout(play, step.ms);
    }

    play();

    // cleanup: runs when the component unmounts or the inputs change
    return () => clearTimeout(timer);
  }, [message, pauseMs]);

  return lit;
}
