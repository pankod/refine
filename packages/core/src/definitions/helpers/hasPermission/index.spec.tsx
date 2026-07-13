import { hasPermission } from ".";

describe("hasPermission", () => {
  it("should return true if permissions includes the action", () => {
    expect(hasPermission(["create", "edit"], "create")).toBeTruthy();
  });

  it("should return false if permissions not includes the action", () => {
    expect(hasPermission(["edit", "show"], "create")).toBeFalsy();
  });

  it("should return false if permissions equal to undefined", () => {
    expect(hasPermission(undefined, "create")).toBeFalsy();
  });

  it("should return false if action equal to undefined", () => {
    expect(hasPermission(["create", "edit"], undefined)).toBeFalsy();
  });

  it("should return false both of params equal to undefined", () => {
    expect(hasPermission(undefined, undefined)).toBeFalsy();
  });
});
