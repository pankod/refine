import { vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import {
  MockJSONServer,
  TestWrapper,
  mockRouterProvider,
  queryClient,
} from "@test";

import { defaultRefineOptions } from "@contexts/refine";

import type { IRefineContextProvider } from "../../contexts/refine/types";
import { useList } from "./useList";

const mockRefineProvider: IRefineContextProvider = {
  ...defaultRefineOptions,
  options: defaultRefineOptions,
};

describe("useList Hook", () => {
  it("with rest json server", async () => {
    const { result } = renderHook(() => useList({ resource: "posts" }), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    const { result: listResult } = result.current;

    expect(listResult.data).toHaveLength(2);
    expect(listResult.total).toEqual(2);
  });

  it.each(["server", undefined] as const)(
    "should include pagination in queryKey when mode is %s",
    async (mode) => {
      const getListMock = vi.fn().mockResolvedValue({
        data: [],
        total: 0,
      });

      renderHook(
        () =>
          useList({
            resource: "posts",
            pagination: {
              currentPage: 1,
              pageSize: 10,
              mode,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      expect(getListMock).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: {
            queryKey: [
              "data",
              "default",
              "posts",
              "list",
              {
                filters: undefined,
                pagination: {
                  currentPage: 1,
                  mode: mode || "server",
                  pageSize: 10,
                },
              },
            ],
            signal: new AbortController().signal,
          },
        }),
      );
    },
  );

  it.each(["client", "off"] as const)(
    "should not include pagination in queryKey",
    async (mode) => {
      const getListMock = vi.fn();

      renderHook(
        () =>
          useList({
            resource: "posts",
            pagination: {
              currentPage: 1,
              pageSize: 10,
              mode,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      expect(getListMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
          pagination: {
            currentPage: 1,
            pageSize: 10,
            mode,
          },
          meta: {
            queryKey: [
              "data",
              "default",
              "posts",
              "list",
              {
                filters: undefined,
              },
            ],
            signal: new AbortController().signal,
          },
        }),
      );
    },
  );

  it("data should be sliced when pagination mode is client", async () => {
    const { result } = renderHook(
      () =>
        useList({
          resource: "posts",
          pagination: {
            mode: "client",
            pageSize: 1,
            currentPage: 1,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(result.current.result.data).toHaveLength(1);
  });

  it("user should be able to use queryOptions's select to transform data when pagination mode is client", async () => {
    const { result } = renderHook(
      () =>
        useList<{ id: number }>({
          resource: "posts",
          pagination: {
            mode: "client",
          },
          queryOptions: {
            select: (data) => {
              return {
                data: data.data.map((item) => ({
                  id: item.id,
                })),
                total: data.total,
              };
            },
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(result.current.result.data).toStrictEqual([
      { id: "1" },
      { id: "2" },
    ]);
  });

  it("when pagination mode is client and the user use queryOptions's select, useList should return the data from dataProvider", async () => {
    const { result } = renderHook(
      () =>
        useList({
          resource: "posts",
          pagination: {
            mode: "client",
          },
          queryOptions: {
            select: (data) => {
              return data;
            },
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: () =>
                Promise.resolve({
                  data: [],
                  total: 0,
                  foo: "bar",
                }),
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(result.current.query.data?.foo).toBe("bar");
    expect(result.current.result.foo).toBe("bar");
  });

  it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
    const getListMock = vi.fn();

    renderHook(() => useList({ resource: "posts", meta: { foo: "bar" } }), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            getList: getListMock,
          },
        },
        routerProvider: mockRouterProvider({
          params: { baz: "qux" },
        }),
        resources: [{ name: "posts", meta: { dip: "dop" } }],
      }),
    });

    await waitFor(() => {
      expect(getListMock).toHaveBeenCalled();
    });

    expect(getListMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
          baz: "qux",
        }),
      }),
    );
  });

  describe("useResourceSubscription", () => {
    it.each(["default", "categories"])(
      "useSubscription [dataProviderName: %s]",
      async (dataProviderName) => {
        const onSubscribeMock = vi.fn();

        const { result } = renderHook(
          () =>
            useList({
              resource: "posts",
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
          expect(result.current.query.isSuccess).toBeTruthy();
        });

        expect(onSubscribeMock).toHaveBeenCalled();
        expect(onSubscribeMock).toHaveBeenCalledWith(
          expect.objectContaining({
            channel: "resources/posts",
            callback: expect.any(Function),
            params: expect.objectContaining({
              filters: undefined,
              hasPagination: true,
              meta: {
                route: undefined,
              },
              pagination: {
                currentPage: 1,
                mode: "server",
                pageSize: 10,
              },
              resource: "posts",
              sorters: undefined,
              subscriptionType: "useList",
            }),
            types: ["*"],
            meta: {
              dataProviderName,
            },
          }),
        );
      },
    );

    it("liveMode = Off useSubscription", async () => {
      const onSubscribeMock = vi.fn();

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
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
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(onSubscribeMock).not.toHaveBeenCalled();
    });

    it("liveMode = Off and liveMode hook param auto", async () => {
      const onSubscribeMock = vi.fn();

      const { result } = renderHook(
        () => useList({ resource: "posts", liveMode: "auto" }),
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
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(onSubscribeMock).toHaveBeenCalled();
    });

    it("unsubscribe call on unmount", async () => {
      const onSubscribeMock = vi.fn(() => true);
      const onUnsubscribeMock = vi.fn();

      const { result, unmount } = renderHook(
        () =>
          useList({
            resource: "posts",
          }),
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

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(onSubscribeMock).toHaveBeenCalled();

      unmount();
      expect(onUnsubscribeMock).toHaveBeenCalledWith(true);
      expect(onUnsubscribeMock).toHaveBeenCalledTimes(1);
    });

    it("should not subscribe if `queryOptions.enabled` is false", async () => {
      const onSubscribeMock = vi.fn();

      renderHook(
        () =>
          useList({
            resource: "posts",
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

  describe("useNotification", () => {
    it("should call `open` from the notification provider on error", async () => {
      const getListMock = vi.fn().mockRejectedValue(new Error("Error"));
      const notificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
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
        key: "posts-useList-notification",
        message: "Error (status code: undefined)",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
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
          useList({
            resource: "posts",
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
      const getListMock = vi.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
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
                getList: getListMock,
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
      const getListMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            authProvider: {
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
      const getListMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
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
    it("should call successNotification on success", async () => {
      const successNotificationMock = vi.fn().mockReturnValue({
        message: "Success",
        type: "success",
      });
      const openNotificationMock = vi.fn();
      const getListMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
        total: 1,
      });

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
            successNotification: successNotificationMock,
            queryOptions: {
              enabled: true,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
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
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(successNotificationMock).toHaveBeenCalledWith(
        {
          data: [{ id: 1, title: "foo" }],
          total: 1,
        },
        expect.objectContaining({
          filters: undefined,
          sorters: undefined,
          pagination: expect.objectContaining({
            currentPage: 1,
            pageSize: 10,
            mode: "server",
          }),
        }),
        "posts",
      );
      expect(openNotificationMock).toHaveBeenCalledWith({
        message: "Success",
        type: "success",
      });
    });

    it("should call errorNotification on error", async () => {
      const errorNotificationMock = vi.fn().mockReturnValue({
        message: "Custom Error",
        type: "error",
      });
      const openNotificationMock = vi.fn();
      const getListMock = vi.fn().mockRejectedValue(new Error("Error"));

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
            errorNotification: errorNotificationMock,
            queryOptions: {
              enabled: true,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
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

      expect(errorNotificationMock).toHaveBeenCalledWith(
        new Error("Error"),
        expect.objectContaining({
          filters: undefined,
          sorters: undefined,
          pagination: expect.objectContaining({
            currentPage: 1,
            pageSize: 10,
            mode: "server",
          }),
        }),
        "posts",
      );
      expect(openNotificationMock).toHaveBeenCalledWith({
        message: "Custom Error",
        type: "error",
      });
    });

    it("should override `queryKey` with `queryOptions.queryKey`", async () => {
      const getListMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
            queryOptions: {
              queryKey: ["foo", "bar"],
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(getListMock).toHaveBeenCalledWith(
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
      const getListMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const queryFnMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
            queryOptions: {
              queryFn: queryFnMock,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(getListMock).not.toHaveBeenCalled();
      expect(queryFnMock).toHaveBeenCalled();
    });
  });

  it("should support deprecated `config` property", async () => {
    const getListMock = vi.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });

    const { result } = renderHook(
      () =>
        useList({
          resource: "posts",
          filters: [{ field: "id", operator: "eq", value: 1 }],
          pagination: {
            mode: "client",
            currentPage: 10,
            pageSize: 5,
          },
          sorters: [{ field: "id", order: "asc" }],
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: getListMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(getListMock).toHaveBeenCalledWith(
      expect.objectContaining({
        filters: [{ field: "id", operator: "eq", value: 1 }],
        pagination: {
          mode: "client",
          currentPage: 10,
          pageSize: 5,
        },
        sorters: [{ field: "id", order: "asc" }],
      }),
    );
  });

  it("should select correct dataProviderName", async () => {
    const getListDefaultMock = vi.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });
    const getListFooMock = vi.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });

    const { result } = renderHook(
      () =>
        useList({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: getListDefaultMock,
            },
            foo: {
              ...MockJSONServer.default,
              getList: getListFooMock,
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

    expect(getListFooMock).toHaveBeenCalledWith(
      expect.objectContaining({
        resource: "posts",
      }),
    );
    expect(getListDefaultMock).not.toHaveBeenCalled();
  });

  it("should get correct `meta` of related resource", async () => {
    const getListMock = vi.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });

    const { result } = renderHook(
      () =>
        useList({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: getListMock,
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

    expect(getListMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
        }),
      }),
    );
  });

  describe("when passing `identifier` instead of `name`", () => {
    it("should select correct dataProviderName", async () => {
      const getListDefaultMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });
      const getListFooMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useList({
            resource: "featured-posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListDefaultMock,
              },
              foo: {
                ...MockJSONServer.default,
                getList: getListFooMock,
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

      expect(getListFooMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
        }),
      );
      expect(getListDefaultMock).not.toHaveBeenCalled();
    });

    it("should create queryKey with `identifier`", async () => {
      const getListMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useList({
            resource: "featured-posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
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

      expect(getListMock).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            queryKey: [
              "data",
              "default",
              "featured-posts",
              "list",
              expect.any(Object),
            ],
          }),
        }),
      );
    });

    it("should get correct `meta` of related resource", async () => {
      const getListMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useList({
            resource: "featured-posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
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

      expect(getListMock).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            bar: "baz",
          }),
        }),
      );
    });
  });

  it("works correctly with `interval` and `onInterval` params", async () => {
    const onInterval = vi.fn();
    const { result } = renderHook(
      () =>
        useList({
          resource: "posts",
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
              getList: () => {
                return new Promise((res) => {
                  setTimeout(
                    () =>
                      res({
                        data: [],
                        total: 0,
                      }),
                    1000,
                  );
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

  it("should infer resource from the route", async () => {
    const getListMock = vi.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });

    const { result } = renderHook(() => useList(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            getList: getListMock,
          },
        },
        routerProvider: mockRouterProvider({
          action: "list",
          params: {},
          pathname: "/posts",
          resource: {
            name: "posts",
            list: "/posts",
          },
        }),
        resources: [
          {
            name: "posts",
            list: "/posts",
          },
        ],
      }),
    });

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(getListMock).toHaveBeenCalledWith(
      expect.objectContaining({
        resource: "posts",
      }),
    );
  });
});
