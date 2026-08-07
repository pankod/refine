import { CondOperator, RequestQueryBuilder } from "@nestjsx/crud-request";
import type { BaseRecord } from "@refinedev/core";

import {
  handleFilter,
  handleJoin,
  handlePagination,
  handleSort,
  transformHttpError,
} from "./utils";
import type { CreateDataProviderOptions } from "../../types";

export const nestjsxCrudDataProviderOptions: CreateDataProviderOptions = {
  getList: {
    getEndpoint: (params) => params.resource,
    buildQueryParams: async (params) => {
      let query = RequestQueryBuilder.create();

      query = handleFilter(query, params.filters);
      query = handleJoin(query, params.meta?.join);
      query = handlePagination(query, params.pagination);
      query = handleSort(query, params.sorters);

      return query.queryObject;
    },
    mapResponse: async (response, params) => {
      const body = await response.json<BaseRecord[] | { data: BaseRecord[] }>();

      if (Array.isArray(body)) {
        return body;
      }

      return body.data;
    },
    getTotalCount: async (response, params) => {
      const body = await response.json<BaseRecord[] | { total: number }>();

      if (Array.isArray(body)) {
        return body.length;
      }

      return body.total;
    },
  },
  getMany: {
    getEndpoint: (params) => params.resource,
    buildQueryParams: async ({ ids, meta }) => {
      let query = RequestQueryBuilder.create().setFilter({
        field: "id",
        operator: CondOperator.IN,
        value: ids,
      });

      query = handleJoin(query, meta?.join);

      return query.queryObject;
    },
    mapResponse: async (response, params) => {
      const body = await response.json<BaseRecord[] | { data: BaseRecord[] }>();

      if (Array.isArray(body)) {
        return body;
      }

      return body.data;
    },
  },
  create: {
    getEndpoint: (params) => params.resource,
    buildBodyParams: ({ variables }) => variables,
    mapResponse: async (response) => await response.json(),
    transformError: async (response, _params) => {
      const error = await response.json();

      return transformHttpError(error);
    },
  },
  update: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,
    buildBodyParams: ({ variables }) => variables,
    mapResponse: async (response) => await response.json(),
    transformError: async (response, _params) => {
      const error = await response.json();

      return transformHttpError(error);
    },
  },
  getOne: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,
    buildQueryParams: async ({ meta }) => {
      let query = RequestQueryBuilder.create();

      query = handleJoin(query, meta?.join);

      return query.queryObject;
    },
    mapResponse: async (response, _params) => await response.json(),
  },
  deleteOne: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,
    mapResponse: async (_response, _params) => undefined,
  },
  custom: {
    buildQueryParams: async (params) => {
      let query = RequestQueryBuilder.create();

      query = handleFilter(query, params.filters);
      query = handleJoin(query, params.meta?.join);
      query = handleSort(query, params.sorters);

      return query.queryObject;
    },
    buildHeaders: async (params) => {
      return params.meta?.headers ?? {};
    },
    buildBodyParams: async (params) => {
      return params.payload ?? {};
    },
    mapResponse: async (response, _params) => {
      return await response.json();
    },
  },
};
