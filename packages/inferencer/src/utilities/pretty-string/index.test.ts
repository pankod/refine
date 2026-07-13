import { prettyString } from ".";

describe("prettyString", () => {
  it("should return empty string if no string is passed", () => {
    expect(prettyString("")).toBe("");
  });

  it("should return Category if `category_id` is passed", () => {
    expect(prettyString("category_id")).toBe("Category");
  });

  it("should return Some Thing if `some_thing` is passed", () => {
    expect(prettyString("some_thing")).toBe("Some Thing");
  });

  it("should return Some Thing if `someThing` is passed", () => {
    expect(prettyString("someThing")).toBe("Some Thing");
  });
});
