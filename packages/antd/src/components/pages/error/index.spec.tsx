import React from "react";
import { pageErrorTests } from "@refinedev/ui-tests";

import { ErrorComponent } from ".";
import { render, TestWrapper } from "@test";

describe("ErrorComponent", () => {
  pageErrorTests.bind(this)(ErrorComponent);

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
});
