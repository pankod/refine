import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useToPath } from "./";

describe("useToPath Hook", () => {
  it("should return route for a given resource and action", () => {
    const { result } = renderHook(
      () =>
        useToPath({
          resource: { name: "posts", list: "/posts" },
          action: "list",
        }),
      {
        wrapper: TestWrapper({
          resources: [{ name: "posts", list: "/posts" }],
          dataProvider: MockJSONServer,
        }),
      },
    );

    expect(result.current).toEqual("/posts");
  });
});
