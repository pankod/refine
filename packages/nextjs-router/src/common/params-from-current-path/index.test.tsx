import { paramsFromCurrentPath } from ".";

describe("paramsFromCurrentPath", () => {
  it("returns an empty object if there are no params", () => {
    expect(paramsFromCurrentPath("/", "/")).toEqual({});
  });

  it("returns an object with the params when route has params", () => {
    const currentPath = "/posts/123";
    const matchingRoute = "/posts/:id";

    expect(paramsFromCurrentPath(currentPath, matchingRoute)).toEqual({
      id: "123",
    });
  });

  it("returns an object with multiple properties for /:param1/test/:param2/edit", () => {
    const currentPath = "/123/test/456/edit";
    const matchingRoute = "/:param1/test/:param2/edit";

    expect(paramsFromCurrentPath(currentPath, matchingRoute)).toEqual({
      param1: "123",
      param2: "456",
    });
  });

  it("should not return empty values for broken routes", () => {
    const currentPath = "/posts//details";
    const matchingRoute = "/posts/:id/details";

    expect(paramsFromCurrentPath(currentPath, matchingRoute)).toEqual({});
  });
});
