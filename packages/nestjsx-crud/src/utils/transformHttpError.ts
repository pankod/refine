import type { HttpError } from "@refinedev/core";

import { transformErrorMessages } from "./transformErrorMessages";

export const transformHttpError = (error: any): HttpError => {
  const message = error.response.data.error;
  const statusCode = error.response.data.statusCode;
  const errorMessages = error.response.data.message;

  const errors = transformErrorMessages(errorMessages);

  const httpError: HttpError = {
    statusCode,
    message,
    errors,
  };

  return httpError;
};
