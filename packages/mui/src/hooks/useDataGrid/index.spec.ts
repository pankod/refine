import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { MockJSONServer, TestWrapper } from "@test";

import { useDataGrid } from "./";
import type { CrudFilters } from "@refinedev/core";
import { act } from "react-dom/test-utils";
import { posts } from "@test/dataMocks";
import * as core from "@refinedev/core";

describe("useDataGrid Hook", () => {
  it("controlled filtering with 'onSubmit' and 'onSearch'", async () => {
    type SearchVariables = { title: string; status: string };

    const { result } = renderHook(
      () =>
        useDataGrid<any, any, SearchVariables>({
          resource: "posts",
          onSearch: (values) => {
            const filters: CrudFilters = [];

            filters.push(
              {
                field: "title",
                operator: "contains",
                value: values.title,
              },
              {
                field: "status",
                operator: "eq",
                value: values.status,
              },
            );

            return filters;
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await waitFor(() => {
      expect(!result.current.tableQuery?.isLoading).toBeTruthy();
    });

    await act(async () => {
      result.current.search({ title: "test", status: "draft" });
    });

    expect(result.current.filters).toEqual([
      {
        field: "title",
        operator: "contains",
        value: "test",
      },
      {
        field: "status",
        operator: "eq",
        value: "draft",
      },
    ]);
    expect(result.current.currentPage).toEqual(1);
  });

  it.each(["client", "server"] as const)(
    "when pagination mode is %s, should set pagination props in dataGridProps",
    async (mode) => {
      const { result } = renderHook(
        () =>
          useDataGrid({
            pagination: {
              mode,
            },
          }),
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(result.current.dataGridProps).toEqual(
        expect.objectContaining({
          paginationModel: expect.objectContaining({
            pageSize: 25,
            page: 0,
          }),
        }),
      );
    },
  );

  it("when pagination mode is off, should not set pagination props in dataGridProps", async () => {
    const { result } = renderHook(
      () =>
        useDataGrid({
          pagination: {
            mode: "off",
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.dataGridProps).toEqual(
      expect.not.objectContaining({
        paginationModel: expect.objectContaining({
          pageSize: 25,
          page: 0,
        }),
      }),
    );
    expect(result.current.dataGridProps).toEqual(
      expect.objectContaining({
        paginationMode: "client",
      }),
    );
  });

  it.each(["off", "server"] as const)(
    "when filters.mode is %s, should set filterMode to %s",
    async (mode) => {
      const { result } = renderHook(
        () =>
          useDataGrid({
            filters: {
              mode,
            },
          }),
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(result.current.dataGridProps).toEqual(
        expect.objectContaining({
          filterMode: mode === "off" ? "client" : "server",
        }),
      );
    },
  );

  it.each(["off", "server"] as const)(
    "when sorters.mode is %s, should set sortingMode to %s",
    async (mode) => {
      const { result } = renderHook(
        () =>
          useDataGrid({
            sorters: {
              mode,
            },
          }),
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(result.current.dataGridProps).toEqual(
        expect.objectContaining({
          sortingMode: mode === "off" ? "client" : "server",
        }),
      );
    },
  );

  it("works correctly with `interval` and `onInterval` params", async () => {
    const onInterval = vi.fn();
    const { result } = renderHook(
      () =>
        useDataGrid({
          resource: "posts",
          overtimeOptions: {
            interval: 100,
            onInterval,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer,
            getList: () => {
              return new Promise((res) => {
                setTimeout(() => res({ data: [], total: 2 }), 1000);
              });
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isLoading).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBe(900);
      expect(onInterval).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(!result.current.tableQuery.isLoading).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBeUndefined();
    });
  });

  it("when processRowUpdate is called, update data", async () => {
    let postToUpdate: any = posts[0];

    const { result } = renderHook(
      () =>
        useDataGrid({
          resource: "posts",
          editable: true,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer,
            update: async (data) => {
              const resolvedData = await Promise.resolve({ data });
              postToUpdate = resolvedData.data.variables;
            },
          },
        }),
      },
    );
    const newPost = {
      ...postToUpdate,
      title: "New title",
    };

    await act(async () => {
      if (result.current.dataGridProps.processRowUpdate) {
        await result.current.dataGridProps.processRowUpdate(
          newPost,
          postToUpdate,
          {
            rowId: "test-id",
          },
        );
      }
    });

    expect(newPost).toEqual(postToUpdate);
  });

  it("should work with query and queryResult", async () => {
    const { result } = renderHook(
      () =>
        useDataGrid({
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
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.tableQuery).toEqual(result.current.tableQuery);
  });

  it("should pass meta from updateMutationOptions to mutate function", async () => {
    const mockMeta = { customData: "test" };

    const mockDataProvider = {
      ...MockJSONServer,
      update: vi.fn().mockImplementation((params) => {
        expect(params).toEqual(
          expect.objectContaining({
            meta: mockMeta,
          }),
        );
        return Promise.resolve({ data: params.variables });
      }),
    };

    const { result } = renderHook(
      () =>
        useDataGrid({
          resource: "posts",
          editable: true,
          updateMutationOptions: {
            meta: mockMeta,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: mockDataProvider,
          resources: [{ name: "posts" }],
        }),
      },
    );

    const mockRow = { id: "1", title: "Test" };
    const mockOldRow = { id: "1", title: "Old Test" };

    await act(async () => {
      await result.current.dataGridProps.processRowUpdate!(
        mockRow,
        mockOldRow,
        { rowId: "1" },
      );
    });
  });

  describe("onFilterModelChange — field swap value clearing", () => {
    it("clears the carried-over value when only the field changes at the same position", async () => {
      const { result } = renderHook(
        () =>
          useDataGrid({
            resource: "posts",
            filters: { mode: "off" },
          }),
        { wrapper: TestWrapper({}) },
      );

      await waitFor(() => {
        expect(!result.current.tableQuery?.isLoading).toBeTruthy();
      });

      // User picks field "title" with value "X".
      await act(async () => {
        result.current.dataGridProps.onFilterModelChange(
          {
            items: [
              { id: 1, field: "title", operator: "contains", value: "X" },
            ],
          },
          {} as any,
        );
      });

      expect(result.current.filters).toEqual([
        { field: "title", operator: "contains", value: "X" },
      ]);

      // User changes the field to "status" — MUI carries over the old value "X".
      await act(async () => {
        result.current.dataGridProps.onFilterModelChange(
          {
            items: [
              { id: 1, field: "status", operator: "contains", value: "X" },
            ],
          },
          {} as any,
        );
      });

      // The stale value must NOT leak into the data provider as a filter on
      // the new field.
      expect(result.current.filters).toEqual([]);
    });

    it("preserves the value when only the value changes (same field)", async () => {
      const { result } = renderHook(
        () =>
          useDataGrid({
            resource: "posts",
            filters: { mode: "off" },
          }),
        { wrapper: TestWrapper({}) },
      );

      await waitFor(() => {
        expect(!result.current.tableQuery?.isLoading).toBeTruthy();
      });

      await act(async () => {
        result.current.dataGridProps.onFilterModelChange(
          {
            items: [
              { id: 1, field: "title", operator: "contains", value: "X" },
            ],
          },
          {} as any,
        );
      });

      await act(async () => {
        result.current.dataGridProps.onFilterModelChange(
          {
            items: [
              { id: 1, field: "title", operator: "contains", value: "Y" },
            ],
          },
          {} as any,
        );
      });

      expect(result.current.filters).toEqual([
        { field: "title", operator: "contains", value: "Y" },
      ]);
    });

    it("does not clear values when a row is added or removed", async () => {
      const { result } = renderHook(
        () =>
          useDataGrid({
            resource: "posts",
            filters: { mode: "off" },
          }),
        { wrapper: TestWrapper({}) },
      );

      await waitFor(() => {
        expect(!result.current.tableQuery?.isLoading).toBeTruthy();
      });

      await act(async () => {
        result.current.dataGridProps.onFilterModelChange(
          {
            items: [
              { id: 1, field: "title", operator: "contains", value: "X" },
            ],
          },
          {} as any,
        );
      });

      // Adding a second row must not nuke the first row's value.
      await act(async () => {
        result.current.dataGridProps.onFilterModelChange(
          {
            items: [
              { id: 1, field: "title", operator: "contains", value: "X" },
              { id: 2, field: "status", operator: "contains", value: "draft" },
            ],
          },
          {} as any,
        );
      });

      expect(result.current.filters).toEqual([
        { field: "title", operator: "contains", value: "X" },
        { field: "status", operator: "contains", value: "draft" },
      ]);

      // Removing the first row must not nuke the remaining row's value, even
      // though a naive position-by-position diff would see the field change at
      // index 0.
      await act(async () => {
        result.current.dataGridProps.onFilterModelChange(
          {
            items: [
              { id: 2, field: "status", operator: "contains", value: "draft" },
            ],
          },
          {} as any,
        );
      });

      expect(result.current.filters).toEqual([
        { field: "status", operator: "contains", value: "draft" },
      ]);
    });

    it("matches items by GridFilterItem.id so single-step row swaps don't wipe unrelated values", async () => {
      const { result } = renderHook(
        () =>
          useDataGrid({
            resource: "posts",
            filters: { mode: "off" },
          }),
        { wrapper: TestWrapper({}) },
      );

      await waitFor(() => {
        expect(!result.current.tableQuery?.isLoading).toBeTruthy();
      });

      // Seed: two filters with stable ids.
      await act(async () => {
        result.current.dataGridProps.onFilterModelChange(
          {
            items: [
              { id: 1, field: "title", operator: "contains", value: "X" },
              { id: 2, field: "status", operator: "contains", value: "draft" },
            ],
          },
          {} as any,
        );
      });

      // Single-step change: row id=1 is removed and id=3 is added at the same
      // time, so length is preserved. A naive index diff would compare
      // previous id=1 (title) against new id=2 (status) at position 0 and
      // wipe the untouched "draft" value.
      await act(async () => {
        result.current.dataGridProps.onFilterModelChange(
          {
            items: [
              { id: 2, field: "status", operator: "contains", value: "draft" },
              {
                id: 3,
                field: "created_at",
                operator: "contains",
                value: "2024",
              },
            ],
          },
          {} as any,
        );
      });

      expect(result.current.filters).toEqual([
        { field: "status", operator: "contains", value: "draft" },
        { field: "created_at", operator: "contains", value: "2024" },
      ]);
    });

    it("does not misidentify a value-only edit as a field swap after search() rewrites filters", async () => {
      const { result } = renderHook(
        () =>
          useDataGrid<any, any, { title: string }>({
            resource: "posts",
            filters: { mode: "off" },
            onSearch: (values) => [
              {
                field: "status",
                operator: "contains" as const,
                value: values.title,
              },
            ],
          }),
        { wrapper: TestWrapper({}) },
      );

      await waitFor(() => {
        expect(!result.current.tableQuery?.isLoading).toBeTruthy();
      });

      // User edits the grid: field "title" with value "X".
      await act(async () => {
        result.current.dataGridProps.onFilterModelChange(
          {
            items: [
              { id: 1, field: "title", operator: "contains", value: "X" },
            ],
          },
          {} as any,
        );
      });

      // External: search() rewrites filters to a different field. The grid's
      // controlled filterModel now reflects {field: "status"} but the cached
      // previous model still says {field: "title"}.
      await act(async () => {
        await result.current.search({ title: "draft" });
      });

      // User edits only the value of the (now status) row. Without the ref
      // being reset in search(), the position-0 diff would see
      // "title" !== "status" and wipe the new value.
      await act(async () => {
        result.current.dataGridProps.onFilterModelChange(
          {
            items: [
              {
                id: 1,
                field: "status",
                operator: "contains",
                value: "published",
              },
            ],
          },
          {} as any,
        );
      });

      expect(result.current.filters).toEqual([
        { field: "status", operator: "contains", value: "published" },
      ]);
    });

    it("clears the carried-over value in server filter mode (debounced)", async () => {
      const { result } = renderHook(
        () =>
          useDataGrid({
            resource: "posts",
            // default mode is "server" — debounced applyFilters via setTimeout.
          }),
        { wrapper: TestWrapper({}) },
      );

      await waitFor(() => {
        expect(!result.current.tableQuery?.isLoading).toBeTruthy();
      });

      vi.useFakeTimers();
      try {
        await act(async () => {
          result.current.dataGridProps.onFilterModelChange(
            {
              items: [
                { id: 1, field: "title", operator: "contains", value: "X" },
              ],
            },
            {} as any,
          );
        });

        // Flush the first debounce so the title="X" filter actually lands in
        // `result.current.filters` before we trigger the field swap.
        await act(async () => {
          vi.advanceTimersByTime(301);
        });

        expect(result.current.filters).toEqual([
          { field: "title", operator: "contains", value: "X" },
        ]);

        // User swaps the field to "status" while MUI carries over value "X".
        await act(async () => {
          result.current.dataGridProps.onFilterModelChange(
            {
              items: [
                { id: 1, field: "status", operator: "contains", value: "X" },
              ],
            },
            {} as any,
          );
        });

        // Before the debounce fires, the data provider should not see the new
        // model yet — filters still reflect the previous state.
        expect(result.current.filters).toEqual([
          { field: "title", operator: "contains", value: "X" },
        ]);

        // After debounce, the cleared value must not have leaked.
        await act(async () => {
          vi.advanceTimersByTime(301);
        });

        expect(result.current.filters).toEqual([]);
      } finally {
        vi.useRealTimers();
      }
    });
  });

  it("should not change sortModel when page changes", async () => {
    const { result } = renderHook(
      () =>
        useDataGrid({
          resource: "posts",
          sorters: {
            initial: [
              {
                field: "title",
                order: "asc",
              },
            ],
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    // Capture initial sortModel
    const initialSortModel = result.current.dataGridProps.sortModel;
    expect(initialSortModel).toEqual([
      {
        field: "title",
        sort: "asc",
      },
    ]);

    // Change page using onPaginationModelChange from dataGridPaginationValues
    await act(async () => {
      result.current.dataGridProps.onPaginationModelChange!(
        {
          page: 3,
          pageSize: 25,
        },
        {} as any,
      );
    });

    await waitFor(() => {
      expect(result.current.currentPage).toBe(4);
    });

    // sortModel should remain the same object reference after page change
    const sortModelAfterPageChange = result.current.dataGridProps.sortModel;
    expect(sortModelAfterPageChange).toBe(initialSortModel);
    expect(sortModelAfterPageChange).toEqual([
      {
        field: "title",
        sort: "asc",
      },
    ]);
  });
});
