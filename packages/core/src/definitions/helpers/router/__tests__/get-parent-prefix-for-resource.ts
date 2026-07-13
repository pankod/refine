import { getParentPrefixForResource } from "../get-parent-prefix-for-resource";

describe("getParentPrefixForResource", () => {
  it("should return undefined if no parent is found", () => {
    const resources = [
      {
        name: "users",
      },
    ];

    expect(getParentPrefixForResource(resources[0], resources)).toBe(undefined);
  });

  it("should return the parent prefix", () => {
    const resources = [
      {
        name: "users",
      },
      {
        name: "posts",
        meta: {
          parent: "users",
        },
      },
    ];

    expect(getParentPrefixForResource(resources[1], resources)).toBe("/users");
  });

  it("should return the parent prefix for deeply nested resources", () => {
    const resources = [
      {
        name: "users",
      },
      {
        name: "posts",
        meta: {
          parent: "users",
        },
      },
      {
        name: "comments",
        meta: {
          parent: "posts",
        },
      },
    ];

    expect(getParentPrefixForResource(resources[2], resources)).toBe(
      "/users/posts",
    );
  });
});
