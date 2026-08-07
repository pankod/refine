import { vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, act, mockRouterProvider } from "@test";
import { posts } from "@test/dataMocks";

import type {
  CrudFilter,
  DataProviders,
  IDataContext,
} from "../../contexts/data/types";
import * as pickResource from "../../definitions/helpers/pick-resource";
import { useSelect } from "./";

describe("useSelect Hook", () => {
  it("default", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    await waitFor(() => expect(options).toHaveLength(2), { timeout: 2000 });

    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);
  });

  it("with nested optionLabel", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          optionLabel: "nested.title",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    expect(options).toHaveLength(2);
    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);
  });

  it("defaultValue", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["1", "2", "3", "4"],
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer.default,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    expect(options).toHaveLength(2);
    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);
  });

  it("defaultValue is not an array", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: "1",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    expect(options).toHaveLength(2);
    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);
  });

  it("should success data with resource with optionLabel and optionValue", async () => {
    const { result } = renderHook(
      () =>
        useSelect<{ id: string; slug: string }>({
          resource: "posts",
          optionLabel: "slug",
          optionValue: "id",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    expect(options).toHaveLength(2);
    expect(options).toEqual([
      { label: "ut-ad-et", value: "1" },
      { label: "consequatur-molestiae-rerum", value: "2" },
    ]);
  });

  it("should success data with resource with filters", async () => {
    const { result } = renderHook(
      () =>
        useSelect<{ id: string; slug: string }>({
          resource: "posts",
          filters: [
            {
              field: "slug",
              operator: "ncontains",
              value: "test",
            },
          ],
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    expect(options).toHaveLength(2);
    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);
  });

  it("onSearch debounce with default value (300ms)", async () => {
    const getListMock = vi.fn(() => Promise.resolve({ data: [], total: 0 }));
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          debounce: 300,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default!,
              getList: getListMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(getListMock).toHaveBeenCalledTimes(1);

    const { onSearch } = result.current;

    onSearch("1");

    onSearch("1");

    onSearch("1");

    await waitFor(() => {
      expect(getListMock).toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });
  });

  it("onSearch disabled debounce (0ms)", async () => {
    const getListMock = vi.fn(() => {
      return Promise.resolve({ data: [], total: 0 });
    });
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          debounce: 0,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: getListMock,
            },
          } as any,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(getListMock).toHaveBeenCalledTimes(1);

    const { onSearch } = result.current;

    onSearch("1");
    await waitFor(() => {
      expect(getListMock).toHaveBeenCalledTimes(2);
    });

    onSearch("2");
    await waitFor(() => {
      expect(getListMock).toHaveBeenCalledTimes(3);
    });

    onSearch("3");
    await waitFor(() => {
      expect(getListMock).toHaveBeenCalledTimes(4);
    });

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    onSearch("");
    await waitFor(() => {
      expect(getListMock).toHaveBeenCalledTimes(5);
    });

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });
  });

  it("should onSearchFromProp work as expected", async () => {
    const getListMock = vi.fn(() => Promise.resolve({ data: [], total: 0 }));

    const { result, rerender } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          onSearch: (value) => {
            return [
              {
                field: "title",
                operator: "contains",
                value,
              },
            ];
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default!,
              getList: getListMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(1));

    result.current.onSearch("1");
    // force custom `onSearch` to reinitialize, this should not change `current.onSearch`
    rerender();
    result.current.onSearch("2");
    // force custom `onSearch` to reinitialize, this should not change `current.onSearch`
    rerender();
    result.current.onSearch("3");

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(2));

    result.current.onSearch("");

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(3));

    await waitFor(() => expect(result.current.query.isSuccess).toBeTruthy());
  });

  it("should respond to onSearch prop changes without breaking the debounce interval", async () => {
    const getListMock = vi.fn(() => Promise.resolve({ data: [], total: 0 }));
    const initialOnSearch = vi.fn().mockImplementation((v) => [
      {
        field: "title",
        operator: "contains",
        value: v,
      },
    ]);
    const secondOnSearch = vi.fn().mockImplementation((v) => [
      {
        field: "title",
        operator: "contains",
        value: v,
      },
    ]);

    const { result, rerender } = renderHook((props) => useSelect(props), {
      initialProps: {
        resource: "posts",
        onSearch: initialOnSearch,
      },
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default!,
            getList: getListMock,
          },
        },
        resources: [{ name: "posts" }],
      }) as any,
    });

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(1));

    result.current.onSearch("1");

    rerender({
      resource: "posts",
      onSearch: secondOnSearch,
    });

    result.current.onSearch("2");

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(initialOnSearch).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(secondOnSearch).toHaveBeenCalledTimes(1));

    result.current.onSearch("");

    rerender({
      resource: "posts",
      onSearch: initialOnSearch,
    });

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(3));
    await waitFor(() => expect(initialOnSearch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(secondOnSearch).toHaveBeenCalledTimes(1));

    await waitFor(() => expect(result.current.query.isSuccess).toBeTruthy());
  });

  it("should sort default data first with selectedOptionsOrder for defaultValue", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["2"],
          selectedOptionsOrder: "selected-first",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              // Default `getMany` mock returns all posts, we need to update it to return appropriate posts
              getMany: ({ ids }) => {
                return Promise.resolve({
                  data: posts.filter((post) => ids.includes(post.id)) as any,
                });
              },
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(result.current.options).toHaveLength(2);
    expect(result.current.options).toEqual([
      { label: "Recusandae consectetur aut atque est.", value: "2" },
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
    ]);
  });

  it("should generate options with custom optionLabel and optionValue functions", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          optionLabel: (item) => `${item.title} - ${item.userId}`,
          optionValue: (item) => `${item.id}`,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });
    const { options } = result.current;
    expect(options).toHaveLength(2);
    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet. - 5",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est. - 36", value: "2" },
    ]);
  });

  // case: undefined means defaultValueQueryOptions should not provided, queryOptions.enabled should be false
  // case: true, false are inverted in queryOptions.enabled and defaultValueQueryOptions.enabled to test not override each other
  it.each([true, false, undefined])(
    "should use defaultValueQueryOptions as default queryOptions in useMany (case: %p)",
    async (enabled) => {
      const mockDataProvider = {
        default: {
          ...MockJSONServer.default,
          getList: vi.fn(() => Promise.resolve({ data: [], total: 0 })),
          getMany: vi.fn(() => Promise.resolve({ data: [] })),
        },
      } as DataProviders;

      renderHook(
        () =>
          useSelect({
            resource: "posts",
            defaultValue: ["1", "2", "3", "4"],
            ...(typeof enabled === "undefined"
              ? {}
              : {
                  defaultValueQueryOptions: {
                    enabled: !enabled,
                  },
                }),
            queryOptions: {
              enabled: !!enabled,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: mockDataProvider,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        if (typeof enabled === "undefined") {
          expect(mockDataProvider.default?.getList).toHaveBeenCalledTimes(0);
          expect(mockDataProvider.default?.getMany).toHaveBeenCalledTimes(0);
          return;
        }

        if (enabled) {
          expect(mockDataProvider.default?.getList).toHaveBeenCalledTimes(1);
          expect(mockDataProvider.default?.getMany).toHaveBeenCalledTimes(0);

          return;
        }

        if (!enabled && typeof enabled !== "undefined") {
          expect(mockDataProvider.default?.getList).toHaveBeenCalledTimes(0);
          expect(mockDataProvider.default?.getMany).toHaveBeenCalledTimes(1);
          return;
        }
      });
    },
  );

  it("should use fetchSize option as pageSize when fetching list", async () => {
    const posts = [
      {
        id: "1",
        title: "Post 1",
      },
      {
        id: "2",
        title: "Post 2",
      },
    ];

    const mockDataProvider = {
      default: {
        ...MockJSONServer.default,
        getList: vi.fn(() => Promise.resolve({ data: posts, total: 2 })),
        getMany: vi.fn(() => Promise.resolve({ data: [...posts] })),
      },
    } as DataProviders;

    renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["1", "2"],
          pagination: {
            currentPage: 1,
            pageSize: 20,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: mockDataProvider as unknown as IDataContext,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockDataProvider.default?.getList).toHaveBeenCalledWith(
      expect.objectContaining({
        filters: [],
        meta: expect.objectContaining({
          queryKey: expect.arrayContaining([
            "data",
            "default",
            "posts",
            "list",
            expect.objectContaining({
              pagination: expect.objectContaining({
                pageSize: 20,
              }),
            }),
          ]),
        }),
        pagination: {
          currentPage: 1,
          mode: "server",
          pageSize: 20,
        },
        resource: "posts",
        sorters: undefined,
      }),
    );
  });

  it("should use onSearch option to get filters", async () => {
    const posts = [
      {
        id: "1",
        title: "Post 1",
      },
      {
        id: "2",
        title: "Post 2",
      },
    ];

    const mockDataProvider = {
      default: {
        ...MockJSONServer.default,
        getList: vi.fn(() => Promise.resolve({ data: posts, total: 2 })),
        getMany: vi.fn(() => Promise.resolve({ data: [...posts] })),
      },
    } as DataProviders;

    const filters: CrudFilter[] = [
      {
        field: "field",
        operator: "lt",
        value: "value",
      },
    ];

    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["1", "2"],
          onSearch: () => filters,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: mockDataProvider as unknown as DataProviders,
          resources: [{ name: "posts" }],
        }),
      },
    );

    const { onSearch } = result.current;

    expect(mockDataProvider.default?.getList).toHaveBeenCalledWith(
      expect.objectContaining({
        filters: [],
        meta: expect.objectContaining({
          queryKey: expect.arrayContaining([
            "data",
            "default",
            "posts",
            "list",
            expect.objectContaining({
              pagination: expect.objectContaining({
                pageSize: 10,
                mode: "server",
              }),
            }),
          ]),
        }),
        pagination: {
          currentPage: 1,
          mode: "server",
          pageSize: 10,
        },
        resource: "posts",
        sorters: undefined,
      }),
    );

    await act(async () => {
      onSearch("1");
    });

    expect(mockDataProvider.default?.getList).toHaveBeenCalledWith(
      expect.objectContaining({
        filters: [],
        meta: expect.objectContaining({
          queryKey: expect.arrayContaining([
            "data",
            "default",
            "posts",
            "list",
            expect.objectContaining({
              pagination: expect.objectContaining({
                pageSize: 10,
                mode: "server",
              }),
            }),
          ]),
        }),
        pagination: {
          currentPage: 1,
          mode: "server",
          pageSize: 10,
        },
        resource: "posts",
        sorters: undefined,
      }),
    );
  });

  describe("searchField", () => {
    const cases = [
      {
        name: "when optionLabel is string",
        optionLabel: "name",
        expectedField: "name",
        searchField: undefined,
      },
      {
        name: "when optionLabel is function",
        optionLabel: (_item: any) => "no",
        expectedField: "title",
        searchField: undefined,
      },
      {
        name: "when searchField is provided",
        optionLabel: "no",
        expectedField: "my-field",
        searchField: "my-field",
      },
    ];

    it.each(cases)("$name", async (params: any) => {
      const getListMock = vi.fn(async () => ({ data: [], total: 0 }));

      const { result } = renderHook(
        () =>
          useSelect({
            resource: "posts",
            optionLabel: params.optionLabel,
            searchField: params.searchField,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
          }),
        },
      );

      result.current.onSearch("John");

      await waitFor(() => {
        expect(getListMock).toHaveBeenCalledTimes(2);
      });

      expect(getListMock).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: [
            {
              field: params.expectedField,
              operator: "contains",
              value: "John",
            },
          ],
        }),
      );
    });
  });

  it("should use pagination option as infinite loading when fetching list", async () => {
    const posts = [
      {
        id: "1",
        title: "Post 1",
      },
      {
        id: "2",
        title: "Post 2",
      },
      {
        id: "3",
        title: "Post 3",
      },
    ];

    const mockDataProvider = {
      default: {
        ...MockJSONServer.default,
        getList: vi.fn(() => Promise.resolve({ data: posts, total: 3 })),
        getMany: vi.fn(() => Promise.resolve({ data: [...posts] })),
      },
    } as DataProviders;

    renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["1", "2", "3"],
          pagination: {
            currentPage: 2,
            pageSize: 1,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: mockDataProvider as unknown as IDataContext,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockDataProvider.default?.getList).toHaveBeenCalledWith(
      expect.objectContaining({
        filters: [],
        pagination: {
          currentPage: 2,
          mode: "server",
          pageSize: 1,
        },
        resource: "posts",
        sorters: undefined,
        meta: expect.objectContaining({
          queryKey: expect.arrayContaining([
            "data",
            "default",
            "posts",
            "list",
            expect.objectContaining({
              filters: [],
              pagination: expect.objectContaining({
                pageSize: 1,
              }),
            }),
          ]),
        }),
      }),
    );
  });

  it("should pass meta from resource defination, hook parameter and query parameters to dataProvider", async () => {
    const getListMock = vi.fn();

    renderHook(() => useSelect({ resource: "posts", meta: { foo: "bar" } }), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            getList: getListMock,
          },
        },
        routerProvider: mockRouterProvider({
          resource: { name: "posts" },
          params: { baz: "qux" },
        }),
        resources: [{ name: "posts", meta: { dip: "dop" } }],
      }),
    });

    await waitFor(() => {
      expect(getListMock).toHaveBeenCalled();
    });

    expect(getListMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
          baz: "qux",
          dip: "dop",
        }),
      }),
    );
  });

  it("two resources with same name, should pass resource meta according to identifier", async () => {
    const getListMock = vi.fn();

    renderHook(() => useSelect({ resource: "recentPosts" }), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            getList: getListMock,
          },
        },
        routerProvider: mockRouterProvider({
          resource: { name: "posts" },
        }),
        resources: [
          {
            name: "posts",
            identifier: "recentPosts",
            meta: {
              startDate: "2021-01-01",
            },
          },
          {
            name: "posts",
            identifier: "popularPosts",
            meta: {
              likes: 100,
            },
          },
        ],
      }),
    });

    await waitFor(() => {
      expect(getListMock).toHaveBeenCalled();
    });

    expect(getListMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          startDate: "2021-01-01",
        }),
      }),
    );

    expect(getListMock).not.toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          likes: 100,
        }),
      }),
    );
  });

  it("should use resourceFromProps", async () => {
    vi.spyOn(pickResource, "pickResource").mockReturnValue(undefined);

    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    await waitFor(() => expect(options).toHaveLength(2));

    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);
  });

  it("works correctly with `interval` and `onInterval` params", async () => {
    const onInterval = vi.fn();
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          overtimeOptions: {
            interval: 100,
            onInterval,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: () => {
                return new Promise((res) => {
                  setTimeout(
                    () =>
                      res({
                        data: [],
                        total: 2,
                      } as any),
                    1000,
                  );
                });
              },
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isLoading).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBe(900);
      expect(onInterval).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(!result.current.query.isLoading).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBeUndefined();
    });
  });
});
