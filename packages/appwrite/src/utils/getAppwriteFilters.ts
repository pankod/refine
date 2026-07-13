import type { CrudFilters } from "@refinedev/core";
import { generateFilter } from "./generateFilter";

type GetAppwriteFiltersType = (filters?: CrudFilters) => string[];

export const getAppwriteFilters: GetAppwriteFiltersType = (filters) => {
  const appwriteFilters: string[] = [];

  for (const filter of filters ?? []) {
    appwriteFilters.push(generateFilter(filter));
  }

  return appwriteFilters;
};
