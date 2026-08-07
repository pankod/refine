import { act, renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import {
  MockJSONServer,
  TestWrapper,
  mockAuthProvider,
  mockRouterProvider,
  queryClient,
} from "@test";

import * as UseInvalidate from "../invalidate/index";
import { type UseCreateParams, useCreate } from "./useCreate";

describe("useCreate Hook [with params]", () => {
  it("with rest json server", async () => {
    const { result } = renderHook(() => useCreate(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    result.current.mutate({ resource: "posts", values: { id: 1 } });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    const { status, data } = result.current.mutation;

    expect(status).toBe("success");
    expect(data?.data.slug).toBe("ut-ad-et");
  });

  it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
    const createMock = vi.fn();

    const { result } = renderHook(() => useCreate(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            create: createMock,
          },
        },
        routerProvider: mockRouterProvider({
          params: { baz: "qux" },
        }),
        resources: [{ name: "posts", meta: { dip: "dop" } }],
      }),
    });

    result.current.mutate({
      resource: "posts",
      values: {},
      meta: { foo: "bar" },
    });

    await waitFor(() => {
      expect(createMock).toHaveBeenCalled();
    });

    expect(createMock).toHaveBeenCalledWith(
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
        useCreate({
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
              create: () => {
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

    result.current.mutate({
      resource: "posts",
      values: {},
      meta: { foo: "bar" },
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

  describe("usePublish", () => {
    it.each(["default", "categories"])(
      "publish event on success [dataProviderName: %s]",
      async (dataProviderName) => {
        const onPublishMock = vi.fn();

        const { result } = renderHook(() => useCreate(), {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            liveProvider: {
              unsubscribe: vi.fn(),
              subscribe: vi.fn(),
              publish: onPublishMock,
            },
          }),
        });

        result.current.mutate({
          resource: "posts",
          values: { id: 1 },
          dataProviderName,
        });

        await waitFor(() => {
          expect(result.current.mutation.isSuccess).toBeTruthy();
        });

        expect(onPublishMock).toHaveBeenCalled();
        expect(onPublishMock).toHaveBeenCalledWith({
          channel: "resources/posts",
          date: expect.any(Date),
          type: "created",
          payload: {
            ids: dataProviderName === "default" ? ["1"] : [1],
          },
          meta: {
            dataProviderName,
          },
        });
      },
    );

    it("publish live event without `ids` if no `id` is returned from the dataProvider", async () => {
      const onPublishMock = vi.fn();

      const { result } = renderHook(() => useCreate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: vi.fn(),
            },
          },
          resources: [{ name: "posts" }],
          liveProvider: {
            unsubscribe: vi.fn(),
            subscribe: vi.fn(),
            publish: onPublishMock,
          },
        }),
      });

      result.current.mutate({
        resource: "posts",
        values: { title: "foo" },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(onPublishMock).toHaveBeenCalledWith({
        channel: "resources/posts",
        date: expect.any(Date),
        type: "created",
        payload: {},
        meta: {
          dataProviderName: "default",
        },
      });
    });
  });
  describe("useLog", () => {
    it("publish log on success", async () => {
      const createMock = vi.fn();

      const { result } = renderHook(() => useCreate(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          authProvider: {
            ...mockAuthProvider,
            getIdentity: () =>
              Promise.resolve({
                name: "John Doe",
                id: "1",
              }),
          },
          resources: [{ name: "posts" }],
          auditLogProvider: {
            create: createMock,
            get: vi.fn(),
            update: vi.fn(),
          },
        }),
      });

      result.current.mutate({ resource: "posts", values: { id: 1 } });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(createMock).toHaveBeenCalled();
      expect(createMock).toHaveBeenCalledWith({
        action: "create",
        data: {
          id: 1,
        },
        author: {
          id: "1",
          name: "John Doe",
        },
        meta: {
          dataProviderName: "default",
          id: "1",
          route: undefined,
        },
        resource: "posts",
      });
    });
  });

  describe("useNotification", () => {
    it("should call `open` from the notification provider on success", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useCreate(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          notificationProvider: {
            open: openNotificationMock,
            close: vi.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutate({
        resource: "posts",
        values: {
          id: 1,
          foo: "bar",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledWith({
        description: "Success",
        key: "create-posts-notification",
        message: "Successfully created post",
        type: "success",
      });
    });

    it("should call `open` from the notification provider on error", async () => {
      const createMock = vi.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useCreate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
            },
          },
          notificationProvider: {
            open: openNotificationMock,
            close: vi.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutate({
        resource: "posts",
        values: {
          id: 1,
          foo: "bar",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledWith({
        description: "Error",
        key: "create-posts-notification",
        message: "There was an error creating post (status code: undefined)",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useCreate(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          notificationProvider: {
            open: openNotificationMock,
            close: vi.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutate({
        resource: "posts",
        values: {
          id: 1,
          foo: "bar",
        },
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

      const { result } = renderHook(() => useCreate(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          notificationProvider: {
            open: openNotificationMock,
            close: vi.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutate({
        resource: "posts",
        values: {
          id: 1,
          foo: "bar",
        },
        successNotification: () => false,
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledTimes(0);
    });

    it("should call `open` from notification provider on error with custom notification params", async () => {
      const createMock = vi.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useCreate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
            },
          },
          notificationProvider: {
            open: openNotificationMock,
            close: vi.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutate({
        resource: "posts",
        values: {
          id: 1,
          foo: "bar",
        },
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
      const createMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(() => useCreate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
            },
          },
          authProvider: {
            onError: onErrorMock,
          } as any,
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutate({
        resource: "posts",
        values: {
          id: 1,
          foo: "bar",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });

    it("should call `onError` from the auth provider on error", async () => {
      const createMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(() => useCreate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
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

      result.current.mutate({
        resource: "posts",
        values: {
          id: 1,
          foo: "bar",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });
  });

  it("should select correct dataProviderName", async () => {
    const createDefaultMock = vi.fn();
    const createFooMock = vi.fn();

    const { result } = renderHook(() => useCreate(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            create: createDefaultMock,
          },
          foo: {
            ...MockJSONServer.default,
            create: createFooMock,
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
    });

    result.current.mutate({
      resource: "posts",
      values: {
        foo: "bar",
      },
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(createFooMock).toHaveBeenCalledWith(
      expect.objectContaining({
        resource: "posts",
      }),
    );
    expect(createDefaultMock).not.toHaveBeenCalled();
  });

  it("should get correct `meta` of related resource", async () => {
    const createMock = vi.fn();

    const { result } = renderHook(() => useCreate(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            create: createMock,
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
    });

    result.current.mutate({
      resource: "posts",
      values: {
        title: "awesome post",
      },
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
        }),
      }),
    );
  });

  describe("when passing `identifier` instead of `name`", () => {
    it("should select correct dataProviderName", async () => {
      const createDefaultMock = vi.fn();
      const createFooMock = vi.fn();

      const { result } = renderHook(() => useCreate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createDefaultMock,
            },
            foo: {
              ...MockJSONServer.default,
              create: createFooMock,
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
      });

      result.current.mutate({
        resource: "featured-posts",
        values: {
          foo: "bar",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(createFooMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
        }),
      );
      expect(createDefaultMock).not.toHaveBeenCalled();
    });

    it("should invalidate query store with `identifier`", async () => {
      const invalidateStore = vi.fn();
      vi.spyOn(UseInvalidate, "useInvalidate").mockReturnValue(invalidateStore);
      const createMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCreate({
            resource: "featured-posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                create: createMock,
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

      result.current.mutate({
        values: {
          foo: "bar",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(invalidateStore).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "featured-posts",
        }),
      );
    });

    it("should get correct `meta` of related resource", async () => {
      const createMock = vi.fn();

      const { result } = renderHook(() => useCreate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
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
      });

      result.current.mutate({
        resource: "featured-posts",
        values: {
          title: "awesome post",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(createMock).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            bar: "baz",
          }),
        }),
      );
    });
  });

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const createMock = vi.fn().mockResolvedValue({ data: {} });
    const mutationFnMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useCreate({
          mutationOptions: {
            // mutationFn is omitted in types. So we need to use @ts-ignore test it.
            // @ts-ignore
            mutationFn: mutationFnMock,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    result.current.mutate({
      resource: "posts",
      values: {},
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(createMock).not.toHaveBeenCalled();
    expect(mutationFnMock).toHaveBeenCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const { result } = renderHook(
      () =>
        useCreate({
          mutationOptions: {
            mutationKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    result.current.mutate({
      resource: "posts",
      values: {},
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(
      queryClient.getMutationCache().findAll({
        mutationKey: ["foo", "bar"],
      }),
    ).toHaveLength(1);
  });

  it("should throw error without 'resource'", async () => {
    const { result } = renderHook(() => useCreate(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    act(() => {
      result.current.mutate({
        values: {},
      });
    });

    await waitFor(() => {
      expect(result.current.mutation.isError).toBeTruthy();
      expect(result.current.mutation.error).toEqual(
        new Error(
          "[useCreate]: `resource` is not defined or not matched but is required",
        ),
      );
    });
  });

  it("should throw error without 'values'", async () => {
    const { result } = renderHook(() => useCreate(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    act(() => {
      result.current.mutate({
        resource: "posts",
      });
    });

    await waitFor(() => {
      expect(result.current.mutation.isError).toBeTruthy();
      expect(result.current.mutation.error).toEqual(
        new Error("[useCreate]: `values` is not provided but is required"),
      );
    });
  });
});

describe("useCreate Hook [with props]", () => {
  it("with rest json server", async () => {
    const { result } = renderHook(
      () => useCreate({ resource: "posts", values: { id: 1 } }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    result.current.mutate();

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    const { status, data } = result.current.mutation;

    expect(status).toBe("success");
    expect(data?.data.slug).toBe("ut-ad-et");
  });

  it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
    const createMock = vi.fn();

    const { result } = renderHook(
      () => useCreate({ resource: "posts", meta: { foo: "bar" }, values: {} }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
            },
          },
          routerProvider: mockRouterProvider({
            params: { baz: "qux" },
          }),
          resources: [{ name: "posts", meta: { dip: "dop" } }],
        }),
      },
    );

    result.current.mutate();

    await waitFor(() => {
      expect(createMock).toHaveBeenCalled();
    });

    expect(createMock).toHaveBeenCalledWith(
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
        useCreate({
          resource: "posts",
          meta: { foo: "bar" },
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
              create: () => {
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

    result.current.mutate({
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

  describe("usePublish", () => {
    it.each(["default", "categories"])(
      "publish event on success [dataProviderName: %s]",
      async (dataProviderName) => {
        const onPublishMock = vi.fn();

        const { result } = renderHook(
          () => useCreate({ resource: "posts", dataProviderName }),
          {
            wrapper: TestWrapper({
              dataProvider: MockJSONServer,
              resources: [{ name: "posts" }],
              liveProvider: {
                unsubscribe: vi.fn(),
                subscribe: vi.fn(),
                publish: onPublishMock,
              },
            }),
          },
        );

        result.current.mutate({
          values: { id: 1 },
        });

        await waitFor(() => {
          expect(result.current.mutation.isSuccess).toBeTruthy();
        });

        expect(onPublishMock).toHaveBeenCalled();
        expect(onPublishMock).toHaveBeenCalledWith({
          channel: "resources/posts",
          date: expect.any(Date),
          type: "created",
          payload: {
            ids: dataProviderName === "default" ? ["1"] : [1],
          },
          meta: {
            dataProviderName,
          },
        });
      },
    );

    it("publish live event without `ids` if no `id` is returned from the dataProvider", async () => {
      const onPublishMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCreate({
            resource: "posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                create: vi.fn(),
              },
            },
            resources: [{ name: "posts" }],
            liveProvider: {
              unsubscribe: vi.fn(),
              subscribe: vi.fn(),
              publish: onPublishMock,
            },
          }),
        },
      );

      result.current.mutate({
        values: { title: "foo" },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(onPublishMock).toHaveBeenCalledWith({
        channel: "resources/posts",
        date: expect.any(Date),
        type: "created",
        payload: {},
        meta: {
          dataProviderName: "default",
        },
      });
    });
  });
  describe("useLog", () => {
    it("publish log on success", async () => {
      const createMock = vi.fn();

      const { result } = renderHook(() => useCreate({ resource: "posts" }), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          authProvider: {
            ...mockAuthProvider,
            getIdentity: () =>
              Promise.resolve({
                id: "1",
                name: "John Doe",
              }),
          },

          auditLogProvider: {
            create: createMock,
            get: vi.fn(),
            update: vi.fn(),
          },
        }),
      });

      result.current.mutate({ values: { id: 1 } });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(createMock).toHaveBeenCalled();
      expect(createMock).toHaveBeenCalledWith({
        action: "create",
        data: {
          id: 1,
        },
        author: {
          id: "1",
          name: "John Doe",
        },
        meta: {
          dataProviderName: "default",
          id: "1",
          route: undefined,
        },
        resource: "posts",
      });
    });
  });

  describe("useNotification", () => {
    it("should call `open` from the notification provider on success", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCreate({
            resource: "posts",
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

      result.current.mutate({
        values: {
          id: 1,
          foo: "bar",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledWith({
        description: "Success",
        key: "create-posts-notification",
        message: "Successfully created post",
        type: "success",
      });
    });

    it("should call `open` from the notification provider on error", async () => {
      const createMock = vi.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useCreate({ resource: "posts" }), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
            },
          },
          notificationProvider: {
            open: openNotificationMock,
            close: vi.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutate({
        values: {
          id: 1,
          foo: "bar",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledWith({
        description: "Error",
        key: "create-posts-notification",
        message: "There was an error creating post (status code: undefined)",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCreate({
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

      result.current.mutate({
        values: {
          id: 1,
          foo: "bar",
        },
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

      const { result } = renderHook(
        () =>
          useCreate({ resource: "posts", successNotification: () => false }),
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

      result.current.mutate({
        values: {
          id: 1,
          foo: "bar",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledTimes(0);
    });

    it("should call `open` from notification provider on error with custom notification params", async () => {
      const createMock = vi.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCreate({
            values: {
              id: 1,
              foo: "bar",
            },
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
                create: createMock,
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

      result.current.mutate({
        resource: "posts",
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
      const createMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCreate({
            resource: "posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                create: createMock,
              },
            },
            authProvider: {
              onError: onErrorMock,
            } as any,
            resources: [{ name: "posts" }],
          }),
        },
      );

      result.current.mutate({
        values: {
          id: 1,
          foo: "bar",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });

    it("should call `checkError` from the legacy auth provider on error", async () => {
      const createMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(() => useCreate({ resource: "posts" }), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
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

      result.current.mutate({
        values: {
          id: 1,
          foo: "bar",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });
  });

  it("should select correct dataProviderName", async () => {
    const createDefaultMock = vi.fn();
    const createFooMock = vi.fn();

    const { result } = renderHook(() => useCreate({ resource: "posts" }), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            create: createDefaultMock,
          },
          foo: {
            ...MockJSONServer.default,
            create: createFooMock,
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
    });

    result.current.mutate({
      values: {
        foo: "bar",
      },
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(createFooMock).toHaveBeenCalledWith(
      expect.objectContaining({
        resource: "posts",
      }),
    );
    expect(createDefaultMock).not.toHaveBeenCalled();
  });

  it("should get correct `meta` of related resource", async () => {
    const createMock = vi.fn();

    const { result } = renderHook(
      () =>
        useCreate({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
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

    result.current.mutate({
      values: {
        title: "awesome post",
      },
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
        }),
      }),
    );
  });

  describe("when passing `identifier` instead of `name`", () => {
    it("should select correct dataProviderName", async () => {
      const createDefaultMock = vi.fn();
      const createFooMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCreate({
            resource: "featured-posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                create: createDefaultMock,
              },
              foo: {
                ...MockJSONServer.default,
                create: createFooMock,
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

      result.current.mutate({
        values: {
          foo: "bar",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(createFooMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
        }),
      );
      expect(createDefaultMock).not.toHaveBeenCalled();
    });

    it("should invalidate query store with `identifier`", async () => {
      const invalidateStore = vi.fn();
      vi.spyOn(UseInvalidate, "useInvalidate").mockReturnValue(invalidateStore);
      const createMock = vi.fn();

      const { result } = renderHook(() => useCreate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
            },
          },
          resources: [
            {
              name: "posts",
              identifier: "featured-posts",
            },
          ],
        }),
      });

      result.current.mutate({
        resource: "featured-posts",
        values: {
          foo: "bar",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(invalidateStore).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "featured-posts",
        }),
      );
    });

    it("should get correct `meta` of related resource", async () => {
      const createMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCreate({
            resource: "featured-posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                create: createMock,
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

      result.current.mutate({
        values: {
          title: "awesome post",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(createMock).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            bar: "baz",
          }),
        }),
      );
    });
  });

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const createMock = vi.fn().mockResolvedValue({ data: {} });
    const mutationFnMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useCreate({
          resource: "posts",
          mutationOptions: {
            // mutationFn is omitted in types. So we need to use @ts-ignore test it.
            // @ts-ignore
            mutationFn: mutationFnMock,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    result.current.mutate({
      values: {},
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(createMock).not.toHaveBeenCalled();
    expect(mutationFnMock).toHaveBeenCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const { result } = renderHook(
      () =>
        useCreate({
          mutationOptions: {
            mutationKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    result.current.mutate({
      resource: "posts",
      values: {},
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(
      queryClient.getMutationCache().findAll({
        mutationKey: ["foo", "bar"],
      }),
    ).toHaveLength(1);
  });

  it("should throw error without 'resource'", async () => {
    const { result } = renderHook(
      () =>
        useCreate({
          values: {},
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.mutation.isError).toBeTruthy();
      expect(result.current.mutation.error).toEqual(
        new Error(
          "[useCreate]: `resource` is not defined or not matched but is required",
        ),
      );
    });
  });

  it("should throw error without 'values'", async () => {
    const { result } = renderHook(
      () =>
        useCreate({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.mutation.isError).toBeTruthy();
      expect(result.current.mutation.error).toEqual(
        new Error("[useCreate]: `values` is not provided but is required"),
      );
    });
  });
});

describe("useCreate Hook should work with params and props", () => {
  it("should params override prop", async () => {
    const options: {
      params: UseCreateParams<any, any, any>;
      props: UseCreateParams<any, any, any>;
    } = {
      params: {
        resource: "posts-overrided",
        dataProviderName: "overrided",
        values: { foo: "bar-overrided" },
        meta: {
          foo: "bar-overrided",
        },
        successNotification: () => ({
          message: "Success",
          description: "Successfully created post",
          type: "success",
        }),
      },
      props: {
        resource: "posts",
        dataProviderName: "default",
        values: { foo: "bar" },
        meta: {
          foo: "bar",
        },
        successNotification: false,
      },
    };

    const createMock = vi.fn();
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useCreate(options.props), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        dataProvider: {
          default: MockJSONServer.default,
          overrided: {
            ...MockJSONServer.default,
            create: createMock,
          },
        },
      }),
    });

    result.current.mutate(options.params);

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(createMock).toHaveBeenCalledWith({
      resource: options.params.resource,
      variables: options.params.values,
      meta: options.params.meta,
    });
    expect(openNotificationMock).toHaveBeenCalledWith({
      description: "Successfully created post",
      message: "Success",
      type: "success",
    });
  });

  it("should life-cycle methods works", async () => {
    const onSuccessProp = vi.fn();
    const onSettledProp = vi.fn();
    const onSuccessFn = vi.fn();
    const onSettledFn = vi.fn();

    const { result } = renderHook(
      () =>
        useCreate({
          resource: "posts",
          values: {},
          mutationOptions: {
            onSuccess: () => onSuccessProp("onSuccessProp"),
            onSettled: () => onSettledProp("onSettledProp"),
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
        }),
      },
    );

    act(() => {
      result.current.mutate(
        {},
        {
          onSuccess: () => onSuccessFn("onSuccessFn"),
          onSettled: () => onSettledFn("onSettledFn"),
        },
      );
    });

    await waitFor(() => {
      expect(onSuccessProp).toHaveBeenCalledWith("onSuccessProp");
      expect(onSettledProp).toHaveBeenCalledWith("onSettledProp");
      expect(onSuccessFn).toHaveBeenCalledWith("onSuccessFn");
      expect(onSettledFn).toHaveBeenCalledWith("onSettledFn");
    });
  });

  it("should onError methods works", async () => {
    const onErrorProp = vi.fn();
    const onErrorFn = vi.fn();

    const { result } = renderHook(
      () =>
        useCreate({
          resource: "posts",
          values: {},
          mutationOptions: {
            onError: () => onErrorProp("onErrorProp"),
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer.default,
            create: async () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  return reject(new Error("Error"));
                }, 0);
              });
            },
          },
        }),
      },
    );

    act(() => {
      result.current.mutate(
        {},
        {
          onError: () => onErrorFn("onErrorProp"),
        },
      );
    });

    await waitFor(() => {
      expect(onErrorProp).toHaveBeenCalledWith("onErrorProp");
      expect(onErrorFn).toHaveBeenCalledWith("onErrorProp");
    });
  });

  it("should not override audit meta.id with route params", async () => {
    const auditCreateMock = vi.fn();
    const createMock = vi.fn().mockResolvedValue({ data: { id: "123" } });

    const { result } = renderHook(() => useCreate(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: { ...MockJSONServer.default, create: createMock },
        },
        resources: [{ name: "posts" }],
        auditLogProvider: {
          create: auditCreateMock,
          get: vi.fn(),
          update: vi.fn(),
        },
        routerProvider: mockRouterProvider({
          params: { id: "6" },
        }),
      }),
    });

    act(() => {
      result.current.mutate({
        resource: "posts",
        values: { title: "new post" },
      });
    });

    await waitFor(() => expect(result.current.mutation.isSuccess).toBeTruthy());

    expect(auditCreateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "create",
        resource: "posts",
        meta: expect.objectContaining({ id: "123" }),
      }),
    );
  });
});
