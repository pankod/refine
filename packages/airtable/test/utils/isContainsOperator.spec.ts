import { isContainssOperator, isContainsOperator } from "../../src/utils";

describe("Operators", () => {
  describe("isContainssOperator", () => {
    it("should return true if operator is containss", () => {
      expect(isContainssOperator("containss")).toBe(true);
    });

    it("should return true if operator is ncontainss", () => {
      expect(isContainssOperator("ncontainss")).toBe(true);
    });

    it("should return false if operator is not containss or ncontainss", () => {
      expect(isContainssOperator("contains")).toBe(false);
    });
  });

  describe("isContainsOperator", () => {
    it("should return true if operator is contains", () => {
      expect(isContainsOperator("contains")).toBe(true);
    });

    it("should return true if operator is ncontains", () => {
      expect(isContainsOperator("ncontains")).toBe(true);
    });

    it("should return false if operator is not contains or ncontains", () => {
      expect(isContainsOperator("containss")).toBe(false);
    });
  });
});
