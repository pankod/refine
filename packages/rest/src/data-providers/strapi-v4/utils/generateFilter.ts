import type {
  CrudFilters,
  LogicalFilter,
  ConditionalFilter,
} from "@refinedev/core";
import { mapOperator } from "./mapOperator";

export const generateNestedFilterField = (field: string): string[] => {
  if (field.startsWith("[") && field.endsWith("]")) {
    const matches = field.match(/\[([^\]]+)\]/g);
    if (matches) {
      return matches.map((match) => match.slice(1, -1));
    }
  }

  return field.split(".");
};

const generateLogicalFilter = (filter: LogicalFilter): any => {
  const { field, operator, value } = filter;

  const mappedOperator = mapOperator(operator);
  const fieldPath = generateNestedFilterField(field);

  const filterObj: any = {};

  let current = filterObj;
  for (let i = 0; i < fieldPath.length - 1; i++) {
    current[fieldPath[i]] = {};
    current = current[fieldPath[i]];
  }
  current[fieldPath[fieldPath.length - 1]] = { [`$${mappedOperator}`]: value };

  return filterObj;
};

const mergeFilters = (target: any, source: any): any => {
  for (const key in source) {
    if (key in target) {
      if (typeof target[key] === "object" && typeof source[key] === "object") {
        target[key] = mergeFilters(target[key], source[key]);
      }
    } else {
      target[key] = source[key];
    }
  }
  return target;
};

const generateConditionalFilter = (filter: ConditionalFilter): any => {
  const result: any = {};
  const operatorKey = `$${filter.operator}`;

  const subFilters = filter.value.map((item) => {
    if (item.operator !== "or" && item.operator !== "and" && "field" in item) {
      return generateLogicalFilter(item);
    }
    return generateConditionalFilter(item);
  });

  result[operatorKey] = subFilters;
  return result;
};

export const generateFilter = (filters?: CrudFilters): any => {
  if (!filters || filters.length === 0) {
    return {};
  }

  let result: any = {};

  filters.forEach((filter) => {
    let filterObj: any;

    if (
      filter.operator !== "or" &&
      filter.operator !== "and" &&
      "field" in filter
    ) {
      filterObj = generateLogicalFilter(filter);
    } else {
      filterObj = generateConditionalFilter(filter);
    }

    result = mergeFilters(result, filterObj);
  });

  return result;
};
