import { userFriendlySecond } from ".";

describe("userFriendlySecond", () => {
  it("should convert milliseconds to seconds", () => {
    expect(userFriendlySecond(1000)).toBe(1);
  });

  it("should convert 0 milliseconds to 0 seconds", () => {
    expect(userFriendlySecond(0)).toBe(0);
  });

  it("should handle fractional seconds", () => {
    expect(userFriendlySecond(1500)).toBe(1.5);
  });

  it("should handle large values", () => {
    expect(userFriendlySecond(60000)).toBe(60);
  });

  it("should handle small values", () => {
    expect(userFriendlySecond(100)).toBe(0.1);
  });

  it("should handle negative values", () => {
    expect(userFriendlySecond(-1000)).toBe(-1);
  });
});
