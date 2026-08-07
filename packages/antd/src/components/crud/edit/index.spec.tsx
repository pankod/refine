import React, { type ReactNode } from "react";
import { Route, Routes } from "react-router";
import type { AccessControlProvider } from "@refinedev/core";
import { Form, Input } from "antd";
import { vi } from "vitest";

import {
  act,
  fireEvent,
  type ITestWrapperProps,
  render,
  TestWrapper,
  waitFor,
  MockJSONServer,
  MockRouterProvider,
} from "@test";
import { Edit } from "./";
import { crudEditTests } from "@refinedev/ui-tests";
import { RefineButtonTestIds } from "@refinedev/ui-types";
import {
  DeleteButton,
  ListButton,
  RefreshButton,
  SaveButton,
} from "@components/buttons";
import { useForm } from "@hooks/form";

const renderEdit = (
  edit: ReactNode,
  accessControlProvider?: AccessControlProvider,
  wrapperOptions?: ITestWrapperProps,
) => {
  return render(
    <Routes>
      <Route path="/:resource/edit/:id" element={edit} />
    </Routes>,
    {
      wrapper: TestWrapper({
        routerInitialEntries: ["/posts/edit/1"],
        accessControlProvider,
        routerProvider: {
          ...MockRouterProvider(),
          parse: () => () => ({
            params: { id: "1" },
            action: "show",
            resource: {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
              clone: "/posts/clone/1",
              show: "/posts/show/1",
              edit: "/posts/edit/1",
              meta: { canDelete: true },
            },
            pathname: "/posts/show/1",
          }),
        },
        ...wrapperOptions,
      }),
    },
  );
};

describe("Edit", () => {
  crudEditTests.bind(this)(Edit);

  it("should render optional mutationMode with mutationModeProp prop", async () => {
    const container = renderEdit(<Edit mutationMode="undoable" />);

    expect(container).toBeTruthy();
  });

  describe("render delete button", () => {
    it("should render delete button ", async () => {
      const { getByText, queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/edit/:id"
            element={
              <Edit
                footerButtons={({ defaultButtons, deleteButtonProps }) => {
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
            routerInitialEntries: ["/posts/edit/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                params: { id: "1" },
                action: "show",
                resource: {
                  name: "posts",
                  list: "/posts",
                  create: "/posts/create",
                  clone: "/posts/clone/1",
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

      getByText("Edit Post");
    });

    it("should not render delete button on resource canDelete false", async () => {
      const { getByText, queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/edit/:id"
            element={
              <Edit
                footerButtons={({ defaultButtons, deleteButtonProps }) => {
                  expect(deleteButtonProps).toBeUndefined();
                  return <>{defaultButtons}</>;
                }}
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", meta: { canDelete: false } }],
            routerInitialEntries: ["/posts/edit/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                params: { id: "1" },
                action: "show",
                resource: {
                  name: "posts",
                  list: "/posts",
                  create: "/posts/create",
                  clone: "/posts/clone/1",
                  show: "/posts/show/1",
                  edit: "/posts/edit/1",
                  meta: { canDelete: false },
                },
                pathname: "/posts/show/1",
              }),
            },
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeNull();

      getByText("Edit Post");
    });

    it("should not render delete button on resource canDelete true & canDelete props false on component", async () => {
      const { queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/edit/:id"
            element={
              <Edit
                canDelete={false}
                footerButtons={({ defaultButtons, deleteButtonProps }) => {
                  expect(deleteButtonProps).toBeUndefined();
                  return <>{defaultButtons}</>;
                }}
              />
            }
          />
        </Routes>,

        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", meta: { canDelete: true } }],
            routerInitialEntries: ["/posts/edit/1"],
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeNull();
    });

    it("should render delete button on resource canDelete false & canDelete props true on component", async () => {
      const { queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/edit/:id"
            element={
              <Edit
                canDelete={true}
                footerButtons={({ defaultButtons, deleteButtonProps }) => {
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
            routerInitialEntries: ["/posts/edit/1"],
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).not.toBeNull();
    });

    it("should render delete button on resource canDelete false & deleteButtonProps props not null on component", async () => {
      const { queryByTestId } = render(
        <Routes>
          <Route
            path="/:resource/edit/:id"
            element={
              <Edit
                deleteButtonProps={{ size: "large" }}
                footerButtons={({ defaultButtons, deleteButtonProps }) => {
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
            routerInitialEntries: ["/posts/edit/1"],
          }),
        },
      );

      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).not.toBeNull();
    });
  });

  describe("accessibility of buttons by accessControlProvider", () => {
    it("should render disabled list button and not disabled delete button", async () => {
      const { queryByTestId } = renderEdit(
        <Edit
          canDelete
          footerButtons={({ defaultButtons, deleteButtonProps }) => {
            expect(deleteButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        {
          can: ({ action }) => {
            switch (action) {
              case "list":
                return Promise.resolve({ can: true });
              default:
                return Promise.resolve({ can: false });
            }
          },
        },
      );

      await waitFor(() =>
        expect(
          queryByTestId(RefineButtonTestIds.ListButton),
        ).not.toBeDisabled(),
      );
      await waitFor(() =>
        expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeDisabled(),
      );
    });

    it("should render disabled list button and delete button", async () => {
      const { queryByTestId } = renderEdit(
        <Edit
          canDelete
          headerButtons={({ defaultButtons, listButtonProps }) => {
            expect(listButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
          footerButtons={({ defaultButtons, deleteButtonProps }) => {
            expect(deleteButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        {
          can: ({ action }) => {
            switch (action) {
              case "list":
              case "delete":
                return Promise.resolve({ can: false });
              default:
                return Promise.resolve({ can: false });
            }
          },
        },
      );

      await waitFor(() =>
        expect(queryByTestId(RefineButtonTestIds.ListButton)).toBeDisabled(),
      );
      await waitFor(() =>
        expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeDisabled(),
      );
    });

    it("should customize default buttons with default props", async () => {
      const { queryByTestId } = renderEdit(
        <Edit
          canDelete
          saveButtonProps={{ className: "customize-test" }}
          headerButtons={({ listButtonProps, refreshButtonProps }) => {
            return (
              <>
                <RefreshButton {...refreshButtonProps} />
                <ListButton {...listButtonProps} />
              </>
            );
          }}
          footerButtons={({ deleteButtonProps, saveButtonProps }) => {
            return (
              <>
                <DeleteButton {...deleteButtonProps} />
                <SaveButton {...saveButtonProps} />
              </>
            );
          }}
        />,
        {
          can: ({ action }) => {
            switch (action) {
              case "list":
              case "delete":
                return Promise.resolve({ can: false });
              default:
                return Promise.resolve({ can: false });
            }
          },
        },
      );

      await waitFor(() =>
        expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeDisabled(),
      );
      await waitFor(() =>
        expect(queryByTestId(RefineButtonTestIds.ListButton)).toBeDisabled(),
      );
      expect(queryByTestId(RefineButtonTestIds.SaveButton)).toHaveClass(
        "customize-test",
      );
      expect(queryByTestId(RefineButtonTestIds.RefreshButton)).toBeTruthy();
    });
  });

  describe("list button", () => {
    it("should render list button", async () => {
      const { queryByTestId } = renderEdit(<Edit />);
      await waitFor(() =>
        expect(queryByTestId(RefineButtonTestIds.ListButton)).not.toBeNull(),
      );
    });

    it("should not render list button when list resource is undefined", async () => {
      const { queryByTestId } = renderEdit(
        <Edit
          headerButtons={({ defaultButtons, listButtonProps }) => {
            expect(listButtonProps).toBeUndefined();
            return <>{defaultButtons}</>;
          }}
        />,
        undefined,
        {
          resources: [{ name: "posts", list: undefined }],
        },
      );
      await waitFor(() =>
        expect(queryByTestId(RefineButtonTestIds.ListButton)).toBeNull(),
      );
    });

    it("should not render list button when has recordItemId", async () => {
      const { queryByTestId } = renderEdit(
        <Edit
          recordItemId="1"
          headerButtons={({ defaultButtons, listButtonProps }) => {
            expect(listButtonProps).toBeUndefined();
            return <>{defaultButtons}</>;
          }}
        />,
      );
      await waitFor(() =>
        expect(queryByTestId(RefineButtonTestIds.ListButton)).toBeNull(),
      );
    });
  });

  describe("auto save", () => {
    const EditPageWithAutoSave = () => {
      const { formProps, formLoading, autoSaveProps } = useForm({
        action: "edit",
        autoSave: {
          enabled: true,
        },
      });

      return (
        <Edit autoSaveProps={autoSaveProps}>
          {formLoading && <div>loading...</div>}
          <Form {...formProps} layout="vertical">
            <Form.Item label="Title" name="title">
              <Input data-testid="title" />
            </Form.Item>
          </Form>
        </Edit>
      );
    };

    it("check idle,loading,success statuses", async () => {
      vi.useFakeTimers();

      const { getByText, getByTestId } = render(
        <Routes>
          <Route
            path="/:resource/edit/:id"
            element={<EditPageWithAutoSave />}
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", meta: { canDelete: false } }],
            routerInitialEntries: ["/posts/edit/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                params: { id: "1" },
                action: "show",
                resource: {
                  name: "posts",
                  list: "/posts",
                  create: "/posts/create",
                  clone: "/posts/clone/1",
                  show: "/posts/show/1",
                  edit: "/posts/edit/1",
                  meta: { canDelete: true },
                },
                pathname: "/posts/show/1",
              }),
            },
            dataProvider: {
              ...MockJSONServer,
              update: () => {
                return new Promise((res) => {
                  setTimeout(
                    () =>
                      res({
                        data: {
                          id: "1",
                          title: "ok",
                        } as any,
                      }),
                    1000,
                  );
                });
              },
            },
          }),
        },
      );

      getByText("Edit Post");
      getByText("waiting for changes");

      // update title and wait
      await act(async () => {
        fireEvent.change(getByTestId("title"), {
          target: { value: "test" },
        });

        vi.advanceTimersByTime(1100);
      });

      // check saving message
      expect(getByText("saving...")).toBeTruthy();

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      // check saved message
      expect(getByText("saved")).toBeTruthy();
    });

    it("check error status", async () => {
      vi.useFakeTimers();

      const { getByText, getByTestId } = render(
        <Routes>
          <Route
            path="/:resource/edit/:id"
            element={<EditPageWithAutoSave />}
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", meta: { canDelete: false } }],
            routerInitialEntries: ["/posts/edit/1"],
            routerProvider: {
              ...MockRouterProvider(),
              parse: () => () => ({
                params: { id: "1" },
                action: "show",
                resource: {
                  name: "posts",
                  list: "/posts",
                  create: "/posts/create",
                  clone: "/posts/clone/1",
                  show: "/posts/show/1",
                  edit: "/posts/edit/1",
                  meta: { canDelete: true },
                },
                pathname: "/posts/show/1",
              }),
            },
            dataProvider: {
              ...MockJSONServer,
              update: () => {
                return new Promise((res, rej) => {
                  setTimeout(() => rej("error"), 1000);
                });
              },
            },
          }),
        },
      );

      getByText("Edit Post");
      getByText("waiting for changes");

      // update title and wait
      await act(async () => {
        fireEvent.change(getByTestId("title"), {
          target: { value: "test" },
        });

        vi.advanceTimersByTime(1100);
      });

      // check saving message
      expect(getByText("saving...")).toBeTruthy();

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      // check saved message
      expect(getByText("auto save failure")).toBeTruthy();
    });
  });
});
