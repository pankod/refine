import { prepareRouteParams } from "../prepare-route-params";

describe("prepareRouteParams", () => {
  it("should return an empty object if no route params are given", () => {
    expect(prepareRouteParams([])).toEqual({});
  });

  it("should return `id` property when params array contains `id`", () => {
    expect(prepareRouteParams(["id"], { id: "1" })).toEqual({ id: "1" });
  });

  it("should prioritize meta over params", () => {
    expect(prepareRouteParams(["id"], { id: "2" })).toEqual({
      id: "2",
    });
  });

  it("should combine params and meta", () => {
    expect(
      prepareRouteParams(["id", "action"], {
        ...{ id: "1" },
        ...{ action: "2" },
      }),
    ).toEqual({ id: "1", action: "2" });
  });
});
