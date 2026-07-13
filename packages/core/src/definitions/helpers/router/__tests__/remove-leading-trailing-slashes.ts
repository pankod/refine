import { removeLeadingTrailingSlashes } from "../remove-leading-trailing-slashes";

describe("removeLeadingTrailingSlashes", () => {
  it("should remove leading and trailing slashes", () => {
    expect(removeLeadingTrailingSlashes("/a/b/c")).toEqual("a/b/c");
  });

  it("should remove leading and trailing slashes", () => {
    expect(removeLeadingTrailingSlashes("a/b/c")).toEqual("a/b/c");
  });

  it("should remove leading and trailing slashes", () => {
    expect(removeLeadingTrailingSlashes("/a/b/c/")).toEqual("a/b/c");
  });
});
