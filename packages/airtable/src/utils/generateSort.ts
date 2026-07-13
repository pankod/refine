import type { CrudSorting } from "@refinedev/core";

export const generateSort = (sorters?: CrudSorting) => {
  return sorters?.map((item) => ({
    field: item.field,
    direction: item.order,
  }));
};
