import { sanitizeResource } from ".";

describe("sanitizeResource", () => {
  it("should remove icon property", () => {
    expect(
      sanitizeResource({
        name: "posts",
        icon: "icon",
      }),
    ).toEqual({
      name: "posts",
    });
  });

  it("should remove meta.icon property without affecting other properties", () => {
    expect(
      sanitizeResource({
        name: "posts",
        meta: {
          icon: "meta-icon",
          label: "meta-label",
          canDelete: true,
        },
      }),
    ).toEqual({
      name: "posts",
      meta: {
        label: "meta-label",
        canDelete: true,
      },
    });
  });

  it("should return undefined if resource is not passed", () => {
    expect(sanitizeResource()).toEqual(undefined);
  });
});
