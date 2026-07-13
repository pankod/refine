import type { FieldInferencer } from "../types";

const urlRegexp = /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i;

export const urlInfer: FieldInferencer = (key, value) => {
  const isValidURL = typeof value === "string" && urlRegexp.test(value);

  if (isValidURL) {
    return {
      key,
      type: "url",
      priority: 1,
    };
  }

  return false;
};
