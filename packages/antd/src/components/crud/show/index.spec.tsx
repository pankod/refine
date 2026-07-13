import React, { type ReactNode } from "react";
import { Route, Routes } from "react-router";
import { RefineButtonTestIds } from "@refinedev/ui-types";
import type { AccessControlProvider } from "@refinedev/core";

import {
  type ITestWrapperProps,
  MockRouterProvider,
  render,
  TestWrapper,
  waitFor,
} from "@test";

import { Show } from "./index";
import { crudShowTests } from "@refinedev/ui-tests";
import {
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
} from "@components/buttons";

const renderShow = (
  show: ReactNode,
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
          ...MockRouterProvider(),
          parse: () => () => ({
            params: { id: "1" },
            action: "show",
            resource: {
              name: "posts",
              list: "/posts",
              show: "/posts/show/1",
              edit: "/posts/edit/1",
              meta: { canDelete: true },
            },
            pathname: "/posts/show/1",
          }),
        },
        ...wrapperProps,
      }),
    },
  );
};
describe("Show", () => {
  crudShowTests.bind(this)(Show as any);

  it("depending on the accessControlProvider it should get the buttons successfully", async () => {
    const { getByText, getAllByText, queryByTestId } = renderShow(
      <Show
        canEdit
        canDelete
        headerButtons={({
          defaultButtons,
          deleteButtonProps,
          editButtonProps,
        }) => {
          expect(deleteButtonProps).toBeDefined();
          expect(editButtonProps).toBeDefined();
          return <>{defaultButtons}</>;
        }}
      />,
      {
        can: ({ action }) => {
          switch (action) {
            case "edit":
            case "list":
              return Promise.resolve({ can: true });
            default:
              return Promise.resolve({ can: false });
          }
        },
      },
    );

    await waitFor(() =>
      expect(getByText("Edit").closest("button")).not.toBeDisabled(),
    );
    await waitFor(() =>
      expect(getAllByText("Posts")[1].closest("button")).not.toBeDisabled(),
    );

    await waitFor(() =>
      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeDisabled(),
    );
  });

  it("should render optional recordItemId with resource prop, not render list button", async () => {
    const { getByText, queryByTestId } = renderShow(
      <Show
        recordItemId="1"
        headerButtons={({ defaultButtons, listButtonProps }) => {
          expect(listButtonProps).not.toBeDefined();
          return <>{defaultButtons}</>;
        }}
      />,
    );

    getByText("Show Post");

    expect(queryByTestId(RefineButtonTestIds.ListButton)).toBeNull();
  });

  describe("render edit button", () => {
    it("should render edit button", async () => {
      const { getByText, queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={
              <Show
                headerButtons={({ defaultButtons, editButtonProps }) => {
                  expect(editButtonProps).toBeDefined();
                  return <>{defaultButtons}</>;
                }}
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", edit: "/posts/edit/1" }],
            routerInitialEntries: ["/posts/show/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                params: { id: "1" },
                action: "show",
                resource: {
                  name: "posts",
                  list: "/posts",
                  show: "/posts/show/1",
                  edit: "/posts/edit/1",
                  meta: { canDelete: true },
                },
                pathname: "/posts/show/1",
              }),
            },
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.EditButton)).not.toBeNull();

      getByText("Show Post");
    });

    it("should not render edit button on resource canEdit false", async () => {
      const { getByText, queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={
              <Show
                headerButtons={({ defaultButtons, editButtonProps }) => {
                  expect(editButtonProps).not.toBeDefined();
                  return <>{defaultButtons}</>;
                }}
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerInitialEntries: ["/posts/show/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                params: { id: "1" },
                action: "show",
                resource: {
                  name: "posts",
                  list: "/posts",
                  show: "/posts/show/1",
                  edit: "/posts/edit/1",
                  meta: { canDelete: true, canEdit: false },
                },
                pathname: "/posts/show/1",
              }),
            },
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.EditButton)).toBeNull();

      getByText("Show Post");
    });

    it("should not render edit button on resource canEdit true & canEdit props false on component", async () => {
      const { queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={
              <Show
                canEdit={false}
                headerButtons={({ defaultButtons, editButtonProps }) => {
                  expect(editButtonProps).not.toBeDefined();
                  return <>{defaultButtons}</>;
                }}
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", edit: "/posts/edit/1" }],
            routerInitialEntries: ["/posts/show/1"],
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.EditButton)).toBeNull();
    });

    it("should render edit button on resource canEdit false & canEdit props true on component", async () => {
      const { queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={
              <Show
                canEdit={true}
                headerButtons={({ defaultButtons, editButtonProps }) => {
                  expect(editButtonProps).toBeDefined();
                  return <>{defaultButtons}</>;
                }}
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerInitialEntries: ["/posts/show/1"],
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.EditButton)).not.toBeNull();
    });

    it("should render edit button with recordItemId prop", async () => {
      const { getByText, queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={
              <Show
                recordItemId="1"
                headerButtons={({ defaultButtons, editButtonProps }) => {
                  expect(editButtonProps).toBeDefined();
                  return <>{defaultButtons}</>;
                }}
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", edit: "/posts/edit/1" }],
            routerInitialEntries: ["/posts/show/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                params: { id: "1" },
                action: "show",
                resource: {
                  name: "posts",
                  list: "/posts",
                  show: "/posts/show/1",
                  edit: "/posts/edit/1",
                  meta: { canDelete: true },
                },
                pathname: "/posts/show/1",
              }),
            },
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.EditButton)).not.toBeNull();

      getByText("Show Post");
    });
  });

  describe("render delete button", () => {
    it("should render delete button", async () => {
      const { queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={
              <Show
                headerButtons={({ defaultButtons, deleteButtonProps }) => {
                  expect(deleteButtonProps).toBeDefined();
                  return <>{defaultButtons}</>;
                }}
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", meta: { canDelete: true } }],
            routerInitialEntries: ["/posts/show/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                params: { id: "1" },
                action: "show",
                resource: {
                  name: "posts",
                  list: "/posts",
                  show: "/posts/show/1",
                  edit: "/posts/edit/1",
                  meta: { canDelete: true },
                },
                pathname: "/posts/show/1",
              }),
            },
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).not.toBeNull();
    });

    it("should not render delete button on resource canDelete false", async () => {
      const { queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={
              <Show
                headerButtons={({ defaultButtons, deleteButtonProps }) => {
                  expect(deleteButtonProps).not.toBeDefined();
                  return <>{defaultButtons}</>;
                }}
              />
            }
          />
        </Routes>,

        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", meta: { canDelete: true } }],
            routerInitialEntries: ["/posts/show/1"],
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeNull();
    });

    it("should not render delete button on resource canDelete true, canDelete props false on component with deleteButtonProps", async () => {
      const { queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={
              <Show
                canDelete={false}
                deleteButtonProps={{ size: "large" }}
                headerButtons={({ defaultButtons, deleteButtonProps }) => {
                  expect(deleteButtonProps).not.toBeDefined();
                  return <>{defaultButtons}</>;
                }}
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", meta: { canDelete: true } }],
            routerInitialEntries: ["/posts/show/1"],
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeNull();
    });

    it("should render delete button on resource canDelete false & deleteButtonProps on component", async () => {
      const { queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={
              <Show
                deleteButtonProps={{ size: "large" }}
                headerButtons={({ defaultButtons, deleteButtonProps }) => {
                  expect(deleteButtonProps).toBeDefined();
                  return <>{defaultButtons}</>;
                }}
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", meta: { canDelete: true } }],
            routerInitialEntries: ["/posts/show/1"],
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).not.toBeNull();
    });

    it("should render delete button on resource canDelete false & canDelete props true on component", async () => {
      const { queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={
              <Show
                canDelete={true}
                headerButtons={({ defaultButtons, deleteButtonProps }) => {
                  expect(deleteButtonProps).toBeDefined();
                  return <>{defaultButtons}</>;
                }}
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", meta: { canDelete: true } }],
            routerInitialEntries: ["/posts/show/1"],
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).not.toBeNull();
    });

    it("should render delete button with recordItemId prop", async () => {
      const { queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={
              <Show
                recordItemId="1"
                headerButtons={({ defaultButtons, deleteButtonProps }) => {
                  expect(deleteButtonProps).toBeDefined();
                  return <>{defaultButtons}</>;
                }}
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", meta: { canDelete: true } }],
            routerInitialEntries: ["/posts/show/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                params: { id: "1" },
                action: "show",
                resource: {
                  name: "posts",
                  list: "/posts",
                  show: "/posts/show/1",
                  edit: "/posts/edit/1",
                  meta: { canDelete: true },
                },
                pathname: "/posts/show/1",
              }),
            },
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).not.toBeNull();
    });
  });

  it("should customize default buttons with default props", async () => {
    const { queryByTestId } = render(
      <Routes>
        <Route
          path="/:resource/:action/:id"
          element={
            <Show
              canEdit
              canDelete
              headerButtons={({
                deleteButtonProps,
                editButtonProps,
                listButtonProps,
                refreshButtonProps,
              }) => {
                return (
                  <>
                    <DeleteButton {...deleteButtonProps} />
                    <EditButton {...editButtonProps} />
                    <ListButton {...listButtonProps} />
                    <RefreshButton {...refreshButtonProps} />
                  </>
                );
              }}
            />
          }
        />
      </Routes>,
      {
        wrapper: TestWrapper({
          resources: [{ name: "posts" }],
          routerInitialEntries: ["/posts/show/1"],
        }),
      },
    );

    expect(queryByTestId(RefineButtonTestIds.DeleteButton)).not.toBeNull();
    expect(queryByTestId(RefineButtonTestIds.EditButton)).not.toBeNull();
    expect(queryByTestId(RefineButtonTestIds.ListButton)).not.toBeNull();
    expect(queryByTestId(RefineButtonTestIds.RefreshButton)).not.toBeNull();
  });
});
