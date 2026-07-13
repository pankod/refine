import React from "react";
import { vi } from "vitest";

import { act, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, render, mockRouterProvider } from "@test";

import type { AuthProvider } from "../../contexts/auth/types";
import { Authenticated } from "./";

const mockAuthProvider: AuthProvider = {
  login: () =>
    Promise.resolve({
      success: true,
    }),
  logout: () => Promise.resolve({ success: true }),
  onError: () => Promise.resolve({}),
  check: () => Promise.resolve({ authenticated: true }),
  getPermissions: () => Promise.resolve(),
};

describe("Authenticated", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation((message) => {
      if (typeof message !== "undefined") console.warn(message);
    });
  });

  it("should render children successfully", async () => {
    const { getByText } = render(
      <Authenticated key="render-children-successfully">
        Custom Authenticated
      </Authenticated>,
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          authProvider: mockAuthProvider,
          resources: [{ name: "posts", list: "/posts" }],
        }),
      },
    );

    await waitFor(() => getByText("Custom Authenticated"));
  });

  it("not authenticated test", async () => {
    const { queryByText } = render(
      <Authenticated key="not-authenticated-test">
        Custom Authenticated
      </Authenticated>,
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          authProvider: {
            ...mockAuthProvider,
            check: () => Promise.resolve({ authenticated: false }),
          },
          resources: [{ name: "posts", list: "/posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(queryByText("Custom Authenticated")).toBeNull();
    });
  });

  it("not authenticated fallback component test", async () => {
    mockAuthProvider.check = vi.fn().mockImplementation(() =>
      Promise.resolve({
        authenticated: false,
        error: new Error("Not authenticated"),
      }),
    );

    const { queryByText } = render(
      <Authenticated
        key="not-authenticated-fallback-component-test"
        fallback={<div>Error fallback</div>}
      >
        Custom Authenticated
      </Authenticated>,
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          authProvider: mockAuthProvider,
          resources: [{ name: "posts", list: "/posts" }],
        }),
      },
    );

    await act(async () => {
      expect(queryByText("Error fallback"));
    });
  });

  it("loading test", async () => {
    const { queryByText } = render(
      <Authenticated key="loading-test" loading={<div>loading</div>}>
        Custom Authenticated
      </Authenticated>,
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          authProvider: mockAuthProvider,
          resources: [{ name: "posts", list: "/posts" }],
        }),
      },
    );

    await act(async () => {
      expect(queryByText("loading"));
    });
  });

  it("should redirect to `/my-path` if not authenticated (authProvider's check)", async () => {
    const mockGo = vi.fn();

    const { queryByText } = render(
      <Authenticated key="should-redirect-custom-provider-check">
        Custom Authenticated
      </Authenticated>,
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          authProvider: {
            ...mockAuthProvider,
            check: async () => {
              return {
                authenticated: false,
                redirectTo: "/my-path",
              };
            },
          },
          routerProvider: mockRouterProvider({
            fns: {
              go: () => mockGo,
            },
          }),
          resources: [{ name: "posts", list: "/posts" }],
        }),
      },
    );

    await act(async () => {
      expect(queryByText("Custom Authenticated")).toBeNull();
    });

    await waitFor(() =>
      expect(mockGo).toHaveBeenCalledWith(
        expect.objectContaining({ to: "/my-path", type: "replace" }),
      ),
    );
  });

  it("should redirect to `/my-path` if not authenticated (`redirectOnFail` prop)", async () => {
    const mockGo = vi.fn();

    const { queryByText } = render(
      <Authenticated
        key="should-redirect-custom-on-fail"
        redirectOnFail="/my-path"
      >
        Custom Authenticated
      </Authenticated>,
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          authProvider: {
            ...mockAuthProvider,
            check: async () => {
              return {
                authenticated: false,
                redirectTo: "/other-path",
              };
            },
          },
          routerProvider: mockRouterProvider({
            fns: {
              go: () => mockGo,
            },
          }),
          resources: [{ name: "posts", list: "/posts" }],
        }),
      },
    );

    await act(async () => {
      expect(queryByText("Custom Authenticated")).toBeNull();
    });

    await waitFor(() =>
      expect(mockGo).toHaveBeenCalledWith(
        expect.objectContaining({ to: "/my-path", type: "replace" }),
      ),
    );
  });

  it("should redirect to `/my-path` if not authenticated (navigate in fallback)", async () => {
    const mockGo = vi.fn();

    const NavigateComp = ({ to }: { to: string }) => {
      React.useEffect(() => {
        mockGo({ to, type: "replace" });
      }, [to]);

      return null;
    };

    const { queryByText } = render(
      <Authenticated
        key="should-redirect-fallback"
        fallback={<NavigateComp to="/my-path" />}
      >
        Custom Authenticated
      </Authenticated>,
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          authProvider: {
            ...mockAuthProvider,
            check: async () => {
              return {
                authenticated: false,
                redirectTo: "/other-path",
              };
            },
          },
          routerProvider: mockRouterProvider({
            fns: {
              go: () => mockGo,
            },
          }),
          resources: [{ name: "posts", list: "/posts" }],
        }),
      },
    );

    await act(async () => {
      expect(queryByText("Custom Authenticated")).toBeNull();
    });

    await waitFor(() =>
      expect(mockGo).toHaveBeenCalledWith(
        expect.objectContaining({ to: "/my-path", type: "replace" }),
      ),
    );
  });

  it("should redirect to `/my-path?to=/dashboard?currentPage=1&pageSize=2` if not authenticated (`redirectOnFail` with append query)", async () => {
    const mockGo = vi.fn();

    const currentQuery = {
      currentPage: 1,
      pageSize: 2,
    };

    const currentPathname = "dashboard";

    const { queryByText } = render(
      <Authenticated
        key="should-redirect-with-to"
        redirectOnFail="/my-path"
        appendCurrentPathToQuery
      >
        Custom Authenticated
      </Authenticated>,
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          authProvider: {
            ...mockAuthProvider,
            check: async () => {
              return {
                authenticated: false,
                redirectTo: "/other-path",
              };
            },
          },
          routerProvider: {
            go: () => {
              return (config) => {
                if (config.type === "path") {
                  const params = new URLSearchParams(currentQuery as any);
                  return `/${config.to}?${params.toString()}`;
                }
                return mockGo(config);
              };
            },
            parse: () => {
              return () => ({
                pathname: currentPathname,
                params: currentQuery,
              });
            },
          },
          resources: [{ name: "posts", list: "/posts" }],
        }),
      },
    );

    await act(async () => {
      expect(queryByText("Custom Authenticated")).toBeNull();
    });

    await waitFor(() =>
      expect(mockGo).toHaveBeenCalledWith(
        expect.objectContaining({
          to: "/my-path",
          query: {
            to: "/dashboard?currentPage=1&pageSize=2",
          },
          type: "replace",
        }),
      ),
    );
  });

  it("should redirect to `/my-path?to=/dashboard?currentPage=1&pageSize=2` if not authenticated (authProvider's check with append query)", async () => {
    const mockGo = vi.fn();

    const currentQuery = {
      currentPage: 1,
      pageSize: 2,
    };

    const currentPathname = "dashboard";

    const { queryByText } = render(
      <Authenticated
        key="should-redirect-path-from-provider"
        appendCurrentPathToQuery
      >
        Custom Authenticated
      </Authenticated>,
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          authProvider: {
            ...mockAuthProvider,
            check: async () => {
              return {
                authenticated: false,
                redirectTo: "/my-path",
              };
            },
          },
          routerProvider: {
            go: () => {
              return (config) => {
                if (config.type === "path") {
                  const params = new URLSearchParams(currentQuery as any);
                  return `/${config.to}?${params.toString()}`;
                }
                return mockGo(config);
              };
            },
            parse: () => {
              return () => ({
                pathname: currentPathname,
                params: currentQuery,
              });
            },
          },
          resources: [{ name: "posts", list: "/posts" }],
        }),
      },
    );

    await act(async () => {
      expect(queryByText("Custom Authenticated")).toBeNull();
    });

    await waitFor(() =>
      expect(mockGo).toHaveBeenCalledWith(
        expect.objectContaining({
          to: "/my-path",
          query: {
            to: "/dashboard?currentPage=1&pageSize=2",
          },
          type: "replace",
        }),
      ),
    );
  });

  it("should redirect to `/login` without `to` query if at root", async () => {
    const mockGo = vi.fn();

    const { queryByText } = render(
      <Authenticated key="should-redirect-custom-provider-check">
        Custom Authenticated
      </Authenticated>,
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          authProvider: {
            ...mockAuthProvider,
            check: async () => {
              return {
                authenticated: false,
                redirectTo: "/login",
              };
            },
          },
          routerProvider: mockRouterProvider({
            fns: {
              go: () => mockGo,
            },
          }),
          resources: [{ name: "posts", list: "/posts" }],
        }),
      },
    );

    await act(async () => {
      expect(queryByText("Custom Authenticated")).toBeNull();
    });

    await waitFor(() =>
      expect(mockGo).toHaveBeenCalledWith(
        expect.objectContaining({
          to: "/login",
          type: "replace",
          query: undefined,
        }),
      ),
    );
  });

  it("should redirect to `/login?to=/dashboard` if at /dashboard route", async () => {
    const mockGo = vi.fn();

    // Mocking first return value to simulate that user's location is at /dashboard
    mockGo.mockReturnValueOnce("/dashboard");

    const { queryByText } = render(
      <Authenticated key="should-redirect-custom-provider-check">
        Custom Authenticated
      </Authenticated>,
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          authProvider: {
            ...mockAuthProvider,
            check: async () => {
              return {
                authenticated: false,
                redirectTo: "/login",
              };
            },
          },
          routerProvider: mockRouterProvider({
            fns: {
              go: () => mockGo,
            },
          }),
          resources: [{ name: "posts", list: "/posts" }],
        }),
      },
    );

    await act(async () => {
      expect(queryByText("Custom Authenticated")).toBeNull();
    });

    await waitFor(() =>
      expect(mockGo).toHaveBeenCalledWith(
        expect.objectContaining({
          to: "/login",
          type: "replace",
          query: expect.objectContaining({
            to: "/dashboard",
          }),
        }),
      ),
    );
  });

  it("should not authenticate and redirect if params indicate failed authentication", async () => {
    const mockGo = vi.fn();
    const mockParams = { allowAuth: false }; // Parameter that simulates failed authentication

    const { queryByText } = render(
      <Authenticated key="auth-with-params" params={mockParams}>
        Custom Authenticated
      </Authenticated>,
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          authProvider: {
            ...mockAuthProvider,
            check: async ({ params }) => {
              // Simulate failed authentication based on params
              return params?.allowAuth
                ? { authenticated: true }
                : { authenticated: false, redirectTo: "/login" };
            },
          },
          routerProvider: mockRouterProvider({
            fns: {
              go: () => mockGo,
            },
          }),
          resources: [{ name: "posts", list: "/posts" }],
        }),
      },
    );

    // Since requireAuth is false, the component should redirect to /login
    await act(async () => {
      expect(queryByText("Custom Authenticated")).toBeNull();
    });

    await waitFor(() =>
      expect(mockGo).toHaveBeenCalledWith(
        expect.objectContaining({
          to: "/login",
          type: "replace",
        }),
      ),
    );
  });
});
