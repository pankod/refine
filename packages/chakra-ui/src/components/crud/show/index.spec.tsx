import React, { type ReactNode } from "react";
import { Route, Routes } from "react-router";
import type { AccessControlProvider } from "@refinedev/core";
import { crudShowTests } from "@refinedev/ui-tests";

import {
  render,
  TestWrapper,
  waitFor,
  MockRouterProvider,
  type ITestWrapperProps,
} from "@test";

import { Show } from "./index";
import { RefineButtonTestIds } from "@refinedev/ui-types";
import {
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
} from "@components/buttons";

const renderShow = (
  show: ReactNode,
  wrapperProps?: ITestWrapperProps,
  accessControlProvider?: AccessControlProvider,
) => {
  return render(
    <Routes>
      <Route path="/:resource/:action/:id" element={show} />
    </Routes>,
    {
      wrapper: TestWrapper({
        routerInitialEntries: ["/posts/show/1"],
        accessControlProvider,
        resources: [
          {
            name: "posts",
            list: "/posts",
            show: "/posts/show/1",
            edit: "/posts/edit/1",
            meta: { canDelete: true },
          },
        ],
        routerProvider: {
          ...MockRouterProvider(),
          parse: () => () => ({
            params: { id: "1" },
            action: "show",
            id: "1",
            resource: {
              name: "posts",
              list: "/posts",
              edit: "/posts/edit/1",
              show: "/posts/show/1",
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
  crudShowTests.bind(this)(Show);

  it("depending on the accessControlProvider it should get the buttons successfully", async () => {
    const { getByTestId } = renderShow(
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
      {},
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
      expect(getByTestId(RefineButtonTestIds.EditButton)).not.toBeDisabled(),
    );
    await waitFor(() =>
      expect(getByTestId(RefineButtonTestIds.ListButton)).not.toBeDisabled(),
    );
    await waitFor(() =>
      expect(getByTestId(RefineButtonTestIds.DeleteButton)).toBeDisabled(),
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
            resources: [{ name: "posts", edit: "/posts/edit/:id" }],
            routerInitialEntries: ["/posts/show/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                params: { id: "1" },
                action: "show",
                id: "1",
                resource: {
                  name: "posts",
                  edit: "/posts/edit/:id",
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
                id: "1",
                resource: {
                  name: "posts",
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
            resources: [{ name: "posts", edit: "/posts/edit/:id" }],
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
            resources: [{ name: "posts", edit: "/posts/edit/:id" }],
            routerInitialEntries: ["/posts/show/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                params: { id: "1" },
                action: "show",
                id: "1",
                resource: {
                  name: "posts",
                  edit: "/posts/edit/:id",
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
                id: "1",
                resource: {
                  name: "posts",
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
            resources: [{ name: "posts", meta: { canDelete: false } }],
            routerInitialEntries: ["/posts/show/1"],
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeNull();
    });

    it("should not render delete button on resource canDelete true & canDelete props false on component with deleteButtonProps", async () => {
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
            resources: [{ name: "posts", meta: { canDelete: false } }],
            routerInitialEntries: ["/posts/show/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                params: { id: "1" },
                action: "show",
                id: "1",
                resource: {
                  name: "posts",
                  meta: { canDelete: false },
                },
                pathname: "/posts/show/1",
              }),
            },
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
            resources: [{ name: "posts", meta: { canDelete: false } }],
            routerInitialEntries: ["/posts/show/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                params: { id: "1" },
                action: "show",
                id: "1",
                resource: {
                  name: "posts",
                },
                pathname: "/posts/show/1",
              }),
            },
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
                id: "1",
                resource: {
                  name: "posts",
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

  describe("Breadcrumb", () => {
    it("should render breadcrumb", async () => {
      const { getAllByLabelText } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={<Show recordItemId="1" />}
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [
              {
                name: "posts",
                list: "/posts",
                show: "/posts/show/:id",
              },
            ],
            routerInitialEntries: ["/posts/show/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                action: "show",
                params: { id: "1" },
                id: "1",
                identifier: "posts",
                resource: {
                  name: "posts",
                  list: "/posts",
                  show: "/posts/show/1",
                },
                pathname: "/posts/show/1",
              }),
            },
          }),
        },
      );

      expect(getAllByLabelText("breadcrumb")).not.toBeNull();
    });
    it("should not render breadcrumb", async () => {
      const { queryByLabelText } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={<Show recordItemId="1" breadcrumb={null} />}
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerInitialEntries: ["/posts/show/1"],
          }),
        },
      );

      expect(queryByLabelText("breadcrumb")).not.toBeInTheDocument();
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
