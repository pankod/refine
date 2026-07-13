import React, { type ReactNode } from "react";
import type { RefineFieldTextProps } from "@refinedev/ui-types";

import { render } from "@test";

export const fieldTextTests = (
  TextField: React.ComponentType<RefineFieldTextProps<ReactNode, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Text Field", () => {
    it("renders text correctly", () => {
      const { getByText } = render(<TextField value="test" />);

      getByText("test");
    });
  });
};
