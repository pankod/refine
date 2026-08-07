import { vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import {
  TestWrapper,
  act,
  mockAuthProvider,
  mockRouterProvider,
  queryClient,
} from "@test";

import { useLogin } from "./";

const mockGo = vi.fn();
const mockReplace = vi.fn();

const routerProvider = mockRouterProvider({
  fns: {
    go: () => mockGo,
  },
});

describe("useLogin Hook", () => {
  beforeEach(() => {
    mockGo.mockReset();

    vi.spyOn(console, "error").mockImplementation((message) => {
      if (message?.message === "Wrong email") return;
      if (typeof message === "undefined") return;
      console.warn(message);
    });
  });

  it("succeed login", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: ({ email }: any) => {
            if (email === "test") {
              return Promise.resolve({
                success: true,
                redirectTo: "/",
              });
            }

            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        routerProvider,
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });

    expect(mockGo).toHaveBeenCalledWith({ to: "/", type: "replace" });
  });

  it("should successfully login with no redirect", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: ({ email }: any) => {
            if (email === "test") {
              return Promise.resolve({ success: true });
            }

            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
          getIdentity: () => Promise.resolve({ id: 1 }),
        },
        routerProvider,
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });

    expect(mockGo).not.toHaveBeenCalled();
  });

  it("login and redirect to custom path", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: ({ email }: any) => {
            if (email === "test") {
              return Promise.resolve({
                success: true,
                redirectTo: "/custom-path",
              });
            }

            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        routerProvider,
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test", redirectPath: "/custom-path" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });

    expect(mockGo).toHaveBeenCalledWith({
      to: "/custom-path",
      type: "replace",
    });
  });

  it("fail login", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => {
            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGo,
          },
          params: {
            to: "/show/posts/5",
          },
        }),
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "demo" });
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({
        success: false,
        error: new Error("Wrong email"),
      });
    });

    expect(mockGo).not.toHaveBeenCalled();
  });

  it("login rejected with undefined error", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => {
            return Promise.resolve({
              success: false,
            });
          },
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "demo" });
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({
        success: false,
      });
    });

    expect(result.current.data?.error).toBeUndefined();
  });

  it("should open notification when has error is true", async () => {
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          login: () =>
            Promise.resolve({
              success: true,
              error: new Error("Missing email"),
            }),
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "login-error",
        type: "error",
        message: "Error",
        description: "Missing email",
      });
    });
  });

  it("should open notification when has success is false, error is undefined", async () => {
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          login: () =>
            Promise.resolve({
              success: false,
            }),
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "login-error",
        type: "error",
        message: "Login Error",
        description: "Invalid credentials",
      });
    });
  });

  it("should open notification when throw error", async () => {
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          login: () => {
            throw new Error("Unhandled error");
          },
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "login-error",
        type: "error",
        message: "Error",
        description: "Unhandled error",
      });
    });
  });

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const loginMock = vi.fn().mockResolvedValue({ data: {} });
    const mutationFnMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useLogin({
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
            login: loginMock,
          },
        }),
      },
    );

    result.current.mutate({});

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(loginMock).not.toHaveBeenCalled();
    expect(mutationFnMock).toHaveBeenCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const loginMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useLogin({
          mutationOptions: {
            mutationKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            login: loginMock,
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

    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        authProvider: {
          login: () =>
            Promise.resolve({
              success: true,
              successNotification: {
                message: "Login successful",
                description: "You are now logged in",
              },
            }),
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
      }),
    });

    const { mutate: login } = result.current;

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(openNotificationMock).toHaveBeenCalledWith({
        key: "login-success",
        type: "success",
        message: "Login successful",
        description: "You are now logged in",
      });
    });
  });
});

describe("useLogin Hook redirect support", () => {
  it("should be redirect 'to' queryString on routerProvider ", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: ({ email }: any) => {
            if (email === "test") {
              return Promise.resolve({
                success: true,
              });
            }

            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGo,
            parse: () => () => ({
              params: {
                to: "/redirectTo",
              },
            }),
          },
        }),
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });

    expect(mockGo).toHaveBeenCalledWith({ to: "/redirectTo", type: "replace" });
  });

  it("should be redirect `redirectTo` param on routerProvider ", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: ({ email }: any) => {
            if (email === "test") {
              return Promise.resolve({
                success: true,
                redirectTo: "redirectTo",
              });
            }

            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        routerProvider,
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });

    expect(mockGo).toHaveBeenCalledWith({ to: "redirectTo", type: "replace" });
  });
});
