import { cleanFilePath } from ".";

describe("cleanFilePath", () => {
  it("should remove the hostname from the path", () => {
    expect(
      cleanFilePath("http://localhost:3000/src/pages/posts/list.tsx"),
    ).toEqual("src/pages/posts/list.tsx");
  });

  it("should remove the cache busting query string", () => {
    expect(
      cleanFilePath(
        "http://localhost:3000/src/pages/posts/list.tsx?ts=1234567890",
      ),
    ).toEqual("src/pages/posts/list.tsx");
  });

  it("should remove webpack-internal:///", () => {
    expect(
      cleanFilePath("webpack-internal:///src/pages/posts/list.tsx"),
    ).toEqual("src/pages/posts/list.tsx");
  });

  it("should return the original path if it doesn't match any custom path", () => {
    expect(cleanFilePath("src/pages/posts/list.tsx")).toEqual(
      "src/pages/posts/list.tsx",
    );
  });

  it("should return undefined if the path is undefined", () => {
    expect(cleanFilePath(undefined)).toEqual(undefined);
  });
});
