import React from "react";
import type { RefineFieldMarkdownProps } from "@refinedev/ui-types";

import { render } from "@test";

export const fieldMarkdownTests = (
  MarkdownField: React.ComponentType<
    RefineFieldMarkdownProps<string | undefined>
  >,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Markdown Field", () => {
    it("renders markDown text with correct value", () => {
      const { getByText, container } = render(
        <div data-testid="custom-field">
          <MarkdownField value={"**MarkdownField Test**"} />
        </div>,
      );

      expect(container.querySelector("strong")).toBeTruthy();
      getByText("MarkdownField Test");
    });
    it("render markdown with undefined value should show empty string", () => {
      const { container } = render(
        <div data-testid="custom-field">
          <MarkdownField value={undefined} />
        </div>,
      );

      expect(container).toBeTruthy();
    });
  });
};
