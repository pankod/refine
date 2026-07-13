import type {
  ConditionalFilter,
  CrudOperators,
  LogicalFilter,
} from "@refinedev/core";
import camelcase from "camelcase";
import setWith from "lodash/setWith";
import cloneDeep from "lodash/cloneDeep";
import type { NamingConvention } from "../types";
import type { BoolExp, MultiConditionFilter } from "./boolexp";

export type HasuraFilterCondition =
  | "_and"
  | "_not"
  | "_or"
  | "_eq"
  | "_gt"
  | "_gte"
  | "_lt"
  | "_lte"
  | "_neq"
  | "_in"
  | "_nin"
  | "_like"
  | "_nlike"
  | "_ilike"
  | "_nilike"
  | "_is_null"
  | "_similar"
  | "_nsimilar"
  | "_regex"
  | "_iregex";

export type HasuraCrudOperators = CrudOperators | "not";

export type HasuraLogicalFilter = Omit<LogicalFilter, "operator"> & {
  operator: Exclude<HasuraCrudOperators, "or" | "and" | "not">;
};

export type HasuraConditionalFilter = Omit<
  ConditionalFilter,
  "operator" | "value"
> & {
  operator: Extract<HasuraCrudOperators, "or" | "and" | "not">;
  value: HasuraCrudFilters;
};

export type HasuraCrudFilter = HasuraLogicalFilter | HasuraConditionalFilter;

export type HasuraCrudFilters = HasuraCrudFilter[];

const hasuraFilters: Partial<
  Record<HasuraCrudOperators, HasuraFilterCondition | undefined>
> = {
  eq: "_eq",
  ne: "_neq",
  lt: "_lt",
  gt: "_gt",
  lte: "_lte",
  gte: "_gte",
  in: "_in",
  nin: "_nin",
  contains: "_ilike",
  ncontains: "_nilike",
  containss: "_like",
  ncontainss: "_nlike",
  null: "_is_null",
  or: "_or",
  and: "_and",
  not: "_not",
  nnull: "_is_null",
  startswith: "_iregex",
  nstartswith: "_iregex",
  endswith: "_iregex",
  nendswith: "_iregex",
  startswiths: "_similar",
  nstartswiths: "_nsimilar",
  endswiths: "_similar",
  nendswiths: "_nsimilar",
};

export const handleFilterValue = (
  operator: HasuraCrudOperators,
  value: any,
) => {
  switch (operator) {
    case "startswiths":
    case "nstartswiths":
      return `${value}%`;
    case "endswiths":
    case "nendswiths":
      return `%${value}`;
    case "startswith":
      return `^${value}`;
    case "nstartswith":
      return `^(?!${value})`;
    case "endswith":
      return `${value}$`;
    case "nendswith":
      return `(?<!${value})$`;
    case "nnull":
      return false;
    case "contains":
    case "containss":
    case "ncontains":
    case "ncontainss":
      return `%${value}%`;
    default:
      return value;
  }
};

const convertHasuraOperatorToGraphqlDefaultNaming = (
  hasuraOperator?: HasuraFilterCondition,
) => {
  return hasuraOperator ? `_${camelcase(hasuraOperator)}` : undefined;
};

export const generateNestedFilterQuery = (
  filter: HasuraCrudFilter,
  namingConvention: NamingConvention = "hasura-default",
): BoolExp => {
  const { operator } = filter;

  if (
    operator !== "or" &&
    operator !== "and" &&
    operator !== "not" &&
    "field" in filter
  ) {
    const { field, value } = filter;

    const defaultNamingConvention = namingConvention === "hasura-default";
    const hasuraOperator = defaultNamingConvention
      ? hasuraFilters[filter.operator]
      : convertHasuraOperatorToGraphqlDefaultNaming(
          hasuraFilters[filter.operator],
        );
    if (!hasuraOperator) {
      throw new Error(`Operator ${operator} is not supported`);
    }

    const fieldsArray = field.split(".");
    const fieldsWithOperator = [...fieldsArray, hasuraOperator];
    const filteredValue = handleFilterValue(operator, value);

    return {
      ...setWith({}, fieldsWithOperator, filteredValue, Object),
    };
  }

  return {
    [`_${operator}`]: filter.value.map((f) =>
      generateNestedFilterQuery(f, namingConvention),
    ),
  };
};

export const generateFilters = (
  filters?: HasuraCrudFilters,
  namingConvention: NamingConvention = "hasura-default",
): BoolExp | undefined => {
  if (!filters) {
    return undefined;
  }

  const nestedQuery = generateNestedFilterQuery(
    {
      operator: "and",
      value: filters,
    },
    namingConvention,
  );

  return nestedQuery;
};

function isMultiConditionFilter(key: string): key is MultiConditionFilter {
  const keys: MultiConditionFilter[] = ["_and", "_or"];
  return keys.includes(key as MultiConditionFilter);
}

export const mergeHasuraFilters = (
  filters?: BoolExp,
  metaFilters?: BoolExp,
): BoolExp | undefined => {
  if (!metaFilters) {
    return filters;
  }
  const mergedFilters = filters ? cloneDeep(filters) : {};
  const gqlVariableFilters = Object.entries(metaFilters);
  const arbitraryOperators = gqlVariableFilters.filter((f) => {
    const [k] = f;
    return !isMultiConditionFilter(k);
  });

  if (
    arbitraryOperators.length > 1 ||
    (metaFilters._and && arbitraryOperators.length)
  ) {
    if (!mergedFilters._and) {
      mergedFilters._and = [];
    }
  }

  if (
    arbitraryOperators.length > 1 ||
    ((metaFilters._and || metaFilters._or) && arbitraryOperators.length)
  ) {
    console.warn(
      "@packages/hasura: multiple filters present. Group multiple parameters using the _and or the _or operator. Tip: You can use the _or and _and operators along with the _not operator to create arbitrarily complex boolean expressions involving multiple filtering criteria.",
    );
  }

  gqlVariableFilters.forEach((filter) => {
    const [k, v] = filter;

    if (!isMultiConditionFilter(k) && mergedFilters._and) {
      // Group Multiple Parameters Together
      mergedFilters._and = mergedFilters._and.concat({ [k]: v });
    } else if (k === "_and" && mergedFilters._and) {
      // Merge _and conditions from both groups of Hasura Filters
      if (!Array.isArray(v)) {
        throw new Error(
          "@packages/hasura: unexpected value for BoolExp _and. Expected an Array.",
        );
      }
      mergedFilters._and = mergedFilters._and.concat(v);
    } else {
      mergedFilters[k] = v;
    }
  });
  return mergedFilters;
};
