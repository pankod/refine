import type { MetaQuery, BaseKey } from "@refinedev/core";
import camelcase from "camelcase";
import * as gql from "gql-query-builder";
import { getOperationFields } from "./graphql";
import type { NamingConvention } from "../types";

type GenerateUseManySubscriptionParams = {
  resource: string;
  meta: MetaQuery;
  ids?: BaseKey[];
  namingConvention?: NamingConvention;
};

type GenerateUseManySubscriptionReturnValues = {
  variables: any;
  query: string;
  operation: string;
};

export const generateUseManySubscription = ({
  resource,
  meta,
  ids,
  namingConvention,
}: GenerateUseManySubscriptionParams): GenerateUseManySubscriptionReturnValues => {
  if (!ids) {
    console.error(
      "[useSubscription]: `ids` is required in `params` for graphql subscriptions",
    );
  }
  const defaultNamingConvention = namingConvention === "hasura-default";

  const operation = defaultNamingConvention
    ? meta.operation ?? resource
    : camelcase(meta.operation ?? resource);
  const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;

  const hasuraFiltersType = `${operation}_bool_exp`;

  if (gqlOperation) {
    const query = `
            subscription ${operation}($where: ${hasuraFiltersType} ) {
                ${operation}(where: $where) {
                    ${getOperationFields(gqlOperation)}
                }
            }
        `;

    const variables = {
      where: {
        id: {
          _in: ids,
        },
      },
    };

    return { query, variables, operation };
  }

  const { query, variables } = gql.subscription({
    operation,
    fields: meta.fields,
    variables: meta.variables ?? {
      where: {
        type: hasuraFiltersType,
        value: {
          id: {
            _in: ids,
          },
        },
      },
    },
  });

  return { query, variables, operation };
};

/**
 * @deprecated Please use `generateUseManySubscription` instead.
 */
export const genereteUseManySubscription = generateUseManySubscription;
