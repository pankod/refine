import { createResourceKey } from "../create-resource-key";

describe("createResourceKey", () => {
  it("should return only name when no parents exist", () => {
    expect(createResourceKey({ name: "posts" }, [{ name: "posts" }])).toBe(
      "/posts",
    );
  });

  it("should return the key with parent name", () => {
    expect(
      createResourceKey({ name: "posts", meta: { parent: "cms" } }, [
        { name: "posts" },
      ]),
    ).toBe("/cms/posts");
  });

  it("should return the key with multiple parents", () => {
    expect(
      createResourceKey({ name: "posts", meta: { parent: "orgs" } }, [
        { name: "orgs", meta: { parent: "cms" } },
        { name: "cms" },
      ]),
    ).toBe("/cms/orgs/posts");
  });

  it("should return the key with identifier", () => {
    expect(
      createResourceKey({ name: "posts", identifier: "foo" }, [
        { name: "posts", identifier: "foo" },
      ]),
    ).toBe("/foo");
  });
});
