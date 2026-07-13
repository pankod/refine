import { getDefaultActionPath } from "../get-default-action-path";

describe("getDefaultActionPath", () => {
  it("should return the default path for a given action and resource", () => {
    expect(getDefaultActionPath("users", "list")).toBe("/users");
    expect(getDefaultActionPath("users", "create")).toBe("/users/create");
    expect(getDefaultActionPath("users", "edit")).toBe("/users/edit/:id");
    expect(getDefaultActionPath("users", "show")).toBe("/users/show/:id");
    expect(getDefaultActionPath("users", "clone")).toBe("/users/clone/:id");
  });

  it("should return the default path for a given action and resource with parent prefix", () => {
    expect(getDefaultActionPath("users", "list", "/orgs")).toBe("/orgs/users");
    expect(getDefaultActionPath("users", "create", "/orgs")).toBe(
      "/orgs/users/create",
    );
    expect(getDefaultActionPath("users", "edit", "/orgs")).toBe(
      "/orgs/users/edit/:id",
    );
    expect(getDefaultActionPath("users", "show", "/orgs")).toBe(
      "/orgs/users/show/:id",
    );
    expect(getDefaultActionPath("users", "clone", "/orgs")).toBe(
      "/orgs/users/clone/:id",
    );
  });

  it("should return the default path for a given action and resource with multiple parent prefixes", () => {
    expect(getDefaultActionPath("users", "list", "/orgs/posts")).toBe(
      "/orgs/posts/users",
    );
    expect(getDefaultActionPath("users", "create", "/orgs/posts")).toBe(
      "/orgs/posts/users/create",
    );
    expect(getDefaultActionPath("users", "edit", "/orgs/posts")).toBe(
      "/orgs/posts/users/edit/:id",
    );
    expect(getDefaultActionPath("users", "show", "/orgs/posts")).toBe(
      "/orgs/posts/users/show/:id",
    );
    expect(getDefaultActionPath("users", "clone", "/orgs/posts")).toBe(
      "/orgs/posts/users/clone/:id",
    );
  });
});
