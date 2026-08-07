import { act, renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import {
  MockJSONServer,
  TestWrapper,
  mockAuthProvider,
  mockRouterProvider,
  queryClient,
} from "@test";

import {
  assertList,
  assertListLength,
  assertMutationSuccess,
  renderUseList,
  renderUseMany,
} from "@test/mutation-helpers";

import * as UseInvalidate from "../invalidate/index";
import { useDelete } from "./useDelete";

describe("useDelete Hook", () => {
  it("should work with pessimistic update", async () => {
    const { result } = renderHook(() => useDelete(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    result.current.mutation.mutate({
      id: "1",
      resource: "posts",
      mutationMode: "pessimistic",
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    const { isSuccess } = result.current.mutation;

    expect(isSuccess).toBeTruthy();
  });

  it("should work with optimistic update", async () => {
    const { result } = renderHook(() => useDelete(), {
      wrapper: TestWrapper({
        dataProvider: {
          ...MockJSONServer.default,
          deleteOne: () => {
            return new Promise((res, rej) => {
              setTimeout(() => rej(), 500);
            });
          },
        },
        resources: [{ name: "posts" }],
      }),
    });

    const useListResult = renderUseList();

    const useManyResult = renderUseMany();

    await assertListLength(useListResult, 2);
    await assertList(useListResult, "id", ["1", "2"]);

    await assertListLength(useManyResult, 2);
    await assertList(useManyResult, "id", ["1", "2"]);

    act(() => {
      result.current.mutation.mutate({
        id: "1",
        resource: "posts",
        mutationMode: "optimistic",
      });
    });

    await assertListLength(useListResult, 1);
    await assertList(useListResult, "id", ["2"]);

    await assertListLength(useManyResult, 1);
    await assertList(useManyResult, "id", ["2"]);

    await waitFor(() => {
      expect(result.current.mutation.isError).toBeTruthy();
    });

    await assertListLength(useListResult, 2);
    await assertList(useListResult, "id", ["1", "2"]);

    await assertListLength(useManyResult, 2);
    await assertList(useManyResult, "id", ["1", "2"]);
  });

  it("should work with undoable update", async () => {
    const { result } = renderHook(() => useDelete(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    const useListResult = renderUseList();

    const useManyResult = renderUseMany();

    await assertListLength(useListResult, 2);
    await assertList(useListResult, "id", ["1", "2"]);

    await assertListLength(useManyResult, 2);
    await assertList(useManyResult, "id", ["1", "2"]);

    act(() => {
      result.current.mutation.mutate({
        id: "1",
        resource: "posts",
        mutationMode: "undoable",
        undoableTimeout: 1000,
      });
    });

    await assertListLength(useListResult, 1);
    await assertList(useListResult, "id", ["2"]);

    await assertListLength(useManyResult, 1);
    await assertList(useManyResult, "id", ["2"]);

    await assertMutationSuccess(result);
  });

  it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
    const deleteMock = vi.fn();

    const { result } = renderHook(() => useDelete(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            deleteOne: deleteMock,
          },
        },
        routerProvider: mockRouterProvider({
          params: { baz: "qux" },
        }),
        resources: [{ name: "posts", meta: { dip: "dop" } }],
      }),
    });

    result.current.mutation.mutate({
      resource: "posts",
      id: "1",
      meta: {
        foo: "bar",
        gqlQuery: "gqlQuery" as any,
        gqlMutation: "gqlMutation" as any,
      },
    });

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalled();
    });

    expect(deleteMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
          baz: "qux",
          gqlQuery: "gqlQuery",
          gqlMutation: "gqlMutation",
        }),
      }),
    );
  });

  it("works correctly with `interval` and `onInterval` params", async () => {
    const onInterval = vi.fn();
    const { result } = renderHook(
      () =>
        useDelete({
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
              deleteOne: () => {
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
      resource: "posts",
      id: 1,
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

        const { result } = renderHook(() => useDelete(), {
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

        result.current.mutation.mutate({
          id: "1",
          resource: "posts",
          mutationMode: "pessimistic",
          dataProviderName,
        });

        await waitFor(() => {
          expect(result.current.mutation.isSuccess).toBeTruthy();
        });

        expect(onPublishMock).toHaveBeenCalled();
        expect(onPublishMock).toHaveBeenCalledWith({
          channel: "resources/posts",
          date: expect.any(Date),
          type: "deleted",
          payload: {
            ids: ["1"],
          },
          meta: {
            dataProviderName,
          },
        });
      },
    );
  });

  describe("useLog", () => {
    it("publish log on success", async () => {
      const createMock = vi.fn();

      const { result } = renderHook(() => useDelete(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          authProvider: {
            ...mockAuthProvider,
            getIdentity: () =>
              Promise.resolve({
                name: "John Doe",
                id: "1",
              }),
          },
          auditLogProvider: {
            create: createMock,
            get: vi.fn(),
            update: vi.fn(),
          },
        }),
      });

      result.current.mutation.mutate({
        id: "1",
        resource: "posts",
        mutationMode: "pessimistic",
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(createMock).toHaveBeenCalled();
      expect(createMock).toHaveBeenCalledWith({
        action: "delete",
        author: {
          id: "1",
          name: "John Doe",
        },
        meta: {
          dataProviderName: "default",
          id: "1",
        },
        resource: "posts",
      });
    });
  });

  describe("useNotification", () => {
    it("should call `open` from the notification provider on success", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useDelete(), {
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
        resource: "posts",
        id: "1",
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledWith({
        description: "Success",
        key: "1-posts-notification",
        message: "Successfully deleted a post",
        type: "success",
      });
    });

    it("should call `open` from the notification provider on error", async () => {
      const deleteMock = vi.fn().mockRejectedValue(new Error("Error"));
      const notificationMock = vi.fn();

      const { result } = renderHook(() => useDelete(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteOne: deleteMock,
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
        resource: "posts",
        id: "1",
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(notificationMock).toHaveBeenCalledWith({
        description: "Error",
        key: "1-posts-notification",
        message: "Error (status code: undefined)",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useDelete(), {
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
        resource: "posts",
        id: "1",
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

      const { result } = renderHook(() => useDelete(), {
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
        resource: "posts",
        id: "1",
        successNotification: () => false,
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledTimes(0);
    });

    it("should call `open` from notification provider on error with custom notification params", async () => {
      const deleteOneMock = vi.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useDelete(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteOne: deleteOneMock,
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
        resource: "posts",
        id: "1",
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
      const deleteOneMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(() => useDelete(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteOne: deleteOneMock,
            },
          },
          authProvider: {
            onError: onErrorMock,
          } as any,
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutation.mutate({
        resource: "posts",
        id: "1",
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });

    it("should call `checkError` from the legacy auth provider on error", async () => {
      const deleteOneMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(() => useDelete(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteOne: deleteOneMock,
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
        resource: "posts",
        id: "1",
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });
  });

  it("should select correct dataProviderName", async () => {
    const deleteOneDefaultMock = vi.fn();
    const deleteOneFooMock = vi.fn();

    const { result } = renderHook(() => useDelete(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            deleteOne: deleteOneDefaultMock,
          },
          foo: {
            ...MockJSONServer.default,
            deleteOne: deleteOneFooMock,
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

    result.current.mutation.mutate({
      resource: "posts",
      id: "1",
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(deleteOneFooMock).toHaveBeenCalledWith(
      expect.objectContaining({
        resource: "posts",
      }),
    );
    expect(deleteOneDefaultMock).not.toHaveBeenCalled();
  });

  it("should get correct `meta` of related resource", async () => {
    const deleteOneMock = vi.fn();

    const { result } = renderHook(() => useDelete(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            deleteOne: deleteOneMock,
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

    result.current.mutation.mutate({
      resource: "posts",
      id: "1",
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(deleteOneMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
        }),
      }),
    );
  });

  describe("when passing `identifier` instead of `name`", () => {
    it("should select correct dataProviderName", async () => {
      const deleteOneDefaultMock = vi.fn();
      const deleteOneFooMock = vi.fn();

      const { result } = renderHook(() => useDelete(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteOne: deleteOneDefaultMock,
            },
            foo: {
              ...MockJSONServer.default,
              deleteOne: deleteOneFooMock,
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

      result.current.mutation.mutate({
        resource: "featured-posts",
        id: "1",
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(deleteOneFooMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
        }),
      );
      expect(deleteOneDefaultMock).not.toHaveBeenCalled();
    });

    it("should invalidate query store with `identifier`", async () => {
      const invalidateStore = vi.fn();
      vi.spyOn(UseInvalidate, "useInvalidate").mockReturnValue(invalidateStore);
      const deleteOneMock = vi.fn();

      const { result } = renderHook(() => useDelete(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteOne: deleteOneMock,
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

      result.current.mutation.mutate({
        resource: "featured-posts",
        id: "1",
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
      const deleteOneMock = vi.fn();

      const { result } = renderHook(() => useDelete(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteOne: deleteOneMock,
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

      result.current.mutation.mutate({
        resource: "featured-posts",
        id: "1",
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      await waitFor(() => {
        expect(deleteOneMock).toHaveBeenCalledWith(
          expect.objectContaining({
            meta: expect.objectContaining({
              bar: "baz",
            }),
          }),
        );
      });
    });
  });

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const deleteOneMock = vi.fn();
    const mutationFnMock = vi.fn();

    const { result } = renderHook(
      () =>
        useDelete({
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
              deleteOne: deleteOneMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    result.current.mutation.mutate({
      resource: "posts",
      id: "1",
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(deleteOneMock).not.toHaveBeenCalled();
    expect(mutationFnMock).toHaveBeenCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const { result } = renderHook(
      () =>
        useDelete({
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

    result.current.mutation.mutate({
      resource: "posts",
      id: "1",
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

  it("should not override audit meta.id with route params", async () => {
    const auditCreateMock = vi.fn();

    const { result } = renderHook(() => useDelete(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
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
        id: "1",
      });
    });

    await waitFor(() => expect(result.current.mutation.isSuccess).toBeTruthy());

    expect(auditCreateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "delete",
        resource: "posts",
        meta: expect.objectContaining({ id: "1" }),
      }),
    );
  });
});
