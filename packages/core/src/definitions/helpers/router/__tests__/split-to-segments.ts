import { splitToSegments } from "../split-to-segments";

describe("splitToSegments", () => {
  it("should split a path to segments", () => {
    expect(splitToSegments("/a/b/c")).toEqual(["a", "b", "c"]);
  });

  it("should split a path to segments", () => {
    expect(splitToSegments("a/b/c")).toEqual(["a", "b", "c"]);
  });

  it("should split a path to segments", () => {
    expect(splitToSegments("/a/b/c/")).toEqual(["a", "b", "c"]);
  });
});
