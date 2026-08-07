import { vi } from "vitest";
import React from "react";
import type { RefineThemedLayoutSiderProps } from "@refinedev/ui-types";

import {
  act,
  type ITestWrapperProps,
  mockRouterProvider,
  render,
  TestWrapper,
  waitFor,
} from "@test";
import type { AuthProvider } from "@refinedev/core";

const mockAuthProvider: AuthProvider = {
  check: () => Promise.resolve({ authenticated: true }),
  login: () => Promise.resolve({ success: true }),
  logout: () => Promise.resolve({ success: true }),
  getPermissions: () => Promise.resolve(["admin"]),
  onError: () => Promise.resolve({}),
};

const testWrapper = (wrapperProps?: ITestWrapperProps) => {
  return TestWrapper({
    authProvider: mockAuthProvider,
    resources: [
      {
        name: "posts",
        list: "/posts",
      },
    ],
    routerInitialEntries: ["/"],
    routerProvider: mockRouterProvider(),
    ...wrapperProps,
  });
};

export const layoutSiderTests = (
  SiderElement: React.ComponentType<RefineThemedLayoutSiderProps>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Sider Element", () => {
    beforeEach(() => {
      vi.spyOn(console, "warn").mockImplementation(() => {});
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    it("should render successful", async () => {
      const { container } = render(<SiderElement />, {
        wrapper: testWrapper(),
      });

      expect(container).toBeTruthy();
    });

    it("should render logout menu item successful", async () => {
      const { getAllByText } = render(<SiderElement />, {
        wrapper: testWrapper(),
      });

      await waitFor(() =>
        expect(getAllByText("Posts").length).toBeGreaterThanOrEqual(1),
      );
      expect(getAllByText("Logout").length).toBeGreaterThanOrEqual(1);
    });

    it("should work menu item click", async () => {
      const { getAllByText, debug } = render(<SiderElement />, {
        wrapper: testWrapper(),
      });

      await waitFor(() =>
        expect(
          (
            getAllByText("Posts")[0].closest("a") as HTMLAnchorElement
          ).getAttribute("href"),
        ).toBe("/posts"),
      );
    });

    it("should work logout menu item click", async () => {
      const logoutMockedAuthProvider = {
        ...mockAuthProvider,
        logout: vi
          .fn()
          .mockImplementation(() => Promise.resolve({ success: true })),
      };
      const { getAllByText } = render(<SiderElement />, {
        wrapper: testWrapper({
          authProvider: logoutMockedAuthProvider,
        }),
      });

      await act(async () => {
        getAllByText("Logout")[0].click();
      });

      expect(logoutMockedAuthProvider.logout).toHaveBeenCalledTimes(1);
    });

    it("should render only allowed menu items", async () => {
      const { getAllByText, queryByText } = render(<SiderElement />, {
        wrapper: testWrapper({
          resources: [
            {
              name: "posts",
              list: "/posts",
            },
            {
              name: "users",
              list: "/users",
            },
          ],
          accessControlProvider: {
            can: ({ action, resource }) => {
              if (action === "list" && resource === "posts") {
                return Promise.resolve({ can: true });
              }
              if (action === "list" && resource === "users") {
                return Promise.resolve({ can: false });
              }
              return Promise.resolve({ can: false });
            },
          },
        }),
      });

      await waitFor(() => getAllByText("Posts")[0]);
      await waitFor(() => expect(queryByText("Users")).toBeNull());
    });

    it("should render custom element passed with render prop", async () => {
      const { getAllByText, queryAllByText } = render(
        <SiderElement
          render={({ logout, items }) => {
            return (
              <>
                <div>custom-element</div>
                {items}
                {logout}
              </>
            );
          }}
        />,
        {
          wrapper: testWrapper(),
        },
      );

      await waitFor(() =>
        expect(getAllByText("Posts").length).toBeGreaterThanOrEqual(1),
      );
      expect(queryAllByText("Logout").length).toBeGreaterThanOrEqual(1);
      expect(queryAllByText("custom-element").length).toBeGreaterThanOrEqual(1);
    });

    it("should item disabled when activeItemDisabled:true", async () => {
      const { getAllByText, getAllByRole } = render(
        <SiderElement activeItemDisabled={true} />,
        {
          wrapper: testWrapper({
            routerInitialEntries: ["/posts"],
            routerProvider: mockRouterProvider({
              pathname: "/posts",
              action: "list",
              resource: {
                name: "posts",
                list: "/posts",
              },
            }),
            resources: [
              {
                name: "posts",
                list: "/posts",
              },
              {
                name: "users",
                list: "/users",
              },
            ],
          }),
        },
      );

      await waitFor(() => {
        return expect(getAllByText("Posts").length).toBeGreaterThanOrEqual(1);
      });

      await waitFor(() => {
        const allLinks = getAllByRole("link");
        const postLink = allLinks.find((link) => {
          return link.getAttribute("href") === "/posts";
        });

        return expect(postLink).toHaveStyle("pointer-events: none");
      });
    });

    it("should handle lowercase resource names correctly", async () => {
      const { getByText, getAllByText } = render(<SiderElement />, {
        wrapper: testWrapper({
          resources: [
            {
              name: "posts",
              list: "/posts",
            },
            {
              name: "users",
              list: "/users",
            },
          ],
          accessControlProvider: {
            can: ({ action, resource }) => {
              if (action === "list" && resource === "posts") {
                return Promise.resolve({ can: true });
              }
              if (action === "list" && resource === "users") {
                return Promise.resolve({ can: false });
              }
              return Promise.resolve({ can: false });
            },
          },
        }),
      });

      const postsElements = await waitFor(() => getAllByText("Posts"));
      postsElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
      expect(() => getByText("Users")).toThrow();
    });

    it("should handle camelcased resource names correctly", async () => {
      const { getByText, getAllByText } = render(<SiderElement />, {
        wrapper: testWrapper({
          resources: [
            {
              name: "blogPosts",
              list: "/blog-posts",
            },
            {
              name: "userProfiles",
              list: "/user-profiles",
            },
          ],
          accessControlProvider: {
            can: ({ action, resource }) => {
              if (action === "list" && resource === "blogPosts") {
                return Promise.resolve({ can: true });
              }
              if (action === "list" && resource === "userProfiles") {
                return Promise.resolve({ can: false });
              }
              return Promise.resolve({ can: false });
            },
          },
        }),
      });

      const blogPostsElements = await waitFor(() => getAllByText("Blog posts"));
      blogPostsElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
      expect(() => getByText("User profiles")).toThrow();
    });
  });
};
