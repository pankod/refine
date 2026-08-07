import React from "react";

import { renderHook } from "@testing-library/react";

import { TestWrapper, mockRouterProvider } from "@test";

import { useMeta } from "./";

describe("useMeta Hook", () => {
  it("should return the resource meta", () => {
    const { result } = renderHook(() => useMeta(), {
      wrapper: TestWrapper({}),
    });

    const combinedMeta = result.current({
      resource: {
        name: "posts",
        meta: {
          foo: "bar",
          lorem: "ipsum",
        },
      },
    });

    expect(combinedMeta).toEqual({
      foo: "bar",
      lorem: "ipsum",
    });
  });

  it("should resource meta without icon", () => {
    const { result } = renderHook(() => useMeta(), {
      wrapper: TestWrapper({}),
    });

    const combinedMeta = result.current({
      resource: {
        name: "posts",
        meta: {
          foo: "bar",
          lorem: "ipsum",
          icon: <span>🌙</span>,
        },
      },
    });

    expect(combinedMeta).toEqual({
      foo: "bar",
      lorem: "ipsum",
    });
  });

  it("should return the params from the router in the meta", () => {
    const { result } = renderHook(() => useMeta(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          params: { id: "123", authorId: "456" },
        }),
      }),
    });

    const combinedMeta = result.current({ resource: { name: "products" } });

    expect(combinedMeta).toEqual({
      id: "123",
      authorId: "456",
    });
  });

  it("should return the meta from the hook props", () => {
    const { result } = renderHook(() => useMeta(), {
      wrapper: TestWrapper({}),
    });

    const combinedMeta = result.current({
      meta: {
        foo: "bar",
        lorem: "ipsum",
      },
    });

    expect(combinedMeta).toEqual({
      foo: "bar",
      lorem: "ipsum",
    });
  });

  it("should return the combined meta from the resource, router and props", () => {
    const { result } = renderHook(() => useMeta(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          params: { authorId: "123" },
        }),
      }),
    });

    const combinedMeta = result.current({
      resource: {
        name: "posts",
        meta: {
          foo: "bar",
        },
      },
      meta: {
        lorem: "ipsum",
      },
    });

    expect(combinedMeta).toEqual({
      foo: "bar",
      lorem: "ipsum",
      authorId: "123",
    });
  });

  it("should be prioritized in the order: props, router, resource", () => {
    const { result } = renderHook(() => useMeta(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          params: { foo: "qux" },
        }),
      }),
    });

    const combinedMeta = result.current({
      resource: {
        name: "posts",
        meta: {
          foo: "baz",
        },
      },
    });

    expect(combinedMeta).toEqual({
      foo: "qux",
    });

    const { result: result2 } = renderHook(() => useMeta(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          params: { foo: "qux" },
        }),
      }),
    });
    const combinedMeta2 = result2.current({
      resource: {
        name: "posts",
        meta: {
          foo: "baz",
        },
      },
      meta: {
        foo: "bar",
      },
    });

    expect(combinedMeta2).toEqual({
      foo: "bar",
    });
  });

  it("if the resource is not found, it should return query params and hook meta", () => {
    const { result } = renderHook(() => useMeta(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          params: { id: "123", authorId: "456" },
        }),
      }),
    });

    const combinedMeta = result.current({
      meta: {
        hookMeta: "hookMeta",
      },
    });

    expect(combinedMeta).toEqual({
      id: "123",
      authorId: "456",
      hookMeta: "hookMeta",
    });
  });

  it("should not return filters, sorters, current, pageSize, pagination", () => {
    const { result } = renderHook(() => useMeta(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          params: {
            id: "123",
            filters: [
              {
                field: "title",
                operator: "contains",
                value: "foo",
              },
            ],
            sorters: [
              {
                field: "title",
                order: "asc",
              },
            ],
            currentPage: 1,
            pageSize: 10,
          },
        }),
      }),
    });

    const combinedMeta = result.current({
      meta: {
        hookMeta: "hookMeta",
      },
    });

    expect(combinedMeta).toEqual({
      id: "123",
      hookMeta: "hookMeta",
    });
  });
});
