import type { InferField } from "../../types";

export const getOptionLabel = (field: InferField) => {
  if (!field.relationInfer) return "";

  if (field.relationInfer?.accessor) {
    if (Array.isArray(field.relationInfer.accessor)) {
      return `optionLabel: "${field.relationInfer.accessor[0]}",`;
    }
    if (field.relationInfer.accessor !== "title") {
      return `optionLabel: "${field.relationInfer.accessor}",`;
    }
    return "";
  }

  return "";
};
