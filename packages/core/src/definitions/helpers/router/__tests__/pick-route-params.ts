import { pickRouteParams } from "../pick-route-params";

describe("pickRouteParams", () => {
  it("should extract route params from a path", () => {
    expect(pickRouteParams("/users/:id/posts/:postId")).toEqual([
      "id",
      "postId",
    ]);
  });

  it("should return an empty array if no route params are given", () => {
    expect(pickRouteParams("/users/list")).toEqual([]);
  });

  it("should extract route params from a path", () => {
    expect(pickRouteParams("users/:id")).toEqual(["id"]);
  });
});
