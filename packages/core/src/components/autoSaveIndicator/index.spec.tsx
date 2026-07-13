import React from "react";
import { render } from "@test";

import { AutoSaveIndicator } from "./";

describe("AutoSaveIndicator", () => {
  it("should render success", async () => {
    const { findByText, getByText } = render(
      <AutoSaveIndicator status="success" />,
    );
    await findByText("saved");
    getByText("saved");
  });

  it("should render error", async () => {
    const { findByText, getByText } = render(
      <AutoSaveIndicator status="error" />,
    );

    await findByText("auto save failure");
    getByText("auto save failure");
  });

  it("should render idle", async () => {
    const { findByText, getByText } = render(
      <AutoSaveIndicator status="idle" />,
    );

    await findByText("waiting for changes");
    getByText("waiting for changes");
  });

  it("should render pending", async () => {
    const { findByText, getByText } = render(
      <AutoSaveIndicator status="pending" />,
    );

    await findByText("saving...");
    getByText("saving...");
  });
});
