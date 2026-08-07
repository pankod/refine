import type { CrudSorting, MetaQuery, Pagination } from "@refinedev/core";
import * as gql from "gql-query-builder";
import camelcase from "camelcase";
import { type HasuraCrudFilters, generateFilters } from "./generateFilters";
import { generateSorting } from "./generateSorting";
import { getOperationFields } from "./graphql";
import type { NamingConvention } from "../types";

type GenerateUseListSubscriptionParams = {
  resource: string;
  meta: MetaQuery;
  pagination?: Pagination;
  sorters?: CrudSorting;
  filters?: HasuraCrudFilters;
  namingConvention?: NamingConvention;
};

type GenerateUseListSubscriptionReturnValues = {
  variables: any;
  query: string;
  operation: string;
};

export const generateUseListSubscription = ({
  resource,
  meta,
  pagination,
  sorters,
  filters,
  namingConvention,
}: GenerateUseListSubscriptionParams): GenerateUseListSubscriptionReturnValues => {
  const {
    currentPage = 1,
    pageSize: limit = 10,
    mode = "server",
  } = pagination ?? {};
  const defaultNamingConvention = namingConvention === "hasura-default";

  const hasuraSorting = generateSorting(sorters);
  const hasuraFilters = generateFilters(filters, "hasura-default");

  const operation = defaultNamingConvention
    ? meta.operation ?? resource
    : camelcase(meta.operation ?? resource);

  const hasuraSortingType = `[${operation}_order_by!]`;
  const hasuraFiltersType = `${operation}_bool_exp`;

  const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;
  if (gqlOperation) {
    const query = `
            subscription ${operation}($limit: Int, $offset: Int, $order_by: ${hasuraSortingType}, $where: ${hasuraFiltersType} ) {
                ${operation}( limit: $limit, offset: $offset, order_by: $order_by, where: $where ) {
                    ${getOperationFields(gqlOperation)}
                }
            }
        `;

    const variables = {
      ...(mode === "server"
        ? {
            limit,
            offset: (currentPage - 1) * limit,
          }
        : {}),
      ...(hasuraSorting && {
        order_by: hasuraSorting,
      }),
      ...(hasuraFilters && {
        where: hasuraFilters,
      }),
    };

    return { query, variables, operation };
  }

  const { query, variables } = gql.subscription([
    {
      operation,
      fields: meta.fields,
      variables: {
        ...(mode === "server"
          ? {
              limit,
              offset: (currentPage - 1) * limit,
            }
          : {}),
        ...(hasuraSorting && {
          order_by: {
            value: hasuraSorting,
            type: hasuraSortingType,
          },
        }),
        ...(hasuraFilters && {
          where: {
            value: hasuraFilters,
            type: hasuraFiltersType,
          },
        }),
      },
    },
  ]);

  return { query, variables, operation };
};

/**
 * @deprecated Please use `generateUseListSubscription` instead.
 */
export const genereteUseListSubscription = generateUseListSubscription;
