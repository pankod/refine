import { getParentResource } from "../get-parent-resource";

describe("getParentResource", () => {
  it("should return undefined if no parent is given", () => {
    const result = getParentResource(
      {
        name: "users",
        meta: {},
      },
      [],
    );

    expect(result).toEqual(undefined);
  });

  it("should return the parent resource if parent is given", () => {
    const result = getParentResource(
      {
        name: "users",
        meta: {
          parent: "orgs",
        },
      },
      [
        {
          name: "orgs",
        },
      ],
    );

    expect(result).toEqual({
      name: "orgs",
    });
  });

  it("should return the parent resource if parent is given even if the parent is not defined", () => {
    const result = getParentResource(
      {
        name: "users",
        meta: {
          parent: "orgs",
        },
      },
      [],
    );

    expect(result).toEqual({
      name: "orgs",
    });
  });
});
