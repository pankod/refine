import type { FieldInferencer } from "../types";

export const textInfer: FieldInferencer = (key, value) => {
  const isText = typeof value === "string";

  if (isText) {
    return {
      key,
      type: "text",
    };
  }

  return false;
};
