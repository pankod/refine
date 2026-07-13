import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { TestWrapper, act, queryClient } from "@test";

import { useForgotPassword } from ".";

describe("useForgotPassword Hook", () => {
  const mockAuthProvider = {
    login: () =>
      Promise.resolve({
        success: true,
      }),
    check: () => Promise.resolve({ authenticated: true }),
    onError: () => Promise.resolve({}),
    logout: () => Promise.resolve({ success: true }),
  };

  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation((message) => {
      if (message?.message === "Missing email") return;
      if (typeof message === "undefined") return;
      console.warn(message);
    });
  });

  it("succeed forgot password", async () => {
    const { result } = renderHook(() => useForgotPassword(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          forgotPassword: (params: any) => {
            if (!params?.["email"]) {
              return Promise.resolve({ success: false });
            }
            return Promise.resolve({ success: true });
          },
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({ email: "test@test.com" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });
  });

  it("succeed and redirect forgot password", async () => {
    const { result } = renderHook(() => useForgotPassword(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          forgotPassword: (params: any) => {
            if (!params?.["email"]) {
              return Promise.resolve({ success: false });
            }
            return Promise.resolve({
              success: true,
              redirectTo: "/rediect-path",
            });
          },
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({ email: "test@test.com" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
      expect(result.current.data?.redirectTo).toBe("/rediect-path");
    });
  });

  it("fail forgot password", async () => {
    const { result } = renderHook(() => useForgotPassword(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          forgotPassword: () =>
            Promise.resolve({
              success: false,
              error: new Error("Missing email"),
            }),
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({});
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({
        success: false,
        error: new Error("Missing email"),
      });
    });
  });

  it("should open notification when has error is true", async () => {
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useForgotPassword(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          ...mockAuthProvider,
          forgotPassword: () =>
            Promise.resolve({
              success: false,
              error: new Error("Missing email"),
            }),
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "forgot-password-error",
        type: "error",
        message: "Error",
        description: "Missing email",
      });
    });
  });

  it("should open notification when has success is false, error is undefined", async () => {
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useForgotPassword(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          ...mockAuthProvider,
          forgotPassword: () =>
            Promise.resolve({
              success: false,
            }),
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "forgot-password-error",
        type: "error",
        message: "Forgot Password Error",
        description: "Error while resetting password",
      });
    });
  });

  it("should open notification when throw error", async () => {
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useForgotPassword(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          ...mockAuthProvider,
          forgotPassword: () => {
            throw new Error("Unhandled error");
          },
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "forgot-password-error",
        type: "error",
        message: "Error",
        description: "Unhandled error",
      });
    });
  });

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const forgotPasswordMock = vi.fn().mockResolvedValue({ data: {} });
    const mutationFnMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useForgotPassword({
          mutationOptions: {
            // mutationFn is omitted in types. So we need to use @ts-ignore test it.
            // @ts-ignore
            mutationFn: mutationFnMock,
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            forgotPassword: forgotPasswordMock,
          },
        }),
      },
    );

    result.current.mutate({});

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(forgotPasswordMock).not.toHaveBeenCalled();
    expect(mutationFnMock).toHaveBeenCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const forgotPasswordMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useForgotPassword({
          mutationOptions: {
            mutationKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            forgotPassword: forgotPasswordMock,
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

    const { result } = renderHook(() => useForgotPassword(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          ...mockAuthProvider,
          forgotPassword: () =>
            Promise.resolve({
              success: true,
              successNotification: {
                message: "Password reset successful",
                description: "Your password has been successfully reset",
              },
            }),
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({ email: "test@test.com" });
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "forgot-password-success",
        type: "success",
        message: "Password reset successful",
        description: "Your password has been successfully reset",
      });
    });
  });
});
