import { renderHook } from "@testing-library/react";

import { useUserFriendlyName } from ".";
import { defaultRefineOptions } from "@contexts/refine";
import { TestWrapper } from "@test/index";

describe("useUserFriendlyName helper hook", () => {
  describe("with default options", () => {
    it("should convert kebab-case to humanizeString with plural", async () => {
      const singularKebapCase = "red-tomato";

      const { result } = renderHook(() => useUserFriendlyName());

      expect(result.current(singularKebapCase, "plural")).toBe("Red tomatoes");
    });

    it("should convert kebab-case to humanizeString with singular", async () => {
      const singularKebapCase = "red-tomato";

      const { result } = renderHook(() => useUserFriendlyName());

      expect(result.current(singularKebapCase, "singular")).toBe("Red tomato");
    });
  });

  describe("with custom options", () => {
    it.each(["singular", "plural"] as const)(
      "should not convert any texts",
      async (type) => {
        const singularKebapCase = "red-tomato";

        const { result } = renderHook(() => useUserFriendlyName(), {
          wrapper: TestWrapper({
            refineProvider: {
              options: {
                ...defaultRefineOptions,
                textTransformers: {
                  humanize: (text: string) => text,
                  plural: (text: string) => text,
                  singular: (text: string) => text,
                },
              },
            } as any,
          }),
        });

        expect(result.current(singularKebapCase, type)).toBe("red-tomato");
      },
    );
  });
});
