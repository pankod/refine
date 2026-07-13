import mapValues from "lodash/mapValues";

export const upperCaseValues = (obj: any): any => {
  if (!obj) return undefined;
  return mapValues(obj, (v: string) => v.toUpperCase());
};
