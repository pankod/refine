import type { CrudSorting } from "@refinedev/core";
import { Query } from "appwrite";

type GetAppwriteSortingType = (sorts?: CrudSorting) => string[];

export const getAppwriteSorting: GetAppwriteSortingType = (sorters) => {
  const sorts: string[] = [];

  if (sorters) {
    sorters.map((item) => {
      const field = item.field === "id" ? "$id" : item.field;
      if (item.order === "asc") {
        sorts.push(Query.orderAsc(field));
      } else {
        sorts.push(Query.orderDesc(field));
      }
    });
  }

  return sorts;
};
