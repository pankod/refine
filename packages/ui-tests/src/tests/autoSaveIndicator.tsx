import React from "react";
import type { AutoSaveIndicatorProps } from "@refinedev/core";
import { render } from "@test";

export const autoSaveIndicatorTests = (
  AutoSaveIndicator: React.ComponentType<AutoSaveIndicatorProps>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / AutoSaveIndicator", () => {
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

    it("should render loading", async () => {
      const { findByText, getByText } = render(
        <AutoSaveIndicator status="pending" />,
      );

      await findByText("saving...");
      getByText("saving...");
    });
  });
};
