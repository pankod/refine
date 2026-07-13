import React from "react";
import { vi } from "vitest";

import { fireEvent, render, waitFor } from "@testing-library/react";

import { TestWrapper, mockRouterProvider } from "@test";

import { ErrorComponent } from ".";

describe("ErrorComponent", () => {
  it("renders subtitle successfully", () => {
    const { getByText } = render(<ErrorComponent />, {
      wrapper: TestWrapper({}),
    });

    getByText("Sorry, the page you visited does not exist.");
  });

  it("renders button successfully", () => {
    const { container, getByText } = render(<ErrorComponent />, {
      wrapper: TestWrapper({}),
    });

    expect(container.querySelector("button")).toBeTruthy();
    getByText("Back Home");
  });

  it("render error message according to the resource and action", () => {
    const { getByText } = render(<ErrorComponent />, {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          action: "create",
          resource: { name: "posts" },
          pathname: "/posts/create",
        }),
      }),
    });

    getByText(
      `You may have forgotten to add the "create" component to "posts" resource.`,
    );
  });

  it("back home button should work with router provider", async () => {
    const goMock = vi.fn();

    const { getByText } = render(<ErrorComponent />, {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          fns: {
            go: () => goMock,
          },
        }),
      }),
    });

    fireEvent.click(getByText("Back Home"));

    await waitFor(() => {
      expect(goMock).toHaveBeenCalledTimes(1);
    });

    expect(goMock).toHaveBeenCalledWith({ to: "/" });
  });
});
