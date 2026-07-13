import React from "react";
import { layoutTitleTests } from "@refinedev/ui-tests";
import { render, TestWrapper } from "@test";
import { ThemedTitle } from "./index";

describe("ThemedTitle", () => {
  layoutTitleTests.bind(this)(ThemedTitle);

  it("should not render nested anchor elements", () => {
    const { container } = render(<ThemedTitle collapsed={false} />, {
      wrapper: TestWrapper({}),
    });

    const anchors = container.querySelectorAll("a");

    expect(anchors).toHaveLength(1);
    expect(anchors[0]?.querySelector("a")).toBeNull();
  });
});
