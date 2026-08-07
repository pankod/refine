import { act, renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import {
  MockJSONServer,
  TestWrapper,
  mockRouterProvider,
  queryClient,
} from "@test";
import {
  assertList,
  assertMutationSuccess,
  assertOne,
  renderUseList,
  renderUseMany,
  renderUseOne,
} from "@test/mutation-helpers";

import * as UseInvalidate from "../invalidate/index";
import { type UpdateParams, useUpdate } from "./useUpdate";

describe("useUpdate Hook [with params]", () => {
  it("should work with pessimistic update", async () => {
    const { result } = renderHook(() => useUpdate(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    act(() => {
      result.current.mutate({
        resource: "posts",
        mutationMode: "pessimistic",
        id: "1",
        values: { id: "1", title: "test" },
      });
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    const { isSuccess } = result.current.mutation;

    expect(isSuccess).toBeTruthy();
  });

  it("should work with optimistic update", async () => {
    const initialTitle =
      "Necessitatibus necessitatibus id et cupiditate provident est qui amet.";
    const updatedTitle = "optimistic test";

    const { result } = renderHook(() => useUpdate(), {
      wrapper: TestWrapper({
        dataProvider: {
          ...MockJSONServer.default,
          update: async () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                return reject(new Error("Error"));
              }, 500);
            });
          },
        },
      }),
    });

    const useOneResult = renderUseOne();

    const useListResult = renderUseList();

    const useManyResult = renderUseMany();

    await assertOne(useOneResult, "title", initialTitle);

    await assertList(useListResult, "title", initialTitle);

    await assertList(useManyResult, "title", initialTitle);

    act(() => {
      result.current.mutate({
        resource: "posts",
        mutationMode: "optimistic",
        id: "1",
        values: { title: updatedTitle },
      });
    });

    await assertOne(useOneResult, "title", updatedTitle);

    await assertList(useListResult, "title", updatedTitle);

    await assertList(useManyResult, "title", updatedTitle);

    await waitFor(() => {
      expect(result.current.mutation.isError).toEqual(true);
    });

    await assertOne(useOneResult, "title", initialTitle);

    await assertList(useListResult, "title", initialTitle);

    await assertList(useManyResult, "title", initialTitle);
  });

  it("should work with undoable update", async () => {
    const initialTitle =
      "Necessitatibus necessitatibus id et cupiditate provident est qui amet.";
    const updatedTitle = "undoable test";

    const { result } = renderHook(() => useUpdate(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
      }),
    });

    const useOneResult = renderUseOne();

    const useListResult = renderUseList();

    const useManyResult = renderUseMany();

    await assertOne(useOneResult, "title", initialTitle);

    await assertList(useListResult, "title", initialTitle);

    await assertList(useManyResult, "title", initialTitle);

    act(() => {
      result.current.mutate({
        resource: "posts",
        mutationMode: "undoable",
        undoableTimeout: 1000,
        id: "1",
        values: { title: updatedTitle },
      });
    });

    await assertOne(useOneResult, "title", updatedTitle);

    await assertList(useListResult, "title", updatedTitle);

    await assertList(useManyResult, "title", updatedTitle);

    await assertMutationSuccess(result);
  });

  it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
    const updateMock = vi.fn();

    const { result } = renderHook(() => useUpdate(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            update: updateMock,
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
      id: "1",
      values: {},
      meta: {
        foo: "bar",
        gqlQuery: "gqlQuery" as any,
        gqlMutation: "gqlMutation" as any,
      },
    });

    await waitFor(() => {
      expect(updateMock).toHaveBeenCalled();
    });

    expect(updateMock).toHaveBeenCalledWith(
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
        useUpdate({
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
              update: () => {
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
      id: 1,
      values: {
        title: "foo",
      },
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

        const { result } = renderHook(() => useUpdate(), {
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
          mutationMode: "undoable",
          undoableTimeout: 0,
          id: "1",
          values: { id: "1", title: "undoable test" },
          dataProviderName,
        });

        await waitFor(() => {
          expect(result.current.mutation.isSuccess).toBeTruthy();
        });

        expect(onPublishMock).toHaveBeenCalled();
        expect(onPublishMock).toHaveBeenCalledWith({
          channel: "resources/posts",
          date: expect.any(Date),
          type: "updated",
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

      const { result } = renderHook(() => useUpdate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              update: vi.fn().mockResolvedValue({ data: {} }),
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
        id: "1",
        values: { title: "foo" },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(onPublishMock).toHaveBeenCalledWith({
        channel: "resources/posts",
        date: expect.any(Date),
        type: "updated",
        payload: {},
        meta: {
          dataProviderName: "default",
        },
      });
    });
  });

  describe("useNotification", () => {
    it("should call `open` from the notification provider on success", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useUpdate(), {
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
        id: "1",
        values: {},
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledWith({
        description: "Successful",
        key: "1-posts-notification",
        message: "Successfully updated post",
        type: "success",
      });
    });

    it("should call `open` from the notification provider on error", async () => {
      const updateMock = vi.fn().mockRejectedValue(new Error("Error"));
      const notificationMock = vi.fn();

      const { result } = renderHook(() => useUpdate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              update: updateMock,
            },
          },
          notificationProvider: {
            open: notificationMock,
            close: vi.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutate({
        id: "1",
        resource: "posts",
        values: {},
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(notificationMock).toHaveBeenCalledWith({
        description: "Error",
        key: "1-posts-notification",
        message: "Error when updating post (status code: undefined)",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useUpdate(), {
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
        id: "1",
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

      const { result } = renderHook(() => useUpdate(), {
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
        id: "1",
        values: {},
        successNotification: () => false,
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledTimes(0);
    });

    it("should call `open` from notification provider on error with custom notification params", async () => {
      const updateMock = vi.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = vi.fn();

      const { result } = renderHook(() => useUpdate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              update: updateMock,
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
        id: "1",
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
      const updateMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(() => useUpdate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              update: updateMock,
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
        id: "1",
        values: {},
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });
  });

  it("should select correct dataProviderName", async () => {
    const updateDefaultMock = vi.fn();
    const updateFooMock = vi.fn();

    const { result } = renderHook(() => useUpdate(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            update: updateDefaultMock,
          },
          foo: {
            ...MockJSONServer.default,
            update: updateFooMock,
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
      id: "1",
      values: {
        foo: "bar",
      },
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(updateFooMock).toHaveBeenCalledWith(
      expect.objectContaining({
        resource: "posts",
      }),
    );
    expect(updateDefaultMock).not.toHaveBeenCalled();
  });

  it("should get correct `meta` of related resource", async () => {
    const updateMock = vi.fn();

    const { result } = renderHook(() => useUpdate(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            update: updateMock,
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
      id: "1",
      values: {
        title: "awesome post",
      },
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
        }),
      }),
    );
  });

  describe("when passing `identifier` instead of `name`", () => {
    it("should select correct dataProviderName", async () => {
      const updateDefaultMock = vi.fn();
      const updateFooMock = vi.fn();

      const { result } = renderHook(() => useUpdate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              update: updateDefaultMock,
            },
            foo: {
              ...MockJSONServer.default,
              update: updateFooMock,
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
        id: "1",
        values: {
          title: "foo",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(updateFooMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
        }),
      );
      expect(updateDefaultMock).not.toHaveBeenCalled();
    });

    it("should invalidate query store with `identifier`", async () => {
      const invalidateStore = vi.fn();
      vi.spyOn(UseInvalidate, "useInvalidate").mockReturnValue(invalidateStore);
      const updateMock = vi.fn();

      const { result } = renderHook(() => useUpdate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              update: updateMock,
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
        id: "1",
        values: {
          title: "foo",
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
      const updateMock = vi.fn();

      const { result } = renderHook(() => useUpdate(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              update: updateMock,
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
        id: "1",
        values: {
          title: "foo",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(updateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            bar: "baz",
          }),
        }),
      );
    });
  });

  describe("when passing `optimisticUpdateMap`", () => {
    const initialTitle =
      "Necessitatibus necessitatibus id et cupiditate provident est qui amet.";
    const updatedTitle = "optimistic test";

    it("when pass `false`", async () => {
      const { result } = renderHook(() => useUpdate(), {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer.default,
            update: async () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  return reject(new Error("Error"));
                }, 500);
              });
            },
          },
        }),
      });
      const useOneResult = renderUseOne();
      const useListResult = renderUseList();
      const useManyResult = renderUseMany();

      act(() => {
        result.current.mutate({
          resource: "posts",
          mutationMode: "optimistic",
          id: "1",
          values: { title: updatedTitle },
          optimisticUpdateMap: {
            list: false,
            detail: false,
            many: false,
          },
        });
      });

      await assertOne(useOneResult, "title", initialTitle);
      await assertList(useListResult, "title", initialTitle);
      await assertList(useManyResult, "title", initialTitle);
    });

    it("when pass `true`", async () => {
      const { result } = renderHook(() => useUpdate(), {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer.default,
            update: async () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  return reject(new Error("Error"));
                }, 500);
              });
            },
          },
        }),
      });
      const useOneResult = renderUseOne();
      const useListResult = renderUseList();
      const useManyResult = renderUseMany();

      act(() => {
        result.current.mutate({
          resource: "posts",
          mutationMode: "optimistic",
          id: "1",
          values: { title: updatedTitle },
          optimisticUpdateMap: {
            list: true,
            detail: true,
            many: true,
          },
        });
      });

      await assertOne(useOneResult, "title", updatedTitle);
      await assertList(useListResult, "title", updatedTitle);
      await assertList(useManyResult, "title", updatedTitle);
    });

    it("when pass custom mapper function", async () => {
      const { result } = renderHook(() => useUpdate(), {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer.default,
            update: async () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  return reject(new Error("Error"));
                }, 500);
              });
            },
          },
        }),
      });

      const useOneResult = renderUseOne();
      const useListResult = renderUseList();
      const useManyResult = renderUseMany();

      act(() => {
        result.current.mutate({
          resource: "posts",
          mutationMode: "optimistic",
          id: "1",
          values: { title: updatedTitle },
          optimisticUpdateMap: {
            list: (previous, values, id) => {
              if (!previous) {
                return null;
              }

              const data = previous.data.map((record) => {
                if (record.id === id) {
                  return {
                    foo: "bar-list",
                    ...record,
                    ...values,
                  };
                }
                return record;
              });

              return {
                ...previous,
                data,
              };
            },
            many: (previous, values, id) => {
              if (!previous) {
                return null;
              }

              const data = previous.data.map((record) => {
                if (record.id === id) {
                  return {
                    foo: "bar-many",
                    ...record,
                    ...values,
                  };
                }
                return record;
              });

              return {
                ...previous,
                data,
              };
            },
            detail: (previous, values) => {
              if (!previous) {
                return null;
              }

              return {
                ...previous,
                data: {
                  foo: "bar-one",
                  ...previous.data,
                  ...values,
                },
              };
            },
          },
        });
      });

      await assertOne(useOneResult, "foo", "bar-one");
      await assertList(useListResult, "foo", "bar-list");
      await assertList(useManyResult, "foo", "bar-many");

      await assertOne(useOneResult, "foo", undefined);
      await assertList(useListResult, "foo", undefined);
      await assertList(useManyResult, "foo", undefined);
    });
  });

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const updateMock = vi.fn().mockResolvedValue({ data: {} });
    const mutationFnMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useUpdate({
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
              update: updateMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    result.current.mutate({
      resource: "posts",
      id: "1",
      values: {},
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(updateMock).not.toHaveBeenCalled();
    expect(mutationFnMock).toHaveBeenCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const { result } = renderHook(
      () =>
        useUpdate({
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

  it("should throw error without 'resource'", async () => {
    const { result } = renderHook(() => useUpdate(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    act(() => {
      result.current.mutate({
        values: {},
        id: "1",
      });
    });

    await waitFor(() => {
      expect(result.current.mutation.isError).toBeTruthy();
      expect(result.current.mutation.error).toEqual(
        new Error(
          "[useUpdate]: `resource` is not defined or not matched but is required",
        ),
      );
    });
  });

  it("should throw error without 'values'", async () => {
    const { result } = renderHook(() => useUpdate(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    act(() => {
      result.current.mutate({
        resource: "posts",
        id: "1",
      });
    });

    await waitFor(() => {
      expect(result.current.mutation.isError).toBeTruthy();
      expect(result.current.mutation.error).toEqual(
        new Error("[useUpdate]: `values` is not provided but is required"),
      );
    });
  });

  it("should throw error without 'id'", async () => {
    const { result } = renderHook(() => useUpdate(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    act(() => {
      result.current.mutate({
        resource: "posts",
        values: {},
      });
    });

    await waitFor(() => {
      expect(result.current.mutation.isError).toBeTruthy();
      expect(result.current.mutation.error).toEqual(
        new Error(
          "[useUpdate]: `id` is not defined but is required in edit and clone actions",
        ),
      );
    });
  });

  it("should not throw error when id=''", async () => {
    const updateMock = vi.fn();

    const { result } = renderHook(() => useUpdate(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            update: updateMock,
          },
        },
        resources: [{ name: "posts" }],
      }),
    });

    act(() => {
      result.current.mutate({
        id: "",
        resource: "posts",
        values: {},
      });
    });

    await waitFor(() => {
      expect(result.current.mutation.isError).toBeFalsy();
      expect(updateMock).toHaveBeenCalledWith(
        expect.objectContaining({ id: "", resource: "posts", variables: {} }),
      );
    });
  });
});

describe("useUpdate Hook [with props]", () => {
  it("should work with pessimistic update", async () => {
    const updateMock = vi.fn();

    const { result } = renderHook(
      () =>
        useUpdate({
          resource: "posts",
          id: "1",
          values: { title: "test" },
          mutationMode: "pessimistic",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer,
            default: {
              ...MockJSONServer.default,
              update: updateMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "1",
        resource: "posts",
        variables: { title: "test" },
      }),
    );
  });

  it("should work with optimistic update", async () => {
    const initialTitle =
      "Necessitatibus necessitatibus id et cupiditate provident est qui amet.";
    const updatedTitle = "optimistic test";

    const { result } = renderHook(
      () =>
        useUpdate({ resource: "posts", id: "1", mutationMode: "optimistic" }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer.default,
            update: async () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  return reject(new Error("Error"));
                }, 500);
              });
            },
          },
        }),
      },
    );

    const useOneResult = renderUseOne();

    const useListResult = renderUseList();

    const useManyResult = renderUseMany();

    await assertOne(useOneResult, "title", initialTitle);

    await assertList(useListResult, "title", initialTitle);

    await assertList(useManyResult, "title", initialTitle);

    act(() => {
      result.current.mutate({
        values: { title: updatedTitle },
      });
    });

    await assertOne(useOneResult, "title", updatedTitle);

    await assertList(useListResult, "title", updatedTitle);

    await assertList(useManyResult, "title", updatedTitle);

    await waitFor(() => {
      expect(result.current.mutation.isError).toEqual(true);
    });

    await assertOne(useOneResult, "title", initialTitle);

    await assertList(useListResult, "title", initialTitle);

    await assertList(useManyResult, "title", initialTitle);
  });

  it("should work with undoable update", async () => {
    const initialTitle =
      "Necessitatibus necessitatibus id et cupiditate provident est qui amet.";
    const updatedTitle = "undoable test";

    const { result } = renderHook(
      () =>
        useUpdate({
          resource: "posts",
          mutationMode: "undoable",
          undoableTimeout: 1000,
          id: "1",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
        }),
      },
    );

    const useOneResult = renderUseOne();

    const useListResult = renderUseList();

    const useManyResult = renderUseMany();

    await assertOne(useOneResult, "title", initialTitle);

    await assertList(useListResult, "title", initialTitle);

    await assertList(useManyResult, "title", initialTitle);

    act(() => {
      result.current.mutate({
        values: { title: updatedTitle },
      });
    });

    await assertOne(useOneResult, "title", updatedTitle);

    await assertList(useListResult, "title", updatedTitle);

    await assertList(useManyResult, "title", updatedTitle);

    await assertMutationSuccess(result);
  });

  it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
    const updateMock = vi.fn();

    const { result } = renderHook(
      () =>
        useUpdate({
          resource: "posts",
          id: "1",
          meta: {
            foo: "bar",
            gqlQuery: "gqlQuery" as any,
            gqlMutation: "gqlMutation" as any,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              update: updateMock,
            },
          },
          routerProvider: mockRouterProvider({
            params: { baz: "qux" },
          }),
          resources: [{ name: "posts", meta: { dip: "dop" } }],
        }),
      },
    );

    result.current.mutate({
      values: {},
    });

    await waitFor(() => {
      expect(updateMock).toHaveBeenCalled();
    });

    expect(updateMock).toHaveBeenCalledWith(
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
        useUpdate({
          resource: "posts",
          id: 1,
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
              update: () => {
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
      values: {
        title: "foo",
      },
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
          () =>
            useUpdate({
              resource: "posts",
              mutationMode: "undoable",
              undoableTimeout: 0,
              id: "1",
              dataProviderName,
            }),
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
          values: { id: "1", title: "undoable test" },
        });

        await waitFor(() => {
          expect(result.current.mutation.isSuccess).toBeTruthy();
        });

        expect(onPublishMock).toHaveBeenCalled();
        expect(onPublishMock).toHaveBeenCalledWith({
          channel: "resources/posts",
          date: expect.any(Date),
          type: "updated",
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
        () => useUpdate({ resource: "posts", id: "1" }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                update: vi.fn().mockResolvedValue({ data: {} }),
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
        type: "updated",
        payload: {},
        meta: {
          dataProviderName: "default",
        },
      });
    });
  });

  describe("useNotification", () => {
    it("should call `open` from the notification provider on success", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () => useUpdate({ resource: "posts", id: "1" }),
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
        values: {},
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledWith({
        description: "Successful",
        key: "1-posts-notification",
        message: "Successfully updated post",
        type: "success",
      });
    });

    it("should call `open` from the notification provider on error", async () => {
      const updateMock = vi.fn().mockRejectedValue(new Error("Error"));
      const notificationMock = vi.fn();

      const { result } = renderHook(
        () => useUpdate({ id: "1", resource: "posts" }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                update: updateMock,
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

      result.current.mutate({
        values: {},
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(notificationMock).toHaveBeenCalledWith({
        description: "Error",
        key: "1-posts-notification",
        message: "Error when updating post (status code: undefined)",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useUpdate({
            id: "1",
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
        values: {},
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
          useUpdate({
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

      result.current.mutate({
        values: {},
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledTimes(0);
    });

    it("should call `open` from notification provider on error with custom notification params", async () => {
      const updateMock = vi.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useUpdate({
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
                update: updateMock,
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
        values: {},
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
      const updateMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(
        () => useUpdate({ resource: "posts", id: "1" }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                update: updateMock,
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
        values: {},
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });
  });

  it("should select correct dataProviderName", async () => {
    const updateDefaultMock = vi.fn();
    const updateFooMock = vi.fn();

    const { result } = renderHook(
      () => useUpdate({ resource: "posts", id: "1" }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              update: updateDefaultMock,
            },
            foo: {
              ...MockJSONServer.default,
              update: updateFooMock,
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

    result.current.mutate({
      values: {
        foo: "bar",
      },
    });

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(updateFooMock).toHaveBeenCalledWith(
      expect.objectContaining({
        resource: "posts",
      }),
    );
    expect(updateDefaultMock).not.toHaveBeenCalled();
  });

  it("should get correct `meta` of related resource", async () => {
    const updateMock = vi.fn();

    const { result } = renderHook(
      () => useUpdate({ resource: "posts", id: "1" }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              update: updateMock,
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

    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
        }),
      }),
    );
  });

  describe("when passing `identifier` instead of `name`", () => {
    it("should select correct dataProviderName", async () => {
      const updateDefaultMock = vi.fn();
      const updateFooMock = vi.fn();

      const { result } = renderHook(
        () => useUpdate({ resource: "featured-posts", id: "1" }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                update: updateDefaultMock,
              },
              foo: {
                ...MockJSONServer.default,
                update: updateFooMock,
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
          title: "foo",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(updateFooMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
        }),
      );
      expect(updateDefaultMock).not.toHaveBeenCalled();
    });

    it("should invalidate query store with `identifier`", async () => {
      const invalidateStore = vi.fn();
      vi.spyOn(UseInvalidate, "useInvalidate").mockReturnValue(invalidateStore);
      const updateMock = vi.fn();

      const { result } = renderHook(
        () => useUpdate({ resource: "featured-posts", id: "1" }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                update: updateMock,
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
          title: "foo",
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
      const updateMock = vi.fn();

      const { result } = renderHook(
        () => useUpdate({ resource: "featured-posts", id: "1" }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                update: updateMock,
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
          title: "foo",
        },
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(updateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            bar: "baz",
          }),
        }),
      );
    });
  });

  describe("when passing `optimisticUpdateMap`", () => {
    const initialTitle =
      "Necessitatibus necessitatibus id et cupiditate provident est qui amet.";
    const updatedTitle = "optimistic test";

    it("when pass `false`", async () => {
      const { result } = renderHook(
        () =>
          useUpdate({
            resource: "posts",
            mutationMode: "optimistic",
            id: "1",
            optimisticUpdateMap: {
              list: false,
              detail: false,
              many: false,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              ...MockJSONServer.default,
              update: async () => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    return reject(new Error("Error"));
                  }, 500);
                });
              },
            },
          }),
        },
      );
      const useOneResult = renderUseOne();
      const useListResult = renderUseList();
      const useManyResult = renderUseMany();

      act(() => {
        result.current.mutate({
          values: { title: updatedTitle },
        });
      });

      await assertOne(useOneResult, "title", initialTitle);
      await assertList(useListResult, "title", initialTitle);
      await assertList(useManyResult, "title", initialTitle);
    });

    it("when pass `true`", async () => {
      const { result } = renderHook(
        () =>
          useUpdate({
            resource: "posts",
            mutationMode: "optimistic",
            id: "1",
            optimisticUpdateMap: {
              list: true,
              detail: true,
              many: true,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              ...MockJSONServer.default,
              update: async () => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    return reject(new Error("Error"));
                  }, 500);
                });
              },
            },
          }),
        },
      );
      const useOneResult = renderUseOne();
      const useListResult = renderUseList();
      const useManyResult = renderUseMany();

      act(() => {
        result.current.mutate({
          values: { title: updatedTitle },
        });
      });

      await assertOne(useOneResult, "title", updatedTitle);
      await assertList(useListResult, "title", updatedTitle);
      await assertList(useManyResult, "title", updatedTitle);
    });

    it("when pass custom mapper function", async () => {
      const { result } = renderHook(
        () =>
          useUpdate({
            resource: "posts",
            mutationMode: "optimistic",
            id: "1",
            optimisticUpdateMap: {
              list: (previous, values, id) => {
                if (!previous) {
                  return null;
                }

                const data = previous.data.map((record) => {
                  if (record.id === id) {
                    return {
                      foo: "bar-list",
                      ...record,
                      ...values,
                    };
                  }
                  return record;
                });

                return {
                  ...previous,
                  data,
                };
              },
              many: (previous, values, id) => {
                if (!previous) {
                  return null;
                }

                const data = previous.data.map((record) => {
                  if (record.id === id) {
                    return {
                      foo: "bar-many",
                      ...record,
                      ...values,
                    };
                  }
                  return record;
                });

                return {
                  ...previous,
                  data,
                };
              },
              detail: (previous, values) => {
                if (!previous) {
                  return null;
                }

                return {
                  ...previous,
                  data: {
                    foo: "bar-one",
                    ...previous.data,
                    ...values,
                  },
                };
              },
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              ...MockJSONServer.default,
              update: async () => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    return reject(new Error("Error"));
                  }, 500);
                });
              },
            },
          }),
        },
      );

      const useOneResult = renderUseOne();
      const useListResult = renderUseList();
      const useManyResult = renderUseMany();

      act(() => {
        result.current.mutate({
          values: { title: updatedTitle },
        });
      });

      await assertOne(useOneResult, "foo", "bar-one");
      await assertList(useListResult, "foo", "bar-list");
      await assertList(useManyResult, "foo", "bar-many");

      await assertOne(useOneResult, "foo", undefined);
      await assertList(useListResult, "foo", undefined);
      await assertList(useManyResult, "foo", undefined);
    });
  });

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const updateMock = vi.fn().mockResolvedValue({ data: {} });
    const mutationFnMock = vi.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useUpdate({
          resource: "posts",
          id: "1",
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
              update: updateMock,
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

    expect(updateMock).not.toHaveBeenCalled();
    expect(mutationFnMock).toHaveBeenCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const { result } = renderHook(
      () =>
        useUpdate({
          resource: "posts",
          id: "1",
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
        useUpdate({
          values: {},
          id: "1",
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
          "[useUpdate]: `resource` is not defined or not matched but is required",
        ),
      );
    });
  });

  it("should throw error without 'values'", async () => {
    const { result } = renderHook(
      () =>
        useUpdate({
          resource: "posts",
          id: "1",
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
        new Error("[useUpdate]: `values` is not provided but is required"),
      );
    });
  });

  it("should throw error without 'id'", async () => {
    const { result } = renderHook(
      () =>
        useUpdate({
          resource: "posts",
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
          "[useUpdate]: `id` is not defined but is required in edit and clone actions",
        ),
      );
    });
  });

  it("should not throw error when id=''", async () => {
    const updateMock = vi.fn();

    const { result } = renderHook(
      () =>
        useUpdate({
          id: "",
          resource: "posts",
          values: {},
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              update: updateMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.mutation.isError).toBeFalsy();
      expect(updateMock).toHaveBeenCalledWith(
        expect.objectContaining({ id: "", resource: "posts", variables: {} }),
      );
    });
  });
});

describe("useUpdate Hook should work with params and props", () => {
  it("should params override prop", async () => {
    const options: {
      params: UpdateParams<any, any, any>;
      props: UpdateParams<any, any, any>;
    } = {
      params: {
        id: "1-overrided",
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
        id: "1",
        resource: "posts",
        dataProviderName: "default",
        values: { foo: "bar" },
        meta: {
          foo: "bar",
        },
        successNotification: false,
      },
    };

    const updateMock = vi.fn();
    const openNotificationMock = vi.fn();

    const { result } = renderHook(() => useUpdate(options.props), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: vi.fn(),
        },
        dataProvider: {
          default: MockJSONServer.default,
          overrided: {
            ...MockJSONServer.default,
            update: updateMock,
          },
        },
      }),
    });

    result.current.mutate(options.params);

    await waitFor(() => {
      expect(result.current.mutation.isSuccess).toBeTruthy();
    });

    expect(updateMock).toHaveBeenCalledWith({
      id: options.params.id,
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
        useUpdate({
          resource: "posts",
          id: "1",
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
        useUpdate({
          resource: "posts",
          id: "1",
          values: {},
          mutationOptions: {
            onError: () => onErrorProp("onErrorProp"),
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer.default,
            update: async () => {
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

    const { result } = renderHook(() => useUpdate(), {
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
        values: { title: "updated" },
      });
    });

    await waitFor(() => expect(result.current.mutation.isSuccess).toBeTruthy());

    expect(auditCreateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "update",
        resource: "posts",
        meta: expect.objectContaining({ id: "1" }),
      }),
    );
  });
});
