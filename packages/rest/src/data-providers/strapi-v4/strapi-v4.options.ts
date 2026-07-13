import type {
  CreateParams,
  CustomParams,
  DeleteOneParams,
  GetListParams,
  GetManyParams,
  GetOneParams,
  UpdateParams,
} from "@refinedev/core";
import type { KyResponse } from "ky";
import type { AnyObject } from "src/types";
import { generateFilter } from "./utils/generateFilter";
import { normalizeData } from "./utils/normalizeData";
import { transformHttpError } from "./utils/transformHttpError";

export const strapiV4DataProviderOptions = {
  getList: {
    getEndpoint(params: GetListParams): string {
      return `${params.resource}`;
    },
    async buildFilters(params: GetListParams) {
      const { filters = [] } = params;

      const queryFilters = generateFilter(filters);

      return queryFilters;
    },
    async buildPagination(params: GetListParams) {
      const {
        currentPage = 1,
        pageSize = 10,
        mode = "server",
      } = params.pagination ?? {};

      if (mode === "server") {
        return {
          page: currentPage,
          pageSize: pageSize,
        };
      }

      return {};
    },
    async buildSorters(params: GetListParams) {
      const { sorters = [] } = params;

      const _sorters: string[] = [];

      if (sorters) {
        // strapi.com/categories?sort=id:asc
        sorters.forEach((item) => {
          if (item.order) {
            _sorters.push(`${item.field}:${item.order}`);
          }
        });
      }

      const sort = _sorters.length ? _sorters.join(",") : undefined;

      return { sort };
    },
    async buildQueryParams(params: GetListParams) {
      const filters = await this.buildFilters(params);

      const { sort } = await this.buildSorters(params);

      const pagination = await this.buildPagination(params);

      const { meta } = params;

      const locale = meta?.locale;
      const fields = meta?.fields;
      const populate = meta?.populate;
      const publicationState = meta?.publicationState;

      const queryParams = {
        pagination,
        locale,
        publicationState,
        fields,
        populate,
        sort,
        filters,
      };

      return queryParams;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      params: GetListParams,
    ): Promise<any[]> {
      const body = await response.json();

      return normalizeData(body);
    },
    async getTotalCount(
      response: KyResponse<AnyObject>,
      params: GetListParams,
    ): Promise<number> {
      const body = await response.json();

      return body.meta?.pagination?.total || normalizeData(body)?.length;
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
      const { meta } = params ?? {};

      const locale = meta?.locale;
      const fields = meta?.fields;
      const populate = meta?.populate;
      const publicationState = meta?.publicationState;

      const queryParams = {
        locale,
        fields,
        populate,
        publicationState,
      };

      return queryParams;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      params: GetOneParams,
    ): Promise<Record<string, any>> {
      const body = await response.json();

      return normalizeData(body);
    },
  },
  getMany: {
    getEndpoint(params: GetManyParams) {
      return `${params.resource}`;
    },
    async buildHeaders(params: GetManyParams) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: GetManyParams) {
      const { ids, meta } = params ?? {};
      const locale = meta?.locale;
      const fields = meta?.fields;
      const populate = meta?.populate;
      const publicationState = meta?.publicationState;

      const filters = generateFilter([
        { field: "id", operator: "in", value: ids },
      ]);

      const query = {
        locale,
        fields,
        populate,
        publicationState,
        filters,
        pagination: { pageSize: ids.length },
      };

      return query;
    },
    async mapResponse(response: KyResponse<AnyObject>, params: GetManyParams) {
      const body = await response.json();

      return normalizeData(body);
    },
  },
  create: {
    getEndpoint(params: CreateParams<any>): string {
      return `${params.resource}`;
    },

    async buildBodyParams(params: CreateParams<any>) {
      const { resource, variables } = params;
      let bodyParams = { data: variables };

      if (resource === "users") {
        bodyParams = variables;
      }

      return bodyParams;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      _params: CreateParams<any>,
    ): Promise<Record<string, any>> {
      if (response.status >= 400) {
        const httpError = transformHttpError(response);

        throw httpError;
      }

      const body = await response.json();

      return body;
    },
  },
  update: {
    getEndpoint(params: UpdateParams<any>): string {
      return `${params.resource}/${params.id}`;
    },
    getRequestMethod(params: UpdateParams<any>) {
      return params.meta?.method ?? "put";
    },
    async buildHeaders(params: UpdateParams<any>) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: UpdateParams<any>) {
      return params.meta?.query ?? {};
    },
    async buildBodyParams(params: UpdateParams<any>) {
      const { resource, variables } = params;
      let bodyParams = { data: variables };

      if (resource === "users") {
        bodyParams = variables;
      }

      return bodyParams;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      params: UpdateParams<any>,
    ) {
      return await response.json();
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
  },
  custom: {
    async buildQueryParams(params: CustomParams<any>) {
      const queryParams = {};

      if (params.sorters) {
        const _sorters: string[] = [];

        if (params.sorters) {
          // strapi.com/categories?sort=id:asc
          params.sorters.forEach((item) => {
            if (item.order) {
              _sorters.push(`${item.field}:${item.order}`);
            }
          });
        }

        const sort = _sorters.length ? _sorters.join(",") : undefined;

        Object.assign(queryParams, { sort });
      }

      if (params.filters) {
        const queryFilters = generateFilter(params.filters);

        Object.assign(queryParams, { filters: queryFilters });
      }

      return queryParams;
    },
    async buildHeaders(params: CustomParams<any>) {
      return params.headers ?? {};
    },
    async buildBodyParams(params: CustomParams<any>) {
      return params.payload ?? {};
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      params: CustomParams<any>,
    ) {
      return await response.json();
    },
  },
};
