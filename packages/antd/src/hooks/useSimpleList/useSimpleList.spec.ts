import { createElement } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { Form, Input } from "antd";

import { MockJSONServer, TestWrapper, render } from "@test";

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

  it("should pass form values to search form from params (syncWithLocation)", async () => {
    const Component = () => {
      const { searchFormProps } = useSimpleList({
        resource: "categories",
        syncWithLocation: true,
      });

      return createElement(
        Form,
        searchFormProps,
        createElement(
          Form.Item,
          { name: "name", noStyle: true },
          createElement(Input),
        ),
      );
    };

    const { getByDisplayValue } = render(createElement(Component), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        routerProvider: {
          parse: () => {
            return () => ({
              resource: {
                name: "posts",
              },
              params: {
                filters: [
                  {
                    field: "name",
                    operator: "contains",
                    value: "Some Name To Look For",
                  },
                ],
              },
            });
          },
        },
      }),
    });

    await waitFor(() => {
      expect(getByDisplayValue("Some Name To Look For")).toBeInTheDocument();
    });
  });

  it("should pass form values parsed by onParse to search form from params (syncWithLocation)", async () => {
    const Component = () => {
      const { searchFormProps } = useSimpleList({
        resource: "categories",
        syncWithLocation: true,
        onParse: (filters) => {
          const nameFilter = filters.find(
            (f) => "field" in f && f.field === "name",
          );
          return {
            name: nameFilter?.value ? `Parsed: ${nameFilter.value}` : "",
          };
        },
      });

      return createElement(
        Form,
        searchFormProps,
        createElement(
          Form.Item,
          { name: "name", noStyle: true },
          createElement(Input),
        ),
      );
    };

    const { getByDisplayValue } = render(createElement(Component), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        routerProvider: {
          parse: () => {
            return () => ({
              resource: {
                name: "posts",
              },
              params: {
                filters: [
                  {
                    field: "name",
                    operator: "contains",
                    value: "Some Name To Look For",
                  },
                ],
              },
            });
          },
        },
      }),
    });

    await waitFor(() => {
      expect(
        getByDisplayValue("Parsed: Some Name To Look For"),
      ).toBeInTheDocument();
    });
  });
});
