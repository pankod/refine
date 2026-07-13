import type { LogicalFilter, VariableOptions } from "@refinedev/core";
import camelcase from "camelcase";
import type { Client } from "graphql-ws";
import { singular } from "pluralize";

import { getOperationFields } from "../utils/graphql";
import { buildFilters } from "../utils";

export const generateCreatedSubscription = ({
  resource,
  filters,
  meta,
}: any) => {
  const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;

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
      filter: buildFilters(
        filters.filter((filter: LogicalFilter) => !filter.field.includes(".")),
      ),
    };
  }

  return { query, variables, operation, operationName };
};

export const generateUpdatedSubscription = ({
  id,
  resource,
  filters,
  meta,
}: any) => {
  const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;

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
      filter: buildFilters(
        filters.filter((filter: LogicalFilter) => !filter.field.includes(".")),
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
};

export const generateDeletedSubscription = ({ resource, filters }: any) => {
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
      filter: buildFilters(
        filters.filter((filter: LogicalFilter) => !filter.field.includes(".")),
      ),
    };
  }

  return { query, variables, operation, operationName };
};

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
