import type { FieldInferencer } from "../types";

export const numberInfer: FieldInferencer = (key, value) => {
  const isNonEmptyString = typeof value === "string" && value.length > 0;
  const isNotNaN = !Number.isNaN(Number(value));

  const isNumericString = isNonEmptyString && isNotNaN;
  const isNumber = typeof value === "number";

  const isNumeric = isNumericString || isNumber;

  if (isNumeric) {
    return {
      key,
      type: "number",
    };
  }

  return false;
};
