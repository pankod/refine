import { isIDKey } from ".";

describe("isIDKey", () => {
  it("should return true for `id`", () => {
    expect(isIDKey("id")).toBe(true);
  });

  it("should return true for `ID`", () => {
    expect(isIDKey("ID")).toBe(true);
  });
});
