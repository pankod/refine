import { isSegmentCountsSame } from "../is-segment-counts-same";

describe("isSegmentCountsSame", () => {
  it("should return true if the route and resourceRoute have the same number of segments", () => {
    const result = isSegmentCountsSame("/users/edit/123", "/users/edit/:id");

    expect(result).toEqual(true);
  });

  it("should return false if the route and resourceRoute don't have the same number of segments", () => {
    const result = isSegmentCountsSame(
      "/users/edit/123",
      "users/posts/edit/:id/",
    );

    expect(result).toEqual(false);
  });
});
