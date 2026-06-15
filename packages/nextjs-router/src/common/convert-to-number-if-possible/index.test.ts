import { convertToNumberIfPossible } from ".";

describe("convertToNumberIfPossible", () => {
  it("returns the value as is when it is undefined", () => {
    expect(convertToNumberIfPossible(undefined)).toBeUndefined();
  });

  it("converts numeric strings to numbers", () => {
    expect(convertToNumberIfPossible("42")).toBe(42);
    expect(convertToNumberIfPossible("0")).toBe(0);
  });

  it("keeps strings that do not round-trip cleanly as strings", () => {
    expect(convertToNumberIfPossible("007")).toBe("007");
    expect(convertToNumberIfPossible("1e3")).toBe("1e3");
    expect(convertToNumberIfPossible(" 5")).toBe(" 5");
    expect(convertToNumberIfPossible("abc")).toBe("abc");
  });

  it("does not convert non-finite values to numbers", () => {
    expect(convertToNumberIfPossible("NaN")).toBe("NaN");
    expect(convertToNumberIfPossible("Infinity")).toBe("Infinity");
    expect(convertToNumberIfPossible("-Infinity")).toBe("-Infinity");
  });
});
