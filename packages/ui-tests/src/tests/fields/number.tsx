import React from "react";
import type { RefineFieldNumberProps } from "@refinedev/ui-types";

import { render } from "@test";

export const fieldNumberTests = (
  NumberField: React.ComponentType<RefineFieldNumberProps<any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Number Field", () => {
    it("renders numbers with given formatting", () => {
      const testPrice = 12345.6789;
      const options: Intl.NumberFormatOptions = {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
      };
      const locale = "de-DE";

      const { getByText } = render(
        <NumberField value={testPrice} locale={locale} options={options} />,
      );

      const formattedTestPrice = testPrice
        .toLocaleString(locale, options)
        .replace(String.fromCharCode(160), " ");

      // node 14 uses non-breaking space resulting in imcompatibility
      getByText(formattedTestPrice);
    });

    it("should render NaN when value is undefined", () => {
      const { getByText } = render(<NumberField value={undefined} />);

      getByText("NaN");
    });

    it("should render NaN when value is string", () => {
      const { getByText } = render(<NumberField value={"not a number"} />);

      getByText("NaN");
    });
  });
};
