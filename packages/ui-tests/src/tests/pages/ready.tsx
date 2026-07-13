import React from "react";
import type { RefineReadyPageProps } from "@refinedev/ui-types";

import { render, TestWrapper } from "@test";

export const pageReadyTests = (
  ReadyPage: React.ComponentType<RefineReadyPageProps>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Ready Page", () => {
    it("should render successfully", async () => {
      const { container } = render(<ReadyPage />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();
    });
  });
};
