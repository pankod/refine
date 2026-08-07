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
  assertListLength,
  assertMutationSuccess,
  renderUseList,
  renderUseMany,
} from "@test/mutation-helpers";

import * as UseInvalidate from "../invalidate/index";
import { useDeleteMany } from "./useDeleteMany";

describe("useDeleteMany Hook", () => {
  it("should work with pessimistic update", async () => {
    const { result } = renderHook(() => useDeleteMany(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    result.current.mutation.mutate({
      resource: "posts",
      ids: ["1"],
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    const { isSuccess } = result.current.mutation;

    expect(isSuccess).toBeTruthy();
  });

  it("should work with optimistic update", async () => {
    const { result } = renderHook(() => useDeleteMany(), {
      wrapper: TestWrapper({
        dataProvider: {
          ...MockJSONServer.default,
          deleteMany: () => {
            return new Promise((res, rej) => {
              setTimeout(() => rej(), 1000);
            });
          },
        },
        resources: [{ name: "posts" }],
      }),
    });

    const useListResult = renderUseList();

    const useManyResult = renderUseMany();

    await assertListLength(useListResult, 2);

    await assertListLength(useManyResult, 2);

    act(() => {
      result.current.mutation.mutate({
        resource: "posts",
        mutationMode: "optimistic",
        ids: ["1", "2"],
      });
    });

    await assertListLength(useListResult, 0);

    await assertListLength(useManyResult, 0);

    await waitFor(() => {
      expect(result.current.mutation.isError).toBeTruthy();
    });

    await assertListLength(useListResult, 2);

    await assertListLength(useManyResult, 2);
  });

  it("should work with undoable update", async () => {
    const { result } = renderHook(() => useDeleteMany(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    const useListResult = renderUseList();

    const useManyResult = renderUseMany();

    await assertListLength(useListResult, 2);

    await assertListLength(useManyResult, 2);

    act(() => {
      result.current.mutation.mutate({
        resource: "posts",
        mutationMode: "undoable",
        undoableTimeout: 1000,
        ids: ["1", "2"],
      });
    });

    await assertListLength(useListResult, 0);

    await assertListLength(useManyResult, 0);

    await assertMutationSuccess(result);
  });

  it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
    const deleteManyMock = vi.fn();

    const { result } = renderHook(() => useDeleteMany(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            deleteMany: deleteManyMock,
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
      ids: ["1"],
      meta: {
        foo: "bar",
        gqlQuery: "gqlQuery" as any,
        gqlMutation: "gqlMutation" as any,
      },
    });

    await waitFor(() => {
      expect(deleteManyMock).toHaveBeenCalled();
    });

    expect(deleteManyMock).toHaveBeenCalledWith(
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
        useDeleteMany({
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
              deleteMany: () => {
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
      ids: [1, 2],
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

        const { result } = renderHook(() => useDeleteMany(), {
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
          resource: "posts",
          ids: ["1", "2"],
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
            ids: ["1", "2"],
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

      const { result } = renderHook(() => useDeleteMany(), {
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
        resource: "posts",
        ids: ["1", "2"],
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(createMock).toHaveBeenCalled();
      expect(createMock).toHaveBeenCalledWith({
        action: "deleteMany",
        author: {
          id: "1",
          name: "John Doe",
        },
        meta: {
          dataProviderName: "default",
          ids: ["1", "2"],
        },
        resource: "posts",
      });
    });
  });

  it("should use `deleteOne` method if does not exist `deleteMany` method in dataProvider", async () => {
    const deleteOneMock = vi.fn();

    const { result } = renderHook(() => useDeleteMany(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            deleteOne: deleteOneMock,
            deleteMany: undefined,
          },
        },
        resources: [{ name: "posts" }],
      }),
    });

    result.current.mutation.mutate({
      resource: "posts",
      ids: ["1", "2"],
    });

    await waitFor(() => {
      expect(deleteOneMock).toHaveBeenCalled();
    });

    expect(deleteOneMock).toHaveBeenCalledTimes(2);
    expect(deleteOneMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        resource: "posts",
        id: "1",
      }),
    );
    expect(deleteOneMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        resource: "posts",
        id: "2",
      }),
    );
  });

  describe("useNotification", () => {
    it("should call `open` from the notification provider on success", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useDeleteMany(), {
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
        ids: ["1", "2"],
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledWith({
        description: "Success",
        key: "1,2-posts-notification",
        message: "Successfully deleted posts",
        type: "success",
      });
    });

    it("should call `open` from the notification provider on error", async () => {
      const deleteManyMock = vi.fn().mockRejectedValue(new Error("Error"));
      const notificationMock = vi.fn();

      const { result } = renderHook(() => useDeleteMany(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteMany: deleteManyMock,
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
        ids: ["1", "2"],
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(notificationMock).toHaveBeenCalledWith({
        description: "Error",
        key: "1,2-posts-notification",
        message: "Error (status code: undefined)",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useDeleteMany(), {
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
        ids: ["1", "2"],
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

      const { result } = renderHook(() => useDeleteMany(), {
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
        ids: ["1", "2"],
        successNotification: () => false,
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledTimes(0);
    });

    it("should call `open` from notification provider on error with custom notification params", async () => {
      const deleteManyMock = vi.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useDeleteMany(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteMany: deleteManyMock,
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
        ids: ["1", "2"],
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
      const deleteManyMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(() => useDeleteMany(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteMany: deleteManyMock,
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
        ids: ["1"],
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });

    it("should select correct dataProviderName", async () => {
      const deleteManyDefaultMock = vi.fn();
      const deleteManyFooMock = vi.fn();

      const { result } = renderHook(() => useDeleteMany(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteMany: deleteManyDefaultMock,
            },
            foo: {
              ...MockJSONServer.default,
              deleteMany: deleteManyFooMock,
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
        ids: ["1", "2"],
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(deleteManyFooMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
        }),
      );
      expect(deleteManyDefaultMock).not.toHaveBeenCalled();
    });

    it("should get correct `meta` of related resource", async () => {
      const deleteManyMock = vi.fn();

      const { result } = renderHook(() => useDeleteMany(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteMany: deleteManyMock,
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
        ids: ["1", "2"],
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(deleteManyMock).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            foo: "bar",
          }),
        }),
      );
    });

    describe("when passing `identifier` instead of `name`", () => {
      it("should select correct dataProviderName", async () => {
        const deleteManyDefaultMock = vi.fn();
        const deleteManyFooMock = vi.fn();

        const { result } = renderHook(() => useDeleteMany(), {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                deleteMany: deleteManyDefaultMock,
              },
              foo: {
                ...MockJSONServer.default,
                deleteMany: deleteManyFooMock,
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
          ids: ["1", "2"],
        });

        await waitFor(() => {
          expect(result.current.mutation.isSuccess).toBeTruthy();
        });

        expect(deleteManyFooMock).toHaveBeenCalledWith(
          expect.objectContaining({
            resource: "posts",
          }),
        );
        expect(deleteManyDefaultMock).not.toHaveBeenCalled();
      });

      it("should invalidate query store with `identifier`", async () => {
        const invalidateStore = vi.fn();
        vi.spyOn(UseInvalidate, "useInvalidate").mockReturnValue(
          invalidateStore,
        );
        const deleteManyMock = vi.fn();

        const { result } = renderHook(() => useDeleteMany(), {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                deleteMany: deleteManyMock,
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
          ids: ["1", "2"],
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
        const deleteManyMock = vi.fn();

        const { result } = renderHook(() => useDeleteMany(), {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                deleteMany: deleteManyMock,
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
          ids: ["1", "2"],
        });

        await waitFor(() => {
          expect(result.current.mutation.isSuccess).toBeTruthy();
        });

        expect(deleteManyMock).toHaveBeenCalledWith(
          expect.objectContaining({
            meta: expect.objectContaining({
              bar: "baz",
            }),
          }),
        );
      });
    });

    it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
      const useDeleteManyMock = vi.fn().mockResolvedValue({ data: {} });
      const mutationFnMock = vi.fn().mockResolvedValue({ data: {} });

      const { result } = renderHook(
        () =>
          useDeleteMany({
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
                update: useDeleteManyMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      result.current.mutation.mutate({
        resource: "posts",
        ids: ["1", "2"],
        values: {},
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(useDeleteManyMock).not.toHaveBeenCalled();
      expect(mutationFnMock).toHaveBeenCalled();
    });

    it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
      const { result } = renderHook(
        () =>
          useDeleteMany({
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
        ids: ["1", "2"],
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
  });
});
