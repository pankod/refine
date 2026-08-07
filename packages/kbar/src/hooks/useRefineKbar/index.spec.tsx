import { vi } from "vitest";
import React from "react";
import type { AccessControlProvider, IResourceItem } from "@refinedev/core";
import { Route, Routes } from "react-router";

import { act, TestWrapper, renderHook } from "@test";

import { useRefineKbar } from ".";

const mockFn = vi.fn();

vi.mock("kbar", async () => {
  const actual = await import("kbar");
  return {
    ...actual,
    useRegisterActions: (actions: any) => mockFn(actions),
  };
});

describe("useRefineKbar Hook", () => {
  beforeAll(async () => {
    vi.useFakeTimers();
  });

  afterAll(async () => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  const createRenderHook = async (
    resources: IResourceItem[],
    path?: string,
    routerInitialEntries?: string[],
    accessControlProvider?: AccessControlProvider,
  ) => {
    let Wrapper: React.FC<{ children: React.ReactNode }> = TestWrapper({
      resources,
    });

    if (routerInitialEntries) {
      Wrapper = TestWrapper({
        resources,
        routerInitialEntries,
        accessControlProvider,
      });
    }

    renderHook(() => useRefineKbar(), {
      wrapper: function render({ children }) {
        return (
          <Wrapper>
            <Routes>
              <Route path={path ?? "/:resource"} element={children} />
            </Routes>
          </Wrapper>
        );
      },
    });
  };
  describe("list resources", () => {
    it("registering the list resource when you are not on the list page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: "/posts",
          },
        ],
        "/:resource/:action",
        ["/posts/create"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the list resource when you are on the list page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: "/posts",
          },
        ],
        "/:resource",
        ["/posts"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the list resource when you don't have access to list page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: "/posts",
          },
        ],
        "/:resource/:action",
        ["/posts/create"],
        {
          can: () => Promise.resolve({ can: false }),
        },
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Create",
            section: "Posts",
          }),
        ]),
      );
    });
  });

  describe("create resources", () => {
    it("registering the create resource when you are not on the create page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            create: "/posts/create",
          },
        ],
        "/:resource",
        ["/posts"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Create",
            section: "Posts",
          }),
        ]),
      );
    });
    it("registering the create resource when you have access to create", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            create: "/posts/create",
          },
        ],
        "/:resource",
        ["/posts"],
        {
          can: () => Promise.resolve({ can: true }),
        },
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Create",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the create resource when you are on the create page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            create: "/posts/create",
          },
        ],
        "/:resource/:action",
        ["/posts/create"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Create",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the create resource when you don't have access to create page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            create: "/posts/create",
          },
        ],
        "/:resource",
        ["/posts"],
        {
          can: () => Promise.resolve({ can: false }),
        },
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Create",
            section: "Posts",
          }),
        ]),
      );
    });
  });

  describe("edit resources", () => {
    it("registering the edit resource when you have an id from the route", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: "/posts/edit/:id",
          },
        ],
        "/:resource/:action/:id",
        ["/posts/show/1"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Edit",
            section: "Posts",
          }),
        ]),
      );
    });
    it("registering the delete for resource when you have an id from the route", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: "/posts/edit/:id",
            meta: { canDelete: true },
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/1"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Delete",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the edit resource when you do not have an id from the route", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: "/posts/edit/:id",
          },
        ],
        "/:resource/:action",
        ["/posts/create"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Edit",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the edit resource when you are on the edit page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: "/posts/edit/:id",
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/1"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Edit",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the delete for resource when you 'canDelete' false", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: "/posts/edit/:id",
            meta: { canDelete: false },
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/1"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Delete",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the delete for resource when you don't have access to delete", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: "/posts/edit/:id",
            meta: { canDelete: true },
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/1"],
        {
          can: () => {
            return Promise.resolve({ can: false });
          },
        },
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Delete",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the edit resource when you don't have an edit resource", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: "/posts",
          },
        ],
        "/:resource",
        ["/posts"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Edit",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the show resource if your id doesn't have access to edit the page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: "/posts/edit/:id",
          },
        ],
        "/:resource/:action/:id",
        ["/posts/show/2"],
        {
          can: ({ params }) => {
            if (params?.id === "1") {
              return Promise.resolve({ can: true });
            }
            return Promise.resolve({ can: false });
          },
        },
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Edit",
            section: "Posts",
          }),
        ]),
      );
    });
  });

  describe("show resources", () => {
    it("registering the show resource when you have an id from the route", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            show: "/posts/show/:id",
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/1"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Show",
            section: "Posts",
          }),
        ]),
      );
    });
    it("registering the show resource when your id have access to show the page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            show: "/posts/show/:id",
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/1"],
        {
          can: ({ params }) => {
            if (params?.id === "1") {
              return Promise.resolve({ can: true });
            }
            return Promise.resolve({ can: false });
          },
        },
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Show",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the show resource when you don't have an id from route", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            show: "/posts/show/:id",
          },
        ],
        "/:resource/:action",
        ["/posts/create"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Show",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the show resource when you are on the show page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            show: "/posts/show/:id",
          },
        ],
        "/:resource/:action/:id",
        ["/posts/show/1"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Show",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the show resource if your id doesn't have access to show the page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            show: "/posts/show/:id",
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/2"],
        {
          can: ({ params }) => {
            if (params?.id === "1") {
              return Promise.resolve({ can: true });
            }
            return Promise.resolve({ can: false });
          },
        },
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Show",
            section: "Posts",
          }),
        ]),
      );
    });
  });

  describe("multiple resources", () => {
    it("registering the posts list resource when you are on the categories list page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: "/posts",
          },
          {
            name: "categories",
            list: "/categories",
          },
        ],
        "/:resource",
        ["/categories"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Posts",
          }),
        ]),
      );
    });
    it("registering the categories list resource when you are on the post list page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: "/posts",
          },
          {
            name: "categories",
            list: "/categories",
          },
        ],
        "/:resource",
        ["/posts"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Categories",
          }),
        ]),
      );
    });
    it("registering the categories list resource when you are on the post list page while you have three resources", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: "/posts",
          },
          {
            name: "categories",
            list: "/categories",
          },
          {
            name: "users",
            list: "/users",
          },
        ],
        "/:resource",
        ["/posts"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Categories",
          }),
        ]),
      );
      expect(mockFn).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Users",
          }),
        ]),
      );

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "List",
          }),
        ]),
      );
    });
    it("do not register the categories list resource when you are on the categories list page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: "/posts",
          },
          {
            name: "categories",
            list: "/categories",
          },
        ],
        "/:resource",
        ["/categories"],
      );

      await act(async () => {
        vi.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Categories",
          }),
        ]),
      );

      expect(mockFn).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Posts",
          }),
        ]),
      );
    });
  });
});
