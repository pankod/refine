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
import { useOne } from "./useOne";

const mockRefineProvider: IRefineContextProvider = {
  ...defaultRefineOptions,
  options: defaultRefineOptions,
};

describe("useOne Hook", () => {
  it("with rest json server", async () => {
    const { result } = renderHook(
      () => useOne({ resource: "posts", id: "1" }),
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

    const {
      result: data,
      query: { status },
    } = result.current;

    expect(status).toBe("success");
    expect(data?.slug).toBe("ut-ad-et");
  });

  it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
    const getOneMock = vi.fn();

    renderHook(
      () => useOne({ resource: "posts", meta: { foo: "bar" }, id: "" }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getOne: getOneMock,
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
      expect(getOneMock).toHaveBeenCalled();
    });

    expect(getOneMock).toHaveBeenCalledWith(
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
            useOne({
              resource: "posts",
              id: "1",
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
            ids: ["1"],
            id: "1",
            resource: "posts",
            subscriptionType: "useOne",
            meta: {
              route: undefined,
            },
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
        () => useOne({ resource: "posts", id: "1" }),
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
        () => useOne({ resource: "posts", id: "1", liveMode: "auto" }),
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

      const { result, unmount } = renderHook(
        () => useOne({ resource: "posts", id: "1" }),
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
        expect(!result.current.query.isPending).toBeTruthy();
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
          useOne({
            resource: "posts",
            id: "1",
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

    describe("useNotification", () => {
      it("should call `open` from the notification provider on error", async () => {
        const getOneMock = vi.fn().mockRejectedValue(new Error("Error"));
        const notificationMock = vi.fn();

        const { result } = renderHook(
          () =>
            useOne({
              resource: "posts",
              id: "1",
            }),
          {
            wrapper: TestWrapper({
              dataProvider: {
                default: {
                  ...MockJSONServer.default,
                  getOne: getOneMock,
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
          key: "1-posts-getOne-notification",
          message: "Error (status code: undefined)",
          type: "error",
        });
      });

      it("should call `open` from notification provider on success with custom notification params", async () => {
        const openNotificationMock = vi.fn();

        const { result } = renderHook(
          () =>
            useOne({
              resource: "posts",
              id: "1",
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

      it("should call `open` from notification provider on success with custom notification params", async () => {
        const openNotificationMock = vi.fn();

        const { result } = renderHook(
          () =>
            useOne({
              resource: "posts",
              id: "1",
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
        const getOneMock = vi.fn().mockRejectedValue(new Error("Error"));
        const openNotificationMock = vi.fn();

        const { result } = renderHook(
          () =>
            useOne({
              resource: "posts",
              id: "1",
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
                  getOne: getOneMock,
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
        const getOneMock = vi.fn().mockRejectedValue(new Error("Error"));
        const onErrorMock = vi.fn();

        const { result } = renderHook(
          () =>
            useOne({
              resource: "posts",
              id: "1",
            }),
          {
            wrapper: TestWrapper({
              dataProvider: {
                default: {
                  ...MockJSONServer.default,
                  getOne: getOneMock,
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
        const getOneMock = vi.fn().mockRejectedValue(new Error("Error"));
        const onErrorMock = vi.fn();

        const { result } = renderHook(
          () =>
            useOne({
              resource: "posts",
              id: "1",
            }),
          {
            wrapper: TestWrapper({
              dataProvider: {
                default: {
                  ...MockJSONServer.default,
                  getOne: getOneMock,
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
        const getOneMock = vi.fn().mockResolvedValue({
          data: { id: 1, title: "foo" },
        });

        const { result } = renderHook(
          () =>
            useOne({
              resource: "posts",
              id: "1",
              queryOptions: {
                queryKey: ["foo", "bar"],
              },
            }),
          {
            wrapper: TestWrapper({
              dataProvider: {
                default: {
                  ...MockJSONServer.default,
                  getOne: getOneMock,
                },
              },
              resources: [{ name: "posts" }],
            }),
          },
        );

        await waitFor(() => {
          expect(result.current.query.isSuccess).toBeTruthy();
        });

        expect(getOneMock).toHaveBeenCalledWith(
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
        const getOneMock = vi.fn().mockResolvedValue({
          data: [{ id: 1, title: "foo" }],
        });
        const queryFnMock = vi.fn().mockResolvedValue({
          data: [{ id: 1, title: "foo" }],
        });

        const { result } = renderHook(
          () =>
            useOne({
              resource: "posts",
              id: "1",
              queryOptions: {
                queryFn: queryFnMock,
              },
            }),
          {
            wrapper: TestWrapper({
              dataProvider: {
                default: {
                  ...MockJSONServer.default,
                  getOne: getOneMock,
                },
              },
              resources: [{ name: "posts" }],
            }),
          },
        );

        await waitFor(() => {
          expect(result.current.query.isSuccess).toBeTruthy();
        });

        expect(getOneMock).not.toHaveBeenCalled();
        expect(queryFnMock).toHaveBeenCalled();
      });
    });

    it("should select correct dataProviderName", async () => {
      const getOneDefaultMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });
      const getOneFooMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useOne({
            resource: "posts",
            id: "1",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getOne: getOneDefaultMock,
              },
              foo: {
                ...MockJSONServer.default,
                getOne: getOneFooMock,
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

      expect(getOneFooMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
        }),
      );
      expect(getOneDefaultMock).not.toHaveBeenCalled();
    });

    it("should get correct `meta` of related resource", async () => {
      const getOneMock = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useOne({
            resource: "posts",
            id: "1",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getOne: getOneMock,
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

      expect(getOneMock).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            foo: "bar",
          }),
        }),
      );
    });

    describe("when passing `identifier` instead of `name`", () => {
      it("should select correct dataProviderName", async () => {
        const getOneDefaultMock = vi.fn().mockResolvedValue({
          data: [{ id: 1, title: "foo" }],
        });
        const getOneFooMock = vi.fn().mockResolvedValue({
          data: [{ id: 1, title: "foo" }],
        });

        const { result } = renderHook(
          () =>
            useOne({
              resource: "featured-posts",
              id: "1",
            }),
          {
            wrapper: TestWrapper({
              dataProvider: {
                default: {
                  ...MockJSONServer.default,
                  getOne: getOneDefaultMock,
                },
                foo: {
                  ...MockJSONServer.default,
                  getOne: getOneFooMock,
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

        expect(getOneFooMock).toHaveBeenCalledWith(
          expect.objectContaining({
            resource: "posts",
          }),
        );
        expect(getOneDefaultMock).not.toHaveBeenCalled();
      });

      it("should create queryKey with `identifier`", async () => {
        const getOneMock = vi.fn().mockResolvedValue({
          data: [{ id: 1, title: "foo" }],
        });

        const { result } = renderHook(
          () =>
            useOne({
              resource: "featured-posts",
              id: "1",
            }),
          {
            wrapper: TestWrapper({
              dataProvider: {
                default: {
                  ...MockJSONServer.default,
                  getOne: getOneMock,
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

        expect(getOneMock).toHaveBeenCalledWith(
          expect.objectContaining({
            meta: expect.objectContaining({
              queryKey: [
                "data",
                "default",
                "featured-posts",
                "one",
                "1",
                expect.any(Object),
              ],
            }),
          }),
        );
      });

      it("should get correct `meta` of related resource", async () => {
        const getOneMock = vi.fn().mockResolvedValue({
          data: [{ id: 1, title: "foo" }],
        });

        const { result } = renderHook(
          () =>
            useOne({
              resource: "featured-posts",
              id: "1",
            }),
          {
            wrapper: TestWrapper({
              dataProvider: {
                default: {
                  ...MockJSONServer.default,
                  getOne: getOneMock,
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

        expect(getOneMock).toHaveBeenCalledWith(
          expect.objectContaining({
            meta: expect.objectContaining({
              bar: "baz",
            }),
          }),
        );
      });
    });
  });

  it("works correctly with `interval` and `onInterval` params", async () => {
    const onInterval = vi.fn();
    const { result } = renderHook(
      () =>
        useOne({
          resource: "posts",
          id: "1",
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
              getOne: () => {
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
});
