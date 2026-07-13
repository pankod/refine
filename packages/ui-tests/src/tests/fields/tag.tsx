import React, { type ReactNode } from "react";
import type { RefineFieldTagProps } from "@refinedev/ui-types";

import { render } from "@test";

export const fieldTagTests = (
  TagField: React.ComponentType<RefineFieldTagProps<ReactNode, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Tag Field", () => {
    it("renders boolean values correctly", () => {
      const { getByText } = render(<TagField value={true} />);

      getByText("true");
    });

    it("renders boolean values correctly", () => {
      const { queryByText } = render(<TagField value={undefined} />);

      expect(queryByText("true")).toBeNull();
    });
  });
};
