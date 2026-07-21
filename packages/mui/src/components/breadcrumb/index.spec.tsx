import React from "react";
import { vi } from "vitest";
import { breadcrumbTests } from "@refinedev/ui-tests";

import { render, TestWrapper, MockRouterProvider } from "@test";

import { Breadcrumb } from "./";

describe("Breadcrumb", () => {
  beforeAll(() => {
    vi.spyOn(console, "warn").mockImplementation(vi.fn());
  });

  breadcrumbTests.bind(this)(Breadcrumb);

  it("should render breadcrumb links as a MUI Link so styling props are applied", async () => {
    const { container } = render(<Breadcrumb />, {
      wrapper: TestWrapper({
        routerProvider: MockRouterProvider({
          pathname: "/posts/create",
          resource: { name: "posts", list: "/posts", create: "/posts/create" },
          action: "create",
        }),
        resources: [{ name: "posts", list: "/posts", create: "/posts/create" }],
        routerInitialEntries: ["/posts/create"],
      }),
    });

    const link = container.querySelector("a");

    expect(link).toHaveAttribute("href", "/posts");
    // The link must be a real MUI Link (component={LinkFromRouter}) so that
    // `sx`, `underline`, `color` and `variant` are consumed by MUI instead of
    // being dumped onto a plain <span> as invalid DOM attributes.
    expect(link?.className).toContain("MuiLink-root");
    // Guard against the regression: styling props must not leak into the DOM,
    // and there must be no bare <span> wrapper carrying them.
    expect(link).not.toHaveAttribute("underline");
    expect(link).not.toHaveAttribute("sx");
    expect(container.querySelector("span[underline]")).toBeNull();
  });
});
