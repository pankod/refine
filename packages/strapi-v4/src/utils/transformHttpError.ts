import type { HttpError } from "@refinedev/core";
import { transformErrorMessages } from "./transformErrorMessages";

export const transformHttpError = (err: any): HttpError => {
  const error = err?.response?.data?.error || {};

  const message = error?.message;
  const statusCode = error?.status;
  const errorMessages = error?.details?.errors || [];

  const httpError: HttpError = {
    statusCode,
    message,
    errors: transformErrorMessages(errorMessages),
  };

  return httpError;
};
