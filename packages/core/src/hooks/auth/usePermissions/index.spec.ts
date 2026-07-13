import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { MockJSONServer, TestWrapper } from "@test";

import { usePermissions } from "./";

describe("usePermissions Hook", () => {
  it("returns authenticated userPermissions", async () => {
    const { result } = renderHook(() => usePermissions({}), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
          getPermissions: () => Promise.resolve(["admin"]),
        },
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toEqual(["admin"]);
  });

  it("returns error for not authenticated", async () => {
    vi.spyOn(console, "error").mockImplementation((message) => {
      if (!message.includes("Not Authenticated")) console.warn(message);
    });

    const { result } = renderHook(() => usePermissions({}), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: false }),
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: false }),
          getPermissions: () => Promise.resolve("Not Authenticated"),
        },
      }),
    });

    await waitFor(() => {
      expect(result.current.isPending).toBeFalsy();
    });

    expect(result.current.data).toEqual("Not Authenticated");
  });

  it("should resolve undefined if no authProvider is provided", async () => {
    const { result } = renderHook(() => usePermissions({}), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
          getPermissions: undefined,
        },
      }),
    });

    result.current.refetch();
    expect(result.current.data).toBeUndefined();
  });

  it("should accept params", async () => {
    const mockGetPermissions = vi.fn(() => Promise.resolve(["admin"]));
    const { result } = renderHook((props) => usePermissions({ ...props }), {
      initialProps: {
        params: { currentRole: "admin" },
      },
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
          getPermissions: mockGetPermissions,
        },
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockGetPermissions).toHaveBeenCalledWith({ currentRole: "admin" });
    expect(result.current.data).toEqual(["admin"]);
  });
});
