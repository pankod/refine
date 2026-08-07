import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { TestWrapper, act, mockRouterProvider, queryClient } from "@test";

import { useRegister } from ".";

const mockGo = vi.fn();

const routerProvider = mockRouterProvider({
  fns: {
    go: () => mockGo,
  },
});

describe("useRegister Hook", () => {
  const mockAuthProvider = {
    login: () => Promise.resolve({ success: true }),
    check: () => Promise.resolve({ authenticated: true }),
    logout: () => Promise.resolve({ success: true }),
    onError: () => Promise.resolve({}),
  };

  beforeEach(() => {
    mockGo.mockReset();

    vi.spyOn(console, "error").mockImplementation((message) => {
      if (message?.message === "Missing fields") return;
      if (typeof message === "undefined") return;
      console.warn(message);
    });
  });

  it("succeed register", async () => {
    const { result } = renderHook(() => useRegister(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          register: ({ email, password }: any) => {
            if (email && password) {
              return Promise.resolve({
                success: true,
                redirectTo: "/",
              });
            }
            return Promise.resolve({
              success: false,
              error: new Error("Missing fields"),
            });
          },
        },
        routerProvider,
      }),
    });

    const { mutate: register } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      register({ email: "test", password: "test" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data?.success).toBeTruthy();

    expect(mockGo).toHaveBeenCalledWith({ to: "/", type: "replace" });
  });

  it("should successfully register with no redirect", async () => {
    const { result } = renderHook(() => useRegister(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          register: ({ email, password }: any) => {
            if (email && password) {
              return Promise.resolve({
                success: true,
              });
            }
            return Promise.resolve({
              success: false,
              error: new Error("Missing fields"),
            });
          },
        },
        routerProvider,
      }),
    });

    const { mutate: register } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      register({ email: "test", password: "test" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockGo).not.toHaveBeenCalled();
  });

  it("fail register", async () => {
    const { result } = renderHook(() => useRegister(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          register: ({ email, password }: any) => {
            if (email && password) {
              return Promise.resolve({
                success: true,
              });
            }
            return Promise.resolve({
              success: false,
              error: new Error("Missing fields"),
            });
          },
        },
      }),
    });

    const { mutate: register } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      register({ email: "demo" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toEqual({
      success: false,
      error: new Error("Missing fields"),
    });
  });

  it("register rejected with undefined error", async () => {
    const { result } = renderHook(() => useRegister(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          register: ({ email, password }: any) => {
            if (email && password) {
              return Promise.resolve({
                success: true,
              });
            }
            return Promise.resolve({
              success: false,
            });
          },
        },
      }),
    });

    const { mutate: register } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      register({ email: "demo" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data?.error).toBeUndefined();
  });

  it("should open notification when has error is true", async () => {
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useRegister(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          ...mockAuthProvider,
          register: () => {
            return Promise.resolve({
              success: false,
              error: new Error("Error"),
            });
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
        key: "register-error",
        type: "error",
        message: "Error",
        description: "Error",
      });
    });
  });

  it("should open notification when has success is false, error is undefined", async () => {
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useRegister(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          ...mockAuthProvider,
          register: () => Promise.resolve({ success: false }),
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "register-error",
        type: "error",
        message: "Register Error",
        description: "Error while registering",
      });
    });
  });

  it("should open notification when throw error", async () => {
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useRegister(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          ...mockAuthProvider,
          register: () => {
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
        key: "register-error",
        type: "error",
        message: "Error",
        description: "Unhandled error",
      });
    });
  });

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const registerMock = vi.fn().mockResolvedValue({ data: {} });
    const mutationFnMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useRegister({
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
            register: registerMock,
          },
        }),
      },
    );

    result.current.mutate({});

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(registerMock).not.toHaveBeenCalled();
    expect(mutationFnMock).toHaveBeenCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const registerMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useRegister({
          mutationOptions: {
            mutationKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            register: registerMock,
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

    const { result } = renderHook(() => useRegister(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          ...mockAuthProvider,
          register: () =>
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
      key: "register-success",
      type: "success",
      message: "Success!",
      description: "Operation completed successfully",
    });
  });
});
