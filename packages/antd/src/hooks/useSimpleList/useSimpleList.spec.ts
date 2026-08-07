import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useSimpleList } from "./useSimpleList";

const defaultPagination = {
  pageSize: 10,
  current: 1,
  total: 2,
};

const routerProvider = {
  parse: () => {
    return () => ({
      resource: {
        name: "posts",
      },
    });
  },
};

describe("useSimpleList Hook", () => {
  it("default", async () => {
    const { result } = renderHook(() => useSimpleList(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
        routerProvider,
      }),
    });

    await waitFor(() => {
      expect(!result.current.listProps.loading).toBeTruthy();
    });

    const {
      listProps: { pagination, dataSource },
    } = result.current;

    expect(dataSource).toHaveLength(2);
    expect(pagination).toEqual({
      ...defaultPagination,
      onChange: (pagination as any).onChange,
      itemRender: (pagination as any).itemRender,
      simple: true,
    });
  });

  it("with initial pagination parameters", async () => {
    const { result } = renderHook(
      () =>
        useSimpleList({
          pagination: {
            pageSize: 1,
            currentPage: 2,
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
      expect(!result.current.listProps.loading).toBeTruthy();
    });

    expect(result.current.listProps.pagination).toEqual(
      expect.objectContaining({
        pageSize: 1,
        current: 2,
      }),
    );
  });

  it("with disabled pagination", async () => {
    const { result } = renderHook(
      () =>
        useSimpleList({
          pagination: {
            mode: "off",
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.listProps.loading).toBeTruthy();
    });

    const {
      listProps: { pagination },
    } = result.current;

    expect(pagination).toBe(false);
  });

  it("with custom resource", async () => {
    const { result } = renderHook(
      () =>
        useSimpleList({
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
      expect(!result.current.listProps.loading).toBeTruthy();
    });

    const {
      listProps: { dataSource },
    } = result.current;

    expect(dataSource).toHaveLength(2);
  });

  it.each(["client", "server"] as const)(
    "when pagination mode is %s, should set pagination props",
    async (mode) => {
      const { result } = renderHook(
        () =>
          useSimpleList({
            pagination: {
              mode,
            },
          }),
        {
          wrapper: TestWrapper({
            routerProvider,
          }),
        },
      );

      expect(result.current.listProps.pagination).toEqual(
        expect.objectContaining({
          pageSize: 10,
          current: 1,
        }),
      );
    },
  );

  it("when pagination mode is off, pagination should be false", async () => {
    const { result } = renderHook(
      () =>
        useSimpleList({
          pagination: {
            mode: "off",
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    expect(result.current.listProps.pagination).toBeFalsy();
  });

  it("should work with query and queryResult", async () => {
    const { result } = renderHook(() => useSimpleList(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
        routerProvider,
      }),
    });

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(result.current.query).toEqual(result.current.query);
  });
});
