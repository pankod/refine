import type { HttpError } from "@refinedev/core";

import { transformErrorMessages } from "./transformErrorMessages";

export const transformHttpError = (error: any): HttpError => {
  const message = error.error;
  const statusCode = error.statusCode;
  const errorMessages = error.message;

  const errors = transformErrorMessages(errorMessages);

  const httpError: HttpError = {
    statusCode,
    message,
    errors,
  };

  return httpError;
};
