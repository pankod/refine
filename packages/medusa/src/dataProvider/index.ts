import type { DataProvider as DataProviderType } from "@refinedev/core";
import type { AxiosInstance } from "axios";
import { stringify, type StringifyOptions } from "query-string";
import { axiosInstance, generateFilter } from "../utils";

const DataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Required<DataProviderType> => {
  return {
    getList: async ({ resource, pagination, filters }) => {
      const url = `${apiUrl}/${resource}`;
      const {
        currentPage = 1,
        pageSize = 10,
        mode = "server",
      } = pagination ?? {};

      const queryFilters = generateFilter(filters);

      const stringifyConfig: StringifyOptions = {
        arrayFormat: "bracket",
      };

      const query: {
        limit?: number;
        offset?: number;
      } = {
        ...(mode === "server"
          ? {
              offset: (currentPage - 1) * pageSize,
              limit: pageSize,
            }
          : {}),
      };

      const { data } = await httpClient.get(
        `${url}?${stringify(query, stringifyConfig)}&${stringify(
          queryFilters,
          stringifyConfig,
        )}`,
      );

      return {
        data: data[resource],
        total: data.count,
      };
    },

    getMany: async ({ resource, ids }) => {
      const { data } = await httpClient.get(
        `${apiUrl}/${resource}?${stringify({ id: ids })}`,
      );

      return {
        data,
      };
    },

    create: async ({ resource, variables }) => {
      const url = `${apiUrl}/${resource}`;

      const { data } = await httpClient.post(url, variables);

      return {
        data,
      };
    },

    createMany: async ({ resource, variables }) => {
      const response = await Promise.all(
        variables.map(async (param) => {
          const { data } = await httpClient.post(
            `${apiUrl}/${resource}`,
            param,
          );
          return data;
        }),
      );

      return { data: response };
    },

    update: async ({ resource, id, variables }) => {
      const url = `${apiUrl}/${resource}/${id}`;

      const { data } = await httpClient.post(url, variables);

      return {
        data,
      };
    },

    updateMany: async ({ resource, ids, variables }) => {
      const response = await Promise.all(
        ids.map(async (id) => {
          const { data } = await httpClient.post(
            `${apiUrl}/${resource}/${id}`,
            variables,
          );
          return data;
        }),
      );

      return { data: response };
    },

    getOne: async ({ resource, id }) => {
      const { data } = await httpClient.get(`${apiUrl}/${resource}/${id}`);

      return {
        data,
      };
    },

    deleteOne: async ({ resource, id, variables }) => {
      const url = `${apiUrl}/${resource}/${id}`;

      const { data } = await httpClient.delete(url, {
        data: variables,
      });

      return {
        data,
      };
    },

    deleteMany: async ({ resource, ids, variables }) => {
      const response = await Promise.all(
        ids.map(async (id) => {
          const { data } = await httpClient.delete(
            `${apiUrl}/${resource}/${id}`,
            variables || {},
          );
          return data;
        }),
      );
      return { data: response };
    },

    getApiUrl: () => {
      return apiUrl;
    },

    custom: async ({ url, method, payload, query, headers, filters }) => {
      let requestUrl = `${url}?`;

      if (filters) {
        const filterQuery = generateFilter(filters);
        requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
      }

      if (query) {
        requestUrl = `${requestUrl}&${stringify(query)}`;
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
          axiosResponse = await httpClient.get(requestUrl, {
            headers,
          });
          break;
      }

      const { data } = axiosResponse;

      return Promise.resolve({ data });
    },
  };
};

export default DataProvider;
