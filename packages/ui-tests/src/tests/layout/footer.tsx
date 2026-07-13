import React from "react";
import type { RefineLayoutFooterProps } from "@refinedev/ui-types";

import { act, render, TestWrapper } from "@test";

export const layoutFooterTests = (
  FooterElement: React.ComponentType<RefineLayoutFooterProps>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Footer Element", () => {
    it("should render successfully", async () => {
      const { container } = render(<FooterElement />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();
    });
  });
};
