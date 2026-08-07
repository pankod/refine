import { vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { defaultRefineOptions } from "@contexts/refine";
import {
  MockJSONServer,
  TestWrapper,
  mockRouterProvider,
  queryClient,
} from "@test";

import type { IRefineContextProvider } from "../../contexts/refine/types";
import { useMany } from "./useMany";
import type { BaseKey } from "@contexts/data/types";
import * as warnOnce from "warn-once";

const mockRefineProvider: IRefineContextProvider = {
  ...defaultRefineOptions,
  options: defaultRefineOptions,
};

describe("useMany Hook", () => {
  it("with rest json server", async () => {
    const { result } = renderHook(
      () => useMany({ resource: "posts", ids: ["1", "2"] }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.query.isPending).toBeTruthy();
    });

    const { status, data } = result.current.query;
    const { result: manyResult } = result.current;

    expect(status).toBe("success");
    expect(data?.data.length).toBe(2);
    expect(manyResult.data).toBeDefined();
    expect(manyResult.data?.length).toBe(2);
  });

  it("should return result property with data", async () => {
    const { result } = renderHook(
      () => useMany({ resource: "posts", ids: ["1", "2"] }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.query.isPending).toBeTruthy();
    });

    const { result: manyResult } = result.current;

    expect(manyResult).toBeDefined();
    expect(manyResult.data).toBeDefined();
    expect(Array.isArray(manyResult.data)).toBeTruthy();
    expect(manyResult.data?.length).toBe(2);
  });

  it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
    const getManyMock = vi.fn();

    renderHook(
      () => useMany({ resource: "posts", meta: { foo: "bar" }, ids: [] }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getMany: getManyMock,
            },
          },
          routerProvider: mockRouterProvider({
            params: { baz: "qux" },
          }),
          resources: [{ name: "posts", meta: { dip: "dop" } }],
        }),
      },
    );

    await waitFor(() => {
      expect(getManyMock).toHaveBeenCalled();
    });

    expect(getManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
          baz: "qux",
        }),
      }),
    );
  });

  it("works correctly with `interval` and `onInterval` params", async () => {
    const onInterval = vi.fn();
    const { result } = renderHook(
      () =>
        useMany({
          resource: "posts",
          ids: ["1", "2"],
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
              getMany: () => {
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

    await waitFor(() => {
      expect(result.current.query.isPending).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBe(900);
      expect(onInterval).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(result.current.query.isPending).toBeFalsy();
      expect(result.current.overtime.elapsedTime).toBeUndefined();
    });
  });

  describe("useResourceSubscription", () => {
    it.each(["default", "categories"])(
      "useSubscription [dataProviderName: %s]",
      async (dataProviderName) => {
        const onSubscribeMock = vi.fn();

        const { result } = renderHook(
          () =>
            useMany({
              resource: "posts",
              ids: ["1", "2"],
              dataProviderName,
            }),
          {
            wrapper: TestWrapper({
              dataProvider: MockJSONServer,
              resources: [{ name: "posts" }],
              liveProvider: {
                unsubscribe: vi.fn(),
                subscribe: onSubscribeMock,
              },
              refineProvider: {
                ...mockRefineProvider,
                liveMode: "auto",
              },
            }),
          },
        );

        await waitFor(() => {
          expect(!result.current.query.isPending).toBeTruthy();
        });

        expect(onSubscribeMock).toHaveBeenCalled();
        expect(onSubscribeMock).toHaveBeenCalledWith({
          channel: "resources/posts",
          callback: expect.any(Function),
          params: expect.objectContaining({
            ids: ["1", "2"],
            meta: {
              route: undefined,
            },
            resource: "posts",
            subscriptionType: "useMany",
          }),
          types: ["*"],
          meta: {
            dataProviderName,
          },
        });
      },
    );

    it("liveMode = Off useSubscription", async () => {
      const onSubscribeMock = vi.fn();

      const { result } = renderHook(
        () => useMany({ resource: "posts", ids: ["1", "2"] }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            liveProvider: {
              unsubscribe: vi.fn(),
              subscribe: onSubscribeMock,
            },
            refineProvider: {
              ...mockRefineProvider,
              liveMode: "off",
            },
          }),
        },
      );

      await waitFor(() => {
        expect(!result.current.query.isPending).toBeTruthy();
      });

      expect(onSubscribeMock).not.toHaveBeenCalled();
    });

    it("liveMode = Off and liveMode hook param auto", async () => {
      const onSubscribeMock = vi.fn();

      const { result } = renderHook(
        () =>
          useMany({
            resource: "posts",
            ids: ["1", "2"],
            liveMode: "auto",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            liveProvider: {
              unsubscribe: vi.fn(),
              subscribe: onSubscribeMock,
            },
            refineProvider: {
              ...mockRefineProvider,
              liveMode: "off",
            },
          }),
        },
      );

      await waitFor(() => {
        expect(!result.current.query.isPending).toBeTruthy();
      });

      expect(onSubscribeMock).toHaveBeenCalled();
    });

    it("unsubscribe call on unmount", async () => {
      const onSubscribeMock = vi.fn(() => true);
      const onUnsubscribeMock = vi.fn();

      const { unmount } = renderHook(
        () => useMany({ resource: "posts", ids: ["1", "2"] }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            liveProvider: {
              unsubscribe: onUnsubscribeMock,
              subscribe: onSubscribeMock,
            },
            refineProvider: {
              ...mockRefineProvider,
              liveMode: "auto",
            },
          }),
        },
      );

      expect(onSubscribeMock).toHaveBeenCalled();

      unmount();
      expect(onUnsubscribeMock).toHaveBeenCalledWith(true);
      expect(onUnsubscribeMock).toHaveBeenCalledTimes(1);
    });

    it("should not subscribe if `queryOptions.enabled` is false", async () => {
      const onSubscribeMock = vi.fn();

      renderHook(
        () =>
          useMany({
            resource: "posts",
            ids: ["1", "2"],
            queryOptions: {
              enabled: false,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            liveProvider: {
              unsubscribe: vi.fn(),
              subscribe: onSubscribeMock,
            },
            refineProvider: {
              ...mockRefineProvider,
              liveMode: "auto",
            },
          }),
        },
      );

      expect(onSubscribeMock).not.toHaveBeenCalled();
    });
  });

  it("should use `getOne` method if does not exist `getMany` method in dataProvider", async () => {
    const getOneMock = vi.fn();

    const { result } = renderHook(
      () =>
        useMany({
          resource: "posts",
          ids: ["1", "2"],
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getOne: getOneMock,
              getMany: undefined,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isPending).toBeFalsy();
    });

    expect(getOneMock).toHaveBeenCalledTimes(2);
    expect(getOneMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        resource: "posts",
        id: "1",
      }),
    );
    expect(getOneMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        resource: "posts",
        id: "2",
      }),
    );
  });

  describe("useNotification", () => {
    it("should call `open` from the notification provider on error", async () => {
      const getManyMock = vi.fn().mockRejectedValue(new Error("Error"));
      const notificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useMany({
            resource: "posts",
            ids: ["1", "2"],
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getMany: getManyMock,
              },
            },
            notificationProvider: {
              open: notificationMock,
              close: vi.fn(),
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isError).toBeTruthy();
      });

      expect(notificationMock).toHaveBeenCalledWith({
        description: "Error",
        key: "1-posts-getMany-notification",
        message: "Error (status code: undefined)",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useMany({
            resource: "posts",
            ids: ["1", "2"],
            successNotification: () => ({
              message: "Success",
              description: "Successfully created post",
              type: "success",
            }),
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            notificationProvider: {
              open: openNotificationMock,
              close: vi.fn(),
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledWith({
        description: "Successfully created post",
        message: "Success",
        type: "success",
      });
    });

    it("should not call `open` from notification provider on return `false`", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useMany({
            resource: "posts",
            ids: ["1", "2"],
            successNotification: () => false,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            notificationProvider: {
              open: openNotificationMock,
              close: vi.fn(),
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledTimes(0);
    });

    it("should call `open` from notification provider on error with custom notification params", async () => {
      const getManyMock = vi.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useMany({
            resource: "posts",
            ids: ["1", "2"],
            errorNotification: () => ({
              message: "Error",
              description: "There was an error creating post",
              type: "error",
            }),
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getMany: getManyMock,
              },
            },
            notificationProvider: {
              open: openNotificationMock,
              close: vi.fn(),
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isError).toBeTruthy();
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
      const getManyMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(
        () =>
          useMany({
            resource: "posts",
            ids: ["1", "2"],
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getMany: getManyMock,
              },
            },
            authProvider: {
              login: () => Promise.resolve({ success: true }),
              logout: () => Promise.resolve({ success: true }),
              check: () => Promise.resolve({ authenticated: true }),
              onError: onErrorMock,
            } as any,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });

    it("should call `checkError` from the legacy auth provider on error", async () => {
      const getManyMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(
        () =>
          useMany({
            resource: "posts",
            ids: ["1", "2"],
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getMany: getManyMock,
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
        },
      );

      await waitFor(() => {
        expect(result.current.query.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });
  });

  describe("queryOptions", () => {
    it("should override `queryKey` with `queryOptions.queryKey`", async () => {
      const getManyMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useMany({
            resource: "posts",
            ids: ["1", "2"],
            queryOptions: {
              queryKey: ["foo", "bar"],
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getMany: getManyMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(getManyMock).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            queryKey: ["foo", "bar"],
          }),
        }),
      );

      expect(
        queryClient.getQueryCache().findAll({
          queryKey: ["foo", "bar"],
        }),
      ).toHaveLength(1);
    });

    it("should override `queryFn` with `queryOptions.queryFn`", async () => {
      const getManyMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const queryFnMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useMany({
            resource: "posts",
            ids: ["1", "2"],
            queryOptions: {
              queryFn: queryFnMock,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getMany: getManyMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(getManyMock).not.toHaveBeenCalled();
      expect(queryFnMock).toHaveBeenCalled();
    });
  });

  it("should select correct dataProviderName", async () => {
    const getManyDefaultMock = vi.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });
    const getManyFooMock = vi.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });

    const { result } = renderHook(
      () =>
        useMany({
          resource: "posts",
          ids: ["1", "2"],
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getMany: getManyDefaultMock,
            },
            foo: {
              ...MockJSONServer.default,
              getMany: getManyFooMock,
            },
          },
          resources: [
            {
              name: "categories",
            },
            {
              name: "posts",
              meta: {
                dataProviderName: "foo",
              },
            },
          ],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(getManyFooMock).toHaveBeenCalledWith(
      expect.objectContaining({
        resource: "posts",
      }),
    );
    expect(getManyDefaultMock).not.toHaveBeenCalled();
  });

  it("should get correct `meta` of related resource", async () => {
    const getManyMock = vi.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });

    const { result } = renderHook(
      () =>
        useMany({
          resource: "posts",
          ids: ["1", "2"],
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getMany: getManyMock,
            },
          },
          resources: [
            {
              name: "posts",
              meta: {
                foo: "bar",
              },
            },
          ],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(getManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
        }),
      }),
    );
  });

  describe("when passing `identifier` instead of `name`", () => {
    it("should select correct dataProviderName", async () => {
      const getManyDefaultMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });
      const getManyFooMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useMany({
            resource: "featured-posts",
            ids: ["1", "2"],
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getMany: getManyDefaultMock,
              },
              foo: {
                ...MockJSONServer.default,
                getMany: getManyFooMock,
              },
            },
            resources: [
              {
                name: "posts",
              },
              {
                name: "posts",
                identifier: "featured-posts",
                meta: {
                  dataProviderName: "foo",
                },
              },
            ],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(getManyFooMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
        }),
      );
      expect(getManyDefaultMock).not.toHaveBeenCalled();
    });

    it("should create queryKey with `identifier`", async () => {
      const getManyMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useMany({
            resource: "featured-posts",
            ids: ["1", "2"],
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getMany: getManyMock,
              },
            },
            resources: [
              {
                name: "posts",
                identifier: "featured-posts",
              },
            ],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(getManyMock).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            queryKey: [
              "data",
              "default",
              "featured-posts",
              "many",
              ["1", "2"],
              expect.any(Object),
            ],
          }),
        }),
      );
    });

    it("should get correct `meta` of related resource", async () => {
      const getManyMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useMany({
            resource: "featured-posts",
            ids: ["1", "2"],
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getMany: getManyMock,
              },
            },
            resources: [
              {
                name: "posts",
                identifier: "all-posts",
                meta: {
                  foo: "bar",
                },
              },
              {
                name: "posts",
                identifier: "featured-posts",
                meta: {
                  bar: "baz",
                },
              },
            ],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(getManyMock).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            bar: "baz",
          }),
        }),
      );
    });
  });

  describe("should require `ids` and `resource` props", () => {
    it("should require `ids` prop", () => {
      const warnMock = vi.spyOn(console, "warn").mockImplementation(() => {});

      const getManyMock = vi.fn().mockResolvedValue({
        data: [],
      });

      const { result } = renderHook(
        () =>
          useMany({
            resource: "posts",
            ids: undefined as unknown as BaseKey[],
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getMany: getManyMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      expect(result.current.query.isPending).toBeTruthy();
      expect(result.current.query.fetchStatus).toBe("idle");
      expect(getManyMock).not.toHaveBeenCalled();
      expect(warnMock).toHaveBeenCalledWith(
        expect.stringContaining('[useMany]: Missing "ids" prop.'),
      );

      warnMock.mockClear();
    });

    it("should require `resource` prop", () => {
      const warnMock = vi.spyOn(console, "warn").mockImplementation(() => {});

      const getManyMock = vi.fn().mockResolvedValue({
        data: [],
      });

      const { result } = renderHook(
        () =>
          useMany({
            resource: undefined as unknown as string,
            ids: ["1", "2"],
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getMany: getManyMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      expect(result.current.query.isPending).toBeTruthy();
      expect(result.current.query.fetchStatus).toBe("idle");
      expect(getManyMock).not.toHaveBeenCalled();
      expect(warnMock).toHaveBeenCalledWith(
        expect.stringContaining('[useMany]: Missing "resource" prop.'),
      );

      warnMock.mockClear();
    });

    it("should not warn if manually enabled", () => {
      const warnMock = vi.spyOn(console, "warn").mockImplementation(() => {});

      const getManyMock = vi.fn().mockResolvedValue({
        data: [],
      });

      const { result } = renderHook(
        () =>
          useMany({
            resource: undefined as unknown as string,
            ids: ["1", "2"],
            queryOptions: {
              enabled: true,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getMany: getManyMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      expect(result.current.query.isPending).toBeTruthy();
      expect(result.current.query.fetchStatus).toBe("fetching");
      expect(getManyMock).toHaveBeenCalled();
      expect(warnMock).not.toHaveBeenCalled();
    });
  });
});
