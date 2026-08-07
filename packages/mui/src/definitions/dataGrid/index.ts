import type {
  GridFilterItem,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { GridLogicOperator } from "@mui/x-data-grid";

import type {
  CrudFilters,
  CrudOperators,
  CrudSorting,
  LogicalFilter,
} from "@refinedev/core";

export const transformSortModelToCrudSorting = (
  sortModel: GridSortModel,
): CrudSorting => {
  const sorter = sortModel.map(({ field, sort }) => ({
    field,
    order: sort || "asc",
  }));
  return sorter;
};

export const transformCrudSortingToSortModel = (
  crudSorting: CrudSorting,
): GridSortModel => {
  const sortModel = crudSorting.map(({ field, order }) => ({
    field,
    sort: order,
  }));
  return sortModel;
};

export const transformMuiOperatorToCrudOperator = (
  operatorValue?: string,
): Exclude<CrudOperators, "or" | "and"> => {
  if (!operatorValue) {
    return "eq";
  }

  switch (operatorValue) {
    case "equals":
    case "is":
    case "=":
      return "eq";
    case "!=":
    case "not":
    case "doesNotEqual":
      return "ne";
    case "contains":
      return "contains";
    case "doesNotContain":
      return "ncontains";
    case "isAnyOf":
      return "in";
    case ">":
    case "after":
      return "gt";
    case ">=":
    case "onOrAfter":
      return "gte";
    case "<":
    case "before":
      return "lt";
    case "<=":
    case "onOrBefore":
      return "lte";
    case "startsWith":
      return "startswith";
    case "endsWith":
      return "endswith";
    case "isEmpty":
      return "null";
    case "isNotEmpty":
      return "nnull";
    default:
      return operatorValue as Exclude<CrudOperators, "or" | "and">;
  }
};

export const transformFilterModelToCrudFilters = ({
  items,
  logicOperator,
}: GridFilterModel): CrudFilters => {
  const filters = items.map(({ field, value, operator }) => {
    const filter: LogicalFilter = {
      field: field,
      value: ["isEmpty", "isNotEmpty"].includes(operator) ? true : value ?? "",
      operator: transformMuiOperatorToCrudOperator(operator),
    };

    return filter;
  });

  if (logicOperator === GridLogicOperator.Or) {
    return [{ operator: "or", value: filters }];
  }
  return filters;
};

export const transformCrudOperatorToMuiOperator = (
  operator: CrudOperators,
  columnType?: string,
): string => {
  switch (columnType) {
    case "number":
      switch (operator) {
        case "eq":
          return "=";
        case "ne":
          return "!=";
        case "gt":
          return ">";
        case "gte":
          return ">=";
        case "lt":
          return "<";
        case "lte":
          return "<=";
        case "null":
          return "isEmpty";
        case "nnull":
          return "isNotEmpty";
        case "in":
          return "isAnyOf";
        default:
          return operator;
      }
    case "singleSelect":
    case "boolean":
      switch (operator) {
        case "eq":
          return "is";
        default:
          return operator;
      }
    case undefined:
    case "string":
      switch (operator) {
        case "eq":
          return "equals";
        case "ne":
          return "doesNotEqual";
        case "contains":
          return "contains";
        case "ncontains":
          return "doesNotContain";
        case "null":
          return "isEmpty";
        case "nnull":
          return "isNotEmpty";
        case "startswith":
          return "startsWith";
        case "endswith":
          return "endsWith";
        case "in":
          return "isAnyOf";
        default:
          return operator;
      }
    case "date":
    case "dateTime":
      switch (operator) {
        case "eq":
          return "is";
        case "ne":
          return "not";
        case "gt":
          return "after";
        case "gte":
          return "onOrAfter";
        case "lt":
          return "before";
        case "lte":
          return "onOrBefore";
        case "null":
          return "isEmpty";
        case "nnull":
          return "isNotEmpty";
        default:
          return operator;
      }
    default:
      return operator;
  }
};

export const transformCrudFiltersToFilterModel = (
  crudFilters: CrudFilters,
  columnsType?: Record<string, string>,
): GridFilterModel | undefined => {
  const gridFilterItems: GridFilterItem[] = [];
  const fieldOperatorCount: Record<string, number> = {};

  const isExistOrFilter = crudFilters.some(
    (filter) => filter.operator === "or",
  );

  if (columnsType) {
    if (isExistOrFilter) {
      const orLogicalFilters = crudFilters.find(
        (filter) => filter.operator === "or",
      )?.value as LogicalFilter[];

      orLogicalFilters.map(({ field, value, operator }) => {
        const columnType = columnsType[field];
        const id = field + operator;

        fieldOperatorCount[id] = (fieldOperatorCount[id] || 0) + 1;
        const uniqueId = id + String(fieldOperatorCount[id]);

        gridFilterItems.push({
          field: field,
          operator: transformCrudOperatorToMuiOperator(operator, columnType),
          value: value === "" ? undefined : value,
          id: fieldOperatorCount[id] > 1 ? uniqueId : id,
        });
      });
    } else {
      (crudFilters as LogicalFilter[]).map(({ field, value, operator }) => {
        const columnType = columnsType[field];
        const id = field + operator;

        fieldOperatorCount[id] = (fieldOperatorCount[id] || 0) + 1;
        const uniqueId = id + String(fieldOperatorCount[id]);

        gridFilterItems.push({
          field: field,
          operator: transformCrudOperatorToMuiOperator(operator, columnType),
          value: value === "" ? undefined : value,
          id: fieldOperatorCount[id] > 1 ? uniqueId : id,
        });
      });
    }
  }

  return {
    items: gridFilterItems,
    // If there is "or" filter, default link operator is "or"
    logicOperator: isExistOrFilter
      ? GridLogicOperator.Or
      : GridLogicOperator.And,
  };
};
