import { vi } from "vitest";
import React from "react";
import {
  type RefineEditButtonProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import { act, fireEvent, render, TestWrapper, waitFor } from "@test";
import { Route, Routes } from "react-router";

export const buttonEditTests = (
  EditButton: React.ComponentType<RefineEditButtonProps<any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Edit Button", () => {
    const edit = vi.fn();

    beforeAll(() => {
      vi.spyOn(console, "warn").mockImplementation(vi.fn());
    });

    it("should render button successfuly", async () => {
      const { container, getByText } = render(<EditButton />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(getByText("Edit").closest("button, a")).not.toBeDisabled();
    });

    it("should be disabled by prop", async () => {
      const mockOnClick = vi.fn();

      const { getByText } = render(
        <EditButton disabled onClick={mockOnClick} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByText("Edit").closest("button, a")).toBeDisabled();

      fireEvent.click(getByText("Edit").closest("button, a") as Element);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should be hidden by prop", async () => {
      const { queryByText } = render(<EditButton disabled hidden />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByText("Edit")).not.toBeInTheDocument();
    });

    it("should have the correct test-id", async () => {
      const { queryByTestId } = render(<EditButton />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByTestId(RefineButtonTestIds.EditButton)).toBeTruthy();
    });

    it("should render text by children", async () => {
      const { container, getByText } = render(<EditButton>refine</EditButton>, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      getByText("refine");
    });

    it("should render without text show only icon", async () => {
      const { container, queryByText } = render(<EditButton hideText />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(queryByText("Edit")).not.toBeInTheDocument();
    });

    describe("access control", () => {
      describe("with global access control only", () => {
        describe("with default behaviour", () => {
          describe("when user not have access", () => {
            it("should render disabled button with reason text", async () => {
              const { container, getByText } = render(
                <EditButton recordItemId="1">Edit</EditButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ params, action }) => {
                        if (action === "edit" && params?.id === "1") {
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
                expect(getByText("Edit").closest("button, a")).toBeDisabled(),
              );

              waitFor(() =>
                expect(
                  getByText("Edit").closest("button, a")?.getAttribute("title"),
                ).toBe("Access Denied"),
              );
            });
          });

          describe("when user have access", () => {
            it("should render enabled button", async () => {
              const { container, getByText } = render(
                <EditButton recordItemId="2">Edit</EditButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ params, action }) => {
                        if (action === "edit" && params?.id === "1") {
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
                  getByText("Edit").closest("button, a"),
                ).not.toBeDisabled(),
              );
            });

            it("should respect the disabled prop even with access control enabled", async () => {
              const { getByText } = render(
                <EditButton disabled>Edit</EditButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async () => ({ can: true }),
                    },
                  }),
                },
              );

              const button = getByText("Edit").closest("button, a");
              expect(button).toBeDisabled();
            });
          });
        });

        describe("when hideIfUnauthorized is true", () => {
          it("should not render button", async () => {
            const { container, queryByText } = render(
              <EditButton>Edit</EditButton>,
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

            expect(queryByText("Edit")).not.toBeInTheDocument();
          });
        });

        describe("when access control is disabled explicitly", () => {
          it("should render enabled button", async () => {
            const { container, getByText } = render(
              <EditButton>Edit</EditButton>,
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

            expect(getByText("Edit").closest("button, a")).not.toBeDisabled();
          });
        });
      });

      describe("with global config and accessControl prop", () => {
        describe("when access control enabled globally", () => {
          describe("when access control is disabled with prop", () => {
            it("should render enabled button", async () => {
              const { container, getByText } = render(
                <EditButton accessControl={{ enabled: false }}>
                  Edit
                </EditButton>,
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
                  getByText("Edit").closest("button, a"),
                ).not.toBeDisabled(),
              );
            });
          });

          describe("when hideIfUnauthorized false globally", () => {
            describe("when hideIfUnauthorized enabled with prop", () => {
              it("should not render button", async () => {
                const { container, queryByText } = render(
                  <EditButton
                    accessControl={{
                      hideIfUnauthorized: true,
                    }}
                  >
                    Edit
                  </EditButton>,
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

                expect(queryByText("Edit")).not.toBeInTheDocument();
              });
            });
          });
        });

        describe("when access control disabled globally", () => {
          describe("when access control enabled with prop", () => {
            it("should render disabled button with reason text", async () => {
              const { container, getByText } = render(
                <EditButton accessControl={{ enabled: true }}>Edit</EditButton>,
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
                expect(getByText("Edit").closest("button, a")).toBeDisabled(),
              );

              waitFor(() =>
                expect(
                  getByText("Edit").closest("button, a")?.getAttribute("title"),
                ).toBe("Access Denied"),
              );
            });
          });
        });

        describe("when hideIfUnauthorized enabled globally", () => {
          describe("when hideIfUnauthorized disabled with prop", () => {
            it("should render button", async () => {
              const { container, queryByText } = render(
                <EditButton
                  accessControl={{
                    hideIfUnauthorized: false,
                  }}
                >
                  Edit
                </EditButton>,
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

              expect(queryByText("Edit")).toBeInTheDocument();
            });
          });
        });
      });
    });

    it("should render called function successfully if click the button", async () => {
      const { getByText } = render(<EditButton onClick={() => edit()} />, {
        wrapper: TestWrapper({}),
      });

      await act(async () => {
        fireEvent.click(getByText("Edit"));
      });

      expect(edit).toHaveBeenCalledTimes(1);
    });

    it("should custom resource and recordItemId redirect show route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route
            path="/:resource"
            element={<EditButton resource="categories" recordItemId="1" />}
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [
              { name: "posts", edit: "/posts/edit/:id" },
              { name: "categories", edit: "/categories/edit/:id" },
            ],
            routerInitialEntries: ["/posts"],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Edit"));
      });

      const editLink = getByText("Edit").closest("a");
      expect(editLink).toBeTruthy();
      expect(editLink?.getAttribute("href")).toBe("/categories/edit/1");
    });
  });
};
