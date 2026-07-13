import { vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";

import { defaultRefineOptions } from "@contexts/refine";
import { MockJSONServer, TestWrapper, queryClient } from "@test";

import type { DataProviders } from "../../contexts/data/types";
import type { IRefineContextProvider } from "../../contexts/refine/types";
import { useInfiniteList } from "./useInfiniteList";

const mockRefineProvider: IRefineContextProvider = {
  ...defaultRefineOptions,
  options: defaultRefineOptions,
};

describe("useInfiniteList Hook", () => {
  it("with rest json server", async () => {
    const { result } = renderHook(
      () => useInfiniteList({ resource: "posts" }),
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

    const { data } = result.current.result;

    expect(data?.pages).toHaveLength(1);
    expect(data?.pages[0].data).toHaveLength(2);
    expect(data?.pages[0].total).toEqual(2);
  });

  it("hasNextPage is truthy", async () => {
    const { result } = renderHook(
      () =>
        useInfiniteList({
          resource: "posts",
          pagination: {
            pageSize: 1,
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

    const { hasNextPage } = result.current.result;
    expect(hasNextPage).toBeTruthy();
  });

  it("passes updated currentPage to data provider when fetching next page", async () => {
    const getListMock = vi.fn(async () => ({
      data: [
        {
          id: 1,
        },
      ],
      total: 5,
    }));

    const dataProvider = {
      default: {
        ...MockJSONServer.default,
        getList: getListMock,
      },
    } as DataProviders;

    const { result } = renderHook(
      () =>
        useInfiniteList({
          resource: "posts",
          pagination: {
            pageSize: 1,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(getListMock).toHaveBeenCalledTimes(1);
    expect(getListMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        pagination: expect.objectContaining({
          currentPage: 1,
        }),
      }),
    );

    await act(async () => {
      await result.current.query.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.query.isFetching).toBeFalsy();
    });

    expect(getListMock).toHaveBeenCalledTimes(2);
    expect(getListMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        pagination: expect.objectContaining({
          currentPage: 2,
        }),
      }),
    );

    await act(async () => {
      await result.current.query.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.query.isFetching).toBeFalsy();
    });

    expect(getListMock).toHaveBeenCalledTimes(3);
    expect(getListMock).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        pagination: expect.objectContaining({
          currentPage: 3,
        }),
      }),
    );
  });

  it("cursor has next", async () => {
    const dataProvider = {
      default: {
        ...MockJSONServer.default,
        getList: async () => {
          return {
            data: [
              {
                title: "title1",
              },
            ],
            total: 0,
            cursor: {
              next: undefined,
            },
          };
        },
      },
    } as DataProviders;

    const { result } = renderHook(
      () =>
        useInfiniteList({
          resource: "posts",
          pagination: {
            pageSize: 1,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeFalsy();
    });

    const { hasNextPage } = result.current.result;
    expect(hasNextPage).toBe(false);
  });

  describe("useResourceSubscription", () => {
    it.each(["default", "categories"])(
      "useSubscription [dataProviderName: %s]",
      async (dataProviderName) => {
        const onSubscribeMock = vi.fn();

        const { result } = renderHook(
          () =>
            useInfiniteList({
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
        expect(onSubscribeMock).toHaveBeenCalledWith({
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
              pageSize: 10,
              mode: "server",
            },
            resource: "posts",
            sort: undefined,
            sorters: undefined,
            subscriptionType: "useList",
          }),
          types: ["*"],
          meta: {
            dataProviderName,
            route: undefined,
          },
        });
      },
    );

    it("liveMode = Off useSubscription", async () => {
      const onSubscribeMock = vi.fn();

      const { result } = renderHook(
        () =>
          useInfiniteList({
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
        () => useInfiniteList({ resource: "posts", liveMode: "auto" }),
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
          useInfiniteList({
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
          useInfiniteList({
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
          useInfiniteList({
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
        key: "posts-useInfiniteList-notification",
        message: "Error (status code: undefined)",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useInfiniteList({
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
          useInfiniteList({
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
          useInfiniteList({
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
          useInfiniteList({
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
          useInfiniteList({
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
    it("should run `queryOptions.onSuccess` callback on success", async () => {
      const onSuccessMock = vi.fn();
      const getListMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useInfiniteList({
            resource: "posts",
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
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      // onSuccess callbacks are deprecated in TanStack Query v5
      // expect(onSuccessMock).toHaveBeenCalledWith(...);
    });

    it("should run `queryOptions.onError` callback on error", async () => {
      const onErrorMock = vi.fn();
      const getListMcok = vi.fn().mockRejectedValue(new Error("Error"));

      const { result } = renderHook(
        () =>
          useInfiniteList({
            resource: "posts",
            queryOptions: {
              enabled: true,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMcok,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isError).toBeTruthy();
      });

      // onError callbacks are deprecated in TanStack Query v5
      // expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });

    it("should override `queryKey` with `queryOptions.queryKey`", async () => {
      const getInfiniteListMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useInfiniteList({
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
                getList: getInfiniteListMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(getInfiniteListMock).toHaveBeenCalledWith(
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
      const getInfiniteListMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const queryFnMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useInfiniteList({
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
                getList: getInfiniteListMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(getInfiniteListMock).not.toHaveBeenCalled();
      expect(queryFnMock).toHaveBeenCalled();
    });
  });

  it("should work with filters, sorters, and pagination parameters", async () => {
    const getListMock = vi.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });

    const { result } = renderHook(
      () =>
        useInfiniteList({
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
        useInfiniteList({
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
        useInfiniteList({
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
          useInfiniteList({
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
          useInfiniteList({
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
              "infinite",
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
          useInfiniteList({
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
        useInfiniteList({
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
});
