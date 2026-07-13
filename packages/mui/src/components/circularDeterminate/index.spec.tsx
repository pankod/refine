import React from "react";
import { TestWrapper, render, waitFor } from "@test";

import { CircularDeterminate } from ".";

describe("CircularDeterminate", () => {
  it("should render CircularDeterminate", async () => {
    const { getByText } = render(
      <CircularDeterminate undoableTimeout={5} message="test" />,
      {
        wrapper: TestWrapper({}),
      },
    );
    await waitFor(() => {
      expect(getByText?.("5")).toBeTruthy();
    });

    getByText?.("test");

    await waitFor(() => {
      expect(getByText?.("4")).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByText?.("3")).toBeTruthy();
    });
  });

  it("should render CircularDeterminate with undoableTimeout is 0", async () => {
    const { getByText } = render(
      <CircularDeterminate undoableTimeout={0} message="test" />,

      {
        wrapper: TestWrapper({}),
      },
    );

    getByText("test");

    expect(getByText("0")).toBeTruthy();

    expect(getByText("0")).toBeTruthy();

    expect(getByText("0")).toBeTruthy();
  });
});
