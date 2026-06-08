import * as React from "react";
import { vi } from "vitest";

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

  it("passes ns with options to i18nProvider", () => {
    const translateMock = vi.fn(() => "hello");

    const TestNsComponent = () => {
      const translate = useTranslate({ ns: "common" });

      return (
        <div>
          {translate(
            "products.title.key",
            { option1: "option1" },
            "fallback-title",
          )}
        </div>
      );
    };

    const { getByText } = render(<TestNsComponent />, {
      wrapper: TestWrapper({
        resources: [{ name: "products" }],
        i18nProvider: {
          translate: translateMock,
          changeLocale: () => Promise.resolve(),
          getLocale: () => "en",
        },
      }),
    });

    expect(getByText("hello")).toBeTruthy();
    expect(translateMock).toHaveBeenCalledWith(
      "products.title.key",
      { ns: "common", option1: "option1" },
      "fallback-title",
    );
  });
});
