import type { CrudSorting } from "@refinedev/core";

export const generateSort = (sorters?: CrudSorting) => {
  const _sort: string[] = [];

  if (sorters) {
    sorters.map((item) => {
      if (item.order) {
        _sort.push(`${item.field}:${item.order}`);
      }
    });
  }

  return _sort;
};
