import React from "react";

import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterProvider } from "@test";

import { useResource } from ".";

describe("useResource Hook", () => {
  it("returns context value", async () => {
    const { result } = renderHook(() => useResource(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    expect(result.current.resources).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "posts" })]),
    );
  });

  it("should successfully return meta value", async () => {
    const { result } = renderHook(() => useResource(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [
          {
            name: "posts",
            meta: {
              isThatReallyWork: true,
            },
          },
        ],
      }),
    });

    expect(result.current.resources).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "posts",
          meta: {
            isThatReallyWork: true,
          },
        }),
      ]),
    );
  });
});

describe("useResource Hook without prop", () => {
  const Wrapper = TestWrapper({
    routerProvider: mockRouterProvider({
      pathname: "/posts/edit/1",
      resource: {
        name: "posts",
      },
      action: "edit",
      id: "1",
    }),
  });

  const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => <Wrapper>{children}</Wrapper>;

  it("should return posts resource because of initial resource", async () => {
    const { result } = renderHook(() => useResource(), {
      wrapper: WrapperWith,
    });

    expect(result.current.resource?.name).toBe("posts");
  });

  it("should return resource which route is custom route", async () => {
    const Wrapper = TestWrapper({
      resources: [
        {
          name: "posts",
          meta: { route: "custom-route-posts" },
        },
      ],
      routerProvider: mockRouterProvider({
        pathname: "/custom-route-posts",
        resource: {
          name: "posts",
          meta: { route: "custom-route-posts" },
        },
        action: "list",
      }),
    });

    const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
      children,
    }) => <Wrapper>{children}</Wrapper>;
    const { result } = renderHook(() => useResource(), {
      wrapper: WrapperWith,
    });

    expect(result.current.resource?.meta?.route).toBe("custom-route-posts");
  });

  it("should return resource which route is custom route and with identifier", async () => {
    const { result } = renderHook(() => useResource("posts"), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          action: "list",
        }),
      }),
    });

    expect(result.current.resource).toEqual({ name: "posts" });
  });
});

describe("useResource Hook with identifier prop", () => {
  it("should return resource by identifier", async () => {
    const Wrapper = TestWrapper({
      resources: [{ name: "refine-makes" }],
      routerProvider: mockRouterProvider({
        pathname: "/refine-makes",
        resource: {
          name: "refine-makes",
        },
        action: "list",
      }),
    });

    const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
      children,
    }) => <Wrapper>{children}</Wrapper>;
    const { result } = renderHook(() => useResource("refine-makes"), {
      wrapper: WrapperWith,
    });

    expect(result.current.resource?.name).toBe("refine-makes");
  });
});
