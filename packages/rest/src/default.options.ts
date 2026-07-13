import type {
  CreateParams,
  CustomParams,
  DeleteOneParams,
  GetListParams,
  GetOneParams,
  UpdateParams,
  HttpError,
} from "@refinedev/core";
import type { KyResponse } from "ky";

import type { AnyObject } from "./types";

export const defaultCreateDataProviderOptions = {
  getList: {
    getEndpoint(params: GetListParams): string {
      return `${params.resource}`;
    },
    async buildHeaders(params: GetListParams) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: GetListParams) {
      const { filters, sorters, pagination } = params;

      const queryParams = {
        filters,
        sorters,
        pagination,
        ...params.meta?.query,
      };

      // filters[0][field]=id&filters[0][operator]=eq&filters[0][value]=123

      return queryParams;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      _params: GetListParams,
    ): Promise<any[]> {
      return await response.json();
    },
    async getTotalCount(
      _response: KyResponse<AnyObject>,
      _params: GetListParams,
    ): Promise<number> {
      return -1;
    },
  },
  getOne: {
    getEndpoint(params: GetOneParams) {
      return `${params.resource}/${params.id}`;
    },
    async buildHeaders(params: GetOneParams) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: GetOneParams) {
      return params.meta?.query ?? {};
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      _params: GetOneParams,
    ): Promise<Record<string, any>> {
      return await response.json();
    },
  },
  create: {
    getEndpoint(params: CreateParams<any>): string {
      return params.resource;
    },
    async buildHeaders(params: CreateParams<any>) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: CreateParams<any>) {
      return params.meta?.query ?? {};
    },
    async buildBodyParams(params: CreateParams<any>) {
      return params.variables;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      _params: CreateParams<any>,
    ): Promise<Record<string, any>> {
      return await response.json();
    },
    async transformError(
      response: KyResponse<AnyObject>,
      params: CreateParams<any>,
    ): Promise<HttpError> {
      const body = await response.json();

      return {
        message: JSON.stringify({ ...body, variables: params.variables }),
        statusCode: response.status,
      };
    },
  },
  update: {
    getEndpoint(params: UpdateParams<any>): string {
      return `${params.resource}/${params.id}`;
    },
    getRequestMethod(params: UpdateParams<any>) {
      return params.meta?.method ?? "patch";
    },
    async buildHeaders(params: UpdateParams<any>) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: UpdateParams<any>) {
      return params.meta?.query ?? {};
    },
    async buildBodyParams(params: UpdateParams<any>) {
      return params.variables;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      _params: UpdateParams<any>,
    ) {
      return await response.json();
    },

    async transformError(
      response: KyResponse<AnyObject>,
      params: UpdateParams<any>,
    ): Promise<HttpError> {
      const body = await response.json();

      return {
        message: JSON.stringify({
          ...body,
          id: params.id,
          variables: params.variables,
        }),
        statusCode: response.status,
      };
    },
  },
  deleteOne: {
    getEndpoint(params: DeleteOneParams<any>) {
      return `${params.resource}/${params.id}`;
    },
    async buildHeaders(params: DeleteOneParams<any>) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: DeleteOneParams<any>) {
      return params.meta?.query ?? {};
    },
    async mapResponse(
      _response: KyResponse<AnyObject>,
      _params: DeleteOneParams<any>,
    ) {
      return undefined;
    },
    async transformError(
      response: KyResponse<AnyObject>,
      params: DeleteOneParams<any>,
    ) {
      const body = await response.json();

      return {
        message: JSON.stringify({
          ...body,
          id: params.id,
        }),
        statusCode: response.status,
      };
    },
  },
  custom: {
    async buildQueryParams(params: CustomParams<any>) {
      return params.query ?? {};
    },
    async buildHeaders(params: CustomParams<any>) {
      return params.headers ?? {};
    },
    async buildBodyParams(params: CustomParams<any>) {
      return params.payload ?? {};
    },
    async mapResponse(
      response: KyResponse<AnyObject | AnyObject[]>,
      _params: CustomParams<any>,
    ) {
      return await response.json();
    },
    async transformError(
      response: KyResponse<AnyObject>,
      params: CustomParams<any>,
    ) {
      const body = await response.json();

      return {
        message: JSON.stringify({
          ...body,
          params,
        }),
        statusCode: response.status,
      };
    },
  },
};
