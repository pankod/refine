import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { TestWrapper, act, mockRouterProvider, queryClient } from "@test";

import { useUpdateIdentity } from "./";

const mockFn = vi.fn();

const mockAuthProvider = {
  login: () => Promise.resolve({ success: true }),
  check: () => Promise.resolve({ authenticated: true }),
  onError: () => Promise.resolve({}),
  logout: () => Promise.resolve({ success: true }),
};

describe("useUpdateIdentity Hook", () => {
  beforeEach(() => {
    mockFn.mockReset();
    vi.spyOn(console, "error").mockImplementation((message) => {
      if (message?.message === "Missing fields") return;
      if (typeof message === "undefined") return;
      console.warn(message);
    });
  });

  it("succeed update identity with legacyRouterProvider", async () => {
    const { result } = renderHook(() => useUpdateIdentity(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          updateIdentity: ({ name, email }: any) => {
            if (name && email) {
              return Promise.resolve({ success: true });
            }
            return Promise.resolve({
              success: false,
              error: new Error("Missing fields"),
            });
          },
        },
      }),
    });

    const { mutate: updateIdentity } = result.current;

    await act(async () => {
      updateIdentity({ name: "Refine", email: "info@refine.dev" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toEqual({ success: true });
    expect(mockFn).not.toHaveBeenCalledWith();
  });

  it("succeed update identity", async () => {
    const mockGo = vi.fn();

    const { result } = renderHook(() => useUpdateIdentity(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          updateIdentity: ({ name, email }: any) => {
            if (name && email) {
              return Promise.resolve({
                success: true,
                redirectTo: "redirectTo",
              });
            }
            return Promise.resolve({
              success: false,
              error: new Error("Missing fields"),
            });
          },
        },
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGo,
          },
        }),
      }),
    });

    const { mutate: updateIdentity } = result.current;

    await act(async () => {
      updateIdentity({ name: "Refine", email: "info@refine.dev" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockGo).toHaveBeenCalledWith({
      to: "redirectTo",
      type: "replace",
    });
  });

  it("fail update identity", async () => {
    const { result } = renderHook(() => useUpdateIdentity(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          updateIdentity: ({ name, email }: any) => {
            if (name && email) {
              return Promise.resolve({ success: true });
            }
            return Promise.resolve({
              success: false,
              error: new Error("Missing fields"),
            });
          },
        },
      }),
    });

    const { mutate: updateIdentity } = result.current;

    await act(async () => {
      updateIdentity({ name: "Refine" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toEqual({
      success: false,
      error: new Error("Missing fields"),
    });
    expect(mockFn).not.toHaveBeenCalledWith();
  });

  it("success and redirect", async () => {
    const mockGo = vi.fn();

    const { result } = renderHook(() => useUpdateIdentity(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          logout: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          updateIdentity: ({ name, email }: any) => {
            if (name && email) {
              return Promise.resolve({
                success: true,
                redirectTo: "/login",
              });
            }
            return Promise.resolve({
              success: false,
              error: new Error("Missing fields"),
            });
          },
        },
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGo,
          },
        }),
      }),
    });

    const { mutate: updateIdentity } = result.current;

    await act(async () => {
      updateIdentity({ name: "Refine", email: "info@refine.dev" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toEqual({
      success: true,
      redirectTo: "/login",
    });
    expect(mockGo).toHaveBeenCalledWith({
      to: "/login",
      type: "replace",
    });
  });

  it("fail and redirect", async () => {
    const mockGo = vi.fn();

    const { result } = renderHook(() => useUpdateIdentity(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          logout: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          updateIdentity: ({ name, email }: any) => {
            if (name && email) {
              return Promise.resolve({
                success: true,
              });
            }
            return Promise.resolve({
              success: false,
              error: new Error("Missing fields"),
              redirectTo: "/register",
            });
          },
        },
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGo,
          },
        }),
      }),
    });

    const { mutate: updateIdentity } = result.current;

    await act(async () => {
      updateIdentity({ email: "info@refine.dev" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toEqual({
      success: false,
      error: new Error("Missing fields"),
      redirectTo: "/register",
    });
    expect(mockGo).toHaveBeenCalledWith({
      to: "/register",
      type: "replace",
    });
  });

  it("should open notification when has error is true", async () => {
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useUpdateIdentity(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          logout: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          updateIdentity: () =>
            Promise.resolve({
              success: false,
              error: new Error("Error"),
            }),
        },
      }),
    });

    const { mutate: updateIdentity } = result.current;

    await act(async () => {
      updateIdentity({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "update-identity-error",
        type: "error",
        message: "Error",
        description: "Error",
      });
    });
  });

  it("should open notification when has success is false, error is undefined", async () => {
    const updateIdentityMock = vi.fn();
    const openNotificationMock = vi.fn();
    const closeNotificationMock = vi.fn();

    const { result } = renderHook(() => useUpdateIdentity(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: closeNotificationMock,
        },
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          logout: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          updateIdentity: updateIdentityMock,
        },
      }),
    });

    const { mutate: updateIdentity } = result.current;

    updateIdentityMock.mockResolvedValueOnce({
      success: false,
    });
    await act(async () => {
      updateIdentity({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "update-identity-error",
        type: "error",
        message: "Update Identity Error",
        description: "Error while updating identity",
      });
    });

    updateIdentityMock.mockResolvedValueOnce({
      success: true,
    });
    await act(async () => {
      updateIdentity({});
    });
    await waitFor(() => {
      expect(closeNotificationMock).toHaveBeenCalledWith(
        "update-identity-error",
      );
    });
  });

  it("should open notification when throw error", async () => {
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useUpdateIdentity(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          logout: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          updateIdentity: () => {
            throw new Error("Unhandled error");
          },
        },
      }),
    });

    const { mutate: updateIdentity } = result.current;

    await act(async () => {
      updateIdentity({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "update-identity-error",
        type: "error",
        message: "Error",
        description: "Unhandled error",
      });
    });
  });

  it("should work notificationProvider", async () => {
    const onErrorMock = vi.fn();
    const onSuccessMock = vi.fn();
    const updateIdentityMock = vi.fn();

    const { result } = renderHook(
      () =>
        useUpdateIdentity({
          mutationOptions: {
            onSuccess: onSuccessMock,
            onError: onErrorMock,
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            login: () => Promise.resolve({ success: true }),
            logout: () => Promise.resolve({ success: true }),
            check: () => Promise.resolve({ authenticated: true }),
            onError: () => Promise.resolve({}),
            updateIdentity: updateIdentityMock,
          },
        }),
      },
    );

    const { mutate: updateIdentity } = result.current;

    updateIdentityMock.mockRejectedValueOnce(new Error("Error"));
    await act(async () => {
      updateIdentity({});
    });
    await waitFor(() => {
      expect(onErrorMock).toHaveBeenCalledTimes(1);
    });

    updateIdentityMock.mockResolvedValueOnce({
      success: false,
    });
    await act(async () => {
      updateIdentity({});
    });
    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalledTimes(1);
    });

    updateIdentityMock.mockResolvedValueOnce({
      success: true,
    });
    await act(async () => {
      updateIdentity({});
    });
    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalledTimes(2);
    });
  });

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const updateIdentityMock = vi.fn().mockResolvedValue({ data: {} });
    const mutationFnMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useUpdateIdentity({
          mutationOptions: {
            // mutationFn is omitted in types. So we need to use @ts-ignore test it.
            // @ts-ignore
            mutationFn: mutationFnMock,
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            login: () => Promise.resolve({ success: true }),
            logout: () => Promise.resolve({ success: true }),
            check: () => Promise.resolve({ authenticated: true }),
            onError: () => Promise.resolve({}),
            updateIdentity: updateIdentityMock,
          },
        }),
      },
    );

    result.current.mutate({});

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(updateIdentityMock).not.toHaveBeenCalled();
    expect(mutationFnMock).toHaveBeenCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const updateIdentityMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useUpdateIdentity({
          mutationOptions: {
            mutationKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            login: () => Promise.resolve({ success: true }),
            logout: () => Promise.resolve({ success: true }),
            check: () => Promise.resolve({ authenticated: true }),
            onError: () => Promise.resolve({}),
            updateIdentity: updateIdentityMock,
          },
        }),
      },
    );

    result.current.mutate({});

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(
      queryClient.getMutationCache().findAll({
        mutationKey: ["foo", "bar"],
      }),
    ).toHaveLength(1);
  });

  it("should open success notification when successNotification is passed", async () => {
    const openNotificationMock = vi.fn();

    const successNotification = {
      message: "Success!",
      description: "Operation completed successfully",
    };

    const { result } = renderHook(() => useUpdateIdentity(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          ...mockAuthProvider,
          updateIdentity: () =>
            Promise.resolve({
              success: true,
              successNotification,
            }),
        },
      }),
    });

    await act(async () => {
      result.current.mutate({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "update-identity-success",
        type: "success",
        message: "Success!",
        description: "Operation completed successfully",
      });
    });
  });

  it("should surface an error state when `updateIdentity` is not implemented", async () => {
    // `updateIdentity` is optional on the auth provider. When it is not
    // implemented, the mutation resolves `undefined` and the hook ends up in
    // an error state instead of silently succeeding.
    const { result } = renderHook(() => useUpdateIdentity(), {
      wrapper: TestWrapper({
        authProvider: mockAuthProvider,
      }),
    });

    await act(async () => {
      result.current.mutate({});
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });
  });
});
