import React from "react";
import { pageErrorTests } from "@refinedev/ui-tests";
import type ReactRouterDom from "react-router";
import { Route, Routes } from "react-router";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { ErrorComponent } from ".";
import { render, fireEvent, TestWrapper, MockRouterProvider } from "@test";

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

  it("renders called function successfully if click the button", async () => {
    const mockGo = vi.fn();

    const { getByText } = render(<ErrorComponent />, {
      wrapper: TestWrapper({
        routerProvider: {
          ...MockRouterProvider(),
          go: () => mockGo,
        },
      }),
    });

    fireEvent.click(getByText("Back Home"));

    expect(mockGo).toHaveBeenCalledWith({ to: "/" });
  });

  it("renders error messages if resources action's not found", async () => {
    const { getByTestId, findByText } = render(
      <Routes>
        <Route path="/:resource/:action" element={<ErrorComponent />} />
      </Routes>,
      {
        wrapper: TestWrapper({
          resources: [{ name: "posts" }],
          routerInitialEntries: ["/posts/create"],
          routerProvider: {
            ...MockRouterProvider(),
            parse: () => () => ({
              action: "create",
              resource: { name: "posts" },
              pathname: "/posts/create",
            }),
          },
        }),
      },
    );

    userEvent.hover(getByTestId("error-component-tooltip"));

    expect(
      await findByText(
        `You may have forgotten to add the "create" component to "posts" resource.`,
      ),
    ).toBeInTheDocument();
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
