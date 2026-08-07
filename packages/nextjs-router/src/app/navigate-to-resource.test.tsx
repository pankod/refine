import React from "react";
import { vi } from "vitest";

import { NavigateToResource } from "./navigate-to-resource";
import { render, TestWrapper, type ITestWrapperProps } from "../test/index";
import { mockRouterProvider } from "../test/dataMocks";

const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

const renderNavigateToResource = (
  props: React.ComponentProps<typeof NavigateToResource> = {},
  wrapperProps: ITestWrapperProps = {},
) => {
  return render(<NavigateToResource {...props} />, {
    wrapper: TestWrapper(wrapperProps),
  });
};

describe("NavigateToResource", () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

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

    expect(mockReplace).toHaveBeenCalledWith("/posts");
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

    expect(mockReplace).toHaveBeenCalledWith("/categories");
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
    expect(mockReplace).toHaveBeenCalledWith("/dashboard");

    consoleWarnSpy.mockRestore();
  });

  it("should not navigate when no resource and no fallbackTo is provided", async () => {
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

    expect(mockReplace).not.toHaveBeenCalled();
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

    expect(mockReplace).toHaveBeenCalledWith("/posts");
  });

  it("should only navigate once", async () => {
    const { rerender } = renderNavigateToResource(
      {},
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

    expect(mockReplace).toHaveBeenCalledTimes(1);

    rerender(<NavigateToResource />);

    expect(mockReplace).toHaveBeenCalledTimes(1);
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

    expect(mockReplace).toHaveBeenCalledWith("/categories");
    expect(mockReplace).not.toHaveBeenCalledWith("/posts");
  });
});
