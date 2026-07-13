import { vi } from "vitest";
import React from "react";
import {
  type RefineCloneButtonProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import {
  act,
  fireEvent,
  render,
  TestWrapper,
  waitFor,
  mockRouterProvider,
} from "@test";
import { Route, Routes } from "react-router";

export const buttonCloneTests = (
  CloneButton: React.ComponentType<RefineCloneButtonProps<any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Clone Button", () => {
    const clone = vi.fn();

    beforeAll(() => {
      vi.spyOn(console, "warn").mockImplementation(vi.fn());
    });

    it("should render button successfuly", async () => {
      const { container, getByText } = render(<CloneButton />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(getByText("Clone").closest("button, a")).not.toBeDisabled();
    });

    it("should be disabled by prop", async () => {
      const mockOnClick = vi.fn();

      const { getByText } = render(
        <CloneButton disabled onClick={mockOnClick} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByText("Clone").closest("button, a")).toBeDisabled();

      fireEvent.click(getByText("Clone").closest("button, a") as Element);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should be hidden by prop", async () => {
      const { queryByText } = render(<CloneButton disabled hidden />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByText("Clone")).not.toBeInTheDocument();
    });

    it("should have the correct test-id", async () => {
      const { queryByTestId } = render(<CloneButton />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByTestId(RefineButtonTestIds.CloneButton)).toBeTruthy();
    });

    it("should render text by children", async () => {
      const { container, getByText } = render(
        <CloneButton>refine</CloneButton>,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(container).toBeTruthy();

      getByText("refine");
    });

    it("should render without text show only icon", async () => {
      const { container, queryByText } = render(<CloneButton hideText />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(queryByText("Clone")).not.toBeInTheDocument();
    });

    describe("access control", () => {
      describe("with global access control only", () => {
        describe("with default behaviour", () => {
          describe("when user not have access", () => {
            it("should render disabled button with reason text", async () => {
              const { container, getByText } = render(
                <CloneButton recordItemId="1">Clone</CloneButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ params, action }) => {
                        if (action === "create" && params?.id === "1") {
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
                expect(getByText("Clone").closest("button, a")).toBeDisabled(),
              );

              waitFor(() =>
                expect(
                  getByText("Clone")
                    .closest("button, a")
                    ?.getAttribute("title"),
                ).toBe("Access Denied"),
              );
            });
          });

          describe("when user have access", () => {
            it("should render enabled button", async () => {
              const { container, getByText } = render(
                <CloneButton recordItemId="2">Clone</CloneButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ params, action }) => {
                        if (action === "create" && params?.id === "1") {
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
                  getByText("Clone").closest("button, a"),
                ).not.toBeDisabled(),
              );
            });

            it("should respect the disabled prop even with access control enabled", async () => {
              const { getByText } = render(
                <CloneButton disabled>Clone</CloneButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async () => ({ can: true }),
                    },
                  }),
                },
              );

              const button = getByText("Clone").closest("button, a");
              expect(button).toBeDisabled();
            });
          });
        });

        describe("when hideIfUnauthorized is true", () => {
          it("should not render button", async () => {
            const { container, queryByText } = render(
              <CloneButton>Clone</CloneButton>,
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

            expect(queryByText("Clone")).not.toBeInTheDocument();
          });
        });

        describe("when access control is disabled explicitly", () => {
          it("should render enabled button", async () => {
            const { container, getByText } = render(
              <CloneButton>Clone</CloneButton>,
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

            expect(getByText("Clone").closest("button, a")).not.toBeDisabled();
          });
        });
      });

      describe("with global config and accessControl prop", () => {
        describe("when access control enabled globally", () => {
          describe("when access control is disabled with prop", () => {
            it("should render enabled button", async () => {
              const { container, getByText } = render(
                <CloneButton accessControl={{ enabled: false }}>
                  Clone
                </CloneButton>,
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
                  getByText("Clone").closest("button, a"),
                ).not.toBeDisabled(),
              );
            });
          });

          describe("when hideIfUnauthorized false globally", () => {
            describe("when hideIfUnauthorized enabled with prop", () => {
              it("should not render button", async () => {
                const { container, queryByText } = render(
                  <CloneButton
                    accessControl={{
                      hideIfUnauthorized: true,
                    }}
                  >
                    Clone
                  </CloneButton>,
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

                expect(queryByText("Clone")).not.toBeInTheDocument();
              });
            });
          });
        });

        describe("when access control disabled globally", () => {
          describe("when access control enabled with prop", () => {
            it("should render disabled button with reason text", async () => {
              const { container, getByText } = render(
                <CloneButton accessControl={{ enabled: true }}>
                  Clone
                </CloneButton>,
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
                expect(getByText("Clone").closest("button, a")).toBeDisabled(),
              );

              waitFor(() =>
                expect(
                  getByText("Clone")
                    .closest("button, a")
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
                <CloneButton
                  accessControl={{
                    hideIfUnauthorized: false,
                  }}
                >
                  Clone
                </CloneButton>,
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

              expect(queryByText("Clone")).toBeInTheDocument();
            });
          });
        });
      });
    });

    it("should render called function successfully if click the button", async () => {
      const { getByText } = render(
        <CloneButton onClick={() => clone()} recordItemId="1" />,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Clone"));
      });

      expect(clone).toHaveBeenCalledTimes(1);
    });

    it("should create page redirect clone route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route path="/:resource" element={<CloneButton recordItemId="1" />} />
        </Routes>,
        {
          wrapper: TestWrapper({
            routerInitialEntries: ["/posts"],
            routerProvider: {
              ...mockRouterProvider(),
              parse() {
                return () => ({
                  pathname: "/posts",
                  resource: {
                    name: "posts",
                    list: "/posts",
                    create: "/posts/create",
                    clone: "/posts/clone/:id",
                  },
                  action: "list",
                });
              },
            },
            resources: [
              { name: "posts", list: "/posts", clone: "/posts/clone/:id" },
            ],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Clone"));
      });

      const cloneLink = getByText("Clone").closest("a");
      expect(cloneLink).toBeTruthy();
      expect(cloneLink?.getAttribute("href")).toBe("/posts/clone/1");
    });

    it("should edit page redirect clone route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route path="/:resource/:action/:id" element={<CloneButton />} />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [
              { name: "posts", list: "/posts", clone: "/posts/clone/:id" },
            ],
            routerProvider: {
              ...mockRouterProvider(),
              parse() {
                return () => ({
                  params: { id: "1" },
                  pathname: "/posts/edit/1",
                  resource: {
                    name: "posts",
                    list: "/posts",
                    clone: "/posts/clone/:id",
                  },
                  action: "edit",
                  id: "1",
                });
              },
            },
            routerInitialEntries: ["/posts/edit/1"],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Clone"));
      });

      const cloneLink = getByText("Clone").closest("a");
      expect(cloneLink).toBeTruthy();
    });

    it("should custom resource and recordItemId redirect clone route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route
            path="/:resource"
            element={<CloneButton resource="categories" recordItemId="1" />}
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [
              { name: "posts", clone: "/posts/clone/:id" },
              {
                name: "categories",
                clone: "/categories/clone/:id",
              },
            ],
            routerInitialEntries: ["/posts"],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Clone"));
      });

      const cloneLink = getByText("Clone").closest("a");
      expect(cloneLink).toBeTruthy();
      expect(cloneLink?.getAttribute("href")).toBe("/categories/clone/1");
    });
  });
};
