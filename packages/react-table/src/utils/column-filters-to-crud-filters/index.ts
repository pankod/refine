import type {
  ConditionalFilter,
  CrudFilter,
  CrudOperators,
  LogicalFilter,
} from "@refinedev/core";
import type {
  ColumnDef,
  ColumnFilter,
  ColumnFiltersState,
} from "@tanstack/react-table";

type Params = {
  columnFilters?: ColumnFiltersState;
  columns: ColumnDef<any, any>[];
};

export const columnFiltersToCrudFilters = ({
  columns,
  columnFilters,
}: Params): CrudFilter[] => {
  return (
    columnFilters?.map((filter) => {
      const operator =
        (filter as ColumnFilter & { operator?: CrudOperators }).operator ??
        (
          columns.find((col) => col.id === filter.id)?.meta as {
            filterOperator?: string;
          }
        )?.filterOperator;

      const isConditional = operator === "and" || operator === "or";

      if (isConditional && Array.isArray(filter.value)) {
        const filterKey =
          (
            columns.find((c) => c.id === filter.id)?.meta as {
              filterKey?: string;
            }
          )?.filterKey ?? filter.id;

        return {
          key: filterKey,
          operator: operator as ConditionalFilter["operator"],
          value: filter.value,
        };
      }
      const defaultOperator = Array.isArray(filter.value) ? "in" : "eq";

      return {
        field: filter.id,
        operator: (operator as LogicalFilter["operator"]) ?? defaultOperator,
        value: filter.value,
      };
    }) ?? []
  );
};
