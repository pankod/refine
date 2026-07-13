import type { CrudFilters, CrudFilter } from "@refinedev/core";
import type { RequestQueryBuilder, SCondition } from "@nestjsx/crud-request";
import { mapOperator } from "./mapOperator";

export const generateSearchFilter = (filters: CrudFilters): SCondition => {
  return createSearchQuery({
    operator: "and",
    value: filters,
  });
};

export const createSearchQuery = (filter: CrudFilter): SCondition => {
  if (
    filter.operator !== "and" &&
    filter.operator !== "or" &&
    "field" in filter
  ) {
    // query
    return {
      [filter.field]: {
        [mapOperator(filter.operator)]: filter.value,
      },
    };
  }

  const { operator } = filter;

  return {
    [mapOperator(operator)]: filter.value.map((filter) =>
      createSearchQuery(filter),
    ),
  };
};

export const handleFilter = (
  query: RequestQueryBuilder,
  filters?: CrudFilters,
) => {
  if (Array.isArray(filters) && filters.length > 0) {
    query.search(generateSearchFilter(filters));
  }
  return query;
};
