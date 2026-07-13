import { isParameter } from "../is-parameter";

describe("isParameter", () => {
  it("should return true for a parameter", () => {
    expect(isParameter(":id")).toBe(true);
  });

  it("should return false for a non-parameter", () => {
    expect(isParameter("id")).toBe(false);
  });
});
