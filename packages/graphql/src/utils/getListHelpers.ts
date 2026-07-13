import type {
  CrudOperators,
  LogicalFilter,
  CrudFilter,
  CrudSort,
  Pagination,
} from "@refinedev/core";
import set from "lodash/set";

export const buildSorters = (sorters: CrudSort[] = []) => {
  return sorters.map((s) => ({
    field: s.field,
    direction: s.order.toUpperCase(),
  }));
};

export const buildPagination = (pagination: Pagination = {}) => {
  if (pagination.mode === "off") return { limit: 2147483647 };

  const { pageSize = 10, currentPage = 1 } = pagination;

  return {
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
  };
};

const operatorMap: { [key: string]: string } = {
  eq: "eq",
  ne: "neq",
  lt: "lt",
  gt: "gt",
  lte: "lte",
  gte: "gte",
  in: "in",
  nin: "notIn",
};

const operatorMapper = (
  operator: CrudOperators,
  value: any,
): { [key: string]: any } => {
  if (operator === "contains") {
    return { iLike: `%${value}%` };
  }

  if (operator === "ncontains") {
    return { notILike: `%${value}%` };
  }

  if (operator === "containss") {
    return { like: `%${value}%` };
  }

  if (operator === "ncontainss") {
    return { notLike: `%${value}%` };
  }

  if (operator === "startswith") {
    return { iLike: `${value}%` };
  }

  if (operator === "nstartswith") {
    return { notILike: `${value}%` };
  }

  if (operator === "startswiths") {
    return { like: `${value}%` };
  }

  if (operator === "nstartswiths") {
    return { notLike: `${value}%` };
  }

  if (operator === "endswith") {
    return { iLike: `%${value}` };
  }

  if (operator === "nendswith") {
    return { notILike: `%${value}` };
  }

  if (operator === "endswiths") {
    return { like: `%${value}` };
  }

  if (operator === "nendswiths") {
    return { notLike: `%${value}` };
  }

  if (operator === "null") {
    return { is: null };
  }

  if (operator === "nnull") {
    return { isNot: null };
  }

  if (operator === "between") {
    if (!Array.isArray(value)) {
      throw new Error("Between operator requires an array");
    }

    if (value.length !== 2) {
      return {};
    }

    return { between: { lower: value[0], upper: value[1] } };
  }

  if (operator === "nbetween") {
    if (!Array.isArray(value)) {
      throw new Error("NBetween operator requires an array");
    }

    if (value.length !== 2) {
      return {};
    }

    return { notBetween: { lower: value[0], upper: value[1] } };
  }

  return { [operatorMap[operator]]: value };
};

export const buildFilters = (filters: LogicalFilter[] | CrudFilter[] = []) => {
  const result: { [key: string]: { [key: string]: string | number } } = {};

  filters
    .filter((f) => {
      if (Array.isArray(f.value) && f.value.length === 0) {
        return false;
      }
      if (typeof f.value === "number") {
        return Number.isFinite(f.value);
      }

      // If the value is null or undefined, it returns false.
      return !(f.value == null);
    })
    .map((filter: LogicalFilter | CrudFilter) => {
      if (filter.operator === "and" || filter.operator === "or") {
        return set(result, filter.operator, [
          buildFilters(filter.value as LogicalFilter[]),
        ]);
      }
      if ("field" in filter) {
        return set(
          result,
          filter.field,
          operatorMapper(filter.operator, filter.value),
        );
      }

      return {};
    });

  return result;
};
