import React from "react";
import { vi } from "vitest";

import { act, renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterProvider } from "@test";

import { type Resource, handleResourceErrors, useGo } from "./";

describe("useGo Hook", () => {
  it("should return routerProvider go function", () => {
    const mockGo = vi.fn();

    const { result } = renderHook(() => useGo(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGo,
          },
        }),
      }),
    });

    result.current({
      to: "/posts",
      hash: "#test",
      type: "push",
      query: {
        test: "test",
      },
      options: {
        keepHash: true,
        keepQuery: false,
      },
    });

    expect(mockGo).toHaveBeenCalledWith({
      hash: "#test",
      options: { keepHash: true, keepQuery: false },
      query: { test: "test" },
      to: "/posts",
      type: "push",
    });
  });

  it("if routerProvider go function is not defined, should return undefined", () => {
    const { result } = renderHook(() => useGo(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            go: undefined,
          },
        }),
      }),
    });

    const go = result.current({ to: "/posts" });

    expect(go).toEqual(undefined);
  });

  it("if it is used outside of router provider, should return undefined", () => {
    vi.spyOn(React, "useContext").mockReturnValueOnce(undefined);

    const { result } = renderHook(() => useGo());

    const go = result.current({ to: "/posts" });

    expect(go).toEqual(undefined);
  });

  it("should return the correct URL for a resource", () => {
    const mockGo = vi.fn();

    const { result } = renderHook(() => useGo(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
            edit: "/posts/:id/edit",
            show: "/posts/:id",
            clone: "/posts/:id/clone",
          },
        ],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGo,
          },
        }),
      }),
    });

    const go = result.current;

    go({
      to: {
        resource: "posts",
        action: "list",
      },
    });
    expect(mockGo).toHaveBeenCalledWith({ to: "/posts" });

    go({
      to: {
        resource: "posts",
        action: "create",
      },
    });
    expect(mockGo).toHaveBeenCalledWith({ to: "/posts/create" });

    go({
      to: {
        resource: "posts",
        action: "edit",
        id: 1,
      },
    });
    expect(mockGo).toHaveBeenCalledWith({ to: "/posts/1/edit" });

    go({
      to: {
        resource: "posts",
        action: "show",
        id: 1,
      },
    });
    expect(mockGo).toHaveBeenCalledWith({ to: "/posts/1" });

    go({
      to: {
        resource: "posts",
        action: "clone",
        id: 1,
      },
    });
    expect(mockGo).toHaveBeenCalledWith({ to: "/posts/1/clone" });
  });

  it("should return the correct URL for a resource identifier", () => {
    const mockGo = vi.fn();

    const { result } = renderHook(() => useGo(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
            edit: "/posts/:id/edit",
            show: "/posts/:id",
            clone: "/posts/:id/clone",
          },
          {
            name: "posts",
            identifier: "id-posts",
            list: "/id-posts",
            create: "/id-posts/create",
            edit: "/id-posts/:id/edit",
            show: "/id-posts/:id",
            clone: "/id-posts/:id/clone",
          },
        ],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGo,
          },
        }),
      }),
    });

    const go = result.current;

    go({
      to: {
        resource: "id-posts",
        action: "list",
      },
    });

    expect(mockGo).toHaveBeenCalledWith({ to: "/id-posts" });

    go({
      to: {
        resource: "id-posts",
        action: "create",
      },
    });

    expect(mockGo).toHaveBeenCalledWith({ to: "/id-posts/create" });

    go({
      to: {
        resource: "id-posts",
        action: "edit",
        id: 1,
      },
    });

    expect(mockGo).toHaveBeenCalledWith({ to: "/id-posts/1/edit" });

    go({
      to: {
        resource: "id-posts",
        action: "show",
        id: 1,
      },
    });

    expect(mockGo).toHaveBeenCalledWith({ to: "/id-posts/1" });

    go({
      to: {
        resource: "id-posts",
        action: "clone",
        id: 1,
      },
    });

    expect(mockGo).toHaveBeenCalledWith({ to: "/id-posts/1/clone" });
  });

  it("should throw an error if the resource is not defined", () => {
    const { result } = renderHook(() => useGo(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            go: () => () => undefined,
          },
        }),
      }),
    });

    expect(() =>
      result.current({
        to: {
          resource: "users",
          action: "list",
        },
      }),
    ).toThrow("[useGo]: [action: list] is not defined for [resource: users]");
  });

  it("should navigate with additional parameters if defined in resource.meta", async () => {
    const mockGoFn = vi.fn();

    const { result } = renderHook(() => useGo(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
            edit: "/:tenantId/posts/:id/edit",
            list: "/:tenantId/posts",
            meta: { tenantId: "foo" },
          },
        ],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGoFn,
          },
        }),
      }),
    });

    act(() => {
      result.current({
        to: {
          resource: "posts",
          action: "edit",
          id: "123",
        },
      });
    });

    expect(mockGoFn).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "/foo/posts/123/edit",
      }),
    );

    act(() => {
      result.current({
        to: {
          resource: "posts",
          action: "list",
        },
      });
    });

    expect(mockGoFn).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "/foo/posts",
      }),
    );
  });

  it("should return with additional parameters if defined in route params", async () => {
    const mockGoFn = vi.fn();

    const { result } = renderHook(() => useGo(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
            edit: "/:tenantId/posts/:id/edit",
            list: "/:tenantId/posts",
          },
        ],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGoFn,
            parse: () => () => ({
              params: {
                tenantId: "foo",
              },
            }),
          },
        }),
      }),
    });

    act(() => {
      result.current({
        to: {
          resource: "posts",
          action: "edit",
          id: "123",
        },
      });
    });

    expect(mockGoFn).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "/foo/posts/123/edit",
      }),
    );

    act(() => {
      result.current({
        to: {
          resource: "posts",
          action: "list",
        },
      });
    });

    expect(mockGoFn).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "/foo/posts",
      }),
    );
  });

  it("should return nested parameters if defined in to.meta", async () => {
    const mockGoFn = vi.fn();

    const { result } = renderHook(() => useGo(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
            edit: "/:tenantId/posts/:id/edit",
            list: "/:tenantId/posts",
          },
        ],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGoFn,
          },
        }),
      }),
    });

    act(() => {
      result.current({
        to: {
          resource: "posts",
          action: "edit",
          id: "123",
          meta: {
            tenantId: "foo",
          },
        },
      });
    });

    expect(mockGoFn).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "/foo/posts/123/edit",
      }),
    );

    act(() => {
      result.current({
        to: {
          resource: "posts",
          action: "list",
          meta: {
            tenantId: "foo",
          },
        },
      });
    });

    expect(mockGoFn).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "/foo/posts",
      }),
    );
  });
});

describe("handleResourceErrors", () => {
  const resource = {
    name: "posts",
    list: "/posts",
    create: "/posts/create",
    edit: "/posts/:id/edit",
    show: "/posts/:id",
    clone: "/posts/:id/clone",
  };

  it('should throw an error if "id" is not defined for "edit", "show", or "clone" actions', () => {
    expect(() =>
      handleResourceErrors(
        { resource: "posts", action: "edit" } as unknown as Resource,
        resource,
      ),
    ).toThrow('[useGo]: [action: edit] requires an "id" for resource');
    expect(() =>
      handleResourceErrors(
        { resource: "posts", action: "show" } as unknown as Resource,
        resource,
      ),
    ).toThrow('[useGo]: [action: show] requires an "id" for resource');
    expect(() =>
      handleResourceErrors(
        { resource: "posts", action: "clone" } as unknown as Resource,
        resource,
      ),
    ).toThrow('[useGo]: [action: clone] requires an "id" for resource');
  });

  it("should throw an error if the action URL is not defined for the given action", () => {
    expect(() =>
      handleResourceErrors(
        { resource: "posts", action: "create" },
        { ...resource, create: undefined },
      ),
    ).toThrow("[useGo]: [action: create] is not defined for [resource: posts]");
  });
});
