import React from "react";
import { fieldBooleanTests } from "@refinedev/ui-tests";

import { render, fireEvent } from "@test";

import { BooleanField } from "./";

describe("BooleanField", () => {
  fieldBooleanTests.bind(this)(BooleanField);

  describe("BooleanField with default props values", () => {
    const initialValues = [true, false, "true", "false", "", undefined];

    const results = ["true", "false", "true", "true", "false", "false"];

    initialValues.forEach((element, index) => {
      const testName =
        index === 2 || index === 3 || index === 4
          ? `"${initialValues[index]}"`
          : initialValues[index];

      it(`renders boolean field value(${testName}) with correct tooltip text and icon`, async () => {
        const baseDom = render(
          <div data-testid="default-field">
            <BooleanField value={element} />
          </div>,
        );

        fireEvent.mouseOver(baseDom.getByTestId("default-field").children[0]);

        expect(await baseDom.findByText(results[index])).toBeInTheDocument();
      });
    });
  });
});
