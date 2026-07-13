import type { HttpError } from "@refinedev/core";
import type { PostgrestError } from "@supabase/supabase-js";

export const handleError = (error: PostgrestError) => {
  const customError: HttpError = {
    ...error,
    message: error.message,
    statusCode: Number.parseInt(error.code),
  };
  return Promise.reject(customError);
};
