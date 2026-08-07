import React from "react";
import type { CrudFilters } from "@refinedev/core";
import isEqual from "lodash/isEqual";
import { renderHook, waitFor } from "@testing-library/react";
import { Form, Input } from "antd";
import { act, TestWrapper, render, MockJSONServer } from "@test";

import { useTable } from "./useTable";

const defaultPagination = {
  pageSize: 10,
  current: 1,
  total: 2,
  simple: true,
  position: ["bottomCenter"],
};

const customPagination = {
  current: 2,
  pageSize: 1,
  total: 2,
  simple: true,
  position: ["bottomCenter"],
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

describe("useTable Hook", () => {
  it("default", async () => {
    const { result } = renderHook(() => useTable(), {
      wrapper: TestWrapper({
        routerProvider,
      }),
    });

    await waitFor(() => {
      expect(!result.current.tableProps.loading).toBeTruthy();
    });

    const {
      tableProps: { pagination, dataSource },
    } = result.current;

    expect(dataSource).toHaveLength(2);
    expect(pagination).toEqual(expect.objectContaining(defaultPagination));
  });

  it("with initial pagination parameters", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          pagination: {
            currentPage: customPagination.current,
            pageSize: customPagination.pageSize,
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.tableProps.loading).toBeTruthy();
    });

    const {
      tableProps: { pagination },
    } = result.current;

    expect(pagination).toEqual(expect.objectContaining(customPagination));
  });

  it("with custom resource", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          resource: "categories",
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.tableProps.loading).toBeTruthy();
    });

    const {
      tableProps: { dataSource },
    } = result.current;

    expect(dataSource).toHaveLength(2);
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
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.tableProps.loading).toBeTruthy();
    });

    const {
      tableProps: { dataSource },
    } = result.current;

    expect(dataSource).toHaveLength(2);
  });

  it("should success data with resource", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          resource: "categories",
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });
  });

  it("should set filters manually with `setFilters`", async () => {
    const initialFilter: CrudFilters = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ];

    const { result } = renderHook(
      () =>
        useTable({
          resource: "categories",
          filters: {
            initial: initialFilter,
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    const nextFilters: CrudFilters = [
      {
        field: "name",
        operator: "contains",
        value: "x",
      },
      {
        field: "id",
        operator: "gte",
        value: 1,
      },
    ];

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    await act(async () => {
      result.current.setFilters(nextFilters);
    });

    // TODO: update tests
    await waitFor(() => {
      return isEqual(result.current.filters, [...nextFilters]);
    });
  });

  it('should change behavior to `replace` when `defaultSetFilterBehavior="replace"`', async () => {
    const { result } = renderHook(
      () =>
        useTable({
          resource: "categories",
          filters: {
            initial: [
              {
                field: "name",
                operator: "eq",
                value: "test",
              },
              {
                field: "id",
                operator: "gte",
                value: 1,
              },
            ],
            defaultBehavior: "replace",
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    const newFilters: CrudFilters = [
      {
        field: "name",
        operator: "eq",
        value: "next-test",
      },
      {
        field: "other-field",
        operator: "contains",
        value: "other",
      },
    ];

    await act(async () => {
      result.current.setFilters(newFilters);
    });

    await waitFor(() => {
      return isEqual(result.current.filters, newFilters);
    });
  });

  it.each(["client", "server"] as const)(
    "when pagination mode is %s, should set pagination props",
    async (mode) => {
      const { result } = renderHook(
        () =>
          useTable({
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

      expect(result.current.tableProps.pagination).toEqual(
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
        useTable({
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

    expect(result.current.tableProps.pagination).toBeFalsy();
  });

  it("should pass form values to search form from params (syncWithLocation)", async () => {
    const Component = () => {
      const { searchFormProps } = useTable({
        resource: "categories",
        syncWithLocation: true,
      });

      return (
        <Form {...searchFormProps}>
          <Form.Item name="name" noStyle>
            <Input
              data-test-id="search-name"
              size="large"
              placeholder="Search by name"
            />
          </Form.Item>
        </Form>
      );
    };

    const { getByDisplayValue } = render(<Component />, {
      wrapper: TestWrapper({
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

  it("should work with query and queryResult", async () => {
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
