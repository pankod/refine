import { vi } from "vitest";
import React from "react";
import type { AccessControlProvider } from "@refinedev/core";
import { Route, Routes } from "react-router";
import {
  type RefineCrudListProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import {
  type ITestWrapperProps,
  mockRouterProvider,
  render,
  TestWrapper,
  waitFor,
} from "@test";

const renderList = (
  list: React.ReactNode,
  accessControlProvider?: AccessControlProvider,
  wrapperProps?: ITestWrapperProps,
) => {
  return render(
    <Routes>
      <Route path="/:resource" element={list} />
    </Routes>,
    {
      wrapper: TestWrapper(
        wrapperProps
          ? wrapperProps
          : {
              routerInitialEntries: ["/posts"],
              accessControlProvider,
            },
      ),
    },
  );
};

export const crudListTests = (
  List: React.ComponentType<RefineCrudListProps<any, any, any, any, any, {}>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / CRUD List", () => {
    beforeAll(() => {
      vi.spyOn(console, "warn").mockImplementation(vi.fn());
    });

    it("should render children", async () => {
      const { getByText } = renderList(
        <List key="posts">
          <div>No Data</div>
        </List>,
      );

      getByText("No Data");
    });

    it("should render optional title with title prop", async () => {
      const { getByText } = renderList(<List title="New Title" />);

      getByText("New Title");
    });

    it("should not render title when is false", async () => {
      const { queryByText } = renderList(<List title={false} />, undefined, {
        resources: [
          {
            name: "posts",
            meta: { route: "posts" },
          },
        ],
        routerInitialEntries: ["/posts"],
      });

      const text = queryByText("Posts");
      expect(text).not.toBeInTheDocument();
    });

    it("should render with label instead of resource name successfully", async () => {
      const { getByText } = renderList(<List />, undefined, {
        resources: [
          {
            name: "posts",
            meta: { label: "test" },
          },
        ],
        routerProvider: {
          ...mockRouterProvider(),
          parse() {
            return () => ({
              params: {},
              pathname: "/posts",
              resource: { name: "posts", meta: { label: "test" } },
              action: "list",
              id: undefined,
            });
          },
        },
        routerInitialEntries: ["/posts"],
      });

      getByText("Tests");
    });

    it("should render create button", async () => {
      const { queryByTestId } = renderList(
        <List
          headerButtons={({ defaultButtons, createButtonProps }) => {
            expect(createButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        undefined,
        {
          resources: [
            {
              name: "posts",
              create: "/posts/create",
            },
          ],
          routerInitialEntries: ["/posts"],
          routerProvider: {
            ...mockRouterProvider(),
            parse() {
              return () => ({
                params: {},
                pathname: "/posts",
                resource: { name: "posts", create: "/posts/create" },
                action: "list",
                id: undefined,
              });
            },
          },
        },
      );

      expect(queryByTestId(RefineButtonTestIds.CreateButton)).not.toBeNull();
    });

    it("should not render create button on resource#canCreate=false", async () => {
      const { queryByTestId } = renderList(
        <List
          headerButtons={({ defaultButtons, createButtonProps }) => {
            expect(createButtonProps).not.toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        undefined,
        {
          resources: [
            {
              name: "posts",
              meta: { canCreate: false },
            },
          ],
          routerInitialEntries: ["/posts"],
        },
      );

      expect(queryByTestId(RefineButtonTestIds.CreateButton)).toBeNull();
    });

    it("should render create button on resource#canCreate=false & props#createButtonProps!=null", async () => {
      const { getByText, queryByTestId } = renderList(
        <List
          createButtonProps={{ "aria-label": "Create Button" }}
          headerButtons={({ defaultButtons, createButtonProps }) => {
            expect(createButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        undefined,
        {
          routerInitialEntries: ["/posts"],
          routerProvider: {
            ...mockRouterProvider(),
            parse() {
              return () => ({
                params: {},
                pathname: "/posts",
                resource: { name: "posts", meta: { canCreate: false } },
                action: "list",
                id: undefined,
              });
            },
          },
        },
      );

      expect(queryByTestId(RefineButtonTestIds.CreateButton)).not.toBeNull();

      getByText("Posts");
    });

    it("should not render create button on resource#canCreate=true & props#canCreate=false", async () => {
      const { queryByTestId } = renderList(
        <List
          canCreate={false}
          headerButtons={({ defaultButtons, createButtonProps }) => {
            expect(createButtonProps).toBeUndefined();
            return <>{defaultButtons}</>;
          }}
        />,
        undefined,
        {
          resources: [
            {
              name: "posts",
              create: "/posts/create",
            },
          ],
          routerInitialEntries: ["/posts"],
        },
      );

      expect(queryByTestId(RefineButtonTestIds.CreateButton)).toBeNull();
    });

    it("should render create button on resource#canCreate=false & props#canCreate=true", async () => {
      const { queryByTestId } = renderList(
        <List
          canCreate={true}
          headerButtons={({ defaultButtons, createButtonProps }) => {
            expect(createButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        undefined,
        {
          resources: [
            {
              name: "posts",
            },
          ],
          routerInitialEntries: ["/posts"],
        },
      );

      expect(queryByTestId(RefineButtonTestIds.CreateButton)).not.toBeNull();
    });

    it("should render disabled create button if user doesn't have permission", async () => {
      const { queryByTestId } = renderList(
        <List
          canCreate={true}
          headerButtons={({ defaultButtons, createButtonProps }) => {
            expect(createButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        {
          can: ({ action }) => {
            switch (action) {
              case "create":
                return Promise.resolve({ can: false });
              default:
                return Promise.resolve({ can: false });
            }
          },
        },
      );

      await waitFor(() =>
        expect(queryByTestId(RefineButtonTestIds.CreateButton)).toBeDisabled(),
      );
    });
  });
};
