export const excludeKeys = <T extends Record<string, any>>(
  obj: T,
  keys: string[],
): T => {
  const newObj = { ...obj };
  keys.forEach((key) => {
    delete newObj[key];
  });
  return newObj;
};
