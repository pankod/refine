import { vi } from "vitest";
import React from "react";
import {
  type RefineShowButtonProps,
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

export const buttonShowTests = (
  ShowButton: React.ComponentType<RefineShowButtonProps<any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Show Button", () => {
    const show = vi.fn();

    beforeAll(() => {
      vi.spyOn(console, "warn").mockImplementation(vi.fn());
    });

    it("should render button successfuly", async () => {
      const { container, getByText } = render(<ShowButton />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(getByText("Show").closest("button, a")).not.toBeDisabled();
    });

    it("should be disabled by prop", async () => {
      const mockOnClick = vi.fn();

      const { getByText } = render(
        <ShowButton disabled onClick={mockOnClick} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByText("Show").closest("button, a")).toBeDisabled();

      fireEvent.click(getByText("Show").closest("button, a") as Element);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should be hidden by prop", async () => {
      const { queryByText } = render(<ShowButton disabled hidden />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByText("Show")).not.toBeInTheDocument();
    });

    it("should have the correct test-id", async () => {
      const { queryByTestId } = render(<ShowButton />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByTestId(RefineButtonTestIds.ShowButton)).toBeTruthy();
    });

    it("should render text by children", async () => {
      const { container, getByText } = render(<ShowButton>refine</ShowButton>, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      getByText("refine");
    });

    it("should render without text show only icon", async () => {
      const { container, queryByText } = render(<ShowButton hideText />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(queryByText("Show")).not.toBeInTheDocument();
    });

    describe("access control", () => {
      describe("with global access control only", () => {
        describe("with default behaviour", () => {
          describe("when user not have access", () => {
            it("should render disabled button with reason text", async () => {
              const { container, getByText } = render(
                <ShowButton recordItemId="1">Show</ShowButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ params, action }) => {
                        if (action === "show" && params?.id === "1") {
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
                expect(getByText("Show").closest("button, a")).toBeDisabled(),
              );

              waitFor(() =>
                expect(
                  getByText("Show").closest("button, a")?.getAttribute("title"),
                ).toBe("Access Denied"),
              );
            });
          });

          describe("when user have access", () => {
            it("should render enabled button", async () => {
              const { container, getByText } = render(
                <ShowButton recordItemId="2">Show</ShowButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async ({ params, action }) => {
                        if (action === "show" && params?.id === "1") {
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
                  getByText("Show").closest("button, a"),
                ).not.toBeDisabled(),
              );
            });

            it("should respect the disabled prop even with access control enabled", async () => {
              const { getByText } = render(
                <ShowButton disabled>Show</ShowButton>,
                {
                  wrapper: TestWrapper({
                    accessControlProvider: {
                      can: async () => ({ can: true }),
                    },
                  }),
                },
              );

              const button = getByText("Show").closest("button, a");
              expect(button).toBeDisabled();
            });
          });
        });

        describe("when hideIfUnauthorized is true", () => {
          it("should not render button", async () => {
            const { container, queryByText } = render(
              <ShowButton>Show</ShowButton>,
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

            expect(queryByText("Show")).not.toBeInTheDocument();
          });
        });

        describe("when access control is disabled explicitly", () => {
          it("should render enabled button", async () => {
            const { container, getByText } = render(
              <ShowButton>Show</ShowButton>,
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

            expect(getByText("Show").closest("button, a")).not.toBeDisabled();
          });
        });
      });

      describe("with global config and accessControl prop", () => {
        describe("when access control enabled globally", () => {
          describe("when access control is disabled with prop", () => {
            it("should render enabled button", async () => {
              const { container, getByText } = render(
                <ShowButton accessControl={{ enabled: false }}>
                  Show
                </ShowButton>,
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
                  getByText("Show").closest("button, a"),
                ).not.toBeDisabled(),
              );
            });
          });

          describe("when hideIfUnauthorized false globally", () => {
            describe("when hideIfUnauthorized enabled with prop", () => {
              it("should not render button", async () => {
                const { container, queryByText } = render(
                  <ShowButton
                    accessControl={{
                      hideIfUnauthorized: true,
                    }}
                  >
                    Show
                  </ShowButton>,
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

                expect(queryByText("Show")).not.toBeInTheDocument();
              });
            });
          });
        });

        describe("when access control disabled globally", () => {
          describe("when access control enabled with prop", () => {
            it("should render disabled button with reason text", async () => {
              const { container, getByText } = render(
                <ShowButton accessControl={{ enabled: true }}>Show</ShowButton>,
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
                expect(getByText("Show").closest("button, a")).toBeDisabled(),
              );

              waitFor(() =>
                expect(
                  getByText("Show").closest("button, a")?.getAttribute("title"),
                ).toBe("Access Denied"),
              );
            });
          });
        });

        describe("when hideIfUnauthorized enabled globally", () => {
          describe("when hideIfUnauthorized disabled with prop", () => {
            it("should render button", async () => {
              const { container, queryByText } = render(
                <ShowButton
                  accessControl={{
                    hideIfUnauthorized: false,
                  }}
                >
                  Show
                </ShowButton>,
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

              expect(queryByText("Show")).toBeInTheDocument();
            });
          });
        });
      });
    });

    it("should render called function successfully if click the button", async () => {
      const { getByText } = render(<ShowButton onClick={() => show()} />, {
        wrapper: TestWrapper({}),
      });

      await act(async () => {
        fireEvent.click(getByText("Show"));
      });

      expect(show).toHaveBeenCalledTimes(1);
    });

    it("should create page redirect show route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route path="/:resource" element={<ShowButton recordItemId="1" />} />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [
              { name: "posts", list: "/posts", show: "/posts/show/:id" },
            ],
            routerInitialEntries: ["/posts"],
            routerProvider: {
              ...mockRouterProvider(),
              parse() {
                return () => ({
                  params: undefined,
                  pathname: "/posts",
                  resource: {
                    name: "posts",
                    list: "/posts",
                    show: "/posts/show/:id",
                  },
                  action: "list",
                });
              },
            },
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Show"));
      });

      const showLink = getByText("Show").closest("a");
      expect(showLink?.getAttribute("href")).toBe("/posts/show/1");
    });

    it("should show page redirect show route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route path="/:resource/:action/:id" element={<ShowButton />} />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [
              { name: "posts", list: "/posts", show: "/posts/show/:id" },
            ],
            routerProvider: {
              ...mockRouterProvider(),
              parse() {
                return () => ({
                  params: { id: "1" },
                  pathname: "/posts/show/1",
                  resource: {
                    name: "posts",
                    list: "/posts",
                    show: "/posts/show/:id",
                  },
                  action: "show",
                  id: "1",
                });
              },
            },
            routerInitialEntries: ["/posts/show/1"],
          }),
        },
      );

      await act(async () => {});

      const showLink = getByText("Show").closest("a");
      expect(showLink?.getAttribute("href")).toBe("/posts/show/1");
    });

    it("should custom resource and recordItemId redirect show route called function successfully if click the button", async () => {
      const { getByText } = render(
        <Routes>
          <Route
            path="/:resource"
            element={<ShowButton resource="categories" recordItemId="1" />}
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            resources: [
              { name: "posts", show: "/posts/show/:id" },
              { name: "categories", show: "/categories/show/:id" },
            ],
            routerInitialEntries: ["/posts"],
          }),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Show"));
      });

      const showLink = getByText("Show").closest("a");
      expect(showLink).toBeTruthy();
      expect(showLink?.getAttribute("href")).toBe("/categories/show/1");
    });
  });
};
