import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { TestWrapper, act, mockRouterProvider, queryClient } from "@test";

import { useUpdatePassword } from "./";

const mockFn = vi.fn();

const mockAuthProvider = {
  login: () => Promise.resolve({ success: true }),
  check: () => Promise.resolve({ authenticated: true }),
  onError: () => Promise.resolve({}),
  logout: () => Promise.resolve({ success: true }),
};

describe("useUpdatePassword Hook", () => {
  beforeEach(() => {
    mockFn.mockReset();
    vi.spyOn(console, "error").mockImplementation((message) => {
      if (message?.message === "Missing fields") return;
      if (typeof message === "undefined") return;
      console.warn(message);
    });
  });

  it("succeed update password with legacyRouterProvider", async () => {
    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          updatePassword: ({ password, confirmPassword }: any) => {
            if (password && confirmPassword) {
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

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({ password: "123", confirmPassword: "321" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toEqual({ success: true });
    expect(mockFn).not.toHaveBeenCalledWith();
  });

  it("succeed update password", async () => {
    const mockGo = vi.fn();

    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          updatePassword: ({ password, confirmPassword }: any) => {
            if (password && confirmPassword) {
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

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({ password: "123", confirmPassword: "321" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockGo).toHaveBeenCalledWith({
      to: "redirectTo",
      type: "replace",
    });
  });

  it("fail update password", async () => {
    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          updatePassword: ({ password, confirmPassword }: any) => {
            if (password && confirmPassword) {
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

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({ password: "123" });
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

    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          logout: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          updatePassword: ({ password, confirmPassword }: any) => {
            if (password && confirmPassword) {
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

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({ password: "123", confirmPassword: "321" });
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

    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          logout: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          updatePassword: ({ password, confirmPassword }: any) => {
            if (password && confirmPassword) {
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

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({ confirmPassword: "321" });
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

    const { result } = renderHook(() => useUpdatePassword(), {
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
          updatePassword: () =>
            Promise.resolve({
              success: false,
              error: new Error("Error"),
            }),
        },
      }),
    });

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "update-password-error",
        type: "error",
        message: "Error",
        description: "Error",
      });
    });
  });

  it("should open notification when has success is false, error is undefined", async () => {
    const updatePasswordMock = vi.fn();
    const openNotificationMock = vi.fn();
    const closeNotificationMock = vi.fn();

    const { result } = renderHook(() => useUpdatePassword(), {
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
          updatePassword: updatePasswordMock,
        },
      }),
    });

    const { mutate: updatePassword } = result.current;

    updatePasswordMock.mockResolvedValueOnce({
      success: false,
    });
    await act(async () => {
      updatePassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "update-password-error",
        type: "error",
        message: "Update Password Error",
        description: "Error while updating password",
      });
    });

    updatePasswordMock.mockResolvedValueOnce({
      success: true,
    });
    await act(async () => {
      updatePassword({});
    });
    await waitFor(() => {
      expect(closeNotificationMock).toHaveBeenCalledWith(
        "update-password-error",
      );
    });
  });

  it("should open notification when throw error", async () => {
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useUpdatePassword(), {
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
          updatePassword: () => {
            throw new Error("Unhandled error");
          },
        },
      }),
    });

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "update-password-error",
        type: "error",
        message: "Error",
        description: "Unhandled error",
      });
    });
  });

  it("should work notificationProvider", async () => {
    const onErrorMock = vi.fn();
    const onSuccessMock = vi.fn();
    const updatePasswordMock = vi.fn();

    const { result } = renderHook(
      () =>
        useUpdatePassword({
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
            updatePassword: updatePasswordMock,
          },
        }),
      },
    );

    const { mutate: updatePassword } = result.current;

    updatePasswordMock.mockRejectedValueOnce(new Error("Error"));
    await act(async () => {
      updatePassword({});
    });
    await waitFor(() => {
      expect(onErrorMock).toHaveBeenCalledTimes(1);
    });

    updatePasswordMock.mockResolvedValueOnce({
      success: false,
    });
    await act(async () => {
      updatePassword({});
    });
    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalledTimes(1);
    });

    updatePasswordMock.mockResolvedValueOnce({
      success: true,
    });
    await act(async () => {
      updatePassword({});
    });
    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalledTimes(2);
    });
  });

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const updatePasswordMock = vi.fn().mockResolvedValue({ data: {} });
    const mutationFnMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useUpdatePassword({
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
            updatePassword: updatePasswordMock,
          },
        }),
      },
    );

    result.current.mutate({});

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(updatePasswordMock).not.toHaveBeenCalled();
    expect(mutationFnMock).toHaveBeenCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const updatePasswordMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useUpdatePassword({
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
            updatePassword: updatePasswordMock,
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

    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          ...mockAuthProvider,
          updatePassword: () =>
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

    expect(openNotificationMock).toHaveBeenCalledWith({
      key: "update-password-success",
      type: "success",
      message: "Success!",
      description: "Operation completed successfully",
    });
  });
});
