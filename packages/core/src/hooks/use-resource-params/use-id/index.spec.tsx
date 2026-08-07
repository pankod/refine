import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useId } from ".";

import { mockRouterProvider } from "@test";

describe("useId Hook", () => {
  it("returns id from props", () => {
    const { result } = renderHook(() => useId(123), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          params: {
            id: 456,
          },
        }),
      }),
    });

    expect(result.current).toBe(123);
  });

  it("returns id from router", () => {
    const { result } = renderHook(() => useId(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          id: "123",
        }),
      }),
    });

    expect(result.current).toBe("123");
  });

  it("returns id from props and ignores router", () => {
    const { result } = renderHook(() => useId(123), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          id: "456",
        }),
      }),
    });

    expect(result.current).toBe(123);
  });
});
