import { useRef } from "react";
import isEqual from "lodash/isEqual";

/**
 * Hook that memoizes the given value with deep equality.
 * @internal
 */
export const useMemoized = <T = unknown>(value: T): T => {
  const ref = useRef(value);

  if (!isEqual(ref.current, value)) {
    ref.current = value;
  }

  return ref.current;
};
