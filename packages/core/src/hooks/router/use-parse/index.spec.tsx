import React from "react";
import { vi } from "vitest";

import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterProvider } from "@test";

import { useParse } from "./";

describe("useParse Hook", () => {
  it("should return routerProvider parse function", () => {
    const mockParse = vi.fn();

    const { result } = renderHook(() => useParse(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            parse: () => mockParse,
          },
        }),
      }),
    });

    result.current();

    expect(mockParse).toHaveBeenCalledTimes(1);
  });

  it("if routerProvider parse function is not defined, should return empty object", () => {
    const { result } = renderHook(() => useParse(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            parse: undefined,
          },
        }),
      }),
    });

    const parse = result.current();

    expect(parse).toEqual({});
  });

  it("if it is used outside of router provider, should return empty object", () => {
    vi.spyOn(React, "useContext").mockReturnValue(undefined);

    const { result } = renderHook(() => useParse());

    const parse = result.current();

    expect(parse).toEqual({});
  });
});
