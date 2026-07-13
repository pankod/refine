import { vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";

import { MockJSONServer, TestWrapper, mockRouterProvider } from "@test";

import { useTable } from ".";
import type { CrudFilter, CrudSort } from "../../contexts/data/types";
import { defaultRefineOptions } from "@contexts/refine";

const defaultPagination = {
  pageSize: 10,
  currentPage: 1,
};

const customPagination = {
  currentPage: 2,
  defaultCurrentPage: 2,
  defaultPageSize: 1,
  pageSize: 1,
};

const routerProvider = mockRouterProvider({
  resource: {
    name: "posts",
  },
});

describe("useTable Hook", () => {
  it("default", async () => {
    const { result } = renderHook(() => useTable(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
        routerProvider,
      }),
    });

    await waitFor(() => {
      expect(!result.current.tableQuery.isLoading).toBeTruthy();
    });

    const {
      tableQuery: { data },
      pageSize,
      currentPage,
      pageCount,
      result: tableResult,
    } = result.current;

    expect(data?.data).toHaveLength(2);
    expect(pageSize).toEqual(defaultPagination.pageSize);
    expect(currentPage).toEqual(defaultPagination.currentPage);
    expect(pageCount).toEqual(1);
    expect(tableResult.data).toHaveLength(2);
    expect(tableResult.total).toBe(2);
  });

  it("should preserve additional result fields from useList", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: () =>
                Promise.resolve({
                  data: [],
                  total: 0,
                  foo: "bar",
                }),
            },
          },
          resources: [{ name: "posts" }],
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.result.foo).toBe("bar");
  });

  it("with initial pagination parameters", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          pagination: {
            currentPage: customPagination.defaultCurrentPage,
            pageSize: customPagination.defaultPageSize,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.tableQuery.isLoading).toBeTruthy();
    });

    const { pageSize, currentPage, pageCount } = result.current;

    expect(pageSize).toEqual(customPagination.pageSize);
    expect(currentPage).toEqual(customPagination.currentPage);
    expect(pageCount).toEqual(2);
  });

  it("with custom resource", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          resource: "categories",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }, { name: "categories" }],
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.tableQuery.isLoading).toBeTruthy();
    });

    const {
      tableQuery: { data },
      result: tableResult,
    } = result.current;

    expect(data?.data).toHaveLength(2);
    expect(tableResult.data).toHaveLength(2);
    expect(tableResult.total).toBe(2);
  });

  it("with syncWithLocation", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          resource: "categories",
          syncWithLocation: true,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }, { name: "categories" }],
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.tableQuery.isLoading).toBeTruthy();
    });

    const {
      tableQuery: { data },
      result: tableResult,
    } = result.current;

    expect(data?.data).toHaveLength(2);
    expect(tableResult.data).toHaveLength(2);
    expect(tableResult.total).toBe(2);
  });

  it("should success data with resource", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          resource: "categories",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }, { name: "categories" }],
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });
  });

  it("should return result property with data and total", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.tableQuery.isLoading).toBeTruthy();
    });

    const { result: tableResult } = result.current;

    expect(tableResult).toBeDefined();
    expect(tableResult.data).toBeDefined();
    expect(tableResult.total).toBeDefined();
    expect(Array.isArray(tableResult.data)).toBeTruthy();
    expect(typeof tableResult.total).toBe("number");
    expect(tableResult.data).toHaveLength(2);
    expect(tableResult.total).toBe(2);
  });

  it("pagination should be prioritized over initialCurrent and initialPageSize", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          pagination: {
            currentPage: 1,
            pageSize: 10,
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
          dataProvider: MockJSONServer,
        }),
      },
    );

    expect(result.current.pageSize).toBe(10);
    expect(result.current.currentPage).toBe(1);
  });

  it("when deprecated setSorter is called, it should update sorter and sorters", async () => {
    const { result } = renderHook(() => useTable({}), {
      wrapper: TestWrapper({
        routerProvider,
        dataProvider: MockJSONServer,
      }),
    });

    const sorters: CrudSort[] = [{ field: "id", order: "asc" }];

    await act(async () => {
      result.current.setSorters(sorters);
    });

    expect(result.current.sorters).toStrictEqual(sorters);
  });

  it("when setSorters is called, it should update deprecated sorter and sorters", async () => {
    const { result } = renderHook(() => useTable({}), {
      wrapper: TestWrapper({
        routerProvider,
        dataProvider: MockJSONServer,
      }),
    });

    const sorters: CrudSort[] = [{ field: "id", order: "asc" }];

    await act(async () => {
      result.current.setSorters(sorters);
    });

    expect(result.current.sorters).toStrictEqual(sorters);
  });

  it("`filters.initial` should be prioritized over initialFilter", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: [{ field: "id", operator: "contains", value: "foo" }],
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
          dataProvider: MockJSONServer,
        }),
      },
    );

    expect(result.current.filters).toStrictEqual([
      { field: "id", operator: "contains", value: "foo" },
    ]);
  });

  it("`filters.permanent` should be prioritized over permanentFilter", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            permanent: [{ field: "id", operator: "contains", value: "foo" }],
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
          dataProvider: MockJSONServer,
        }),
      },
    );

    expect(result.current.filters).toStrictEqual([
      { field: "id", operator: "contains", value: "foo" },
    ]);
  });

  it("`filters.defaultBehavior` should be prioritized over defaultSetFilterBehavior", async () => {
    const initialFilters = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const newFilters = [
      {
        field: "id",
        operator: "ne",
        value: 5,
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilters,
            defaultBehavior: "replace",
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
          dataProvider: MockJSONServer,
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(initialFilters);
    expect(result.current.filters).toHaveLength(1);

    act(() => {
      result.current.setFilters(newFilters);
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(newFilters);
    expect(result.current.filters).toHaveLength(1);
  });

  it("should use sorters.initial", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          sorters: {
            initial: [{ field: "title", order: "desc" }],
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
          dataProvider: MockJSONServer,
        }),
      },
    );

    expect(result.current.sorters).toStrictEqual([
      { field: "title", order: "desc" },
    ]);
  });

  it("should use sorters.permanent", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          sorters: {
            permanent: [{ field: "title", order: "desc" }],
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
          dataProvider: MockJSONServer,
        }),
      },
    );

    expect(result.current.sorters).toStrictEqual([
      { field: "title", order: "desc" },
    ]);
  });

  it("pagination should be prioritized over initialCurrent and initialPageSize", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          pagination: {
            currentPage: 1,
            pageSize: 10,
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
          dataProvider: MockJSONServer,
        }),
      },
    );

    expect(result.current.pageSize).toBe(10);
    expect(result.current.currentPage).toBe(1);
  });

  it("when deprecated setSorter is called, it should update sorter and sorters", async () => {
    const { result } = renderHook(() => useTable({}), {
      wrapper: TestWrapper({
        routerProvider,
        dataProvider: MockJSONServer,
      }),
    });

    const sorters: CrudSort[] = [{ field: "id", order: "asc" }];

    await act(async () => {
      result.current.setSorters(sorters);
    });

    expect(result.current.sorters).toStrictEqual(sorters);
  });

  it("when setSorters is called, it should update deprecated sorter and sorters", async () => {
    const { result } = renderHook(() => useTable({}), {
      wrapper: TestWrapper({
        routerProvider,
        dataProvider: MockJSONServer,
      }),
    });

    const sorters: CrudSort[] = [{ field: "id", order: "asc" }];

    await act(async () => {
      result.current.setSorters(sorters);
    });

    expect(result.current.sorters).toStrictEqual(sorters);
  });

  it("works correctly with `interval` and `onInterval` params", async () => {
    const onInterval = vi.fn();
    const { result } = renderHook(
      () =>
        useTable({
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
                  setTimeout(() => res({ data: [], total: 2 }), 1000);
                });
              },
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isFetching).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBe(900);
      expect(onInterval).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(!result.current.tableQuery.isFetching).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBeUndefined();
    });
  });

  it("should call onInterval once at ticks (no duplicates)", async () => {
    const onInterval = vi.fn();
    const { result } = renderHook(
      () =>
        useTable({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          refineProvider: {
            mutationMode: "pessimistic",
            syncWithLocation: false,
            warnWhenUnsavedChanges: false,
            undoableTimeout: 5000,
            liveMode: "off",
            options: {
              ...defaultRefineOptions,
              overtime: {
                enabled: true,
                interval: 100,
                onInterval,
              },
            },
          },
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: () => {
                return new Promise((res) => {
                  setTimeout(() => res({ data: [], total: 2 }), 1000);
                });
              },
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isFetching).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBe(900);
      expect(onInterval).toHaveBeenCalledTimes(9);
    });

    await waitFor(() => {
      expect(!result.current.tableQuery.isFetching).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBeUndefined();
    });
  });

  it("should work with tableQuery and tableQuery", async () => {
    const { result } = renderHook(() => useTable(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
        routerProvider,
      }),
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.tableQuery).toEqual(result.current.tableQuery);
  });
});

describe("useTable Filters", () => {
  const wrapper = TestWrapper({
    dataProvider: MockJSONServer,
    resources: [{ name: "posts" }],
    routerProvider,
  });

  it("should be empty initially", async () => {
    const { result } = renderHook(() => useTable(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toHaveLength(0);
  });

  it("should only present permanentFilters initially", async () => {
    const permanentFilter = [
      {
        field: "id",
        operator: "gte",
        value: 5,
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            permanent: permanentFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(permanentFilter);
    expect(result.current.filters).toHaveLength(1);
  });

  it("should only present initialFilters initially", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(initialFilter);
    expect(result.current.filters).toHaveLength(1);
  });

  it("should include both initial and permanent filters initially", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];
    const permanentFilter = [
      {
        field: "id",
        operator: "gte",
        value: 5,
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
            permanent: permanentFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual([
      ...initialFilter,
      ...permanentFilter,
    ]);
    expect(result.current.filters).toHaveLength(2);
    expect(result.current.filters).toEqual(
      expect.arrayContaining(initialFilter),
    );
    expect(result.current.filters).toEqual(
      expect.arrayContaining(permanentFilter),
    );
  });

  it("permanent filter should take precedence over initial filter", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];
    const permanentFilter = [
      {
        field: "name",
        operator: "contains",
        value: "foo",
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
            permanent: permanentFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(permanentFilter);
    expect(result.current.filters).toHaveLength(1);
  });

  it("[behavior=merge] should merge new filters with existing ones", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const newFilters = [
      {
        field: "id",
        operator: "gte",
        value: 5,
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(initialFilter);
    expect(result.current.filters).toHaveLength(1);

    act(() => {
      result.current.setFilters(newFilters, "merge");
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(
      expect.arrayContaining([...initialFilter, ...newFilters]),
    );
    expect(result.current.filters).toHaveLength(2);
  });

  it("[behavior=merge] permanent filter should not be overwritten", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const permanentFilter = [
      {
        field: "id",
        operator: "ne",
        value: 3,
      },
    ] as CrudFilter[];

    const newFilters = [
      {
        field: "id",
        operator: "ne",
        value: 5,
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
            permanent: permanentFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(
      expect.arrayContaining([...initialFilter, ...permanentFilter]),
    );
    expect(result.current.filters).toHaveLength(2);

    act(() => {
      result.current.setFilters(newFilters, "merge");
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(
      expect.arrayContaining([...initialFilter, ...permanentFilter]),
    );
    expect(result.current.filters).toHaveLength(2);
    // should not contain newFilters elements
    expect(result.current.filters).toEqual(
      expect.not.arrayContaining(newFilters),
    );
  });

  it("[behavior=merge] should merge new filters and remove duplicates", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const permanentFilter = [
      {
        field: "id",
        operator: "ne",
        value: 3,
      },
    ] as CrudFilter[];

    const newFilters = [
      {
        field: "name",
        operator: "contains",
        value: "foo",
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
            permanent: permanentFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual([
      ...initialFilter,
      ...permanentFilter,
    ]);
    expect(result.current.filters).toHaveLength(2);

    act(() => {
      result.current.setFilters(newFilters, "merge");
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(
      expect.arrayContaining([...newFilters, ...permanentFilter]),
    );
    expect(result.current.filters).toHaveLength(2);
    // should not contain initialFilter elements
    expect(result.current.filters).toEqual(
      expect.not.arrayContaining(initialFilter),
    );
    // should contain newFilter elements
    expect(result.current.filters).toEqual(expect.arrayContaining(newFilters));
  });

  it("[behavior=merge] should remove the filter when value is undefined/null", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const newFilters = [
      {
        field: "name",
        operator: "contains",
        value: undefined,
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(initialFilter);
    expect(result.current.filters).toHaveLength(1);

    act(() => {
      result.current.setFilters(newFilters, "merge");
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toHaveLength(0);
    // should not contain initialFilter elements
    expect(result.current.filters).toEqual(
      expect.not.arrayContaining(initialFilter),
    );
    // should contain newFilter elements
    expect(result.current.filters).toEqual(
      expect.not.arrayContaining(newFilters),
    );
  });

  it("[behavior=replace] should replace the existing filters with newFilters", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const newFilters = [
      {
        field: "id",
        operator: "ne",
        value: 5,
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(initialFilter);
    expect(result.current.filters).toHaveLength(1);

    act(() => {
      result.current.setFilters(newFilters, "replace");
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(newFilters);
    expect(result.current.filters).toHaveLength(1);
  });

  it("[behavior=replace] replace behavior should not overwrite permanent filters", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const permanentFilter = [
      {
        field: "id",
        operator: "ne",
        value: 3,
      },
    ] as CrudFilter[];

    const newFilters = [
      {
        field: "id",
        operator: "ne",
        value: 5,
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
            permanent: permanentFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual([
      ...initialFilter,
      ...permanentFilter,
    ]);
    expect(result.current.filters).toHaveLength(2);

    act(() => {
      result.current.setFilters(newFilters, "replace");
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(permanentFilter);
    // should not contain newFilters elements
    expect(result.current.filters).toEqual(
      expect.not.arrayContaining(newFilters),
    );
    // should not contain initialFilter elements (because of replace behavior)
    expect(result.current.filters).toEqual(
      expect.not.arrayContaining(initialFilter),
    );
  });

  it("[behavior=replace] should remove duplicates in the newFilters array", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const newFilters = [
      {
        field: "id",
        operator: "ne",
        value: 5,
      },
      {
        field: "name",
        operator: "contains",
        value: "this-should-be-in-it",
      },
      {
        field: "name",
        operator: "contains",
        value: "foo",
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(initialFilter);
    expect(result.current.filters).toHaveLength(1);

    act(() => {
      result.current.setFilters(newFilters, "replace");
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(
      expect.arrayContaining([newFilters[0], newFilters[1]]),
    );
    expect(result.current.filters).toHaveLength(2);

    // should not contain initialFilter elements
    expect(result.current.filters).toEqual(
      expect.not.arrayContaining(initialFilter),
    );

    // item at index = 2 should be ignored because of index = 1
    expect(result.current.filters).toEqual(
      expect.not.arrayContaining([newFilters[2]]),
    );
  });

  it("should use behavior = merge (default) by default", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const newFilters = [
      {
        field: "id",
        operator: "gte",
        value: 5,
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(initialFilter);
    expect(result.current.filters).toHaveLength(1);

    act(() => {
      result.current.setFilters(newFilters);
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(
      expect.arrayContaining([...initialFilter, ...newFilters]),
    );
    expect(result.current.filters).toHaveLength(2);
  });

  it("should use `defaultSetFiltersBehavior` property as default behavior (replace)", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const newFilters = [
      {
        field: "id",
        operator: "ne",
        value: 5,
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
            defaultBehavior: "replace",
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(initialFilter);
    expect(result.current.filters).toHaveLength(1);

    act(() => {
      result.current.setFilters(newFilters);
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(newFilters);
    expect(result.current.filters).toHaveLength(1);
  });

  it("[setter function] should set the return value of the setter function as filters", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const newFilters = [
      {
        field: "id",
        operator: "ne",
        value: 5,
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(initialFilter);
    expect(result.current.filters).toHaveLength(1);

    act(() => {
      result.current.setFilters(() => newFilters);
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(newFilters);
    expect(result.current.filters).toHaveLength(1);
  });

  it("[setter function] should pass the existing filters as first argument", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const newFilters = [
      {
        field: "id",
        operator: "ne",
        value: 5,
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(initialFilter);
    expect(result.current.filters).toHaveLength(1);

    const setterFunction = vi.fn(
      (prevFilters) => [...prevFilters, ...newFilters] as CrudFilter[],
    );

    act(() => {
      result.current.setFilters(setterFunction);
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(setterFunction).toHaveBeenCalledTimes(1);
    expect(setterFunction).toHaveBeenCalledWith(initialFilter);

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(
      expect.arrayContaining([...initialFilter, ...newFilters]),
    );
    expect(result.current.filters).toHaveLength(2);
  });

  it("[setter function] should not be able to overwrite permanent filters", async () => {
    const initialFilter = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ] as CrudFilter[];

    const newFilters = [
      {
        field: "id",
        operator: "gte",
        value: 3,
      },
    ] as CrudFilter[];

    const permanentFilter = [
      {
        field: "id",
        operator: "gte",
        value: 5,
      },
    ] as CrudFilter[];

    const { result } = renderHook(
      () =>
        useTable({
          filters: {
            initial: initialFilter,
            permanent: permanentFilter,
          },
        }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(
      expect.arrayContaining([...initialFilter, ...permanentFilter]),
    );
    expect(result.current.filters).toHaveLength(2);

    act(() => {
      result.current.setFilters(() => newFilters);
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.filters).toBeInstanceOf(Array);
    expect(result.current.filters).toEqual(
      expect.arrayContaining(permanentFilter),
    );
    expect(result.current.filters).toEqual(
      expect.not.arrayContaining(newFilters),
    );
    expect(result.current.filters).toEqual(
      expect.not.arrayContaining(initialFilter),
    );
    expect(result.current.filters).toHaveLength(1);
  });

  it("should pass meta from resource defination, hook parameter and query parameters to dataProvider", async () => {
    const getListMock = vi.fn();

    renderHook(() => useTable({ resource: "posts", meta: { foo: "bar" } }), {
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

    renderHook(() => useTable({ resource: "recentPosts" }), {
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
});
