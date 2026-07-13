import { renderHook } from "@testing-library/react";

import { useIsFirstRender } from ".";

describe("useFirstRender hook", () => {
  it("should return true on first render", () => {
    const { result } = renderHook(() => useIsFirstRender());

    expect(result.current).toBe(true);
  });

  it("should return false on second render", () => {
    const { result, rerender } = renderHook(() => useIsFirstRender());

    rerender();

    expect(result.current).toBe(false);
  });

  it("should return false on multiple renders", () => {
    const { result, rerender } = renderHook(() => useIsFirstRender());

    rerender();
    rerender();
    rerender();

    expect(result.current).toBe(false);
  });
});
