import type { FieldInferencer } from "../types";

export const booleanInfer: FieldInferencer = (key, value) => {
  const isBoolean = typeof value === "boolean";

  if (isBoolean) {
    return {
      key,
      type: "boolean",
    };
  }

  return false;
};
