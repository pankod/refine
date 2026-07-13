import { vi } from "vitest";
import React from "react";
import { Route, Routes } from "react-router";
import {
  type RefineCrudShowProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import type { AccessControlProvider } from "@refinedev/core";

import {
  type ITestWrapperProps,
  mockRouterProvider,
  render,
  TestWrapper,
} from "@test";

const renderShow = (
  show: React.ReactNode,
  accessControlProvider?: AccessControlProvider,
  wrapperProps?: ITestWrapperProps,
) => {
  return render(
    <Routes>
      <Route path="/:resource/:action/:id" element={show} />
    </Routes>,
    {
      wrapper: TestWrapper({
        routerInitialEntries: ["/posts/show/1"],
        accessControlProvider,
        routerProvider: {
          ...mockRouterProvider(),
          parse: () => () => ({
            params: {},
            id: 1,
            action: "show",
            resource: {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
              clone: "/posts/clone/1",
              show: "/posts/show/1",
              edit: "/posts/edit/1",
              meta: { canDelete: true, canEdit: true },
            },
            pathname: "/posts/show/1",
          }),
        },
        ...wrapperProps,
      }),
    },
  );
};

export const crudShowTests = (
  Show: React.ComponentType<
    RefineCrudShowProps<any, any, any, any, any, {}, any, any, any, any>
  >,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / CRUD Show", () => {
    beforeAll(() => {
      vi.spyOn(console, "warn").mockImplementation(vi.fn());
    });

    it("should render children", async () => {
      const { getByText } = renderShow(<Show>Something</Show>);

      getByText("Something");
    });

    it("should render default edit and delete buttons successfuly", async () => {
      const { queryByTestId } = renderShow(
        <Show
          canEdit
          canDelete
          headerButtons={({
            defaultButtons,
            editButtonProps,
            deleteButtonProps,
          }) => {
            expect(editButtonProps).toBeDefined();
            expect(deleteButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
      );

      expect(queryByTestId(RefineButtonTestIds.EditButton)).not.toBeNull();
      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).not.toBeNull();
    });

    it("should render optional buttons with actionButtons prop", async () => {
      const { findByText } = renderShow(
        <Show
          headerButtons={
            <>
              <button>New Save Button</button>
              <button>New Delete Button</button>
            </>
          }
        />,
      );

      await findByText("New Save Button");
      await findByText("New Delete Button");
    });

    it("should render default title successfuly", async () => {
      const { getByText } = renderShow(<Show />);

      getByText("Show Post");
    });

    it("should not render title when is false", async () => {
      const { queryByText } = renderShow(<Show title={false} />);

      const text = queryByText("Show Post");
      expect(text).not.toBeInTheDocument();
    });

    it("should render optional title with title prop", async () => {
      const { getByText } = renderShow(<Show title="Test Title" />);

      getByText("Test Title");
    });

    it("should render optional resource with resource prop", async () => {
      const { getByText } = render(
        <Routes>
          <Route path="/:resource" element={<Show resource="posts" />} />
        </Routes>,
        {
          wrapper: TestWrapper({
            routerInitialEntries: ["/custom"],
          }),
        },
      );

      getByText("Show Post");
    });
  });
};
