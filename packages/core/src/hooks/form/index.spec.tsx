import React from "react";
import { vi } from "vitest";

import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, act, mockRouterProvider } from "@test";
import { posts } from "@test/dataMocks";
import {
  assertList,
  assertOne,
  renderUseList,
  renderUseMany,
  renderUseOne,
} from "@test/mutation-helpers";

import { useForm } from ".";

const SimpleWrapper = TestWrapper({
  dataProvider: MockJSONServer,
});

const EditWrapper = TestWrapper({
  dataProvider: MockJSONServer,
  routerProvider: mockRouterProvider({
    resource: {
      name: "posts",
    },
    action: "edit",
    id: "1",
  }),
});

const CloneWrapper = TestWrapper({
  dataProvider: MockJSONServer,
  routerProvider: mockRouterProvider({
    resource: {
      name: "posts",
    },
    action: "clone",
    id: "1",
  }),
});

const EditWrapperWithRoute: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => <EditWrapper>{children}</EditWrapper>;

const CloneWrapperWithRoute: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => <CloneWrapper>{children}</CloneWrapper>;

describe("useForm Hook", () => {
  it("mounts without throwing", async () => {
    const { result } = renderHook(() => useForm({ resource: "posts" }), {
      wrapper: SimpleWrapper,
    });

    await waitFor(() => {
      expect(result.current.formLoading).toBeDefined();
    });
  });

  it("fetches data when in edit mode", async () => {
    const { result } = renderHook(() => useForm({ resource: "posts" }), {
      wrapper: EditWrapperWithRoute,
    });

    await waitFor(() => {
      expect(!result.current.formLoading).toBeTruthy();
    });

    expect(result.current.query?.data?.data.title).toEqual(posts[0].title);
  });

  it("uses the correct meta values when fetching data", async () => {
    const getOneMock = vi.fn();

    const { result } = renderHook(
      () =>
        useForm({
          resource: "posts",
          action: "edit",
          id: 1,
          meta: { foo: "baz", bar: "tux" },
          queryMeta: { foo: "bar", baz: "qux" },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getOne: getOneMock,
            },
          },
          routerProvider: mockRouterProvider(),
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.formLoading).toBeTruthy();
    });

    await waitFor(() => {
      expect(getOneMock).toHaveBeenCalled();
    });

    expect(getOneMock).toHaveBeenCalledWith(
      expect.objectContaining({
        resource: "posts",
        meta: expect.objectContaining({
          foo: "bar",
          baz: "qux",
          bar: "tux",
        }),
      }),
    );
  });

  it("correctly picks up edit props from route", async () => {
    const { result } = renderHook(() => useForm(), {
      wrapper: EditWrapperWithRoute,
    });

    await waitFor(() => {
      expect(!result.current.formLoading).toBeTruthy();
    });

    expect(result.current.id).toEqual("1");
  });

  it("correctly reads id value from route", async () => {
    const { result } = renderHook(
      () =>
        useForm({
          resource: "posts",
        }),
      {
        wrapper: EditWrapperWithRoute,
      },
    );

    await waitFor(() => {
      expect(!result.current.formLoading).toBeTruthy();
    });

    expect(result.current.id).toEqual("1");
  });

  it("correctly picks up value from props", async () => {
    const { result } = renderHook(
      () =>
        useForm({
          resource: "posts",
          id: 2,
        }),
      {
        wrapper: EditWrapperWithRoute,
      },
    );

    await waitFor(() => {
      expect(!result.current.formLoading).toBeTruthy();
    });

    expect(result.current.query?.data?.data.title).toEqual(posts[0].title);
    expect(result.current.id).toEqual(2);
  });

  it("correctly return id value from route with custom resource", async () => {
    const { result } = renderHook(
      () =>
        useForm({
          resource: "categories",
          action: "edit",
          id: 2,
        }),
      {
        wrapper: EditWrapperWithRoute,
      },
    );

    await waitFor(() => {
      expect(!result.current.formLoading).toBeTruthy();
    });

    expect(result.current.query?.data?.data.title).toEqual(posts[0].title);

    expect(result.current.id).toEqual(2);
  });

  it("correctly return id value which was set with setId after it was set", async () => {
    const { result } = renderHook(
      () =>
        useForm({
          resource: "posts",
        }),
      {
        wrapper: EditWrapperWithRoute,
      },
    );

    expect(result.current.id).toEqual("1");

    await act(async () => {
      result.current.setId?.("3");
    });

    expect(result.current.id).toEqual("3");
  });

  it("correctly return id value after its updated with a new value", async () => {
    const { result, rerender } = renderHook(
      ({ id }) =>
        useForm({
          resource: "posts",
          id,
        }),
      {
        wrapper: EditWrapperWithRoute,
        initialProps: {
          id: "1",
        },
      },
    );

    await waitFor(() => expect(result.current.id).toEqual("1"));

    await act(async () => {
      rerender({ id: "2" });
    });

    await waitFor(() => expect(result.current.id).toEqual("2"));
  });

  it("correctly return id undefined when route and options is different", async () => {
    const { result } = renderHook(
      () =>
        useForm({
          resource: "categories",
        }),
      {
        wrapper: EditWrapperWithRoute,
      },
    );

    expect(result.current.id).toEqual(undefined);
  });

  it("fetches data and puts in the form while cloning", async () => {
    const { result } = renderHook(() => useForm({ resource: "posts" }), {
      wrapper: CloneWrapperWithRoute,
    });

    await waitFor(() => {
      expect(!result.current.formLoading).toBeTruthy();
    });

    expect(result.current.query?.data?.data.title).toEqual(posts[0].title);
  });

  it("should pass meta from resource defination, hook parameter and query parameters to dataProvider", async () => {
    const getOneMock = vi.fn();

    renderHook(() => useForm({ resource: "posts", meta: { foo: "bar" } }), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            getOne: getOneMock,
          },
        },
        routerProvider: mockRouterProvider({
          action: "edit",
          resource: { name: "posts" },
          id: "1",
          pathname: "/posts/edit/1",
          params: { baz: "qux" },
        }),
        resources: [{ name: "posts", meta: { dip: "dop" } }],
      }),
    });

    await waitFor(() => {
      expect(getOneMock).toHaveBeenCalled();
    });

    expect(getOneMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
          baz: "qux",
          dip: "dop",
        }),
      }),
    );
  });

  it("two resources with same name, should pass resource meta according to identifier", async () => {
    const getOneMock = vi.fn();

    renderHook(() => useForm({ resource: "recentPosts", id: "1" }), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            getOne: getOneMock,
          },
        },
        routerProvider: mockRouterProvider({
          action: "edit",
          resource: { name: "posts", identifier: "recentPosts" },
          id: "1",
          pathname: "/posts/edit/1",
        }),
        resources: [
          {
            name: "posts",
            identifier: "recentPosts",
            meta: {
              startDate: "2021-01-01",
            },
          },
          {
            name: "posts",
            identifier: "popularPosts",
            meta: {
              likes: 100,
            },
          },
        ],
      }),
    });

    await waitFor(() => {
      expect(getOneMock).toHaveBeenCalled();
    });

    expect(getOneMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          startDate: "2021-01-01",
        }),
      }),
    );

    expect(getOneMock).not.toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          likes: 100,
        }),
      }),
    );
  });

  it("redirect method should redirect to correct path", () => {
    const goMock = vi.fn();

    const { result } = renderHook(
      () =>
        useForm({
          resource: "posts",
          action: "create",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          routerProvider: mockRouterProvider({
            fns: {
              go: () => {
                return ({ to, type, ...rest }) => {
                  if (type === "path") return to;
                  goMock({ to, type, ...rest });
                  return undefined;
                };
              },
            },
          }),
          resources: [
            {
              name: "posts",
              list: "/posts",
              edit: "/posts/edit/:id",
            },
          ],
        }),
      },
    );

    result.current.redirect("edit", 1);

    expect(goMock).toHaveBeenCalledWith({
      to: "/posts/edit/1",
      type: "push",
    });
  });

  it("redirect method should redirect to correct path with id", () => {
    const goMock = vi.fn();

    const { result } = renderHook(
      () =>
        useForm({
          resource: "posts",
          action: "create",
          id: "123",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          routerProvider: mockRouterProvider({
            fns: {
              go: () => {
                return ({ to, type, ...rest }) => {
                  if (type === "path") return to;
                  goMock({ to, type, ...rest });
                  return undefined;
                };
              },
            },
          }),
          resources: [
            {
              name: "posts",
              list: "/posts",
              edit: "/posts/edit/:id",
            },
          ],
        }),
      },
    );

    result.current.redirect("edit");

    expect(goMock).toHaveBeenCalledWith({
      to: "/posts/edit/123",
      type: "push",
    });
  });

  it("works correctly with `interval` and `onInterval` params for query", async () => {
    const onInterval = vi.fn();
    const { result } = renderHook(
      () =>
        useForm({
          resource: "posts",
          action: "edit",
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
              getOne: () => {
                return new Promise((res) => {
                  setTimeout(() => res({} as any), 1000);
                });
              },
            },
          },

          resources: [
            {
              name: "posts",
              list: "/posts",
              edit: "/posts/edit/:id",
            },
          ],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query?.isFetching).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBe(900);
      expect(onInterval).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(!result.current.query?.isFetching).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBeUndefined();
    });
  });

  it("should return deprecated query and mutation results", async () => {
    const { result } = renderHook(() => useForm({ resource: "posts" }), {
      wrapper: SimpleWrapper,
    });

    await waitFor(() => {
      expect(result.current.query).toEqual(result.current.query);
      expect(result.current.mutation).toEqual(result.current.mutation);
    });
  });

  describe("action 'create'", () => {
    it("onFinish should trigger create dataProvider method", async () => {
      const createMock = vi.fn();

      const { result } = renderHook(
        () => useForm({ resource: "posts", action: "create" }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                create: createMock,
              },
            },
            routerProvider: mockRouterProvider(),
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        await result.current.onFinish({
          title: "foo",
        });
      });

      await waitFor(() => {
        expect(createMock).toHaveBeenCalled();
      });

      expect(createMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
          variables: {
            title: "foo",
          },
        }),
      );
    });

    it("should call the `create` method with correct meta values", async () => {
      const createMock = vi.fn();

      const { result } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "create",
            meta: { method: "POST", foo: "bar" },
            mutationMeta: { method: "PATCH", baz: "qux" },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                create: createMock,
              },
            },
            routerProvider: mockRouterProvider(),
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        await result.current.onFinish({});
      });

      await waitFor(() => {
        expect(createMock).toHaveBeenCalled();
      });

      expect(createMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
          meta: expect.objectContaining({
            method: "PATCH",
            foo: "bar",
            baz: "qux",
          }),
        }),
      );
    });

    it("onFinish should not trigger create dataProvider method if resource not found", async () => {
      const createMock = vi.fn();

      const { result } = renderHook(() => useForm({ action: "create" }), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
            },
          },
          routerProvider: mockRouterProvider(),
          resources: [{ name: "posts" }],
        }),
      });

      await act(async () => {
        await result.current
          .onFinish({
            title: "foo",
          })
          .catch((err) => {});
      });

      await waitFor(() => {
        expect(createMock).not.toHaveBeenCalled();
      });
    });

    it("should call `onMutationSuccess` with correct parameters", async () => {
      const onMutationSuccessMock = vi.fn();

      const { result } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "create",
            onMutationSuccess: onMutationSuccessMock,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        await result.current.onFinish({ title: "foo" });
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(onMutationSuccessMock).toHaveBeenCalledWith(
        { data: posts[0] },
        {
          title: "foo",
        },
        undefined,
        false,
      );
    });

    it("should call `onMutationError` with correct parameters", async () => {
      const createMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onMutationErrorMock = vi.fn();

      const { result } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "create",
            onMutationError: onMutationErrorMock,
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

      await act(async () => {
        result.current.onFinish({ title: "foo" }).catch((err) => {});
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(onMutationErrorMock).toHaveBeenCalledWith(
        new Error("Error"),
        {
          title: "foo",
        },
        undefined,
        false,
      );
    });

    it("works correctly with `interval` and `onInterval` params for create mutation", async () => {
      const onInterval = vi.fn();
      const { result } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "create",
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

            resources: [
              {
                name: "posts",
                list: "/posts",
                edit: "/posts/edit/:id",
              },
            ],
          }),
        },
      );

      const promise = result.current.onFinish({
        title: "foo",
      });

      await waitFor(() => {
        expect(result.current.mutation?.isPending).toBeTruthy();
        expect(result.current.overtime.elapsedTime).toBe(900);
        expect(onInterval).toHaveBeenCalled();
      });

      await promise;

      await waitFor(() => {
        expect(!result.current.mutation?.isPending).toBeTruthy();
        expect(result.current.overtime.elapsedTime).toBeUndefined();
      });
    });
  });

  describe("action 'edit'", () => {
    it("onFinish should trigger edit dataProvider method", async () => {
      const updateMock = vi.fn();

      const { result } = renderHook(
        () => useForm({ resource: "posts", action: "edit", id: "123" }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                update: updateMock,
              },
            },
            routerProvider: mockRouterProvider(),
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        await result.current.onFinish({
          title: "foo",
        });
      });

      await waitFor(() => {
        expect(updateMock).toHaveBeenCalled();
      });

      expect(updateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
          variables: {
            title: "foo",
          },
        }),
      );
    });

    it("should call edit dataProvider method with correct meta values", async () => {
      const updateMock = vi.fn();

      const { result } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "edit",
            id: "123",
            meta: { method: "POST", foo: "bar" },
            queryMeta: { method: "GET" },
            mutationMeta: { method: "PATCH", baz: "qux" },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                update: updateMock,
              },
            },
            routerProvider: mockRouterProvider(),
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        await result.current.onFinish({});
      });

      await waitFor(() => {
        expect(updateMock).toHaveBeenCalled();
      });

      expect(updateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
          meta: expect.objectContaining({
            method: "PATCH",
            foo: "bar",
            baz: "qux",
          }),
        }),
      );
    });

    it("onFinish should not trigger edit dataProvider method if resource not found", async () => {
      const updateMock = vi.fn();

      const { result } = renderHook(() => useForm({ action: "edit" }), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              update: updateMock,
            },
          },
          routerProvider: mockRouterProvider(),
          resources: [{ name: "posts" }],
        }),
      });

      await act(async () => {
        await result.current
          .onFinish({
            title: "foo",
          })
          .catch((err) => {});
      });

      await waitFor(() => {
        expect(updateMock).not.toHaveBeenCalled();
      });
    });

    it("should call `onMutationSuccess` with correct parameters", async () => {
      const onMutationSuccessMock = vi.fn();

      const { result } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "edit",
            id: "123",
            onMutationSuccess: onMutationSuccessMock,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        await result.current.onFinish({ title: "foo" });
      });

      await waitFor(() => {
        expect(result.current.mutation.isSuccess).toBeTruthy();
      });

      expect(onMutationSuccessMock).toHaveBeenCalledWith(
        { data: posts[0] },
        {
          title: "foo",
        },
        expect.anything(),
        false,
      );
    });

    it("should call `onMutationError` with correct parameters", async () => {
      const updateMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onMutationErrorMock = vi.fn();

      const { result } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "edit",
            id: "123",
            onMutationError: onMutationErrorMock,
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

      await act(async () => {
        await result.current.onFinish({ title: "foo" }).catch(() => {});
      });

      await waitFor(() => {
        expect(result.current.mutation.isError).toBeTruthy();
      });

      expect(onMutationErrorMock).toHaveBeenCalledWith(
        new Error("Error"),
        {
          title: "foo",
        },
        expect.anything(),
        false,
      );
    });

    it("works correctly with `interval` and `onInterval` params for edit mutation", async () => {
      const onInterval = vi.fn();
      const { result, rerender } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "edit",
            id: "123",
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

            resources: [
              {
                name: "posts",
                list: "/posts",
                edit: "/posts/edit/:id",
              },
            ],
          }),
        },
      );

      const promise = result.current.onFinish({
        title: "foo",
      });

      await waitFor(() => {
        expect(result.current.mutation?.isPending).toBeTruthy();
        expect(result.current.overtime.elapsedTime).toBe(900);
        expect(onInterval).toHaveBeenCalled();
      });

      await promise;

      await waitFor(() => {
        expect(!result.current.mutation?.isPending).toBeTruthy();
        expect(result.current.overtime.elapsedTime).toBeUndefined();
      });
    });

    it("should work with optimistic update", async () => {
      const initialTitle =
        "Necessitatibus necessitatibus id et cupiditate provident est qui amet.";
      const updatedTitle = "optimistic test";

      const { result } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "edit",
            id: "1",
            mutationMode: "optimistic",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              ...MockJSONServer.default,
              update: async () => {
                return new Promise((res, rej) => {
                  setTimeout(() => rej(), 500);
                });
              },
            },
            routerProvider: mockRouterProvider(),
            resources: [{ name: "posts" }],
          }),
        },
      );

      const useOneResult = renderUseOne();
      const useListResult = renderUseList();
      const useManyResult = renderUseMany();

      await assertOne(useOneResult, "title", initialTitle);

      await assertList(useListResult, "title", initialTitle);

      await assertList(useManyResult, "title", initialTitle);

      await act(async () => {
        await result.current.onFinish({ title: updatedTitle });
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
  });

  describe("warn messages", () => {
    const warnMock = vi.fn();

    beforeAll(() => {
      vi.spyOn(console, "warn").mockImplementation(warnMock);
    });
    beforeEach(() => {
      warnMock.mockClear();
    });

    it("should warn when `resource` is passed and `id` is not", async () => {
      renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "edit",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(warnMock).toHaveBeenCalled();
      });
    });

    it("should not warn when `resource` is passed and `id` is not, if `queryOption.enabled` is false", async () => {
      renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "edit",
            queryOptions: {
              enabled: false,
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
        expect(warnMock).not.toHaveBeenCalled();
      });
    });
  });

  describe("queryOptions.enabled behavior", () => {
    it("should not fetch when external enabled=true but id=undefined (bug scenario)", async () => {
      const getOneMock = vi.fn();

      renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "edit",
            // id is undefined - this should prevent fetching even with enabled=true
            queryOptions: {
              enabled: true, // User sets enabled to true
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

      // Wait a bit to ensure no fetch occurs
      await waitFor(() => {
        expect(getOneMock).not.toHaveBeenCalled();
      });
    });

    it("should not fetch when external enabled=false (regardless of id)", async () => {
      const getOneMock = vi.fn();

      renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "edit",
            id: "1", // id is defined
            queryOptions: {
              enabled: false, // User disables fetching
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
        expect(getOneMock).not.toHaveBeenCalled();
      });
    });

    it("should fetch when external enabled=true and id is defined", async () => {
      const getOneMock = vi.fn().mockResolvedValue({
        data: { id: "1", title: "Test Post" },
      });

      const { result } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "edit",
            id: "1", // id is defined
            queryOptions: {
              enabled: true, // User enables fetching
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
        expect(getOneMock).toHaveBeenCalled();
        expect(result.current.query?.data?.data?.title).toEqual("Test Post");
      });
    });

    it("should fetch when no external enabled is provided and id is defined (default behavior)", async () => {
      const getOneMock = vi.fn().mockResolvedValue({
        data: { id: "1", title: "Test Post" },
      });

      const { result } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "edit",
            id: "1", // id is defined
            // No queryOptions.enabled provided
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
        expect(getOneMock).toHaveBeenCalled();
        expect(result.current.query?.data?.data?.title).toEqual("Test Post");
      });
    });

    it("should not fetch in create mode even with enabled=true", async () => {
      const getOneMock = vi.fn();

      renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "create",
            queryOptions: {
              enabled: true, // User tries to enable in create mode
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
        expect(getOneMock).not.toHaveBeenCalled();
      });
    });
  });

  describe("onFinish rejections", () => {
    it("should reject immediately if resource is not defined", async () => {
      const { result } = renderHook(
        () =>
          useForm({
            action: "edit",
            id: "123",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        return await expect(
          result.current.onFinish({ foo: "bar" }),
        ).rejects.toThrow(
          "[useForm]: `resource` is not defined or not matched but is required",
        );
      });
    });

    it("should reject immediately if id is not defined in clone mode", async () => {
      const { result } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "clone",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        return await expect(
          result.current.onFinish({ foo: "bar" }),
        ).rejects.toThrow(
          "[useForm]: `id` is not defined but is required in edit and clone actions",
        );
      });
    });

    it("should reject immediately if values is not provided", async () => {
      const { result } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "edit",
            id: "123",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        return await expect(
          result.current.onFinish(undefined as any),
        ).rejects.toThrow(
          "[useForm]: `values` is not provided but is required",
        );
      });
    });
  });

  describe("autoSave debounce stabilization", () => {
    it("should preserve debounce window across re-renders and batch rapid changes", async () => {
      vi.useFakeTimers();

      const updateMock = vi
        .fn()
        .mockResolvedValue({ data: { id: "1", title: "test" } });

      const { result, rerender } = renderHook(
        ({ title }) =>
          useForm({
            resource: "posts",
            action: "edit",
            id: "1",
            autoSave: {
              enabled: true,
              debounce: 1000,
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
          initialProps: { title: "initial" },
        },
      );

      await act(async () => {
        result.current.onFinishAutoSave({ title: "a" }).catch(() => {});
        vi.advanceTimersByTime(300);
        result.current.onFinishAutoSave({ title: "ab" }).catch(() => {});
        vi.advanceTimersByTime(300);
        result.current.onFinishAutoSave({ title: "abc" }).catch(() => {});
        vi.advanceTimersByTime(300);
      });

      // No calls should have been made yet
      expect(updateMock).toHaveBeenCalledTimes(0);

      // Wait for debounce to complete
      await act(async () => {
        vi.advanceTimersByTime(1100);
      });

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: { title: "abc" },
        }),
      );

      vi.useRealTimers();
    });

    it("should cancel pending autosave on unmount", async () => {
      vi.useFakeTimers();

      const updateMock = vi
        .fn()
        .mockResolvedValue({ data: { id: "1", title: "test" } });

      const { result, unmount } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "edit",
            id: "1",
            autoSave: {
              enabled: true,
              debounce: 1000,
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

      await act(async () => {
        result.current.onFinishAutoSave({ title: "test" }).catch(() => {});
        vi.advanceTimersByTime(500);
      });

      // Unmount before debounce completes
      unmount();

      // Wait past the debounce time
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      // Update should not have been called because it was cancelled
      expect(updateMock).toHaveBeenCalledTimes(0);

      vi.useRealTimers();
    });

    it("should reject autosave in non-edit actions", async () => {
      const { result } = renderHook(
        () =>
          useForm({
            resource: "posts",
            action: "create",
            autoSave: {
              enabled: true,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await expect(
        result.current.onFinishAutoSave({ title: "test" }),
      ).rejects.toThrow("[useForm]: `autoSave` is only allowed in edit action");
    });
  });
});
