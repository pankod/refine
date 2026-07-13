import mapKeys from "lodash/mapKeys";
import camelCase from "camelcase";

export const camelizeKeys = (obj: any): any => {
  if (!obj) return undefined;
  return mapKeys(obj, (_v, k) => camelCase(k));
};
