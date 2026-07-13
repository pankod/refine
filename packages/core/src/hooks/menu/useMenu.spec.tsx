import React from "react";

import { renderHook } from "@testing-library/react";

import { TestWrapper, mockRouterProvider } from "@test";

import { useMenu } from ".";

describe("useMenu Hook", () => {
  it("should be empty by default", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({}),
    });

    expect(result.current.menuItems).toEqual([]);
  });

  it("should be ignore when list is undefined", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
          },
          {
            name: "CMS",
          },
          {
            name: "Posts",
            meta: { parent: "CMS" },
          },
        ],
      }),
    });

    expect(result.current.menuItems).toEqual([]);
  });

  it("should contain one item with label `Posts`", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
            meta: { label: "Posts" },
            list: "/posts",
          },
        ],
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([expect.objectContaining({ label: "Posts" })]),
    );
  });

  it("should work with i18nProvider", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
            list: "/posts",
          },
        ],
        i18nProvider: {
          translate: (key) => {
            return `translated ${key}`;
          },
          changeLocale: () => Promise.resolve(),
          getLocale: () => "en",
        },
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "translated posts.posts" }),
      ]),
    );
  });

  it("should have the selectedKey = `posts`", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          resource: {
            name: "posts",
          },
          action: "create",
          pathname: "/posts/create",
        }),
      }),
    });

    expect(result.current.selectedKey).toEqual("/posts");
  });

  it("should have the defaultOpenKeys = [/CMS]", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          pathname: "/CMS/posts",
          resource: {
            name: "posts",
            meta: {
              parent: "CMS",
            },
          },
        }),
        resources: [
          {
            name: "CMS",
          },
          {
            name: "posts",
            list: "/posts",
            meta: {
              parent: "CMS",
            },
          },
          {
            name: "categories",
            list: "categories",
            meta: { parent: "CMS" },
          },
          {
            name: "posts",
            identifier: "categories-posts",
            meta: {
              parent: "categories",
              label: "Posts by category",
            },
          },
        ],
      }),
    });

    expect(result.current.defaultOpenKeys).toEqual(
      expect.arrayContaining(["/CMS", "/CMS/posts"]),
    );
  });

  it("should have the defaultOpenKeys = [/CMS]", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          pathname: "/CMS/categories/posts",
          resource: {
            name: "categories-posts",
            meta: {
              parent: "CMS",
            },
          },
        }),
        resources: [
          {
            name: "CMS",
          },
          {
            name: "posts",
            list: "/posts",
            meta: {
              parent: "CMS",
            },
          },
          {
            name: "categories",
            list: "categories",
            meta: { parent: "CMS" },
          },
          {
            name: "categories-posts",
            list: "/posts",
            identifier: "posts",
            meta: {
              parent: "categories",
              label: "Posts by category",
            },
          },
        ],
      }),
    });

    expect(result.current.defaultOpenKeys).toEqual(
      expect.arrayContaining([
        "/CMS",
        "/CMS/categories",
        "/CMS/categories/posts",
      ]),
    );
  });

  it("should tree view render all except hide true", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "visible",
            list: "/posts",
          },
          {
            name: "hidden",
            meta: {
              hide: true,
            },
          },
          {
            name: "hidden-parent-menu",
            meta: {
              hide: true,
            },
          },
          {
            name: "hidden-child",
            meta: { parent: "hidden-parent-menu" },
          },
          {
            name: "CMS",
          },
          {
            name: "Shop-1",
            meta: {
              parent: "CMS",
              hide: true,
            },
          },
          {
            name: "posts",
            meta: { parent: "Shop-1" },
          },
          {
            name: "categories",
            meta: { parent: "Shop-1" },
          },
          {
            name: "visible-item-2",
            list: "/posts",
          },
        ],
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "visible" }),
        expect.objectContaining({ name: "visible-item-2" }),
      ]),
    );

    expect(result.current.menuItems).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ name: "hidden" }),
        expect.objectContaining({ name: "posts" }),
      ]),
    );
  });

  it("should hide all necessary resources with nested structure", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "visible",
            list: "/posts",
          },
          {
            name: "hidden-level-1",
            meta: {
              hide: true,
            },
          },
          {
            name: "hidden-child-level-2",
            meta: { parent: "hidden-parent-menu" },
          },
          {
            name: "hidden-parent-level-1",
            meta: {
              hide: true,
            },
          },
          {
            name: "Shop-1",
            meta: { parent: "CMS" },
          },
          {
            name: "posts",
            meta: { parent: "Shop-1" },
          },
          {
            name: "categories",
            meta: { parent: "Shop-1" },
          },
          {
            name: "CMS",
            meta: {
              hide: true,
            },
          },
          {
            name: "visible-item-2",
            list: "/posts",
          },
        ],
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "visible" }),
        expect.objectContaining({ name: "visible-item-2" }),
      ]),
    );

    expect(result.current.menuItems).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({
          name: "hidden",
        }),
        expect.objectContaining({
          name: "Shop-1",
        }),
        expect.objectContaining({
          name: "posts",
        }),
        expect.objectContaining({
          name: "categories",
        }),
      ]),
    );
  });

  it("should create `to` property by checking the existing meta and params", () => {
    const { result } = renderHook(
      () =>
        useMenu({
          hideOnMissingParameter: true,
          meta: { repoId: "2" },
        }),
      {
        wrapper: TestWrapper({
          routerProvider: mockRouterProvider({
            params: {
              orgId: "1",
            },
          }),
          resources: [
            {
              name: "projects",
              list: ":orgId/repos/:repoId/projects",
            },
          ],
        }),
      },
    );

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "projects",
          route: "/1/repos/2/projects",
        }),
      ]),
    );
  });

  it("should hide item if parameter is missing by default", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "visible",
            list: "/posts",
          },
          {
            name: "org-users",
            list: "orgs/:orgId/users",
          },
        ],
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "visible" })]),
    );
    expect(result.current.menuItems).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ name: "org-users" }),
      ]),
    );
  });

  it("should hide item if parameter is missing by partial props", async () => {
    const { result } = renderHook(() => useMenu({ meta: {} }), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "visible",
            list: "/posts",
          },
          {
            name: "org-users",
            list: "orgs/:orgId/users",
          },
        ],
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "visible" })]),
    );
    expect(result.current.menuItems).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ name: "org-users" }),
      ]),
    );
  });

  it("should hide item if parameter is missing if set explicitly", async () => {
    const { result } = renderHook(
      () => useMenu({ hideOnMissingParameter: true }),
      {
        wrapper: TestWrapper({
          resources: [
            {
              name: "visible",
              list: "/posts",
            },
            {
              name: "org-users",
              list: "orgs/:orgId/users",
            },
          ],
        }),
      },
    );

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "visible" })]),
    );
    expect(result.current.menuItems).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ name: "org-users" }),
      ]),
    );
  });

  it("should hide item if parameter is missing", async () => {
    const { result } = renderHook(
      () => useMenu({ hideOnMissingParameter: true }),
      {
        wrapper: TestWrapper({
          resources: [
            {
              name: "visible",
              list: "/posts",
            },
            {
              name: "org-users",
              list: "orgs/:orgId/users",
            },
          ],
        }),
      },
    );

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "visible" })]),
    );
    expect(result.current.menuItems).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ name: "org-users" }),
      ]),
    );
  });
});
