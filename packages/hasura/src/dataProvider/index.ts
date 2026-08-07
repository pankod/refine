import type { BaseRecord, DataProvider } from "@refinedev/core";
import * as gql from "gql-query-builder";
import { GraphQLClient } from "graphql-request";
import {
  camelizeKeys,
  generateFilters,
  generateSorting,
  getOperationFields,
  isMutation,
  mergeHasuraFilters,
  metaFieldsToGqlFields,
  upperCaseValues,
} from "../utils";
import camelcase from "camelcase";
import gqlTag from "graphql-tag";
import { getIdType, type HasuraProviderOptions } from "../types";

export type HasuraDataProviderOptions = HasuraProviderOptions & {};

const dataProvider = (
  client: GraphQLClient,
  options?: HasuraDataProviderOptions,
): Required<DataProvider> => {
  const { idType, namingConvention = "hasura-default" } = options ?? {};
  const defaultNamingConvention = namingConvention === "hasura-default";

  return {
    getOne: async ({ resource, id, meta }) => {
      const operation = defaultNamingConvention
        ? `${meta?.operation ?? resource}_by_pk`
        : camelcase(`${meta?.operation ?? resource}_by_pk`);
      const pascalOperation = camelcase(operation, {
        pascalCase: true,
      });

      const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;

      if (gqlOperation) {
        let query = gqlOperation;
        const variables = {
          id,
          ...meta?.gqlVariables,
        };

        if (isMutation(gqlOperation)) {
          const stringFields = getOperationFields(gqlOperation);

          query = gqlTag`
                        query Get${pascalOperation}($id: ${getIdType(
                          resource,
                          idType,
                        )}!) {
                            ${operation}(id: $id) {
                            ${stringFields}
                            }
                        }
                    `;
        }

        const response = await client.request<BaseRecord>(query, variables);

        return {
          data: response[operation],
        };
      }

      const { query, variables } = gql.query({
        operation,
        variables: {
          id: {
            value: id,
            type: getIdType(resource, idType),
            required: true,
          },
          ...meta?.variables,
        },
        fields: meta?.fields,
      });

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[operation],
      };
    },

    getMany: async ({ resource, ids, meta }) => {
      const operation = defaultNamingConvention
        ? meta?.operation ?? resource
        : camelcase(meta?.operation ?? resource);

      const type = defaultNamingConvention
        ? `${operation}_bool_exp`
        : camelcase(`${operation}_bool_exp`, { pascalCase: true });

      if (meta?.gqlQuery) {
        const hasuraFilters = mergeHasuraFilters(
          {
            id: {
              _in: ids,
            },
          },
          meta?.gqlVariables?.where,
        );

        const variables = {
          ...(meta.gqlVariables && meta.gqlVariables),
          ...(hasuraFilters && {
            where: hasuraFilters,
          }),
        };

        const response = await client.request<BaseRecord>(
          meta.gqlQuery,
          variables,
        );
        return {
          data: response[operation],
        };
      }

      const { query, variables } = gql.query({
        operation,
        fields: meta?.fields,
        variables: meta?.variables ?? {
          where: {
            type,
            value: {
              id: {
                _in: ids,
              },
            },
          },
        },
      });

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[operation],
      };
    },

    getList: async ({ resource, sorters, filters, pagination, meta }) => {
      const operation = defaultNamingConvention
        ? meta?.operation ?? resource
        : camelcase(meta?.operation ?? resource);

      const aggregateOperation = defaultNamingConvention
        ? `${operation}_aggregate`
        : camelcase(`${operation}_aggregate`);

      const {
        currentPage = 1,
        pageSize: limit = 10,
        mode = "server",
      } = pagination ?? {};

      const hasuraPagination =
        mode === "server" ? { limit, offset: (currentPage - 1) * limit } : {};

      const hasuraSorting = defaultNamingConvention
        ? generateSorting(sorters)
        : upperCaseValues(camelizeKeys(generateSorting(sorters)));

      let hasuraFilters = generateFilters(filters, namingConvention);
      let query;
      let variables;

      if (meta?.gqlQuery) {
        hasuraFilters = mergeHasuraFilters(
          hasuraFilters,
          meta?.gqlVariables?.where,
        );
        query = meta.gqlQuery;
        variables = {
          ...hasuraPagination,
          ...(hasuraSorting &&
            (namingConvention === "graphql-default"
              ? {
                  orderBy: hasuraSorting,
                }
              : {
                  order_by: hasuraSorting,
                })),
          ...(meta.gqlVariables && meta.gqlVariables),
          ...(hasuraFilters && {
            where: hasuraFilters,
          }),
        };
      } else {
        const hasuraSortingType = defaultNamingConvention
          ? `[${operation}_order_by!]`
          : `[${camelcase(`${operation}_order_by!`, {
              pascalCase: true,
            })}]`;

        const hasuraFiltersType = defaultNamingConvention
          ? `${operation}_bool_exp`
          : camelcase(`${operation}_bool_exp`, { pascalCase: true });

        const gqlQuery = gql.query([
          {
            operation,
            fields: meta?.fields,
            variables: {
              ...hasuraPagination,
              ...(hasuraSorting &&
                (namingConvention === "graphql-default"
                  ? {
                      orderBy: {
                        value: hasuraSorting,
                        type: hasuraSortingType,
                      },
                    }
                  : {
                      order_by: {
                        value: hasuraSorting,
                        type: hasuraSortingType,
                      },
                    })),
              ...(hasuraFilters && {
                where: {
                  value: hasuraFilters,
                  type: hasuraFiltersType,
                },
              }),
            },
          },
          {
            operation: aggregateOperation,
            fields: [{ aggregate: ["count"] }],
            variables: {
              where: {
                value: hasuraFilters,
                type: hasuraFiltersType,
              },
            },
          },
        ]);

        query = gqlQuery.query;
        variables = gqlQuery.variables;
      }

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[operation],
        total: response[aggregateOperation].aggregate.count,
      };
    },

    create: async ({ resource, variables, meta }) => {
      const operation = defaultNamingConvention
        ? meta?.operation ?? resource
        : camelcase(meta?.operation ?? resource);
      const insertOperation = defaultNamingConvention
        ? `insert_${operation}_one`
        : camelcase(`insert_${operation}_one`);

      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (gqlOperation) {
        const response = await client.request<BaseRecord>(gqlOperation, {
          object: variables || {},
          ...meta?.gqlVariables,
        });

        return {
          data: response[insertOperation],
        };
      }

      const insertType = defaultNamingConvention
        ? `${operation}_insert_input`
        : camelcase(`${operation}_insert_input`, { pascalCase: true });
      const { query, variables: gqlVariables } = gql.mutation({
        operation: insertOperation,
        variables: {
          object: {
            type: insertType,
            value: variables,
            required: true,
          },
        },
        fields: meta?.fields ?? ["id", ...Object.keys(variables || {})],
      });

      const response = await client.request<BaseRecord>(query, gqlVariables);

      return {
        data: response[insertOperation],
      };
    },

    createMany: async ({ resource, variables: variablesFromParams, meta }) => {
      const operation = meta?.operation ?? resource;
      const pascalOperation = camelcase(operation, {
        pascalCase: true,
      });
      const insertOperation = defaultNamingConvention
        ? `insert_${operation}`
        : camelcase(`insert_${operation}`);

      if (meta?.gqlMutation) {
        const response = await client.request<BaseRecord>(meta.gqlMutation, {
          objects: variablesFromParams,
          ...meta?.gqlVariables,
        });

        return {
          data: response[insertOperation]["returning"],
        };
      }

      const insertType = defaultNamingConvention
        ? `[${operation}_insert_input!]`
        : `[${camelcase(`${operation}_insert_input!`, {
            pascalCase: true,
          })}]`;
      const query = gqlTag`
                  mutation CreateMany${pascalOperation}($objects: ${insertType}!) {
                      ${insertOperation}(objects: $objects) {
                          returning {
                              id
                              ${metaFieldsToGqlFields(meta?.fields)}
                          }
                      }
                  }
              `;

      const variables = {
        objects: variablesFromParams,
      };

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[insertOperation]["returning"],
      };
    },

    update: async ({ resource, id, variables, meta }) => {
      const operation = meta?.operation ?? resource;
      const updateOperation = defaultNamingConvention
        ? `update_${operation}_by_pk`
        : camelcase(`update_${operation}_by_pk`);

      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (gqlOperation) {
        const response = await client.request<BaseRecord>(gqlOperation, {
          id,
          object: variables || {},
          ...meta?.gqlVariables,
        });

        return {
          data: response[updateOperation],
        };
      }

      const pkColumnsType = defaultNamingConvention
        ? `${operation}_pk_columns_input`
        : camelcase(`${operation}_pk_columns_input!`, {
            pascalCase: true,
          });
      const setInputType = defaultNamingConvention
        ? `${operation}_set_input`
        : camelcase(`${operation}_set_input`, { pascalCase: true });
      const { query, variables: gqlVariables } = gql.mutation({
        operation: updateOperation,
        variables: {
          ...(defaultNamingConvention
            ? {
                pk_columns: {
                  type: pkColumnsType,
                  value: {
                    id: id,
                  },
                  required: true,
                },
              }
            : {
                pkColumns: {
                  type: pkColumnsType,
                  value: {
                    id: id,
                  },
                },
              }),
          _set: {
            type: setInputType,
            value: variables,
            required: true,
          },
        },
        fields: meta?.fields ?? ["id"],
      });

      const response = await client.request<BaseRecord>(query, gqlVariables);

      return {
        data: response[updateOperation],
      };
    },

    updateMany: async ({
      resource,
      ids,
      variables: variablesFromParams,
      meta,
    }) => {
      const operation = meta?.operation ?? resource;
      const pascalOperation = camelcase(operation, {
        pascalCase: true,
      });
      const updateOperation = defaultNamingConvention
        ? `update_${operation}`
        : camelcase(`update_${operation}`);

      if (meta?.gqlMutation) {
        const response = await client.request<BaseRecord>(meta.gqlMutation, {
          ids,
          _set: variablesFromParams,
          ...meta?.gqlVariables,
        });

        return {
          data: response[updateOperation]["returning"],
        };
      }

      const whereType = defaultNamingConvention
        ? `${operation}_bool_exp`
        : camelcase(`${operation}_bool_exp`, { pascalCase: true });
      const setInputType = defaultNamingConvention
        ? `${operation}_set_input`
        : camelcase(`${operation}_set_input`, { pascalCase: true });
      const query = gqlTag`
                mutation UpdateMany${pascalOperation}($where: ${whereType}!, $_set: ${setInputType}!) {
                    ${updateOperation}(where: $where, _set: $_set) {
                        returning {
                            id
                             ${metaFieldsToGqlFields(meta?.fields)}
                        }
                    }
                }
            `;

      const variables = meta?.variables ?? {
        where: {
          id: {
            _in: ids,
          },
        },
        _set: variablesFromParams,
      };

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[updateOperation]["returning"],
      };
    },

    deleteOne: async ({ resource, id, meta }) => {
      const operation = meta?.operation ?? resource;

      const deleteOperation = defaultNamingConvention
        ? `delete_${operation}_by_pk`
        : camelcase(`delete_${operation}_by_pk`);

      if (meta?.gqlMutation) {
        const response = await client.request<BaseRecord>(meta.gqlMutation, {
          id,
          ...meta?.gqlVariables,
        });

        return {
          data: response[deleteOperation],
        };
      }

      const { query, variables } = gql.mutation({
        operation: deleteOperation,
        variables: {
          id: {
            value: id,
            type: getIdType(resource, idType),
            required: true,
          },
          ...meta?.variables,
        },
        fields: meta?.fields ?? ["id"],
      });

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[deleteOperation],
      };
    },

    deleteMany: async ({ resource, ids, meta }) => {
      const operation = meta?.operation ?? resource;
      const pascalOperation = camelcase(operation, {
        pascalCase: true,
      });
      const deleteOperation = defaultNamingConvention
        ? `delete_${operation}`
        : camelcase(`delete_${operation}`);

      if (meta?.gqlMutation) {
        const hasuraFilters = mergeHasuraFilters(
          {
            id: {
              _in: ids,
            },
          },
          meta?.gqlVariables?.where,
        );

        const variables = {
          ...(meta.gqlVariables && meta.gqlVariables),
          ...(hasuraFilters && {
            where: hasuraFilters,
          }),
        };

        const response = await client.request<BaseRecord>(
          meta?.gqlMutation,
          variables,
        );

        return {
          data: response[deleteOperation]["returning"],
        };
      }

      const whereType = defaultNamingConvention
        ? `${operation}_bool_exp`
        : camelcase(`${operation}_bool_exp`, { pascalCase: true });
      const query = gqlTag`
                mutation DeleteMany${pascalOperation}($where: ${whereType}!) {
                    ${deleteOperation}(where: $where) {
                        returning {
                            id
                             ${metaFieldsToGqlFields(meta?.fields)}
                        }
                    }
                }
            `;

      const variables = meta?.variables ?? {
        where: {
          id: {
            _in: ids,
          },
        },
      };

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[deleteOperation]["returning"],
      };
    },

    getApiUrl: () => {
      throw new Error(
        "getApiUrl method is not implemented on refine-hasura data provider.",
      );
    },

    custom: async ({ url, method, headers, meta }) => {
      let gqlClient = client;

      if (url) {
        gqlClient = new GraphQLClient(url, { headers });
      }

      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (gqlOperation) {
        const response: any = await client.request(
          gqlOperation,
          meta?.gqlVariables ?? {},
        );

        return { data: response };
      }

      if (meta) {
        if (meta.operation) {
          if (method === "get") {
            const { query, variables } = gql.query({
              operation: meta.operation,
              fields: meta.fields,
              variables: meta.variables,
            });

            const response = await gqlClient.request<BaseRecord>(
              query,
              variables,
            );
            response.data;

            return {
              data: response[meta.operation],
            };
          }
          const { query, variables } = gql.mutation({
            operation: meta.operation,
            fields: meta.fields,
            variables: meta.variables,
          });

          const response = await gqlClient.request<BaseRecord>(
            query,
            variables,
          );

          return {
            data: response[meta.operation],
          };
        }
        throw Error("GraphQL operation name required.");
      }
      throw Error(
        "GraphQL need to operation, fields and variables values in meta object.",
      );
    },
  };
};

export default dataProvider;
