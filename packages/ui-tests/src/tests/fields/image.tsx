import React from "react";
import type { RefineFieldImageProps } from "@refinedev/ui-types";

import { render } from "@test";

export const fieldImageTests = (
  ImageField: React.ComponentType<
    RefineFieldImageProps<
      string | undefined,
      any,
      {
        imageTitle?: string;
      }
    >
  >,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Image Field", () => {
    it("renders image with correct title", () => {
      const imageUrl = "http://placeimg.com/640/480/animals";
      const { getAllByRole } = render(
        <ImageField value={imageUrl} data-testid="test-image" />,
      );

      expect(getAllByRole("img")[0]).toHaveProperty("src", imageUrl);
    });
  });
};
