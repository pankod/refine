import type { DataProvider as IDataProvider, HttpError } from "@refinedev/core";
import type { AxiosInstance } from "axios";
import qs from "qs";
import {
  axiosInstance,
  generateFilter,
  generateSort,
  normalizeData,
  transformHttpError,
} from "./utils";

export const DataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Required<IDataProvider> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = `${apiUrl}/${resource}`;

    const {
      currentPage = 1,
      pageSize = 10,
      mode = "server",
    } = pagination ?? {};

    const locale = meta?.locale;
    const fields = meta?.fields;
    const populate = meta?.populate;
    const publicationState = meta?.publicationState;

    const querySorters = generateSort(sorters);
    const queryFilters = generateFilter(filters);

    const query = {
      ...(mode === "server"
        ? {
            "pagination[page]": currentPage,
            "pagination[pageSize]": pageSize,
          }
        : {}),
      locale,
      publicationState,
      fields,
      populate,
      sort: querySorters.length > 0 ? querySorters.join(",") : undefined,
    };

    const { data } = await httpClient.get(
      `${url}?${qs.stringify(query, {
        encodeValuesOnly: true,
      })}&${queryFilters}`,
    );

    return {
      data: normalizeData(data),
      // added to support pagination on client side when using endpoints that provide only data (see https://github.com/refinedev/refine/issues/2028)
      total: data.meta?.pagination?.total || normalizeData(data)?.length,
    };
  },

  getMany: async ({ resource, ids, meta }) => {
    const url = `${apiUrl}/${resource}`;

    const locale = meta?.locale;
    const fields = meta?.fields;
    const populate = meta?.populate;
    const publicationState = meta?.publicationState;

    const queryFilters = generateFilter([
      {
        field: "id",
        operator: "in",
        value: ids,
      },
    ]);

    const query = {
      locale,
      fields,
      populate,
      publicationState,
      "pagination[pageSize]": ids.length,
    };

    const { data } = await httpClient.get(
      `${url}?${qs.stringify(query, {
        encodeValuesOnly: true,
      })}&${queryFilters}`,
    );

    return {
      data: normalizeData(data),
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    let dataVariables: any = { data: variables };

    if (resource === "users") {
      dataVariables = variables;
    }

    try {
      const { data } = await httpClient.post(url, dataVariables);
      return {
        data,
      };
    } catch (error) {
      const httpError = transformHttpError(error);

      throw httpError;
    }
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    let dataVariables: any = { data: variables };

    if (resource === "users") {
      dataVariables = variables;
    }

    try {
      const { data } = await httpClient.put(url, dataVariables);
      return {
        data,
      };
    } catch (error) {
      const httpError = transformHttpError(error);

      throw httpError;
    }
  },

  updateMany: async ({ resource, ids, variables }) => {
    const errors: HttpError[] = [];

    const response = await Promise.all(
      ids.map(async (id) => {
        const url = `${apiUrl}/${resource}/${id}`;

        let dataVariables: any = { data: variables };

        if (resource === "users") {
          dataVariables = variables;
        }

        try {
          const { data } = await httpClient.put(url, dataVariables);
          return data;
        } catch (error) {
          const httpError = transformHttpError(error);

          errors.push(httpError);
        }
      }),
    );

    if (errors.length > 0) {
      throw errors;
    }

    return { data: response };
  },

  createMany: async ({ resource, variables }) => {
    const errors: HttpError[] = [];

    const response = await Promise.all(
      variables.map(async (param) => {
        try {
          const { data } = await httpClient.post(`${apiUrl}/${resource}`, {
            data: param,
          });
          return data;
        } catch (error) {
          const httpError = transformHttpError(error);

          errors.push(httpError);
        }
      }),
    );

    if (errors.length > 0) {
      throw errors;
    }

    return { data: response };
  },

  getOne: async ({ resource, id, meta }) => {
    const locale = meta?.locale;
    const fields = meta?.fields;
    const populate = meta?.populate;
    const publicationState = meta?.publicationState;

    const query = {
      locale,
      fields,
      populate,
      publicationState,
    };

    const url = `${apiUrl}/${resource}/${id}?${qs.stringify(query, {
      encode: false,
    })}`;

    const { data } = await httpClient.get(url);

    return {
      data: normalizeData(data),
    };
  },

  deleteOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.delete(url);

    return {
      data,
    };
  },

  deleteMany: async ({ resource, ids }) => {
    const response = await Promise.all(
      ids.map(async (id) => {
        const { data } = await httpClient.delete(`${apiUrl}/${resource}/${id}`);
        return data;
      }),
    );
    return { data: response };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let requestUrl = `${url}?`;

    if (sorters) {
      const sortQuery = generateSort(sorters);
      if (sortQuery.length > 0) {
        requestUrl = `${requestUrl}&${qs.stringify({
          sort: sortQuery.join(","),
        })}`;
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${filterQuery}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${qs.stringify(query)}`;
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload, {
          headers,
        });
        break;
      case "delete":
        axiosResponse = await httpClient.delete(url, {
          data: payload,
          headers: headers,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl, { headers });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});
