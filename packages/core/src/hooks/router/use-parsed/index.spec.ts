import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterProvider } from "@test";

import { useParsed } from "./";

describe("useParsed Hook", () => {
  it("should return routerProvider parse function result", () => {
    const { result } = renderHook(() => useParsed(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          params: {
            id: "1",
            currentPage: 1,
          },
          action: "list",
          pathname: "/posts",
          fns: {
            parse: () => () => {
              return {
                params: {
                  id: "1",
                  currentPage: 1,
                },
              };
            },
          },
        }),
      }),
    });

    expect(result.current).toEqual({
      params: {
        id: "1",
        currentPage: 1,
      },
    });
  });
});
