import { matchResourceFromRoute } from "../match-resource-from-route";

describe("matchResourceFromRoute", () => {
  it("should return found false if no resource is given", () => {
    const result = matchResourceFromRoute("/users", []);

    expect(result.found).toEqual(false);
  });

  it("should return found false if no route is given", () => {
    const result = matchResourceFromRoute("", [
      {
        name: "users",
        edit: "/users/edit/:id",
      },
    ]);

    expect(result.found).toEqual(false);
  });

  it("should return found true if route is found", () => {
    const result = matchResourceFromRoute("/users/edit/123", [
      {
        name: "users",
        edit: "/users/edit/:id",
      },
    ]);

    expect(result.found).toEqual(true);
  });

  it("should return the best one if multiple routes are found", () => {
    const result = matchResourceFromRoute("/users/orgs/edit/123", [
      {
        name: "users",
        edit: "/users/:type/edit/:id",
      },
      {
        name: "org-users",
        edit: "/users/orgs/edit/:id",
      },
    ]);

    expect(result.found).toEqual(true);
    expect(result.matchedRoute).toEqual("/users/orgs/edit/:id");
  });
});
