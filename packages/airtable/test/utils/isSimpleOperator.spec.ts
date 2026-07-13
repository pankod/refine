import { isSimpleOperator, simpleOperatorMapping } from "../../src/utils";

describe("SimpleOperators", () => {
  describe("isSimpleOperator", () => {
    it("should return true if operator is a simple operator", () => {
      expect(isSimpleOperator("eq")).toBe(true);
      expect(isSimpleOperator("ne")).toBe(true);
      expect(isSimpleOperator("lt")).toBe(true);
      expect(isSimpleOperator("lte")).toBe(true);
      expect(isSimpleOperator("gt")).toBe(true);
      expect(isSimpleOperator("gte")).toBe(true);
    });

    it("should return false if operator is not a simple operator", () => {
      expect(isSimpleOperator("contains")).toBe(false);
      expect(isSimpleOperator("containss")).toBe(false);
    });
  });

  describe("simpleOperatorMapping", () => {
    it("should map simple operators to their corresponding Airtable symbols", () => {
      expect(simpleOperatorMapping["eq"]).toBe("=");
      expect(simpleOperatorMapping["ne"]).toBe("!=");
      expect(simpleOperatorMapping["lt"]).toBe("<");
      expect(simpleOperatorMapping["lte"]).toBe("<=");
      expect(simpleOperatorMapping["gt"]).toBe(">");
      expect(simpleOperatorMapping["gte"]).toBe(">=");
    });
  });
});
