import {
  type CrudFilters,
  type CrudOperators,
  type CrudSorting,
  type CrudFilter,
  getDefaultFilter as getDefaultFilterCore,
  getDefaultSortOrder as getDefaultSortOrderCore,
  type ConditionalFilter,
  type LogicalFilter,
} from "@refinedev/core";
import type { TableProps } from "antd";

export type FilterValue = Parameters<
  NonNullable<TableProps["onChange"]>
>[1][string];
export type SortOrder = NonNullable<TableProps["sortDirections"]>[number];
export type SorterResult = Exclude<
  Parameters<NonNullable<TableProps["onChange"]>>[2],
  any[]
>;

export const getDefaultSortOrder = (
  columnName: string,
  sorter?: CrudSorting,
): SortOrder | undefined => {
  const sort = getDefaultSortOrderCore(columnName, sorter);

  if (sort) {
    return `${sort}end`;
  }

  return undefined;
};

export const getDefaultFilter = (
  columnName: string,
  filters?: CrudFilters,
  operatorType: CrudOperators = "eq",
): CrudFilter["value"] | undefined => {
  return getDefaultFilterCore(columnName, filters, operatorType);
};

export const mapAntdSorterToCrudSorting = (
  sorter: SorterResult | SorterResult[],
): CrudSorting => {
  const crudSorting: CrudSorting = [];
  if (Array.isArray(sorter)) {
    sorter
      .sort((a, b) => {
        return ((a.column?.sorter as { multiple?: number }).multiple ?? 0) <
          ((b.column?.sorter as { multiple?: number }).multiple ?? 0)
          ? -1
          : 0;
      })
      .map((item) => {
        if (item.field && item.order) {
          const field = Array.isArray(item.field)
            ? item.field.join(".")
            : `${item.field}`;

          crudSorting.push({
            field: `${item.columnKey ?? field}`,
            order: item.order.replace("end", "") as "asc" | "desc",
          });
        }
      });
  } else {
    if (sorter.field && sorter.order) {
      const field = Array.isArray(sorter.field)
        ? sorter.field.join(".")
        : `${sorter.field}`;

      crudSorting.push({
        field: `${sorter.columnKey ?? field}`,
        order: sorter.order.replace("end", "") as "asc" | "desc",
      });
    }
  }

  return crudSorting;
};

export const mapAntdFilterToCrudFilter = (
  tableFilters: Record<
    string,
    | FilterValue
    | (string | number | boolean)
    | (string | number | boolean)[]
    | null
  >,
  prevFilters: CrudFilters,
  initialFilters?: CrudFilters,
): CrudFilters => {
  const crudFilters: CrudFilters = [];
  const mapInitialFilter: Record<string, CrudFilter> = (
    initialFilters ?? []
  ).reduce((acc, item) => {
    const field =
      (item as ConditionalFilter).key || (item as LogicalFilter).field;
    return { ...acc, [field]: item };
  }, {});

  Object.keys(tableFilters).map((field) => {
    const value = tableFilters[field];
    const operator =
      prevFilters
        .filter((i) => i.operator !== "or")
        .find((p: any) => p.field === field)?.operator ||
      mapInitialFilter[field]?.operator;

    if (operator !== "or" && operator !== "and") {
      crudFilters.push({
        field,
        operator: operator ?? (Array.isArray(value) ? "in" : "eq"),
        value,
      });
    }
  });

  return crudFilters;
};
