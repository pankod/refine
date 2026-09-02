import { humanizeString } from ".";

describe("humanizeString", () => {
  it("should convert camelCase to humanized string", () => {
    expect(humanizeString("camelCase")).toBe("Camel case");
  });

  it("should convert PascalCase to humanized string", () => {
    expect(humanizeString("PascalCase")).toBe("Pascal case");
  });

  it("should convert snake_case to humanized string", () => {
    expect(humanizeString("snake_case")).toBe("Snake case");
  });

  it("should convert kebab-case to humanized string", () => {
    expect(humanizeString("kebab-case")).toBe("Kebab case");
  });

  it("should handle strings with consecutive uppercase letters", () => {
    expect(humanizeString("HTMLParser")).toBe("Html parser");
  });

  it("should handle single word strings", () => {
    expect(humanizeString("hello")).toBe("Hello");
  });

  it("should handle empty strings", () => {
    expect(humanizeString("")).toBe("");
  });

  it("should handle strings with multiple separators", () => {
    expect(humanizeString("my__double__underscored")).toBe(
      "My double underscored",
    );
  });

  it("should handle strings with mixed separators", () => {
    expect(humanizeString("my-mixed_case")).toBe("My mixed case");
  });

  it("should trim leading and trailing whitespace", () => {
    expect(humanizeString("  spaced  ")).toBe("Spaced");
  });

  it("should capitalize only the first character", () => {
    const result = humanizeString("hello_world");
    expect(result[0]).toBe("H");
    expect(result.slice(1)).toBe("ello world");
  });

  it("should handle already humanized strings", () => {
    expect(humanizeString("Already humanized")).toBe("Already humanized");
  });
});
