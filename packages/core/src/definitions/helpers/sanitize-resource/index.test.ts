import { sanitizeResource } from ".";

describe("sanitizeResource", () => {
  it("should return undefined when resource is undefined", () => {
    expect(sanitizeResource(undefined)).toBeUndefined();
  });

  it("should strip component properties from resource", () => {
    const resource = {
      name: "posts",
      list: () => null,
      edit: () => null,
      create: () => null,
      show: () => null,
      clone: () => null,
    };
    const result = sanitizeResource(resource);
    expect(result).toEqual({ name: "posts" });
    expect(result).not.toHaveProperty("list");
    expect(result).not.toHaveProperty("edit");
    expect(result).not.toHaveProperty("create");
    expect(result).not.toHaveProperty("show");
    expect(result).not.toHaveProperty("clone");
  });

  it("should strip icon from top-level", () => {
    const resource = {
      name: "posts",
      icon: "some-icon",
    };
    const result = sanitizeResource(resource as any);
    expect(result).not.toHaveProperty("icon");
  });

  it("should strip icon from meta", () => {
    const resource = {
      name: "posts",
      meta: {
        icon: "some-icon",
        label: "Posts",
      },
    };
    const result = sanitizeResource(resource as any);
    expect(result?.meta).not.toHaveProperty("icon");
    expect(result?.meta).toHaveProperty("label", "Posts");
  });

  it("should strip children property", () => {
    const resource = {
      name: "posts",
      children: [{ name: "child" }],
    };
    const result = sanitizeResource(resource as any);
    expect(result).not.toHaveProperty("children");
  });

  it("should preserve non-component properties", () => {
    const resource = {
      name: "posts",
      identifier: "my-posts",
      route: "/posts",
      canDelete: true,
    };
    const result = sanitizeResource(resource);
    expect(result).toEqual({
      name: "posts",
      identifier: "my-posts",
      route: "/posts",
      canDelete: true,
    });
  });

  it("should handle resource without meta", () => {
    const resource = {
      name: "posts",
    };
    const result = sanitizeResource(resource);
    expect(result).toEqual({ name: "posts" });
    expect(result).not.toHaveProperty("meta");
  });

  it("should handle resource with empty meta", () => {
    const resource = {
      name: "posts",
      meta: {},
    };
    const result = sanitizeResource(resource);
    expect(result?.meta).toEqual({});
  });
});
