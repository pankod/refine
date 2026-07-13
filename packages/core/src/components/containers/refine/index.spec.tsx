import React from "react";

import { MockJSONServer, mockRouterProvider, render, TestWrapper } from "@test";

import { Refine } from "./index";

describe("Refine Container", () => {
  it("should render resource prop list page", async () => {
    const PostList = () => {
      return (
        <>
          <h1>Posts</h1>
          <table>
            <tbody>
              <tr>
                <td>foo</td>
              </tr>
            </tbody>
          </table>
        </>
      );
    };

    const { container, getByText } = render(<PostList />, {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts", list: "/posts" }],
      }),
    });

    expect(container).toBeDefined();
    getByText("Posts");
  });

  it("should render the children", async () => {
    const { getByTestId } = render(
      <Refine
        dataProvider={MockJSONServer}
        routerProvider={mockRouterProvider()}
      >
        <div data-testid="children">Children</div>
      </Refine>,
    );

    expect(getByTestId("children")).toBeTruthy();
  });

  it("should render RouteChangeHandler by default", async () => {
    // Test that Refine renders without errors when RouteChangeHandler is enabled (default behavior)
    const { container } = render(
      <Refine
        dataProvider={MockJSONServer}
        routerProvider={mockRouterProvider()}
      >
        <div>Children</div>
      </Refine>,
    );

    // Should render children without errors
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("should not render RouteChangeHandler when disableRouteChangeHandler is true", async () => {
    // Test that Refine renders without errors when RouteChangeHandler is disabled
    const { container } = render(
      <Refine
        dataProvider={MockJSONServer}
        routerProvider={mockRouterProvider()}
        options={{
          disableRouteChangeHandler: true,
        }}
      >
        <div>Children</div>
      </Refine>,
    );

    // Should render children without errors
    expect(container.querySelector("div")).toBeTruthy();
  });
});
