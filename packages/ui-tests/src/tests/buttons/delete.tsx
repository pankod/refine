import { vi } from "vitest";
import React from "react";
import {
  type RefineDeleteButtonProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import {
  act,
  fireEvent,
  MockJSONServer,
  render,
  TestWrapper,
  waitFor,
  mockRouterProvider,
} from "@test";
import { Route, Routes } from "react-router";

export const buttonDeleteTests = (
  DeleteButton: React.ComponentType<RefineDeleteButtonProps<any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Delete Button", () => {
    beforeAll(() => {
      vi.spyOn(console, "error").mockImplementation(vi.fn());
      vi.clearAllTimers();
    });

    it("should render button successfuly", async () => {
      const { container, getByText } = render(<DeleteButton />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(getByText("Delete").closest("button")).not.toBeDisabled();
    });

    it("should be disabled by prop", async () => {
      const mockOnClick = vi.fn();

      const { getByText } = render(
        <DeleteButton disabled onClick={mockOnClick} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByText("Delete").closest("button")).toBeDisabled();

      fireEvent.click(getByText("Delete").closest("button") as Element);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should be hidden by prop", async () => {
      const { queryByText } = render(<DeleteButton disabled hidden />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByText("Delete")).not.toBeInTheDocument();
    });

    it("should have the correct test-id", async () => {
      const { getByTestId } = render(<DeleteButton />, {
        wrapper: TestWrapper({}),
      });

      getByTestId(RefineButtonTestIds.DeleteButton);
    });

    it("should render text by children", async () => {
      const { container, getByText } = render(
        <DeleteButton>refine</DeleteButton>,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(container).toBeTruthy();

      getByText("refine");
    });

    it("should render without text show only icon", async () => {
      const { container, queryByText } = render(<DeleteButton hideText />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(queryByText("Delete")).not.toBeInTheDocument();
    });

    describe("access control", () => {
      describe("with global access control only", () => {
        describe("with default behaviour", () => {
          describe("when user not have access", () => {
            it("should render disabled button with reason text", async () => {
              const { container, getByTestId } = render(
                <DeleteButton recordItemId="1">Delete</DeleteButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ params, action }) => {
                        if (action === "delete" && params?.id === "1") {
                          return {
                            can: false,
                            reason: "Access Denied",
                          };
                        }
                        return {
                          can: true,
                        };
                      },
                    },
                  }),
                },
              );

              expect(container).toBeTruthy();

              await waitFor(() =>
                expect(
                  getByTestId(RefineButtonTestIds.DeleteButton).closest(
                    "button",
                  ),
                ).toBeDisabled(),
              );

              await waitFor(() =>
                expect(
                  getByTestId(RefineButtonTestIds.DeleteButton)
                    .closest("button")
                    ?.getAttribute("title"),
                ).toBe("Access Denied"),
              );
            });
          });

          describe("when user have access", () => {
            it("should render enabled button", async () => {
              const { container, getByTestId } = render(
                <DeleteButton recordItemId="2">Delete</DeleteButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ params, action }) => {
                        if (action === "delete" && params?.id === "1") {
                          return {
                            can: false,
                          };
                        }
                        return {
                          can: true,
                        };
                      },
                    },
                  }),
                },
              );

              expect(container).toBeTruthy();

              await waitFor(() =>
                expect(
                  getByTestId(RefineButtonTestIds.DeleteButton).closest(
                    "button",
                  ),
                ).not.toBeDisabled(),
              );
            });

            it("should respect the disabled prop even with access control enabled", async () => {
              const { getByText } = render(
                <DeleteButton disabled>Delete</DeleteButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async () => ({ can: true }),
                    },
                  }),
                },
              );

              const button = getByText("Delete").closest("button");
              expect(button).toBeDisabled();
            });
          });
        });

        describe("when hideIfUnauthorized is true", () => {
          it("should not render button", async () => {
            const { container, queryByText } = render(
              <DeleteButton>Delete</DeleteButton>,
              {
                wrapper: TestWrapper({
                  accessControlProvider: {
                    can: async () => ({ can: false }),
                    options: {
                      buttons: {
                        hideIfUnauthorized: true,
                      },
                    },
                  },
                }),
              },
            );

            expect(container).toBeTruthy();

            expect(queryByText("Delete")).not.toBeInTheDocument();
          });
        });

        describe("when access control is disabled explicitly", () => {
          it("should render enabled button", async () => {
            const { container, getByTestId } = render(
              <DeleteButton>Delete</DeleteButton>,
              {
                wrapper: TestWrapper({
                  accessControlProvider: {
                    can: async () => ({ can: false }),
                    options: {
                      buttons: {
                        enableAccessControl: false,
                        hideIfUnauthorized: true,
                      },
                    },
                  },
                }),
              },
            );

            expect(container).toBeTruthy();

            expect(
              getByTestId(RefineButtonTestIds.DeleteButton).closest("button"),
            ).not.toBeDisabled();
          });
        });
      });

      describe("with global config and accessControl prop", () => {
        describe("when access control enabled globally", () => {
          describe("when access control is disabled with prop", () => {
            it("should render enabled button", async () => {
              const { container, getByTestId } = render(
                <DeleteButton accessControl={{ enabled: false }}>
                  Delete
                </DeleteButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async () => {
                        return {
                          can: false,
                        };
                      },
                      options: {
                        buttons: {
                          enableAccessControl: true,
                          hideIfUnauthorized: true,
                        },
                      },
                    },
                  }),
                },
              );

              expect(container).toBeTruthy();

              await waitFor(() =>
                expect(
                  getByTestId(RefineButtonTestIds.DeleteButton).closest(
                    "button",
                  ),
                ).not.toBeDisabled(),
              );
            });
          });

          describe("when hideIfUnauthorized false globally", () => {
            describe("when hideIfUnauthorized enabled with prop", () => {
              it("should not render button", async () => {
                const { container, queryByText } = render(
                  <DeleteButton
                    accessControl={{
                      hideIfUnauthorized: true,
                    }}
                  >
                    Delete
                  </DeleteButton>,
                  {
                    wrapper: TestWrapper({
                      accessControlProvider: {
                        can: async () => ({
                          can: false,
                        }),
                        options: {
                          buttons: {
                            hideIfUnauthorized: false,
                          },
                        },
                      },
                    }),
                  },
                );

                expect(container).toBeTruthy();

                expect(queryByText("Delete")).not.toBeInTheDocument();
              });
            });
          });
        });

        describe("when access control disabled globally", () => {
          describe("when access control enabled with prop", () => {
            it("should render disabled button with reason text", async () => {
              const { container, getByTestId } = render(
                <DeleteButton accessControl={{ enabled: true }}>
                  Delete
                </DeleteButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async () => {
                        return {
                          can: false,
                          reason: "Access Denied",
                        };
                      },
                    },
                  }),
                },
              );

              expect(container).toBeTruthy();

              await waitFor(() =>
                expect(
                  getByTestId(RefineButtonTestIds.DeleteButton).closest(
                    "button",
                  ),
                ).toBeDisabled(),
              );

              await waitFor(() =>
                expect(
                  getByTestId(RefineButtonTestIds.DeleteButton)
                    .closest("button")
                    ?.getAttribute("title"),
                ).toBe("Access Denied"),
              );
            });
          });
        });

        describe("when hideIfUnauthorized enabled globally", () => {
          describe("when hideIfUnauthorized disabled with prop", () => {
            it("should render button", async () => {
              const { container, queryByText } = render(
                <DeleteButton
                  accessControl={{
                    hideIfUnauthorized: false,
                  }}
                >
                  Delete
                </DeleteButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async () => ({
                        can: false,
                      }),
                      options: {
                        buttons: {
                          hideIfUnauthorized: true,
                        },
                      },
                    },
                  }),
                },
              );

              expect(container).toBeTruthy();

              expect(queryByText("Delete")).toBeInTheDocument();
            });
          });
        });
      });
    });

    it("should render called function successfully if click the button", async () => {
      const deleteFunc = vi.fn();
      const { getByTestId } = render(
        <DeleteButton onClick={() => deleteFunc()} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      await act(async () => {
        fireEvent.click(getByTestId(RefineButtonTestIds.DeleteButton));
      });

      expect(deleteFunc).toHaveBeenCalledTimes(1);
    });

    it("should render Popconfirm successfuly", async () => {
      const { getByText, getAllByText, getByTestId } = render(
        <DeleteButton resource="posts" recordItemId="1" />,
        {
          wrapper: TestWrapper({}),
        },
      );

      await act(async () => {
        fireEvent.click(getByTestId(RefineButtonTestIds.DeleteButton));
      });

      getByText("Are you sure?");
      getByText("Cancel");
      getAllByText("Delete");
    });

    it("should confirm Popconfirm successfuly", async () => {
      const deleteOneMock = vi.fn();
      const { getByText, getAllByText, getByTestId } = render(
        <DeleteButton resource="posts" recordItemId="1" />,
        {
          wrapper: TestWrapper({
            dataProvider: {
              ...MockJSONServer,
              deleteOne: deleteOneMock,
            },
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByTestId(RefineButtonTestIds.DeleteButton));
      });

      getByText("Are you sure?");
      getByText("Cancel");

      const deleteButtons = getAllByText("Delete");

      await act(async () => {
        fireEvent.click(deleteButtons[1]);
      });

      expect(deleteOneMock).toHaveBeenCalledTimes(1);
    });

    it("should confirm Popconfirm successfuly with recordItemId", async () => {
      const deleteOneMock = vi.fn();

      const { getByText, getAllByText, getByTestId } = render(
        <DeleteButton recordItemId="record-id" resource="posts" />,
        {
          wrapper: TestWrapper({
            dataProvider: {
              ...MockJSONServer,
              deleteOne: deleteOneMock,
            },
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByTestId(RefineButtonTestIds.DeleteButton));
      });

      getByText("Are you sure?");
      getByText("Cancel");

      const deleteButtons = getAllByText("Delete");

      await act(async () => {
        fireEvent.click(deleteButtons[1]);
      });

      expect(deleteOneMock).toHaveBeenCalledWith(
        expect.objectContaining({ id: "record-id" }),
      );
    });

    it("should confirm Popconfirm successfuly with onSuccess", async () => {
      const deleteOneMock = vi.fn();
      const onSuccessMock = vi.fn();

      const { getByText, getAllByText, getByTestId } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={<DeleteButton onSuccess={onSuccessMock} />}
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            dataProvider: {
              ...MockJSONServer,
              deleteOne: deleteOneMock,
            },
            routerProvider: {
              ...mockRouterProvider(),
              parse() {
                return () => ({
                  params: {},
                  pathname: "/posts",
                  resource: {
                    name: "posts",
                    edit: "/posts/edit/:id",
                  },
                  action: "edit",
                  id: 1,
                });
              },
            },
            routerInitialEntries: ["/posts/edit/1"],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByTestId(RefineButtonTestIds.DeleteButton));
      });

      getByText("Are you sure?");
      getByText("Cancel");

      const deleteButtons = getAllByText("Delete");

      await act(async () => {
        fireEvent.click(deleteButtons[1]);
      });

      expect(deleteOneMock).toHaveBeenCalledTimes(1);
      expect(onSuccessMock).toHaveBeenCalledTimes(1);
    });

    it("should confirm Popconfirm successfuly with onSuccess", async () => {
      const deleteOneMock = vi.fn();
      const onSuccessMock = vi.fn();

      const { getByText, getByTestId } = render(
        <Routes>
          <Route
            path="/:resource/:action/:id"
            element={
              <DeleteButton
                onSuccess={onSuccessMock}
                confirmOkText="confirmOkText"
                confirmCancelText="confirmCancelText"
                confirmTitle="confirmTitle"
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            dataProvider: {
              ...MockJSONServer,
              deleteOne: deleteOneMock,
            },
            routerProvider: {
              ...mockRouterProvider(),
              parse() {
                return () => ({
                  params: {},
                  pathname: "/posts",
                  resource: {
                    name: "posts",
                    edit: "/posts/edit/:id",
                  },
                  action: "edit",
                  id: 1,
                });
              },
            },
            routerInitialEntries: ["/posts/edit/1"],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByTestId(RefineButtonTestIds.DeleteButton));
      });

      getByText("confirmTitle");
      getByText("confirmOkText");
      getByText("confirmCancelText");

      await act(async () => {
        fireEvent.click(getByText("confirmOkText"));
      });

      expect(deleteOneMock).toHaveBeenCalledTimes(1);
      expect(onSuccessMock).toHaveBeenCalledTimes(1);
    });

    it("should render with custom mutationMode", async () => {
      const { getByTestId } = render(
        <Routes>
          <Route
            path="/:resource"
            element={<DeleteButton mutationMode="pessimistic" />}
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerInitialEntries: ["/posts"],
          }),
        },
      );

      getByTestId(RefineButtonTestIds.DeleteButton);
    });

    it("should render with custom resource", async () => {
      const { getByTestId } = render(
        <Routes>
          <Route
            path="/:resource"
            element={<DeleteButton resource="categories" />}
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }, { name: "categories" }],
            routerInitialEntries: ["/posts"],
          }),
        },
      );

      getByTestId(RefineButtonTestIds.DeleteButton);
    });

    it("should render with resource", async () => {
      const { getByTestId } = render(
        <Routes>
          <Route
            path="/:resource"
            element={<DeleteButton resource="users" />}
          />
        </Routes>,

        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }, { name: "users" }],
            routerInitialEntries: ["/posts"],
          }),
        },
      );

      getByTestId(RefineButtonTestIds.DeleteButton);
    });
  });
};
