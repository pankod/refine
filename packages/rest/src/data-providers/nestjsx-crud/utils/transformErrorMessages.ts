type TransformedErrors = {
  [key: string]: string[];
};

export const transformErrorMessages = (
  errorMessages: string[],
): TransformedErrors => {
  const transformedErrors: TransformedErrors = {};

  for (const errorMessage of errorMessages) {
    const separatorIndex = errorMessage.indexOf(" ");
    const field = errorMessage.substring(0, separatorIndex);

    if (transformedErrors[field]) {
      transformedErrors[field].push(errorMessage);
    } else {
      transformedErrors[field] = [errorMessage];
    }
  }

  return transformedErrors;
};
