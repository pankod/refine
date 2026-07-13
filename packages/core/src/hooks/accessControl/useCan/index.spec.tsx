import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { TestWrapper, queryClient } from "@test";

import { useCan } from ".";
import { useCanWithoutCache } from "..";

describe("useCan Hook", () => {
  it("can should return the true ", async () => {
    const { result } = renderHook(
      () =>
        useCan({
          action: "list",
          resource: "posts",
          params: { id: 1 },
        }),
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: ({ resource, action, params }) => {
              if (
                action === "list" &&
                resource === "posts" &&
                params?.id === 1
              ) {
                return Promise.resolve({
                  can: true,
                  reason: "Access granted",
                });
              }
              return Promise.resolve({ can: false });
            },
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current?.isFetched).toBeTruthy();
    });

    expect(result.current?.data?.can).toBeTruthy();
    expect(result.current?.data?.reason).toBe("Access granted");
  });

  it("can should return the false ", async () => {
    const { result } = renderHook(
      () =>
        useCan({
          action: "list",
          resource: "posts",
          params: { id: 10 },
        }),
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: ({ resource, action, params }) => {
              if (
                action === "list" &&
                resource === "posts" &&
                params?.id === 1
              ) {
                return Promise.resolve({
                  can: true,
                  reason: "Access granted",
                });
              }
              return Promise.resolve({
                can: false,
                reason: "Access Denied",
              });
            },
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current?.isFetched).toBeTruthy();
    });

    expect(result.current?.data?.can).toBeFalsy();
    expect(result.current?.data?.reason).toBe("Access Denied");
  });

  it("can should return the true if can is undefined ", async () => {
    const { result } = renderHook(
      () =>
        useCan({
          action: "list",
          resource: "posts",
          params: { id: 1 },
        }),
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: undefined,
          },
        }),
      },
    );

    expect(result.current).toEqual({ data: { can: true } });
  });

  it("can should sanitize resource icon ", async () => {
    const mockFn = vi.fn();
    renderHook(
      () =>
        useCan({
          action: "list",
          resource: "posts",
          params: {
            id: 1,
            resource: {
              name: "posts",
              meta: {
                icon: "test",
                label: "Posts",
              },
            },
          },
        }),
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: mockFn,
          },
        }),
      },
    );

    expect(mockFn).toHaveBeenCalledWith({
      action: "list",
      params: {
        id: 1,
        resource: { name: "posts", meta: { label: "Posts" } },
      },
      resource: "posts",
    });
  });

  it("should be disable by queryOptions", async () => {
    const mockFn = vi.fn();
    renderHook(
      () =>
        useCan({
          action: "list",
          resource: "posts",
          params: { id: 1 },
          queryOptions: {
            enabled: false,
          },
        }),
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: mockFn,
          },
        }),
      },
    );

    expect(mockFn).not.toHaveBeenCalled();
  });

  it("should not throw error when accessControlProvider is undefined", async () => {
    const { result } = renderHook(
      () =>
        useCan({
          action: "list",
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await waitFor(() => {
      expect(result.current.data).toEqual({ can: true });
    });
  });

  it("should override `queryKey` with `queryOptions.queryKey`", async () => {
    const canMock = vi.fn().mockResolvedValue({
      can: true,
      reason: "Access granted",
    });

    const { result } = renderHook(
      () =>
        useCan({
          action: "list",
          resource: "posts",
          queryOptions: {
            queryKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: canMock,
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
    const canMock = vi.fn().mockResolvedValue({
      can: true,
      reason: "Access granted",
    });
    const queryFnMock = vi.fn().mockResolvedValue({
      can: true,
      reason: "Access granted",
    });

    const { result } = renderHook(
      () =>
        useCan({
          action: "list",
          resource: "posts",
          queryOptions: {
            queryFn: queryFnMock,
          },
        }),
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: canMock,
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(canMock).not.toHaveBeenCalled();
    expect(queryFnMock).toHaveBeenCalled();
  });

  it("should use global queryOptions from AccessControlContext", async () => {
    const mockFn = vi
      .fn()
      .mockResolvedValue({ can: true, reason: "Access granted" });
    const globalQueryOptions = { enabled: false };

    const { result } = renderHook(
      () => useCan({ action: "list", resource: "posts" }),
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: mockFn,
            options: { queryOptions: globalQueryOptions },
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isFetched).toBeFalsy();
    });

    expect(mockFn).not.toHaveBeenCalled();
  });
});

describe("useCanWithoutCache", () => {
  it("should return the can function from the AccessControlContext", () => {
    const canMock = vi.fn();

    const { result } = renderHook(() => useCanWithoutCache(), {
      wrapper: TestWrapper({
        accessControlProvider: {
          can: canMock,
        },
      }),
    });

    result.current.can?.({
      action: "list",
      resource: "posts",
    });

    expect(canMock).toHaveBeenCalledWith({
      action: "list",
      resource: "posts",
    });
  });
  it("should sanitize the `resource` if provided", () => {
    const canMock = vi.fn();

    const { result } = renderHook(() => useCanWithoutCache(), {
      wrapper: TestWrapper({
        accessControlProvider: {
          can: canMock,
        },
      }),
    });

    result.current.can?.({
      action: "list",
      resource: "posts",
      params: {
        id: 1,
        resource: {
          name: "posts",
          meta: { icon: "test", label: "Posts" },
        },
      },
    });

    expect(canMock).toHaveBeenCalledWith({
      action: "list",
      resource: "posts",
      params: {
        id: 1,
        resource: {
          name: "posts",
          meta: { label: "Posts" },
        },
      },
    });
  });
});
