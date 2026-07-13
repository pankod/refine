import { renderHook } from "@testing-library/react";

import { useDeepMemo } from ".";

describe("useDeepMemo Hook", () => {
  it("should return the same instance when new dependency is deep equal", () => {
    const initialValue = { value: 5 };
    const { result, rerender } = renderHook(
      (value) => useDeepMemo(() => value, [value]),
      {
        initialProps: initialValue,
      },
    );
    expect(result.current).toBe(initialValue);

    const newButSameValue = { value: 5 };

    rerender(newButSameValue);

    expect(result.current).toBe(initialValue);
    expect(result.current).not.toBe(newButSameValue);
  });

  it("should return the new value when new dependency is not deep equal", () => {
    const initialValue = { value: 5 };
    const { result, rerender } = renderHook(
      (value) => useDeepMemo(() => value, [value]),
      {
        initialProps: initialValue,
      },
    );
    expect(result.current).toBe(initialValue);

    const newValue = { value: 6 };

    rerender(newValue);

    expect(result.current).not.toBe(initialValue);
    expect(result.current).toBe(newValue);
  });
});
