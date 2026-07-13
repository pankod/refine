import type { OperationResult } from "@urql/core";
import type {
  BaseRecord,
  CreateManyParams,
  DeleteManyParams,
  GetListParams,
  GetManyParams,
  GetOneParams,
  UpdateManyParams,
  CustomParams,
  CreateParams,
  UpdateParams,
  DeleteOneParams,
} from "@refinedev/core";
import camelcase from "camelcase";
import { singular } from "pluralize";
import gql from "graphql-tag";

import {
  buildFilters,
  buildPagination,
  buildSorters,
  getOperationFields,
} from "../utils";
import type { DocumentNode } from "graphql";

export type GraphQLDataProviderOptions = {
  create?: {
    dataMapper?: (
      response: OperationResult<any>,
      params: CreateParams<any>,
    ) => Record<string, any>;
    buildVariables?: (params: CreateParams<any>) => Record<string, any>;
  };
  createMany?: {
    dataMapper?: (
      response: OperationResult<any>,
      params: CreateManyParams<any>,
    ) => BaseRecord[];
    buildVariables?: (params: CreateManyParams<any>) => Record<string, any>;
  };
  getOne?: {
    dataMapper?: (
      response: OperationResult<any>,
      params: GetOneParams,
    ) => BaseRecord;
    buildVariables?: (params: GetOneParams) => Record<string, any>;
    convertMutationToQuery?: (params: GetOneParams) => DocumentNode;
  };
  getList?: {
    dataMapper?: (
      response: OperationResult<any>,
      params: GetListParams,
    ) => BaseRecord[];
    getTotalCount?: (
      response: OperationResult<any>,
      params: GetListParams,
    ) => number;
    buildVariables?: (params: GetListParams) => Record<string, any>;
  };
  getMany?: {
    buildFilter?: (params: GetManyParams) => Record<string, any>;
    dataMapper?: (
      response: OperationResult<any>,
      params: GetManyParams,
    ) => BaseRecord[];
  };
  update?: {
    dataMapper?: (
      response: OperationResult<any>,
      params: UpdateParams<any>,
    ) => BaseRecord;
    buildVariables?: (params: UpdateParams<any>) => Record<string, any>;
  };
  updateMany?: {
    dataMapper?: (
      response: OperationResult<any>,
      params: UpdateManyParams<any>,
    ) => BaseRecord[];
    buildVariables?: (params: UpdateManyParams<any>) => Record<string, any>;
  };
  deleteOne?: {
    dataMapper?: (
      response: OperationResult<any>,
      params: DeleteOneParams<any>,
    ) => BaseRecord;
    buildVariables?: (params: DeleteOneParams<any>) => Record<string, any>;
  };
  deleteMany?: {
    dataMapper?: (
      response: OperationResult<any>,
      params: DeleteManyParams<any>,
    ) => BaseRecord[];
    buildVariables?: (params: DeleteManyParams<any>) => Record<string, any>;
  };
  custom?: {
    dataMapper?: (
      response: OperationResult<any>,
      params: CustomParams,
    ) => Record<string, any>;
    buildVariables?: (params: CustomParams) => Record<string, any>;
  };
};

export const defaultOptions = {
  create: {
    dataMapper: (response: OperationResult<any>, params: CreateParams<any>) => {
      const key = `createOne${camelcase(singular(params.resource), {
        pascalCase: true,
      })}`;

      return response.data?.[key];
    },
    buildVariables: (params: CreateParams<any>) => {
      return {
        input: {
          [singular(params.resource)]:
            params.variables ?? params?.meta?.gqlVariables,
        },
      };
    },
  },
  createMany: {
    dataMapper: (
      response: OperationResult<any>,
      params: CreateManyParams<any>,
    ) => {
      const key = `createMany${camelcase(params.resource, {
        pascalCase: true,
      })}`;

      return response.data?.[key];
    },
    buildVariables: (params: CreateManyParams<any>) => {
      return {
        input: {
          [camelcase(params.resource)]:
            params.variables ?? params?.meta?.gqlVariables,
        },
      };
    },
  },
  getOne: {
    dataMapper: (response: OperationResult<any>, params: GetOneParams) => {
      const key = camelcase(singular(params.resource));

      return response.data?.[key];
    },
    buildVariables: (params: GetOneParams) => {
      return {
        id: params.id,
        ...params.meta?.gqlVariables,
      };
    },
    // Besides useOne hook, getOne hook is also consumed by `useForm`.
    // useForm hook has an optional gqlQuery field, we may only get `gqlMutation`.
    // For this reason, we need to convert mutation to query to get initial data on edit.
    convertMutationToQuery: (params: GetOneParams) => {
      const { resource, meta } = params;
      const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;

      if (!gqlOperation) {
        throw new Error("Operation is required.");
      }

      const stringFields = getOperationFields(gqlOperation);

      const pascalCaseOperation = camelcase(singular(resource), {
        pascalCase: true,
      });

      const operation = camelcase(singular(resource));

      const query = gql`
        query Get${pascalCaseOperation}($id: ID!) {
          ${operation}(id: $id) {
            ${stringFields}
          }
        }
      `;

      return query;
    },
  },
  getList: {
    dataMapper: (response: OperationResult<any>, params: GetListParams) => {
      return response.data?.[params.resource].nodes;
    },
    getTotalCount: (response: OperationResult<any>, params: GetListParams) => {
      return response.data?.[params.resource].totalCount;
    },
    buildVariables: (params: GetListParams) => {
      return {
        sorting: buildSorters(params.sorters),
        filter: buildFilters(params.filters),
        paging: buildPagination(params.pagination),
        ...params.meta?.variables,
        ...params.meta?.gqlVariables,
      };
    },
  },
  getMany: {
    buildFilter: (params: GetManyParams) => {
      return { id: { in: params.ids }, ...params?.meta?.gqlVariables };
    },
    dataMapper: (response: OperationResult<any>, params: GetManyParams) => {
      const key = camelcase(params.resource);

      return response.data?.[key].nodes;
    },
  },
  update: {
    dataMapper: (response: OperationResult<any>, params: UpdateParams<any>) => {
      const key = `updateOne${camelcase(singular(params.resource), {
        pascalCase: true,
      })}`;

      return response.data?.[key];
    },
    buildVariables: (params: UpdateParams<any>) => {
      return {
        input: {
          id: params.id,
          update: params.variables,
          ...params.meta?.gqlVariables,
        },
      };
    },
  },
  updateMany: {
    dataMapper: (
      _response: OperationResult<any>,
      params: UpdateManyParams<any>,
    ): any[] => {
      return params.ids.map((id) => ({ id }));
    },
    buildVariables: (params: UpdateManyParams<any>) => {
      const { ids, variables } = params;

      return {
        input: {
          filter: { id: { in: ids } },
          update: variables,
          ...params.meta?.gqlVariables,
        },
      };
    },
  },
  deleteOne: {
    dataMapper: (
      response: OperationResult<any>,
      params: DeleteOneParams<any>,
    ) => {
      const pascalResource = camelcase(singular(params.resource), {
        pascalCase: true,
      });

      const key = `deleteOne${pascalResource}`;

      return response.data?.[key];
    },
    buildVariables: (params: DeleteOneParams<any>) => {
      return {
        input: { id: params.id, ...params?.meta?.gqlVariables },
      };
    },
  },
  deleteMany: {
    dataMapper: (
      _response: OperationResult<any>,
      params: DeleteManyParams<any>,
    ): any[] => {
      return params.ids.map((id) => ({ id }));
    },
    buildVariables: (params: DeleteManyParams<any>) => {
      const { ids } = params;

      return {
        input: {
          filter: {
            id: { in: ids },
          },
          ...params.meta?.gqlVariables,
        },
      };
    },
  },
  custom: {
    dataMapper: (response: OperationResult<any>, params: CustomParams) =>
      response.data ?? response.error?.message,
    buildVariables: (params: CustomParams) => ({
      ...(typeof params.payload === "object" ? params.payload : {}),
      ...params?.meta?.variables,
      ...params?.meta?.gqlVariables,
    }),
  },
};
