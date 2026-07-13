import type { FieldInferencer } from "../types";

export const nullishInfer: FieldInferencer = (key, value) => {
  const isUndefined = typeof value === "undefined";
  const isNull = value === null;

  if (isUndefined || isNull) {
    return null;
  }

  return false;
};
