import { checkBySegments } from "../check-by-segments";

describe("checkBySegments", () => {
  it("should return true if the route and resourceRoute match by segments", () => {
    const result = checkBySegments("/users/edit/123", "/users/edit/:id");

    expect(result).toEqual(true);
  });

  it("should return false if the route and resourceRoute don't match by segments", () => {
    const result = checkBySegments("/users/edit/123", "/posts/edit/:id/");

    expect(result).toEqual(false);
  });

  it("should return false if segments are not equal", () => {
    const result = checkBySegments("/users/edit/123", "/users/edit/:id/step");

    expect(result).toEqual(false);
  });
});
