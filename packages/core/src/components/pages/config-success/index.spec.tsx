import React from "react";

import { render } from "@test";

import { ConfigSuccessPage } from "./index";

describe("ConfigSuccessPage", () => {
  it("should render page successfuly", async () => {
    const { getByText } = render(<ConfigSuccessPage />);

    getByText("Welcome Aboard!");
    getByText("Your configuration is completed.");
  });

  const cases = [
    ["Documentation", "https://refine.dev/docs"],
    ["Tutorial", "https://refine.dev/tutorial"],
    ["Templates", "https://refine.dev/templates"],
    ["Community", "https://discord.gg/refine"],
  ];

  it.each(cases)("should render correct %s href", async (text, expected) => {
    const { getByText } = render(<ConfigSuccessPage />);

    expect(getByText(text).closest("a")).toHaveAttribute("href", expected);
  });
});
