export const propertyPathToArray = (propertyPath: string) => {
  return propertyPath
    .split(".")
    .map((item) => (!Number.isNaN(Number(item)) ? Number(item) : item));
};
