type ErrorMessage = {
  path: string[];
  message: string;
  name: string;
};

type TransformedErrors = {
  [key: string]: string[];
};

export const transformErrorMessages = (
  errorMessages: ErrorMessage[],
): TransformedErrors => {
  const transformedErrors: TransformedErrors = {};

  for (const error of errorMessages) {
    const key = error.path[0];

    if (transformedErrors[key]) {
      transformedErrors[key].push(error.message);
    } else {
      transformedErrors[key] = [error.message];
    }
  }

  return transformedErrors;
};
