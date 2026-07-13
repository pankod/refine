import type {
  CrudFilters,
  LogicalFilter,
  ConditionalFilter,
} from "@refinedev/core";
import { mapOperator } from "./mapOperator";
import qs from "qs";

export const generateNestedFilterField = (field: string) => {
  const fields = field.split(".");

  if (fields.length > 1) {
    let fieldQuery = "";

    fields.forEach((v) => {
      fieldQuery += `[${v}]`;
    });

    return fieldQuery;
  }
  return `[${fields[0]}]`;
};

const generateLogicalFilter = (filter: LogicalFilter, parent = ""): string => {
  const { field, operator, value } = filter;

  let rawQuery = "";

  const mappedOperator = mapOperator(operator);

  if (Array.isArray(value)) {
    value.map((val, index) => {
      rawQuery += `&filters${parent}${generateNestedFilterField(
        field,
      )}[$${mappedOperator}][${index}]=${val}`;
    });
  } else {
    rawQuery += `&filters${parent}${generateNestedFilterField(
      field,
    )}[$${mappedOperator}]=${value}`;
  }
  return rawQuery;
};

const generateConditionalFilter = (
  filter: ConditionalFilter,
  parent = "",
): string => {
  let rawQuery = "";

  filter.value.map((item, index) => {
    if (item.operator !== "or" && item.operator !== "and" && "field" in item) {
      rawQuery += generateLogicalFilter(
        item,
        `${parent}[$${filter.operator}][${index}]`,
      );
    } else {
      rawQuery += generateConditionalFilter(
        item,
        `${parent}[$${filter.operator}][${index}]`,
      );
    }
  });
  return rawQuery;
};

export const generateFilter = (filters?: CrudFilters) => {
  let rawQuery = "";

  if (filters) {
    filters.map((filter) => {
      if (
        filter.operator !== "or" &&
        filter.operator !== "and" &&
        "field" in filter
      ) {
        rawQuery += generateLogicalFilter(filter);
      } else {
        rawQuery += generateConditionalFilter(filter);
      }
    });
  }

  const parsedQuery = qs.parse(rawQuery, { depth: 15 });

  const queryFilters = qs.stringify(parsedQuery, { encodeValuesOnly: true });

  return queryFilters;
};
