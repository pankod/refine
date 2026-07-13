import { toSingular } from ".";

describe("toSingular", () => {
  it("should return empty string if no string is passed", () => {
    expect(toSingular("")).toBe("");
  });

  it("should return user", () => {
    expect(toSingular("users")).toBe("user");
  });

  it("should return category", () => {
    expect(toSingular("categories")).toBe("category");
  });
});
