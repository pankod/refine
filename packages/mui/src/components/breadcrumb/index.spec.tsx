import React from "react";
import { Route, Routes } from "react-router";
import { vi } from "vitest";
import { breadcrumbTests } from "@refinedev/ui-tests";
import { render, TestWrapper, MockRouterProvider } from "@test";

import { Breadcrumb } from "./";

describe("Breadcrumb", () => {
  beforeAll(() => {
    vi.spyOn(console, "warn").mockImplementation(vi.fn());
  });

  breadcrumbTests.bind(this)(Breadcrumb);

  it("should style breadcrumb links via MuiLink instead of leaking sx/underline/color/variant as raw DOM attributes", async () => {
    const { container } = render(
      <Routes>
        <Route path="/:resource/:action" element={<Breadcrumb />} />
      </Routes>,
      {
        wrapper: TestWrapper({
          resources: [
            { name: "posts", list: "/posts", create: "/posts/create" },
          ],
          routerProvider: MockRouterProvider({
            pathname: "/posts",
            resource: {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
            },
            action: "create",
          }),
        }),
      },
    );

    const link = container.querySelector("a");
    expect(link).not.toBeNull();

    const styledChild = link?.firstElementChild;
    expect(styledChild).not.toBeUndefined();
    expect(styledChild).not.toHaveAttribute("sx");
    expect(styledChild).not.toHaveAttribute("underline");
    expect(styledChild).not.toHaveAttribute("color");
    expect(styledChild).not.toHaveAttribute("variant");
    expect(styledChild?.className).toContain("MuiLink-root");
  });
});
