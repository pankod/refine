import { pickMatchedRoute } from "../pick-matched-route";

describe("pickMatchedRoute", () => {
  it("should return the route with no params", () => {
    const routes = [
      {
        route: "/users/edit/123",
        action: "edit" as const,
        resource: { name: "users" },
      },
      {
        route: "users/:action/:id/",
        action: "edit" as const,
        resource: { name: "users" },
      },
      {
        route: "/users/:action/:id",
        action: "edit" as const,
        resource: { name: "users" },
      },
      {
        route: "/users/edit/:id",
        action: "edit" as const,
        resource: { name: "users" },
      },
    ];

    const picked = pickMatchedRoute(routes);

    expect(picked?.route).toEqual("/users/edit/123");
  });

  it("should return the route with least params", () => {
    const routes = [
      {
        route: "/users/:action/:id",
        action: "edit" as const,
        resource: { name: "users" },
      },
      {
        route: "/users/edit/:id",
        action: "edit" as const,
        resource: { name: "users" },
      },
    ];

    const picked = pickMatchedRoute(routes);

    expect(picked?.route).toEqual("/users/edit/:id");
  });

  it("should return the latest parametrized route", () => {
    const routes = [
      {
        route: "/users/page/:action/:id",
        action: "edit" as const,
        resource: { name: "users" },
      },
      {
        route: "/users/page/list/:id/",
        action: "edit" as const,
        resource: { name: "users" },
      },
    ];

    const picked = pickMatchedRoute(routes);

    expect(picked?.route).toEqual("/users/page/list/:id/");
  });

  it("should return the latest parametrized route with single", () => {
    const routes = [
      {
        route: "/users/:org/list/123",
        action: "edit" as const,
        resource: { name: "users" },
      },
      {
        route: "/users/refine/list/:id",
        action: "edit" as const,
        resource: { name: "users" },
      },
    ];

    const picked = pickMatchedRoute(routes);

    expect(picked?.route).toEqual("/users/refine/list/:id");
  });
});
