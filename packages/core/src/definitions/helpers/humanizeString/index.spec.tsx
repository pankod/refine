import { humanizeString } from ".";

describe("humanizeString", () => {
  it("should return strings for humans!", () => {
    expect(humanizeString("fooBar")).toBe("Foo bar");
    expect(humanizeString("foo-bar")).toBe("Foo bar");
    expect(humanizeString("foo_bar")).toBe("Foo bar");
    expect(humanizeString("myFOOBar")).toBe("My foo bar");
  });
});
