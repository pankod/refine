import React, { type ReactNode } from "react";
import { Route, Routes } from "react-router";
import { vi } from "vitest";

import {
  render,
  TestWrapper,
  type ITestWrapperProps,
  MockRouterProvider,
} from "@test";

import { Breadcrumb } from "./";
import { breadcrumbTests } from "@refinedev/ui-tests";

const renderBreadcrumb = (
  children: ReactNode,
  wrapperProps: ITestWrapperProps = {},
) => {
  return render(
    <Routes>
      <Route path="/:resource/:action" element={children} />
    </Routes>,
    {
      wrapper: TestWrapper({
        routerProvider: {
          ...MockRouterProvider(),
          parse: () => () => ({
            params: { id: "1" },
            action: "create",
            resource: {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
            },
            pathname: "/posts/create",
          }),
        },
        ...wrapperProps,
      }),
    },
  );
};

const DummyDashboard = () => <div>Dashboard</div>;

describe("Breadcrumb", () => {
  beforeAll(() => {
    vi.spyOn(console, "warn").mockImplementation(vi.fn());
  });

  breadcrumbTests.bind(this)(Breadcrumb);

  it("should render home icon", async () => {
    const { container } = renderBreadcrumb(<Breadcrumb minItems={1} />, {
      resources: [
        { name: "posts", list: "/posts", create: "/posts/create" },
        { name: "", list: "/" },
      ],
      routerInitialEntries: ["/posts/create"],
    });

    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("should not render home icon with 'showhHome' props", async () => {
    const { container } = renderBreadcrumb(
      <Breadcrumb showHome={false} minItems={1} />,
      {
        resources: [{ name: "posts" }],
        routerInitialEntries: ["/posts/create"],
      },
    );

    expect(container.querySelector("svg")).toBeFalsy();
  });

  it("should render breadcrumb items", async () => {
    const { getByText } = renderBreadcrumb(<Breadcrumb minItems={1} />, {
      resources: [{ name: "posts" }],
      routerInitialEntries: ["/posts/create"],
    });

    getByText("Posts");
    getByText("Create");
  });
});
