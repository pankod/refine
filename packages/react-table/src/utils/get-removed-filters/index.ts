import type { CrudFilter, LogicalFilter } from "@refinedev/core";

type Params = {
  nextFilters: CrudFilter[];
  coreFilters: CrudFilter[];
};

export const getRemovedFilters = ({
  nextFilters,
  coreFilters,
}: Params): CrudFilter[] => {
  const removedFilters = coreFilters.filter(
    (filter) =>
      !nextFilters.some((nextFilter) => {
        const isFilterConditional =
          filter.operator === "and" || filter.operator === "or";
        const isCrudFilterConditional =
          nextFilter.operator === "and" || nextFilter.operator === "or";
        const hasSameOperator = filter.operator === nextFilter.operator;
        const hasSameKey =
          isFilterConditional &&
          isCrudFilterConditional &&
          filter.key === nextFilter.key;
        const hasSameField =
          !isFilterConditional &&
          !isCrudFilterConditional &&
          (filter as LogicalFilter).field ===
            (nextFilter as LogicalFilter).field;

        return hasSameOperator && (hasSameKey || hasSameField);
      }),
  );

  return removedFilters.map((filter) => {
    if (filter.operator === "and" || filter.operator === "or") {
      return {
        key: filter.key,
        operator: filter.operator,
        value: [],
      };
    }
    return {
      field: (filter as LogicalFilter).field,
      operator: filter.operator,
      value: undefined,
    };
  });
};
