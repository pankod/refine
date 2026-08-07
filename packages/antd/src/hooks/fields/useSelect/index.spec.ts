import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { MockJSONServer, TestWrapper } from "@test";

import { useSelect } from "./";

describe("useSelect Hook", () => {
  it("default", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await waitFor(() => {
      expect(!result.current.query.isFetching).toBeTruthy();
    });

    await waitFor(() =>
      expect(result.current.selectProps.options).toHaveLength(2),
    );
    await waitFor(() =>
      expect(result.current.selectProps.options).toEqual([
        {
          label:
            "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
          value: "1",
        },
        { label: "Recusandae consectetur aut atque est.", value: "2" },
      ]),
    );
  });

  it("defaultValue", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["1", "2", "3", "4"],
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await waitFor(() => {
      expect(!result.current.query.isFetching).toBeTruthy();
    });

    await waitFor(() =>
      expect(result.current.selectProps.options).toHaveLength(2),
    );
    await waitFor(() =>
      expect(result.current.selectProps.options).toEqual([
        {
          label:
            "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
          value: "1",
        },
        { label: "Recusandae consectetur aut atque est.", value: "2" },
      ]),
    );
  });

  it("defaultValue is not an array", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: "1",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await waitFor(() => {
      expect(!result.current.query.isFetching).toBeTruthy();
    });

    await waitFor(() =>
      expect(result.current.selectProps.options).toHaveLength(2),
    );
    await waitFor(() =>
      expect(result.current.selectProps.options).toEqual([
        {
          label:
            "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
          value: "1",
        },
        { label: "Recusandae consectetur aut atque est.", value: "2" },
      ]),
    );
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
        wrapper: TestWrapper({}),
      },
    );

    await waitFor(() => {
      expect(!result.current.query.isFetching).toBeTruthy();
    });

    await waitFor(() =>
      expect(result.current.selectProps.options).toHaveLength(2),
    );
    await waitFor(() =>
      expect(result.current.selectProps.options).toEqual([
        { label: "ut-ad-et", value: "1" },
        { label: "consequatur-molestiae-rerum", value: "2" },
      ]),
    );
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

    const { selectProps } = result.current;

    expect(selectProps.options).toHaveLength(2);
    expect(selectProps.options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet. - 5",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est. - 36", value: "2" },
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
        wrapper: TestWrapper({}),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    await waitFor(() =>
      expect(result.current.selectProps.options).toHaveLength(2),
    );
    await waitFor(() =>
      expect(result.current.selectProps.options).toEqual([
        {
          label:
            "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
          value: "1",
        },
        { label: "Recusandae consectetur aut atque est.", value: "2" },
      ]),
    );
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
            ...MockJSONServer,
            getList: getListMock,
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(1));

    const { selectProps } = result.current;

    selectProps?.onSearch?.("1");
    selectProps?.onSearch?.("12");
    selectProps?.onSearch?.("123");

    await waitFor(() => {
      expect(!result.current.query.isFetching).toBeTruthy();
    });

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(2));
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
            ...MockJSONServer,
            getList: getListMock,
          },
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.query.isFetching).toBeTruthy();
    });

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(1));

    const { selectProps } = result.current;

    selectProps?.onSearch?.("1");
    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(2));

    selectProps?.onSearch?.("2");
    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(3));

    selectProps?.onSearch?.("3");
    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(4));
  });

  it("should work with queryResult and query", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["1", "2", "3", "4"],
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

    expect(result.current.query).toEqual(result.current.query);
  });
});
