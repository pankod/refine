import { shouldDotAccess, accessor, dotAccessor } from ".";

describe("accessor", () => {
  it("should return a string to access", () => {
    expect(accessor("myVar", "myKey", "myAccessor")).toBe(
      "myVar?.myKey?.myAccessor",
    );
  });
  it("should return a string to access with first accessor", () => {
    expect(
      accessor("myVar", "myKey", ["myAccessor1", "myAccessor2"], false),
    ).toBe("myVar?.myKey?.myAccessor1");
  });
  it("should combine accessors with joiner", () => {
    expect(accessor("myVar", "myKey", ["myAccessor1", "myAccessor2"])).toBe(
      `myVar?.myKey?.myAccessor1 + \" \" + myVar?.myKey?.myAccessor2`,
    );
  });
});

describe("dotAccessor", () => {
  it("should return a string to access", () => {
    expect(dotAccessor("myVar", "myKey", "myAccessor")).toBe(
      "myVar.myKey.myAccessor",
    );
  });
  it("should return a string to access with first accessor", () => {
    expect(dotAccessor("myVar", "myKey", ["myAccessor1", "myAccessor2"])).toBe(
      "myVar.myKey.myAccessor1",
    );
  });
});

describe("shouldDotAccess", () => {
  it("should return true for dot access", () => {
    expect(shouldDotAccess("myVar")).toBe(true);
  });
  it("should return false for bracket access", () => {
    expect(shouldDotAccess("my-var")).toBe(false);
  });
});
