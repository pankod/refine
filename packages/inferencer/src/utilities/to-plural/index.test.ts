import { toPlural } from ".";

describe("toPlural", () => {
  it("should return empty string if no string is passed", () => {
    expect(toPlural("")).toBe("");
  });

  it("should return users", () => {
    expect(toPlural("user")).toBe("users");
  });

  it("should return categories", () => {
    expect(toPlural("category")).toBe("categories");
  });
});
