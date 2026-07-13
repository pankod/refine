import { vi } from "vitest";
import { safeTranslate } from ".";

describe("safeTranslate", () => {
  it("should return the translated string", () => {
    const translate = vi.fn().mockReturnValue("translated");
    const result = safeTranslate(translate, "key");

    expect(result).toEqual("translated");
  });

  it("should return the default message if the key is not translated (undefined)", () => {
    const translate = vi.fn().mockReturnValue(undefined);
    const result = safeTranslate(translate, "key", "default");

    expect(result).toEqual("default");
  });

  it("should return the default message if the translated string is the same as the key", () => {
    const translate = vi.fn().mockReturnValue("key");
    const result = safeTranslate(translate, "key", "default");

    expect(result).toEqual("default");
  });

  it("should return the key if the key is not translated and there is no default message", () => {
    const translate = vi.fn().mockReturnValue(undefined);
    const result = safeTranslate(translate, "key");

    expect(result).toEqual("key");
  });
});
