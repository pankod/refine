export const groupBy = (arr: Array<string | number>) => {
  const retVal: { [key: string]: number } = {};
  for (const key of arr) {
    const normalizedKey = String(key);

    if (retVal[normalizedKey]) {
      retVal[normalizedKey] += 1;
    } else {
      retVal[normalizedKey] = 1;
    }
  }
  return retVal;
};
