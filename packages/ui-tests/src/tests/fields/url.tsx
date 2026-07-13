import React from "react";
import type { RefineFieldUrlProps } from "@refinedev/ui-types";

import { render } from "@test";

export const fieldUrlTests = (
  UrlField: React.ComponentType<
    RefineFieldUrlProps<string | undefined, any, any>
  >,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Url Field", () => {
    const url = "https://www.google.com/";

    it("renders urlField with given value", () => {
      const { getByText } = render(<UrlField value={url} />);

      const link = getByText(url) as HTMLAnchorElement;
      expect(link.href).toBe(url);
      expect(link.tagName).toBe("A");
    });

    it("renders deep fields", () => {
      const record = { id: 1, source: { path: url } };

      const { getByText } = render(<UrlField value={record.source.path} />);

      const link = getByText(url) as HTMLAnchorElement;
      expect(link.href).toBe(url);
    });

    it("renders children element", () => {
      const { getByText } = render(
        <UrlField value={url}>Make this link</UrlField>,
      );

      const link = getByText("Make this link") as HTMLAnchorElement;
      expect(link.href).toBe(url);
    });
  });
};
