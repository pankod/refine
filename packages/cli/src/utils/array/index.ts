export const findDuplicates = (arr: (string | number)[]) => {
  const duplicates = arr.filter((item, index) => arr.indexOf(item) !== index);
  const unique = new Set(duplicates);
  return Array.from(unique);
};
