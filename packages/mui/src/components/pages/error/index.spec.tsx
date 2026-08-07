import React from "react";
import { vi } from "vitest";
import { pageErrorTests } from "@refinedev/ui-tests";
import { Route, Routes } from "react-router";

import { ErrorComponent } from ".";
import { render, fireEvent, TestWrapper, act, MockRouterProvider } from "@test";

describe("ErrorComponent", () => {
  pageErrorTests.bind(this)(ErrorComponent);
  it("renders subtitle successfully", async () => {
    const { getByText } = render(<ErrorComponent />, {
      wrapper: TestWrapper({}),
    });

    getByText("Sorry, the page you visited does not exist.");
  });

  it("renders button successfully", async () => {
    const { container, getByText } = render(<ErrorComponent />, {
      wrapper: TestWrapper({}),
    });

    expect(container.querySelector("button")).toBeTruthy();
    getByText("Back Home");
  });

  it("renders called go function successfully if click the button", async () => {
    const mockGo = vi.fn();

    const { getByText } = render(<ErrorComponent />, {
      wrapper: TestWrapper({
        routerProvider: {
          ...MockRouterProvider(),
          go: () => mockGo,
        },
      }),
    });

    await act(async () => {
      fireEvent.click(getByText("Back Home"));
    });

    expect(mockGo).toHaveBeenCalledWith({ to: "/" });
  });

  it("renders error messages if resources action's not found", async () => {
    const { findByTestId } = render(
      <Routes>
        <Route path="/:resource/:action" element={<ErrorComponent />} />
      </Routes>,
      {
        wrapper: TestWrapper({
          routerInitialEntries: ["/posts/create"],
          routerProvider: {
            ...MockRouterProvider(),
            parse: () => () => ({
              action: "create",
              resource: {
                name: "posts",
                list: "/posts",
                create: "/posts/create",
              },
              pathname: "/posts/create",
            }),
          },
          resources: [
            {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
            },
          ],
        }),
      },
    );

    expect(await findByTestId("error-component-tooltip")).toBeInTheDocument();
  });

  it("renders error messages if resource action's is different from 'create, edit, show'", async () => {
    const { getByText } = render(
      <Routes>
        <Route path="/:resource/:action" element={<ErrorComponent />} />
      </Routes>,
      {
        wrapper: TestWrapper({
          routerInitialEntries: ["/posts/invalidActionType"],
        }),
      },
    );

    getByText("Sorry, the page you visited does not exist.");
  });
});
