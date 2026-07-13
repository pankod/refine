import type { CrudFilter } from "@refinedev/core";
import { Query } from "appwrite";
import { replaceIdWithAppwriteId } from "./replaceIdWithAppwriteId";

/**
 * Generate a filter string for Appwrite from Refine's filter
 * @param filter Refine's filter
 * @param deep Max deep of the filter
 * @returns Appwrite's filter string
 */
export const generateFilter = (filter: CrudFilter, deep = 10): string => {
  const nextDeep = deep - 1;

  if (nextDeep < 0) {
    throw new Error("Max deep reached");
  }

  filter = replaceIdWithAppwriteId(filter);

  switch (filter.operator) {
    // Logical operators
    case "eq":
      return Query.equal(filter.field, filter.value);
    case "ne":
      return Query.notEqual(filter.field, filter.value);
    case "gt":
      return Query.greaterThan(filter.field, filter.value);
    case "gte":
      return Query.greaterThanEqual(filter.field, filter.value);
    case "lt":
      return Query.lessThan(filter.field, filter.value);
    case "lte":
      return Query.lessThanEqual(filter.field, filter.value);
    case "contains":
      return Query.search(filter.field, `%${filter.value}%`);
    case "between":
      if (!Array.isArray(filter.value) || filter.value.length !== 2) {
        throw new Error(
          `Value array must contain exactly two elements for "between" operator`,
        );
      }
      return Query.between(filter.field, filter.value[0], filter.value[1]);
    case "null":
      return Query.isNull(filter.field);
    case "nnull":
      return Query.isNotNull(filter.field);
    case "startswith":
      return Query.startsWith(filter.field, filter.value);
    case "endswith":
      return Query.endsWith(filter.field, filter.value);

    // Conditional operators
    case "or":
      if (filter.value.length === 1 && filter.value[0]) {
        //? "OR" queries require at least two queries in Appwrite
        return generateFilter(filter.value[0], nextDeep);
      }
      return Query.or(filter.value.map((f) => generateFilter(f, nextDeep)));
    case "and":
      if (filter.value.length === 1 && filter.value[0]) {
        //? "AND" queries require at least two queries in Appwrite
        return generateFilter(filter.value[0], nextDeep);
      }
      return Query.and(filter.value.map((f) => generateFilter(f, nextDeep)));

    default:
      throw new Error(`Operator ${filter.operator} is not supported`);
  }
};
