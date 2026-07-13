import { getVariableName } from ".";

describe("getVariableName", () => {
  it("should return `categoriesSelectProps`", () => {
    expect(getVariableName("categories", "SelectProps")).toBe(
      "categoriesSelectProps",
    );
  });
  it("should return `categorySelectProps`", () => {
    expect(getVariableName("category", "SelectProps")).toBe(
      "categorySelectProps",
    );
  });
  it("should return `selectProps12345`", () => {
    expect(getVariableName("12345", "SelectProps")).toBe("selectProps12345");
  });
  it("should return `resource12345SelectProps`", () => {
    expect(getVariableName("resource12345", "SelectProps")).toBe(
      "resource12345SelectProps",
    );
    expect(getVariableName("resource-12345", "selectProps")).toBe(
      "resource12345SelectProps",
    );
  });
  it("should return `usersCategorySelectProps`", () => {
    expect(getVariableName("users-category", "SelectProps")).toBe(
      "usersCategorySelectProps",
    );
    expect(getVariableName("users/category", "SelectProps")).toBe(
      "usersCategorySelectProps",
    );
    expect(getVariableName("users?.category", "SelectProps")).toBe(
      "usersCategorySelectProps",
    );
    expect(getVariableName("users category", "SelectProps")).toBe(
      "usersCategorySelectProps",
    );
    expect(getVariableName("123-users-category", "SelectProps")).toBe(
      "usersCategorySelectProps",
    );
  });
  it("should return `selectProps1234`", () => {
    expect(getVariableName("1234", "selectProps")).toBe("selectProps1234");
  });
});
