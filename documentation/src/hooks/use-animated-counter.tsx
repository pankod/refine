import { useEffect, useState } from "react";
import { animate } from "framer-motion";

type UseAnimatedCounter = (
  maxValue: number,
  initialValue?: number,
  duration?: number,
) => number;

export const useAnimatedCounter: UseAnimatedCounter = (
  maxValue: number,
  initialValue = 0,
  duration = 1,
) => {
  const [counter, setCounter] = useState<number>(initialValue);

  useEffect(() => {
    const controls = animate(initialValue, maxValue, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        setCounter(value);
      },
    });

    return () => controls.stop();
  }, [initialValue, maxValue, duration]);

  return counter;
};
