import type { FieldInferencer } from "../types";

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailInfer: FieldInferencer = (key, value) => {
  const isValidEmail = typeof value === "string" && emailRegexp.test(value);

  if (isValidEmail) {
    return {
      key,
      type: "email",
      priority: 1,
    };
  }

  return false;
};
