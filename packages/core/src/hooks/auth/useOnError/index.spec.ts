import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { TestWrapper, act, mockRouterProvider } from "@test";

import { useOnError } from ".";

const mockReplace = vi.fn();
const mockPush = vi.fn();

describe("useOnError Hook", () => {
  beforeEach(() => {
    mockReplace.mockReset();
    mockPush.mockReset();

    vi.spyOn(console, "error").mockImplementation((message) => {
      if (message === "rejected" || message === "/customPath") return;
      console.warn(message);
    });
  });

  it("logout and redirect to given path if check error rejected", async () => {
    const mockLogout = vi.fn();
    const { result } = renderHook(() => useOnError(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () =>
            Promise.resolve({
              error: new Error("rejected"),
              redirectTo: "/login",
              logout: true,
            }),
          getPermissions: () => Promise.resolve(),
          logout: mockLogout,
        },
      }),
    });

    const { mutate: checkError } = result.current;

    await act(async () => {
      await checkError({});
    });

    await waitFor(() => {
      expect(!result.current.isPending).toBeTruthy();
    });

    await act(async () => {
      expect(mockLogout).toHaveBeenCalledWith({ redirectPath: "/login" });
    });
  });

  it("not logout and redirect to given path if check error rejected", async () => {
    const mockGo = vi.fn();
    const { result } = renderHook(() => useOnError(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () =>
            Promise.resolve({
              error: new Error("rejected"),
              redirectTo: "/login",
              logout: false,
            }),
          getPermissions: () => Promise.resolve(),
          logout: () => Promise.resolve({ success: true }),
        },
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGo,
          },
        }),
      }),
    });

    const { mutate: checkError } = result.current;

    await act(async () => {
      await checkError({});
    });

    await waitFor(() => {
      expect(!result.current.isPending).toBeTruthy();
    });

    await act(async () => {
      expect(mockGo).toHaveBeenCalledWith({
        to: "/login",
        type: "replace",
      });
    });
  });
});
