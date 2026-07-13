import React from "react";
import { vi } from "vitest";

import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterProvider } from "@test";

import { useBack } from "./";

describe("useBack Hook", () => {
  it("should return routerProvider back function", () => {
    const mockBack = vi.fn();

    const { result } = renderHook(() => useBack(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            back: () => mockBack,
          },
        }),
      }),
    });

    result.current();

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("if routerProvider back function is not defined, should return undefined", () => {
    const { result } = renderHook(() => useBack(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            back: undefined,
          },
        }),
      }),
    });

    const back = result.current();

    expect(back).toEqual(undefined);
  });

  it("if it is used outside of router provider, should return undefined", () => {
    vi.spyOn(React, "useContext").mockReturnValue(undefined);

    const { result } = renderHook(() => useBack());

    const back = result.current();

    expect(back).toEqual(undefined);
  });
});
