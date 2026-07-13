import { renderHook } from "@testing-library/react";

import { useGetLocale } from "@hooks";
import { TestWrapper } from "@test";

describe("useGetLocale", () => {
  it("should throw error if i18n provider is not defined", () => {
    const result = () => renderHook(() => useGetLocale());

    expect(result).toThrow(
      "useGetLocale cannot be called without i18n provider being defined.",
    );
  });

  it("should get locale value from i18nProvider getLocale method", () => {
    const { result } = renderHook(() => useGetLocale(), {
      wrapper: TestWrapper({
        resources: [{ name: "tests" }],
        i18nProvider: {
          translate: () => "merhaba",
          changeLocale: () => Promise.resolve(),
          getLocale: () => "tr",
        },
      }),
    });

    expect(result.current()).toBe("tr");
  });
});
