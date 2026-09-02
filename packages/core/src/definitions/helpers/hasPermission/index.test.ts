import { hasPermission } from ".";

describe("hasPermission", () => {
  it("should return true when action exists in permissions", () => {
    expect(hasPermission(["read", "write", "delete"], "write")).toBe(true);
  });

  it("should return false when action does not exist in permissions", () => {
    expect(hasPermission(["read", "write"], "delete")).toBe(false);
  });

  it("should return false when permissions is undefined", () => {
    expect(hasPermission(undefined, "read")).toBe(false);
  });

  it("should return false when action is undefined", () => {
    expect(hasPermission(["read", "write"], undefined)).toBe(false);
  });

  it("should return false when both are undefined", () => {
    expect(hasPermission(undefined, undefined)).toBe(false);
  });

  it("should return false for empty permissions array", () => {
    expect(hasPermission([], "read")).toBe(false);
  });

  it("should handle single permission", () => {
    expect(hasPermission(["admin"], "admin")).toBe(true);
  });

  it("should be case-sensitive", () => {
    expect(hasPermission(["Read"], "read")).toBe(false);
  });

  it("should handle special characters in permission strings", () => {
    expect(hasPermission(["user:read", "user:write"], "user:read")).toBe(true);
  });
});
