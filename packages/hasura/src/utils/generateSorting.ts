import type { CrudSort, CrudSorting } from "@refinedev/core";
import setWith from "lodash/setWith";

export type HasuraSortOrder = "asc" | "desc";
export type HasuraSorting = HasuraSortOrder | { [key: string]: HasuraSorting };

export type HasuraSortingType = Record<string, HasuraSorting>;

const generateNestedSorting = (sorter: CrudSort): HasuraSortingType => {
  const { field, order } = sorter;
  const fieldsArray = field.split(".");

  return {
    ...setWith({}, fieldsArray, order, Object),
  };
};

export const generateSorting: (
  sorters: CrudSorting | undefined,
) => HasuraSortingType | undefined = (sorters) => {
  if (!sorters) {
    return undefined;
  }

  let mergedSorting: HasuraSortingType = {};

  sorters.forEach((sorter) => {
    const nestedSorting = generateNestedSorting(sorter);
    mergedSorting = { ...mergedSorting, ...nestedSorting };
  });

  return mergedSorting;
};
