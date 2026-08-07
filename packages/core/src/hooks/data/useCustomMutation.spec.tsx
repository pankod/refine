import { vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import {
  MockJSONServer,
  TestWrapper,
  mockAuthProvider,
  mockRouterProvider,
} from "@test";

import { useCustomMutation } from "./useCustomMutation";

describe("useCustomMutation Hook", () => {
  it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
    const customMock = vi.fn();

    const { result } = renderHook(() => useCustomMutation(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            custom: customMock,
          },
        },
        routerProvider: mockRouterProvider({
          params: { baz: "qux" },
        }),
        resources: [{ name: "posts", meta: { dip: "dop" } }],
      }),
    });

    result.current.mutation.mutate({
      method: "post",
      url: "/posts",
      values: {},
      meta: { foo: "bar" },
    });

    await waitFor(() => {
      expect(customMock).toHaveBeenCalled();
    });

    expect(customMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
          baz: "qux",
        }),
      }),
    );
  });

  it("should throw error if no `custom` method is provided", async () => {
    const { result } = renderHook(() => useCustomMutation(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            custom: undefined,
          },
        },
        resources: [{ name: "posts" }],
      }),
    });

    result.current.mutation.mutate({
      method: "post",
      url: "/posts",
      values: {},
    });

    await waitFor(() => {
      expect(result.current.mutation.isError).toBeTruthy();
    });

    expect(result.current.mutation.error).toEqual(
      new Error("Not implemented custom on data provider."),
    );
  });

  describe("useNotification", () => {
    it("should call `open` from the notification provider on error", async () => {
      const customMock = vi.fn().mockRejectedValue(new Error("Error"));
      const notificationMock = vi.fn();

      const { result } = renderHook(() => useCustomMutation(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              custom: customMock,
            },
          },
          notificationProvider: {
            open: notificationMock,
            close: vi.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutation.mutate({
        method: "post",
        url: "/posts",
        values: {},
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(notificationMock).toHaveBeenCalledWith({
        description: "Error",
        key: "post-notification",
        message: "Error (status code: undefined)",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useCustomMutation(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          notificationProvider: {
            open: openNotificationMock,
            close: vi.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutation.mutate({
        method: "post",
        url: "/posts",
        values: {},
        successNotification: () => ({
          message: "Success",
          description: "Successfully created post",
          type: "success",
        }),
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledWith({
        description: "Successfully created post",
        message: "Success",
        type: "success",
      });
    });

    it("should not call `open` from notification provider on return `false`", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useCustomMutation(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          notificationProvider: {
            open: openNotificationMock,
            close: vi.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutation.mutate({
        method: "post",
        url: "/posts",
        values: {},
        successNotification: () => false,
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledTimes(0);
    });

    it("should call `open` from notification provider on error with custom notification params", async () => {
      const customMock = vi.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useCustomMutation(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              custom: customMock,
            },
          },
          notificationProvider: {
            open: openNotificationMock,
            close: vi.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutation.mutate({
        method: "post",
        url: "/posts",
        values: {},
        errorNotification: () => ({
          message: "Error",
          description: "There was an error creating post",
          type: "error",
        }),
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledWith({
        description: "There was an error creating post",
        message: "Error",
        type: "error",
      });
    });
  });

  describe("useOnError", () => {
    it("should call `onError` from the auth provider on error", async () => {
      const customMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(() => useCustomMutation(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              custom: customMock,
            },
          },
          authProvider: {
            onError: onErrorMock,
          } as any,
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutation.mutate({
        method: "post",
        url: "/posts",
        values: {},
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });

    it("should call `checkError` from the legacy auth provider on error", async () => {
      const customMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(() => useCustomMutation(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              custom: customMock,
            },
          },
          authProvider: {
            login: () => Promise.resolve({ success: true }),
            logout: () => Promise.resolve({ success: true }),
            check: () => Promise.resolve({ authenticated: true }),
            onError: onErrorMock,
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutation.mutate({
        method: "post",
        url: "/posts",
        values: {},
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });
  });

  it("should pass `headers` to the data provider if `config.headers` is provided", async () => {
    const customMock = vi.fn();

    const { result } = renderHook(() => useCustomMutation(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            custom: customMock,
          },
        },
        resources: [{ name: "posts" }],
      }),
    });

    result.current.mutation.mutate({
      method: "post",
      url: "/posts",
      values: {},
      config: {
        headers: {
          "X-Custom-Header": "Custom header value",
        },
      },
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(customMock).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: {
          "X-Custom-Header": "Custom header value",
        },
      }),
    );
  });

  it("works correctly with `interval` and `onInterval` params", async () => {
    const onInterval = vi.fn();
    const { result } = renderHook(
      () =>
        useCustomMutation({
          overtimeOptions: {
            interval: 100,
            onInterval,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              custom: () => {
                return new Promise((res) => {
                  setTimeout(() => res({} as any), 1000);
                });
              },
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    result.current.mutation.mutate({
      method: "post",
      url: "/posts",
      values: {},
    });

    await waitFor(() => {
      expect(result.current.mutation.isPending).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBe(900);
      expect(onInterval).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(result.current.mutation.isPending).toBeFalsy();
      expect(result.current.overtime.elapsedTime).toBeUndefined();
    });
  });
});
