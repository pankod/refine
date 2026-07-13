import React from "react";
import { vi } from "vitest";

import { act } from "react";

import { mockRouterProvider, render, TestWrapper, waitFor } from "@test";

import * as UseCanHook from "../../hooks/accessControl/useCan";
import { CanAccess } from ".";

describe("CanAccess Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render children", async () => {
    const onUnauthorized = vi.fn();

    const { container, findByText } = render(
      <CanAccess
        action="list"
        resource="posts"
        onUnauthorized={(args) => onUnauthorized(args)}
      >
        Accessible
      </CanAccess>,
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: async ({ resource, action }) => {
              if (action === "list" && resource === "posts") {
                return {
                  can: true,
                };
              }

              return { can: false };
            },
          },
        }),
      },
    );

    expect(container).toBeTruthy();
    await findByText("Accessible");

    await waitFor(() => {
      expect(onUnauthorized).not.toHaveBeenCalled();
    });
  });

  it("should not render children and call onUnauthorized", async () => {
    const onUnauthorized = vi.fn();

    const { container, queryByText } = render(
      <CanAccess
        action="list"
        resource="posts"
        onUnauthorized={(args) => onUnauthorized(args)}
      >
        Accessible
      </CanAccess>,
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: async () => ({
              can: false,
              reason: "test",
            }),
          },
        }),
      },
    );

    await act(async () => {
      expect(container).toBeTruthy();
      expect(queryByText("Accessible")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(onUnauthorized).toHaveBeenCalledTimes(1);
      expect(onUnauthorized).toHaveBeenCalledWith({
        resource: "posts",
        action: "list",
        reason: "test",
        params: {
          id: undefined,
          resource: expect.objectContaining({
            name: "posts",
          }),
        },
      });
    });
  });

  it("should successfully pass the own attirbute to its children", async () => {
    const { container, findByText } = render(
      <CanAccess action="list" resource="posts" data-id="refine">
        <p>Accessible</p>
      </CanAccess>,
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: async () => ({
              can: true,
            }),
          },
        }),
      },
    );

    expect(container).toBeTruthy();

    const el = await findByText("Accessible");

    expect(el.closest("p")?.getAttribute("data-id"));
  });

  it("should fallback successfully render when not accessible", async () => {
    const { container, queryByText, findByText } = render(
      <CanAccess action="list" resource="posts" fallback={<p>Access Denied</p>}>
        <p>Accessible</p>
      </CanAccess>,
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: async () => ({ can: false }),
          },
        }),
      },
    );

    expect(container).toBeTruthy();

    expect(queryByText("Accessible")).not.toBeInTheDocument();
    await findByText("Access Denied");
  });

  describe("when no prop is passed", () => {
    it("should work", async () => {
      const useCanSpy = vi.spyOn(UseCanHook, "useCan");

      const { container, queryByText, findByText } = render(
        <CanAccess fallback={<p>Access Denied</p>}>
          <p>Accessible</p>
        </CanAccess>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts", list: "/posts" }],
            routerProvider: mockRouterProvider({
              resource: { name: "posts", list: "/posts" },
              action: "list",
              id: undefined,
            }),
            accessControlProvider: {
              can: async () => {
                return { can: false };
              },
            },
          }),
        },
      );

      expect(container).toBeTruthy();

      expect(useCanSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: "posts",
          action: "list",
          params: {
            id: undefined,
            resource: expect.objectContaining({
              list: "/posts",
              name: "posts",
            }),
          },
        }),
      );

      expect(queryByText("Accessible")).not.toBeInTheDocument();

      await findByText("Access Denied");
    });

    test("when fallback is empty", async () => {
      const { container } = render(
        <CanAccess action="list" resource="posts">
          Accessible
        </CanAccess>,
        {
          wrapper: TestWrapper({
            accessControlProvider: {
              can: async () => {
                return { can: false };
              },
            },
          }),
        },
      );

      expect(container.nodeValue).toStrictEqual(null);
    });

    describe("When props not passed", () => {
      describe("When new router", () => {
        describe("when resource is an object", () => {
          it("should deny access", async () => {
            const useCanSpy = vi.spyOn(UseCanHook, "useCan");

            const { container, queryByText, findByText } = render(
              <CanAccess fallback={<p>Access Denied</p>}>
                <p>Accessible</p>
              </CanAccess>,
              {
                wrapper: TestWrapper({
                  resources: [{ name: "posts", list: "/posts" }],
                  routerProvider: mockRouterProvider({
                    resource: { name: "posts", list: "/posts" },
                    action: "list",
                    id: undefined,
                  }),
                  accessControlProvider: {
                    can: async () => {
                      return { can: false };
                    },
                  },
                }),
              },
            );

            expect(container).toBeTruthy();

            expect(useCanSpy).toHaveBeenCalledWith(
              expect.objectContaining({
                resource: "posts",
                action: "list",
                params: expect.objectContaining({
                  id: undefined,
                  resource: expect.objectContaining({
                    name: "posts",
                    list: "/posts",
                  }),
                }),
              }),
            );

            expect(queryByText("Accessible")).not.toBeInTheDocument();

            await findByText("Access Denied");
          });
        });

        describe("when resource is a string", () => {
          describe("when pick resource is object", () => {
            it("should deny access", async () => {
              const useCanSpy = vi.spyOn(UseCanHook, "useCan");

              const { container, queryByText, findByText } = render(
                <CanAccess fallback={<p>Access Denied</p>}>
                  <p>Accessible</p>
                </CanAccess>,
                {
                  wrapper: TestWrapper({
                    resources: [
                      { name: "posts", list: "/posts", identifier: "posts" },
                    ],
                    routerProvider: mockRouterProvider({
                      action: "list",
                      id: undefined,
                      resource: {
                        name: "posts",
                        list: "/posts",
                        identifier: "posts",
                      },
                    }),
                    accessControlProvider: {
                      can: async () => {
                        return { can: false };
                      },
                    },
                  }),
                },
              );

              expect(container).toBeTruthy();

              expect(useCanSpy).toHaveBeenCalledWith({
                resource: "posts",
                action: "list",
                params: expect.objectContaining({
                  id: undefined,
                  resource: expect.objectContaining({
                    name: "posts",
                    list: "/posts",
                  }),
                }),
                queryOptions: undefined,
              });

              expect(queryByText("Accessible")).not.toBeInTheDocument();

              await findByText("Access Denied");
            });
          });

          describe("when pick resource is undefined", () => {
            it("should work without resource", async () => {
              const useCanSpy = vi.spyOn(UseCanHook, "useCan");

              const { container, queryByText, findByText } = render(
                <CanAccess fallback={<p>Access Denied</p>}>
                  <p>Accessible</p>
                </CanAccess>,
                {
                  wrapper: TestWrapper({
                    routerProvider: mockRouterProvider({
                      id: undefined,
                      action: "list",
                      resource: undefined,
                    }),
                    accessControlProvider: {
                      can: async () => {
                        return { can: false };
                      },
                    },
                  }),
                },
              );

              expect(container).toBeTruthy();

              expect(useCanSpy).toHaveBeenCalledWith({
                resource: undefined,
                action: "list",
                params: expect.objectContaining({
                  id: undefined,
                  resource: undefined,
                }),
                queryOptions: undefined,
              });

              expect(queryByText("Accessible")).not.toBeInTheDocument();

              await findByText("Access Denied");
            });
          });
        });
      });
    });
  });

  it("should respect queryOptions from component prop", async () => {
    const onUnauthorized = vi.fn();

    // Set up spy before component renders so it can capture the hook calls
    const useCanSpy = vi.spyOn(UseCanHook, "useCan");

    const { container, queryByText } = render(
      <CanAccess
        action="list"
        resource="posts"
        queryOptions={{ gcTime: 10000 }}
        onUnauthorized={(args) => onUnauthorized(args)}
      >
        Accessible
      </CanAccess>,
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: async () => ({
              can: true,
            }),
          },
        }),
      },
    );

    expect(container).toBeTruthy();
    await waitFor(() => {
      expect(queryByText("Accessible")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(useCanSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          queryOptions: expect.objectContaining({
            gcTime: 10000,
          }),
        }),
      );
    });
  });
});
