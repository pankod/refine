import type { BaseRecord, DataProvider, LogicalFilter } from "@refinedev/core";

import camelcase from "camelcase";
import * as gql from "gql-query-builder";
import type VariableOptions from "gql-query-builder/build/VariableOptions";
import { GraphQLClient } from "graphql-request";
import gqlTag from "graphql-tag";
import { singular } from "pluralize";

import { generateFilters, generatePaging, generateSorting } from "../utils";

import { getOperationFields, isMutation } from "../utils/graphql";

const dataProvider = (client: GraphQLClient): Required<DataProvider> => {
  return {
    getList: async ({ resource, pagination, sorters, filters, meta }) => {
      const operation = camelcase(resource);

      const paging = generatePaging(pagination || {});

      const queryVariables: VariableOptions = {};

      let query;
      let variables;

      if (meta?.gqlQuery) {
        query = meta?.gqlQuery;

        variables = {
          filter: filters ? generateFilters(filters as LogicalFilter[]) : {},
          sorting: sorters ? generateSorting(sorters) : [],
          paging,
        };
      } else {
        if (filters) {
          queryVariables["filter"] = {
            type: camelcase(`${singular(resource)}Filter`, {
              pascalCase: true,
            }),
            required: true,
            value: generateFilters(filters as LogicalFilter[]),
          };
        }

        if (sorters) {
          queryVariables["sorting"] = {
            type: camelcase(`${singular(resource)}Sort`, {
              pascalCase: true,
            }),
            required: true,
            list: [true],
            value: generateSorting(sorters),
          };
        }

        if (paging) {
          queryVariables["paging"] = {
            type: "OffsetPaging",
            required: true,
            value: paging,
          };
        }

        const gqlQuery = gql.query({
          operation,
          fields: [{ nodes: meta?.fields }, "totalCount"],
          variables: queryVariables,
        });

        query = gqlQuery.query;
        variables = gqlQuery.variables;
      }

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[operation].nodes,
        total: response[operation].totalCount,
      };
    },

    getMany: async ({ resource, ids, meta }) => {
      const operation = camelcase(resource);

      if (meta?.gqlQuery) {
        const response = await client.request<BaseRecord>(meta.gqlQuery, {
          filter: {
            id: { in: ids },
          },
        });

        return {
          data: response[operation].nodes,
        };
      }

      const { query, variables } = gql.query({
        operation,
        fields: [{ nodes: meta?.fields || ["id"] }],
        variables: {
          filter: {
            type: camelcase(`${singular(resource)}Filter`, {
              pascalCase: true,
            }),
            required: true,
            value: {
              id: { in: ids },
            },
          },
        },
      });

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[operation].nodes,
      };
    },

    create: async ({ resource, variables, meta }) => {
      const operation = `createOne${camelcase(singular(resource), {
        pascalCase: true,
      })}`;

      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (gqlOperation) {
        const response = await client.request<BaseRecord>(gqlOperation, {
          input: { [camelcase(singular(resource))]: variables },
        });

        return {
          data: response[operation],
        };
      }

      const { query, variables: queryVariables } = gql.mutation({
        operation,
        fields: meta?.fields || ["id"],
        variables: {
          input: {
            type: `CreateOne${camelcase(singular(resource), {
              pascalCase: true,
            })}Input`,
            required: true,
            value: {
              [camelcase(singular(resource))]: variables,
            },
          },
        },
      });

      const response = await client.request<BaseRecord>(query, queryVariables);

      return {
        data: response[operation],
      };
    },

    createMany: async ({ resource, variables, meta }) => {
      const pascalResource = camelcase(resource, { pascalCase: true });
      const operation = `createMany${pascalResource}`;

      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (gqlOperation) {
        const response = await client.request<BaseRecord>(gqlOperation, {
          input: {
            [camelcase(resource)]: variables,
          },
        });

        return {
          data: response[operation],
        };
      }

      const { query, variables: queryVariables } = gql.mutation({
        operation,
        fields: meta?.fields || ["id"],
        variables: {
          input: {
            type: `CreateMany${camelcase(resource, {
              pascalCase: true,
            })}Input`,
            required: true,
            value: {
              [camelcase(resource)]: variables,
            },
          },
        },
      });

      const response = await client.request<BaseRecord>(query, queryVariables);

      return {
        data: response[operation],
      };
    },
    update: async ({ resource, id, variables, meta }) => {
      const operation = `updateOne${camelcase(singular(resource), {
        pascalCase: true,
      })}`;

      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (gqlOperation) {
        const response = await client.request<BaseRecord>(gqlOperation, {
          input: {
            id,
            update: variables,
          },
        });

        return {
          data: response[operation],
        };
      }

      const { query, variables: queryVariables } = gql.mutation({
        operation,
        fields: meta?.fields || ["id"],
        variables: {
          input: {
            type: `UpdateOne${camelcase(singular(resource), {
              pascalCase: true,
            })}Input`,
            required: true,
            value: {
              id,
              update: variables,
            },
          },
        },
      });

      const response = await client.request<BaseRecord>(query, queryVariables);

      return {
        data: response[operation],
      };
    },
    updateMany: async ({ resource, ids, variables, meta }) => {
      const pascalResource = camelcase(resource, {
        pascalCase: true,
      });

      const mutationOperation = `updateMany${pascalResource}`;

      const mutation = gqlTag`
                mutation UpdateMany${pascalResource}($input: UpdateMany${pascalResource}Input!) {
                    ${mutationOperation}(input: $input) {
                        updatedCount
                    }
                }
            `;

      await client.request<BaseRecord>(mutation, {
        input: { filter: { id: { in: ids } }, update: variables },
      });

      const operation = camelcase(resource);

      let query;
      let queryVariables;

      if (meta?.fields) {
        const gqlQuery = gql.query({
          operation,
          fields: [{ nodes: meta?.fields || ["id"] }],
          variables: {
            filter: {
              type: camelcase(`${singular(resource)}Filter`, {
                pascalCase: true,
              }),
              required: true,
              value: {
                id: { in: ids },
              },
            },
          },
        });
        query = gqlQuery.query;
        queryVariables = gqlQuery.variables;
      } else {
        query = gqlTag`
                    query GetMany${pascalResource}($filter: ${singular(
                      pascalResource,
                    )}Filter!) {
                        ${operation}(filter: $filter) {
                            nodes {
                                id
                            }
                        }
                    }
                `;

        queryVariables = {
          filter: { id: { in: ids } },
        };
      }

      const response = await client.request<BaseRecord>(query, queryVariables);

      return {
        data: response[operation].nodes,
      };
    },
    getOne: async ({ resource, id, meta }) => {
      const operation = camelcase(singular(resource));

      const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;

      if (gqlOperation) {
        let query = gqlOperation;
        const variables = { id };

        if (isMutation(gqlOperation)) {
          const stringFields = getOperationFields(gqlOperation);

          query = gqlTag`
                        query Get${camelcase(singular(resource), {
                          pascalCase: true,
                        })}($id: ID!) {
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
        fields: meta?.fields || ["id"],
        variables: {
          id: {
            type: "ID",
            required: true,
            value: id,
          },
        },
      });

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[operation],
      };
    },
    deleteOne: async ({ resource, id, meta }) => {
      const pascalResource = camelcase(singular(resource), {
        pascalCase: true,
      });

      const operation = `deleteOne${pascalResource}`;

      if (meta?.gqlMutation) {
        const response = await client.request<BaseRecord>(meta.gqlMutation, {
          input: { id },
        });

        return {
          data: response[operation],
        };
      }

      const query = gqlTag`
                    mutation DeleteOne${pascalResource}($input: DeleteOne${pascalResource}Input!) {
                        ${operation}(input: $input) {
                            id
                        }
                    }
                `;

      const response = await client.request<BaseRecord>(query, {
        input: { id },
      });

      return {
        data: response[operation],
      };
    },
    deleteMany: async ({ resource, ids }) => {
      const pascalResource = camelcase(resource, {
        pascalCase: true,
      });
      const operation = `deleteMany${pascalResource}`;

      const query = gqlTag`
                mutation DeleteMany${pascalResource}($input: DeleteMany${pascalResource}Input!) {
                    ${operation}(input: $input) {
                        deletedCount
                    }
                }
            `;

      const variables = {
        input: {
          filter: {
            id: { in: ids },
          },
        },
      };

      await client.request<BaseRecord>(query, variables);

      return {
        data: [],
      };
    },
    getApiUrl: () => {
      return (client as any).url; // url field in GraphQLClient is private
    },
    custom: async ({ url, method, headers, meta }) => {
      const SUPPORTED_METHODS = ["get", "post"];
      const requestUrl = url || (client as any).url;

      if (!SUPPORTED_METHODS.some((it) => it === method)) {
        throw Error(`GraphQL does not support ${method} method.`);
      }

      const validMethod = method as "get" | "post";

      const _client = new GraphQLClient(requestUrl, {
        ...client.requestConfig,
        method: validMethod,
        headers: { ...client.requestConfig.headers, ...headers },
      });

      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (gqlOperation) {
        const response: any = await _client.request<BaseRecord>({
          document: gqlOperation,
          variables: meta?.variables,
        });

        return { data: response };
      }

      if (meta?.rawQuery) {
        const response = await _client.request<BaseRecord>({
          document: meta.rawQuery,
          variables: meta.variables,
        });

        return { data: response };
      }

      if (meta) {
        if (meta.operation) {
          let query;
          let variables;

          if (method === "get") {
            const gqlQuery = gql.query({
              operation: meta.operation,
              fields: meta.fields,
              variables: meta.variables,
            });

            query = gqlQuery.query;
            variables = gqlQuery.variables;
          } else {
            const gqlMutation = gql.mutation({
              operation: meta.operation,
              fields: meta.fields,
              variables: meta.variables,
            });

            query = gqlMutation.query;
            variables = gqlMutation.variables;
          }

          const response = await _client.request<BaseRecord>({
            document: query,
            variables,
          });

          return {
            data: response[meta.operation],
          };
        }
        throw Error("GraphQL operation name required.");
      }
      throw Error(
        "GraphQL needs operation, fields and variables values in meta object.",
      );
    },
  };
};

export default dataProvider;
