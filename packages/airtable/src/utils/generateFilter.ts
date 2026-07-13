import type { CrudFilters } from "@refinedev/core";
import { compile } from "@qualifyze/airtable-formulator";
import { generateFilterFormula } from "./generateFilterFormula";

export const generateFilter = (filters?: CrudFilters): string | undefined => {
  if (filters) {
    // Top-level array has an implicit AND as per CRUDFilter design - https://refine.dev/docs/guides-and-concepts/data-provider/handling-filters/#logicalfilters
    return compile(["AND", ...generateFilterFormula(filters)]);
  }

  return undefined;
};
