import type { MetaQuery, BaseKey } from "@refinedev/core";
import camelcase from "camelcase";
import * as gql from "gql-query-builder";
import { getOperationFields } from "./graphql";
import type { IDType, NamingConvention } from "../types";

type GenerateUseOneSubscriptionParams = {
  resource: string;
  meta: MetaQuery;
  id?: BaseKey;
  idType?: IDType;
  namingConvention?: NamingConvention;
};

type GenerateUseOneSubscriptionReturnValues = {
  variables: any;
  query: string;
  operation: string;
};

export const generateUseOneSubscription = ({
  resource,
  meta,
  id,
  idType = "uuid",
  namingConvention,
}: GenerateUseOneSubscriptionParams): GenerateUseOneSubscriptionReturnValues => {
  if (!id) {
    console.error(
      "[useSubscription]: `id` is required in `params` for graphql subscriptions",
    );
  }
  const defaultNamingConvention = namingConvention === "hasura-default";

  const operation = defaultNamingConvention
    ? `${meta.operation ?? resource}_by_pk`
    : camelcase(`${meta.operation ?? resource}_by_pk`);
  const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;
  if (gqlOperation) {
    const query = `
            subscription ${operation}($id: ${idType}!) {
                ${operation}(id: $id) {
                    ${getOperationFields(gqlOperation)}
                }
            }
        `;

    const variables = {
      id,
    };

    return { query, variables, operation };
  }

  const { query, variables } = gql.subscription({
    operation,
    variables: {
      id: { value: id, type: "uuid", required: true },
      ...meta.variables,
    },
    fields: meta.fields,
  });

  return { query, variables, operation };
};

/**
 * @deprecated Please use `generateUseOneSubscription` instead.
 */
export const genereteUseOneSubscription = generateUseOneSubscription;
