import type { RefObject } from "react";

import React from "react";

type Handler = (event: KeyboardEvent) => void;

export const useKeyDown = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  keys: string[],
  callback: Handler,
) => {
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (!ref.current) return;
      if (keys.includes(event.key)) {
        event.preventDefault();
        callback(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [ref]);

  return ref;
};
