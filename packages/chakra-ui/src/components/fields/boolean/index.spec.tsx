import React from "react";
import { fieldBooleanTests } from "@refinedev/ui-tests";

import { BooleanField } from "./";
import { fireEvent, render } from "@test";

describe("BooleanField", () => {
  fieldBooleanTests.bind(this)(BooleanField);

  describe("BooleanField with default props values", () => {
    const initialValues = [true, false, "true", "false", "", undefined];

    const iconClass = [
      "tabler-icon-check",
      "tabler-icon-minus",
      "tabler-icon-check",
      "tabler-icon-check",
      "tabler-icon-minus",
      "tabler-icon-minus",
    ];

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

        expect(
          baseDom
            .getByTestId("default-field")
            .children[0].children[0].classList.contains(iconClass[index]),
        ).toBe(true);
      });
    });
  });
});
