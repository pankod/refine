import * as React from "react";

import { useTranslate } from "@hooks";
import { TestWrapper, render } from "@test";

describe("useTranslate", () => {
  const TestComponent = () => {
    const translate = useTranslate();
    return (
      <div>{translate("undefined key", { name: "test" }, "hello test")}</div>
    );
  };

  it("works correctly without using i18n provider", () => {
    const { getByText } = render(<TestComponent />);

    getByText("hello test");
  });

  it("works with i18nprovider", () => {
    const { getByText } = render(<TestComponent />, {
      wrapper: TestWrapper({
        resources: [{ name: "tests" }],
        i18nProvider: {
          translate: () => "merhaba",
          changeLocale: () => Promise.resolve(),
          getLocale: () => "tr",
        },
      }),
    });

    expect(getByText("merhaba")).toBeTruthy();
  });

  it("works with options and i18nprovider", () => {
    const { getByText } = render(<TestComponent />, {
      wrapper: TestWrapper({
        resources: [{ name: "tests" }],
        i18nProvider: {
          translate: (key, options) => `merhaba ${options.name}`,
          changeLocale: () => Promise.resolve(),
          getLocale: () => "tr",
        },
      }),
    });

    expect(getByText("merhaba test")).toBeTruthy();
  });
});
