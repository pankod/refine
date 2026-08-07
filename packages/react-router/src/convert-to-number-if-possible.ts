export const convertToNumberIfPossible = (value: string | undefined) => {
  if (typeof value === "undefined") {
    return value;
  }
  const num = Number(value);
  if (`${num}` === value) {
    return num;
  }
  return value;
};
