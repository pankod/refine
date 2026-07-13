import { resourceFromInferred } from ".";

describe("resourceFromInferred", () => {
  it("should get resource by singular to plural", () => {
    expect(
      resourceFromInferred({ key: "user", type: "text" }, [{ name: "users" }]),
    ).toEqual({ name: "users" });
  });

  it("should get resource by plural to singular", () => {
    expect(
      resourceFromInferred({ key: "users", type: "text" }, [{ name: "user" }]),
    ).toEqual({ name: "user" });
  });

  it("should return undefined if no resource is matching", () => {
    expect(
      resourceFromInferred({ key: "users", type: "text" }, [{ name: "posts" }]),
    ).toBeUndefined();
  });
});
