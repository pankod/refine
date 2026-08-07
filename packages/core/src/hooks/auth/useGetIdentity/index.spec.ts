import { vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper, queryClient } from "@test";

import { useGetIdentity } from "./";

describe("useGetIdentity Hook", () => {
  const mockAuthProvider = {
    login: () => Promise.resolve({ success: true }),
    check: () => Promise.resolve({ authenticated: true }),
    onError: () => Promise.resolve({}),
    logout: () => Promise.resolve({ success: true }),
  };

  it("returns object useGetIdentity", async () => {
    const { result } = renderHook(() => useGetIdentity(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          getIdentity: () => Promise.resolve({ id: 1 }),
        },
      }),
    });

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });

    expect(result.current?.data).toEqual({ id: 1 });
  });

  it("return error useGetIdentity", async () => {
    vi.spyOn(console, "error").mockImplementation((message) => {
      if (message?.message === "Not Authenticated") return;
      console.warn(message);
    });

    const { result } = renderHook(() => useGetIdentity(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          getIdentity: () => Promise.resolve(new Error("Not Authenticated")),
        },
      }),
    });

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });

    expect(result.current?.data).toEqual(new Error("Not Authenticated"));
  });

  it("throw error useGetIdentity undefined", async () => {
    const { result } = renderHook(() => useGetIdentity(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
        },
      }),
    });

    await waitFor(() => {
      expect(!result.current.isFetching).toBeTruthy();
    });

    expect(result.current.status).toEqual("pending");
    expect(result.current.data).not.toBeDefined();
  });

  it("should override `queryKey` with `queryOptions.queryKey`", async () => {
    const getIdentityMock = vi.fn().mockResolvedValue({
      data: { id: 1, title: "foo" },
    });

    const { result } = renderHook(
      () =>
        useGetIdentity({
          queryOptions: {
            queryKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            getIdentity: getIdentityMock,
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
    const getIdentityMock = vi.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });
    const queryFnMock = vi.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });

    const { result } = renderHook(
      () =>
        useGetIdentity({
          queryOptions: {
            queryFn: queryFnMock,
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            getIdentity: getIdentityMock,
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(getIdentityMock).not.toHaveBeenCalled();
    expect(queryFnMock).toHaveBeenCalled();
  });
});
