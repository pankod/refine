import * as React from "react";

import { useGetLocale, useTranslate } from "@hooks";
import { render } from "@test";

import { I18nContextProvider } from "./";

describe("I18nContext", () => {
  const TestComponent = () => {
    const locale = useGetLocale();
    const translate = useTranslate();

    return (
      <div>
        <span>{`Current language: ${locale()}`}</span>
        <span>
          {translate("undefined key", { name: "test" }, "hello test")}
        </span>
      </div>
    );
  };

  const customRender = (ui: any, providerProps?: any) => {
    return render(
      <I18nContextProvider {...providerProps}>{ui}</I18nContextProvider>,
      providerProps,
    );
  };

  it("should get value from I18nContext ", () => {
    const providerProps = {
      i18nProvider: {
        translate: () => "hello",
        changeLocale: () => Promise.resolve(),
        getLocale: () => "tr",
      },
    };

    const { getByText } = customRender(<TestComponent />, providerProps);

    expect(getByText("Current language: tr"));
  });

  it("should get options value from I18nContext ", () => {
    const providerProps = {
      i18nProvider: {
        translate: (key: string, options: any) => `hello ${options.name}`,
        changeLocale: () => Promise.resolve(),
        getLocale: () => "tr",
      },
    };

    const { getByText } = customRender(<TestComponent />, providerProps);

    expect(getByText("hello test")).toBeTruthy();
  });
});
