import React, { type ReactNode } from "react";
import type { RefineFieldEmailProps } from "@refinedev/ui-types";

import { render } from "@test";

export const fieldEmailTests = (
  EmailField: React.ComponentType<RefineFieldEmailProps<ReactNode, any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Email Field", () => {
    it("renders email with mailto href", () => {
      const { getByText } = render(<EmailField value="test@test.com" />);

      expect(getByText("test@test.com")).toHaveProperty(
        "href",
        "mailto:test@test.com",
      );
    });
  });
};
