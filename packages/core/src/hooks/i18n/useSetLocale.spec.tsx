import * as React from "react";
import { vi } from "vitest";

import { useSetLocale } from "@hooks";
import { TestWrapper, fireEvent, render } from "@test";

describe("useSetLocale", () => {
  const TestComponent = () => {
    const setLocale = useSetLocale();
    return (
      <>
        <button onClick={() => setLocale("tr")}>Turkish</button>
      </>
    );
  };

  it("should trigger i18nProvider changeLocale method", async () => {
    const setLocale = vi.fn();

    const { getByText } = render(<TestComponent />, {
      wrapper: TestWrapper({
        resources: [{ name: "tests" }],
        i18nProvider: {
          translate: () => "merhaba",
          changeLocale: () => setLocale(),
          getLocale: () => "tr",
        },
      }),
    });
    fireEvent.click(getByText("Turkish"));
    expect(setLocale).toHaveBeenCalledTimes(1);
  });
});
