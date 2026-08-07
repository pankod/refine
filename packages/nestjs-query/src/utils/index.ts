import type {
  CrudFilter,
  CrudOperators,
  CrudSorting,
  LogicalFilter,
  Pagination,
} from "@refinedev/core";

import camelcase from "camelcase";
import * as gql from "gql-query-builder";
import type VariableOptions from "gql-query-builder/build/VariableOptions";
import type { Client } from "graphql-ws";
import set from "lodash/set";
import { singular } from "pluralize";

import { getOperationFields } from "./graphql";

export const generateSubscription = (
  client: Client,
  { callback, params, meta }: any,
  type: string,
) => {
  const generatorMap: any = {
    created: generateCreatedSubscription,
    updated: generateUpdatedSubscription,
    deleted: generateDeletedSubscription,
  };

  const { resource, filters, subscriptionType, id, ids } = params ?? {};

  const generator = generatorMap[type];

  const { operation, query, variables, operationName } = generator({
    ids,
    id,
    resource,
    filters,
    meta,
    subscriptionType,
  });

  const onNext = (payload: any) => {
    callback(payload.data[operation]);
  };

  const unsubscribe = client.subscribe(
    { query, variables, operationName },
    {
      next: onNext,
      error: console.error,
      complete: () => null,
    },
  );

  return unsubscribe;
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

export const generateFilters = (filters: LogicalFilter[]) => {
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
          generateFilters(filter.value as LogicalFilter[]),
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

export const generateSorting = (sorters: CrudSorting) => {
  return sorters.map((sorter) => {
    return {
      field: sorter.field,
      direction: sorter.order.toUpperCase(),
    };
  });
};

export const generatePaging = (pagination: Pagination) => {
  // maximum value of 32 bit signed integer
  if (pagination.mode === "off") return { limit: 2147483647 };

  if (pagination.mode !== "server") return undefined;

  if (!pagination.currentPage || !pagination.pageSize) return undefined;

  return {
    limit: pagination.pageSize,
    offset: (pagination.currentPage - 1) * pagination.pageSize,
  };
};

export const generateCreatedSubscription = ({
  resource,
  filters,
  meta,
}: any) => {
  const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;

  if (gqlOperation) {
    const singularResourceName = camelcase(singular(resource), {
      pascalCase: true,
    });

    const operationName = `Created${singularResourceName}`;

    const operation = `created${singularResourceName}`;

    const query = `
            subscription ${operationName}($input: Create${singularResourceName}SubscriptionFilterInput) {
                ${operation}(input: $input) {
                    ${getOperationFields(gqlOperation)}
                }
            }
        `;

    const variables: VariableOptions = {};

    if (filters) {
      variables["input"] = {
        filter: generateFilters(
          filters.filter(
            (filter: LogicalFilter) => !filter.field.includes("."),
          ),
        ),
      };
    }

    return { query, variables, operation, operationName };
  }

  const operation = `created${camelcase(singular(resource), {
    pascalCase: true,
  })}`;

  const queryVariables: VariableOptions = {};

  if (filters) {
    queryVariables["input"] = {
      type: camelcase(
        `create_${singular(resource)}_subscription_filter_input`,
        {
          pascalCase: true,
        },
      ),
      required: true,
      value: {
        filter: generateFilters(
          filters.filter(
            (filter: LogicalFilter) => !filter.field.includes("."),
          ),
        ),
      },
    };
  }

  const { query, variables } = gql.subscription({
    operation,
    fields: meta.fields,
    variables: queryVariables,
  });

  return { query, variables, operation };
};

export const generateUpdatedSubscription = ({
  id,
  resource,
  filters,
  meta,
}: any) => {
  const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;

  if (gqlOperation) {
    const singularResourceName = camelcase(singular(resource), {
      pascalCase: true,
    });

    const operationName = `Updated${singularResourceName}`;

    const operation = `updatedOne${singularResourceName}`;

    const query = `
            subscription ${operationName}($input: UpdateOne${singularResourceName}SubscriptionFilterInput) {
                ${operation}(input: $input) {
                   ${getOperationFields(gqlOperation)}
                }
            }
        `;

    const variables: VariableOptions = {};

    if (filters) {
      variables["input"] = {
        filter: generateFilters(
          filters.filter(
            (filter: LogicalFilter) => !filter.field.includes("."),
          ),
        ),
      };
    }

    if (id) {
      variables["input"] = {
        filter: {
          id: { eq: id },
        },
      };
    }

    return { query, variables, operation, operationName };
  }

  const operation = `updatedOne${camelcase(singular(resource), {
    pascalCase: true,
  })}`;

  const queryVariables: VariableOptions = {};

  if (filters) {
    queryVariables["input"] = {
      type: camelcase(
        `update_one_${singular(resource)}_subscription_filter_input`,
        {
          pascalCase: true,
        },
      ),
      required: true,
      value: {
        filter: generateFilters(
          filters.filter(
            (filter: LogicalFilter) => !filter.field.includes("."),
          ),
        ),
      },
    };
  }

  if (id) {
    queryVariables["input"] = {
      type: camelcase(
        `update_one_${singular(resource)}_subscription_filter_input`,
        {
          pascalCase: true,
        },
      ),
      required: true,
      value: {
        filter: {
          id: { eq: id },
        },
      },
    };
  }

  const { query, variables } = gql.subscription({
    operation,
    fields: meta.fields,
    variables: queryVariables,
  });

  return { query, variables, operation };
};

export const generateDeletedSubscription = ({
  resource,
  filters,
  meta,
}: any) => {
  if (meta?.gqlQuery) {
    const singularResourceName = camelcase(singular(resource), {
      pascalCase: true,
    });

    const operationName = `Deleted${singularResourceName}`;

    const operation = `deletedOne${singularResourceName}`;

    const query = `
            subscription ${operationName}($input: DeleteOne${singularResourceName}SubscriptionFilterInput) {
                ${operation}(input: $input) {
                    id
                }
            }
        `;

    const variables: VariableOptions = {};

    if (filters) {
      variables["input"] = {
        filter: generateFilters(
          filters.filter(
            (filter: LogicalFilter) => !filter.field.includes("."),
          ),
        ),
      };
    }

    return { query, variables, operation, operationName };
  }

  const operation = `deletedOne${camelcase(singular(resource), {
    pascalCase: true,
  })}`;

  const queryVariables: VariableOptions = {};

  if (filters) {
    queryVariables["input"] = {
      type: camelcase(
        `delete_one_${singular(resource)}_subscription_filter_input`,
        {
          pascalCase: true,
        },
      ),
      required: true,
      value: {
        filter: generateFilters(
          filters.filter(
            (filter: LogicalFilter) => !filter.field.includes("."),
          ),
        ),
      },
    };
  }

  const { query, variables } = gql.subscription({
    operation,
    fields: meta.fields.filter(
      (field: string | object) => typeof field !== "object",
    ),
    variables: queryVariables,
  });

  return { query, variables, operation };
};
