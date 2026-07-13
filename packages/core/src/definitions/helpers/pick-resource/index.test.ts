import { pickResource } from ".";

describe("pickResource", () => {
  it("should pick by name", () => {
    const resource = pickResource("name", [{ name: "name" }]);

    expect(resource?.name).toBe("name");
  });

  it("should match by identifier", () => {
    const resource = pickResource("identifier", [
      {
        name: "name",
        identifier: "identifier",
      },
    ]);

    expect(resource?.identifier).toBe("identifier");
  });

  it("should return undefined if name and identifier does not match", () => {
    const resource = pickResource("users", [
      { name: "name", identifier: "identifier" },
    ]);

    expect(resource).toBeUndefined();
  });

  it("should return undefined if `identifier` is not defined", () => {
    const resource = pickResource(undefined, [{ name: "name" }]);

    expect(resource).toBeUndefined();
  });
});
