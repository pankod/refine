import React from "react";
import { vi } from "vitest";
import { screen } from "@testing-library/react";

import { NavigateToResource } from "./navigate-to-resource";
import { render, TestWrapper, type ITestWrapperProps } from "./test/index";
import { mockRouterProvider } from "./test/dataMocks";

// Mock Navigate component to capture navigation
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => (
      <div data-testid="navigate-to">{to}</div>
    ),
  };
});

const renderNavigateToResource = (
  props: React.ComponentProps<typeof NavigateToResource> = {},
  wrapperProps: ITestWrapperProps = {},
) => {
  return render(<NavigateToResource {...props} />, {
    wrapper: TestWrapper(wrapperProps),
  });
};

describe("NavigateToResource", () => {
  it("should navigate to the first resource with list action", async () => {
    renderNavigateToResource(
      {},
      {
        resources: [
          { name: "posts", list: "/posts" },
          { name: "categories", list: "/categories" },
        ],
        routerProvider: mockRouterProvider({
          fns: {
            go: () => {
              return ({ to, type }) => {
                if (type === "path") return to;
                return undefined;
              };
            },
          },
        }),
      },
    );

    expect(screen.getByTestId("navigate-to").textContent).toBe("/posts");
  });

  it("should navigate to the specified resource", async () => {
    renderNavigateToResource(
      { resource: "categories" },
      {
        resources: [
          { name: "posts", list: "/posts" },
          { name: "categories", list: "/categories" },
        ],
        routerProvider: mockRouterProvider({
          fns: {
            go: () => {
              return ({ to, type }) => {
                if (type === "path") return to;
                return undefined;
              };
            },
          },
        }),
      },
    );

    expect(screen.getByTestId("navigate-to").textContent).toBe("/categories");
  });

  it("should navigate to fallbackTo when no resource is found", async () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    renderNavigateToResource(
      { fallbackTo: "/dashboard" },
      {
        resources: [],
        routerProvider: mockRouterProvider({
          fns: {
            go: () => {
              return ({ to, type }) => {
                if (type === "path") return to;
                return undefined;
              };
            },
          },
        }),
      },
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "No resource is found. navigation to /dashboard.",
    );
    expect(screen.getByTestId("navigate-to").textContent).toBe("/dashboard");

    consoleWarnSpy.mockRestore();
  });

  it("should not navigate when no resource and no fallbackTo is provided", async () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    renderNavigateToResource(
      {},
      {
        resources: [],
        routerProvider: mockRouterProvider({
          fns: {
            go: () => {
              return ({ to, type }) => {
                if (type === "path") return to;
                return undefined;
              };
            },
          },
        }),
      },
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'No resource and "fallbackTo" is found. No navigation will be made.',
    );
    expect(screen.queryByTestId("navigate-to")).toBeNull();

    consoleWarnSpy.mockRestore();
  });

  it("should pass meta to getToPath", async () => {
    const meta = { foo: "bar" };

    renderNavigateToResource(
      { resource: "posts", meta },
      {
        resources: [{ name: "posts", list: "/posts" }],
        routerProvider: mockRouterProvider({
          fns: {
            go: () => {
              return ({ to, type }) => {
                if (type === "path") return to;
                return undefined;
              };
            },
          },
        }),
      },
    );

    expect(screen.getByTestId("navigate-to").textContent).toBe("/posts");
  });

  it("should prefer specified resource over first resource with list", async () => {
    renderNavigateToResource(
      { resource: "categories" },
      {
        resources: [
          { name: "posts", list: "/posts" },
          { name: "categories", list: "/categories" },
        ],
        routerProvider: mockRouterProvider({
          fns: {
            go: () => {
              return ({ to, type }) => {
                if (type === "path") return to;
                return undefined;
              };
            },
          },
        }),
      },
    );

    expect(screen.getByTestId("navigate-to").textContent).toBe("/categories");
  });

  it("should return null when resource exists but path is not available", async () => {
    renderNavigateToResource(
      { resource: "posts" },
      {
        resources: [{ name: "posts" }],
        routerProvider: mockRouterProvider({
          fns: {
            go: () => {
              return ({ to, type }) => {
                if (type === "path") return undefined;
                return undefined;
              };
            },
          },
        }),
      },
    );

    expect(screen.queryByTestId("navigate-to")).toBeNull();
  });
});
