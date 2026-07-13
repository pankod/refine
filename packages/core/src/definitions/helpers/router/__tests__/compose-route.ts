import { composeRoute } from "../compose-route";

describe("composeRoute", () => {
  it("should compose single slash", () => {
    const result = composeRoute("/");

    expect(result).toEqual("/");
  });

  it("should return the route as same if no params are found", () => {
    const result = composeRoute("/users", { id: 1 });

    expect(result).toEqual("/users");
  });

  it("should return the route with params replaced", () => {
    const result = composeRoute("/users/:id", { id: 1 });

    expect(result).toEqual("/users/1");
  });

  it("should return the route with multiple params replaced", () => {
    const result = composeRoute(
      "/users/:id/:name",
      { name: "Jane" },
      { id: 5 },
      {
        id: 1,
        name: "John",
      },
    );

    expect(result).toEqual("/users/1/John");
  });

  it("should return the route with multiple params by prioritizing meta params", () => {
    const result = composeRoute(
      "/users/:id/:name",
      {},
      { id: 1 },
      { name: "Doe" },
    );

    expect(result).toEqual("/users/1/Doe");
  });

  it("should return route when not match object", () => {
    const result = composeRoute("/users/:other", {});

    expect(result).toEqual("/users/:other");
  });
});
