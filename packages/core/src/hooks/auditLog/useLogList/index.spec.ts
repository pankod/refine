import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { TestWrapper, queryClient } from "@test";

import { useLogList } from "./";

const auditLogProviderGetMock = vi.fn();

describe("useLogList Hook", () => {
  beforeEach(() => {
    auditLogProviderGetMock.mockReset();
  });

  it("useLogList should call the auditLogProvider's list method with same properties", async () => {
    const { result } = renderHook(
      () =>
        useLogList({
          resource: "posts",
          action: "list",
          meta: { id: 1 },
        }),
      {
        wrapper: TestWrapper({
          auditLogProvider: {
            get: auditLogProviderGetMock.mockResolvedValue([
              {
                id: 1,
                action: "create",
                data: { id: 1, title: "title" },
              },
            ]),
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isFetched).toBeTruthy();
    });

    expect(auditLogProviderGetMock).toHaveBeenCalledWith({
      resource: "posts",
      action: "list",
      meta: { id: 1 },
    });

    expect(result.current?.data).toStrictEqual([
      {
        id: 1,
        action: "create",
        data: { id: 1, title: "title" },
      },
    ]);
  });

  it("should override `queryKey` with `queryOptions.queryKey`", async () => {
    const getMock = vi.fn().mockResolvedValue([
      {
        id: 1,
        action: "create",
        data: { id: 1, title: "title" },
      },
    ]);

    const { result } = renderHook(
      () =>
        useLogList({
          resource: "posts",
          action: "list",
          meta: { id: 1 },
          queryOptions: {
            queryKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          auditLogProvider: {
            get: getMock,
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(
      queryClient.getQueryCache().findAll({
        queryKey: ["foo", "bar"],
      }),
    ).toHaveLength(1);
  });

  it("should override `queryFn` with `queryOptions.queryFn`", async () => {
    const getMock = vi.fn().mockResolvedValue([
      {
        id: 1,
        action: "create",
        data: { id: 1, title: "title" },
      },
    ]);
    const queryFnMock = vi.fn().mockResolvedValue([
      {
        id: 1,
        action: "create",
        data: { id: 1, title: "title" },
      },
    ]);

    const { result } = renderHook(
      () =>
        useLogList({
          resource: "posts",
          action: "list",
          meta: { id: 1 },
          queryOptions: {
            queryFn: queryFnMock,
          },
        }),
      {
        wrapper: TestWrapper({
          auditLogProvider: {
            get: getMock,
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(getMock).not.toHaveBeenCalled();
    expect(queryFnMock).toHaveBeenCalled();
  });
});
