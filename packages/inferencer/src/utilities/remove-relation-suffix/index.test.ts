import { removeRelationSuffix } from ".";

describe("removeRelationSuffix", () => {
  it("should remove _id", () => {
    expect(removeRelationSuffix("user_id")).toBe("user");
  });

  it("should remove _ids", () => {
    expect(removeRelationSuffix("user_ids")).toBe("user");
  });

  it("should remove Id from userId", () => {
    expect(removeRelationSuffix("userId")).toBe("user");
  });

  it("should keep id at Asteroid", () => {
    expect(removeRelationSuffix("asteroid")).toBe("asteroid");
  });
});
