import { renderHook, waitFor } from "@testing-library/react";
import { TestWrapper, act, mockRouterProvider } from "@test";

import { useResourceParams } from ".";

import type { BaseKey } from "../../contexts/data/types";

describe("useResourceParams Hook", () => {
  describe("with routerProvider", () => {
    it("returns undefined when routerProvider doesn't have params", () => {
      const { result } = renderHook(() => useResourceParams(), {
        wrapper: TestWrapper({}),
      });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: undefined,
          id: undefined,
          action: undefined,
          formAction: "create",
          identifier: undefined,
        }),
      );
    });

    it("returns params from routerProvider", () => {
      const { result } = renderHook(() => useResourceParams(), {
        wrapper: TestWrapper({
          routerProvider: mockRouterProvider({
            resource: {
              name: "posts",
            },
            id: "123",
            action: "edit",
          }),
        }),
      });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({ name: "posts" }),
          id: "123",
          action: "edit",
          formAction: "edit",
          identifier: "posts",
        }),
      );
    });

    it("returns formAction create when action is not defined", () => {
      const { result } = renderHook(() => useResourceParams(), {
        wrapper: TestWrapper({
          routerProvider: mockRouterProvider({
            resource: {
              name: "posts",
            },
          }),
        }),
      });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({ name: "posts" }),
          id: undefined,
          action: undefined,
          formAction: "create",
          identifier: "posts",
        }),
      );
    });

    it("returns formAction create when action from route is list", () => {
      const { result } = renderHook(() => useResourceParams(), {
        wrapper: TestWrapper({
          routerProvider: mockRouterProvider({
            resource: {
              name: "posts",
            },
            action: "list",
          }),
        }),
      });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({ name: "posts" }),
          id: undefined,
          action: "list",
          formAction: "create",
          identifier: "posts",
        }),
      );
    });

    it("returns params from props", () => {
      const { result } = renderHook(
        () =>
          useResourceParams({ resource: "posts", id: "123", action: "clone" }),
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({ name: "posts" }),
          id: "123",
          action: "clone",
          formAction: "clone",
          identifier: "posts",
        }),
      );
    });

    it("should work with identifier", () => {
      const { result } = renderHook(
        () =>
          useResourceParams({ resource: "posts", id: "123", action: "clone" }),
        {
          wrapper: TestWrapper({
            resources: [{ name: "blog-posts", identifier: "posts" }],
          }),
        },
      );

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({
            name: "blog-posts",
            identifier: "posts",
          }),
          id: "123",
          action: "clone",
          formAction: "clone",
          identifier: "posts",
        }),
      );
    });

    it("should return id from props", () => {
      const { result } = renderHook(() => useResourceParams({ id: "123" }), {
        wrapper: TestWrapper({
          routerProvider: mockRouterProvider({
            resource: {
              name: "posts",
            },
            id: "456",
          }),
        }),
      });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({ name: "posts" }),
          id: "123",
          action: undefined,
          formAction: "create",
          identifier: "posts",
        }),
      );
    });

    it("should return id from routes", () => {
      const { result } = renderHook(() => useResourceParams(), {
        wrapper: TestWrapper({
          routerProvider: mockRouterProvider({
            resource: {
              name: "posts",
            },
            id: "123",
          }),
        }),
      });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({ name: "posts" }),
          id: "123",
          action: undefined,
          formAction: "create",
          identifier: "posts",
        }),
      );
    });

    it("should return id from route if custom resource is same with inferred", () => {
      const { result } = renderHook(
        () => useResourceParams({ resource: "posts" }),
        {
          wrapper: TestWrapper({
            routerProvider: mockRouterProvider({
              resource: {
                name: "posts",
              },
              id: "123",
            }),
          }),
        },
      );

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({ name: "posts" }),
          id: "123",
          action: undefined,
          formAction: "create",
          identifier: "posts",
        }),
      );
    });

    it("should return id from route if custom resource is same with inferred (by identifier)", () => {
      const { result } = renderHook(
        () => useResourceParams({ resource: "foo" }),
        {
          wrapper: TestWrapper({
            routerProvider: mockRouterProvider({
              resource: {
                name: "posts",
                identifier: "foo",
              },
              id: "123",
            }),
            resources: [{ name: "posts", identifier: "foo" }],
          }),
        },
      );

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({
            name: "posts",
            identifier: "foo",
          }),
          id: "123",
          action: undefined,
          formAction: "create",
          identifier: "foo",
        }),
      );
    });

    it("should return id from props if custom resource is different from inferred", () => {
      const { result } = renderHook(
        () => useResourceParams({ resource: "categories", id: "3" }),
        {
          wrapper: TestWrapper({
            routerProvider: mockRouterProvider({
              resource: {
                name: "posts",
              },
              id: "123",
            }),
          }),
        },
      );

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({ name: "categories" }),
          id: "3",
          action: undefined,
          formAction: "create",
          identifier: "categories",
        }),
      );
    });

    it("should return id undefined if custom resource is different from inferred and id is not passed", () => {
      const { result } = renderHook(
        () => useResourceParams({ resource: "categories" }),
        {
          wrapper: TestWrapper({
            routerProvider: mockRouterProvider({
              resource: {
                name: "posts",
              },
              id: "123",
            }),
          }),
        },
      );

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({ name: "categories" }),
          id: undefined,
          action: undefined,
          formAction: "create",
          identifier: "categories",
        }),
      );
    });

    it("should return formAction as create if custom resource is different from inferred and action is not passed", () => {
      const { result } = renderHook(
        () => useResourceParams({ resource: "categories" }),
        {
          wrapper: TestWrapper({
            routerProvider: mockRouterProvider({
              resource: {
                name: "posts",
              },
              action: "edit",
              id: "123",
            }),
          }),
        },
      );

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({ name: "categories" }),
          id: undefined,
          action: "edit",
          formAction: "create",
          identifier: "categories",
        }),
      );
    });

    it("should return formAction from route if custom resource is same with inferred", () => {
      const { result } = renderHook(
        () => useResourceParams({ resource: "posts" }),
        {
          wrapper: TestWrapper({
            routerProvider: mockRouterProvider({
              resource: {
                name: "posts",
              },
              id: "123",
              action: "edit",
            }),
          }),
        },
      );

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({ name: "posts" }),
          id: "123",
          action: "edit",
          formAction: "edit",
          identifier: "posts",
        }),
      );
    });

    it("should return formAction from route if no custom resource is passed", () => {
      const { result } = renderHook(() => useResourceParams(), {
        wrapper: TestWrapper({
          routerProvider: mockRouterProvider({
            resource: {
              name: "posts",
            },
            id: "123",
            action: "edit",
          }),
        }),
      });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: expect.objectContaining({ name: "posts" }),
          id: "123",
          action: "edit",
          formAction: "edit",
          identifier: "posts",
        }),
      );
    });

    it("should set id by setId", async () => {
      const { result } = renderHook(() => useResourceParams(), {
        wrapper: TestWrapper({
          routerProvider: mockRouterProvider({
            resource: {
              name: "posts",
            },
            id: "123",
            action: "edit",
          }),
        }),
      });

      act(() => {
        result.current.setId("456");
      });

      await waitFor(() => {
        expect(result.current).toMatchObject(
          expect.objectContaining({
            resource: expect.objectContaining({
              name: "posts",
              identifier: "posts",
            }),
            id: "456",
            action: "edit",
            formAction: "edit",
            identifier: "posts",
          }),
        );
      });
    });

    it("should reflect changes in id prop immediately", async () => {
      const { result, rerender } = renderHook(
        ({ id }) => useResourceParams({ id }),
        {
          wrapper: TestWrapper({}),
          initialProps: {
            id: undefined,
          } as { id?: BaseKey },
        },
      );

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: undefined,
          id: undefined,
          action: undefined,
          formAction: "create",
          identifier: undefined,
        }),
      );

      rerender({ id: "123" });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: undefined,
          id: "123",
          action: undefined,
          formAction: "create",
          identifier: undefined,
        }),
      );
    });

    it("should reflect both id prop changes and setId invocations", async () => {
      const { result, rerender } = renderHook(
        ({ id }) => useResourceParams({ id }),
        {
          wrapper: TestWrapper({}),
          initialProps: {
            id: undefined,
          } as { id?: BaseKey },
        },
      );

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: undefined,
          id: undefined,
          action: undefined,
          formAction: "create",
          identifier: undefined,
        }),
      );

      act(() => {
        result.current.setId("123");
      });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: undefined,
          id: "123",
          action: undefined,
          formAction: "create",
          identifier: undefined,
        }),
      );

      rerender({ id: "456" });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          resource: undefined,
          id: "456",
          action: undefined,
          formAction: "create",
          identifier: undefined,
        }),
      );
    });

    it("should respect value set by setId method", async () => {
      const { result, rerender } = renderHook(
        ({ id }) => useResourceParams({ id }),
        {
          wrapper: TestWrapper({}),
          initialProps: {
            id: "123",
          } as { id?: BaseKey },
        },
      );

      expect(result.current).toMatchObject(
        expect.objectContaining({
          id: "123",
        }),
      );

      act(() => {
        result.current.setId(undefined);
      });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          id: undefined,
        }),
      );

      rerender({ id: "456" });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          id: "456",
        }),
      );
    });

    it("should provide id prop in setId setter", async () => {
      const { result, rerender } = renderHook(
        ({ id }) => useResourceParams({ id }),
        {
          wrapper: TestWrapper({}),
          initialProps: {
            id: "123",
          } as { id?: BaseKey },
        },
      );

      expect(result.current).toMatchObject(
        expect.objectContaining({
          id: "123",
        }),
      );

      act(() => {
        result.current.setId((prev) => (Number(prev) + 1).toString());
      });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          id: "124",
        }),
      );
    });
  });
});
