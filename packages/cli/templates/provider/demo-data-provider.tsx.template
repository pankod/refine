import { DataProvider } from "@refinedev/core";

/**
 * Check out the Data Provider documentation for detailed information
 * https://refine.dev/docs/api-reference/core/providers/data-provider/
 **/
export const dataProvider = (
  apiUrl: string,
  _httpClient: any, // TODO: replace `any` with your http client type
): DataProvider => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = `${apiUrl}/${resource}`;

    console.log("getList", {
      resource,
      pagination,
      filters,
      sorters,
      meta,
      url,
    });

    // TODO: send request to the API
    // const response = await httpClient.get(url, {});

    return {
      data: [],
      total: 0,
    };
  },

  getMany: async ({ resource, ids, meta }) => {
    console.log("getMany", {
      resource,
      ids,
      meta,
    });

    // TODO: send request to the API
    // const response = await httpClient.get(url, {});

    return {
      data: [],
    };
  },

  create: async ({ resource, variables, meta }) => {
    console.log("create", {
      resource,
      variables,
      meta,
    });

    return {
      data: {} as any,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    console.log("update", {
      resource,
      id,
      variables,
      meta,
    });

    // TODO: send request to the API
    // const response = await httpClient.post(url, {});

    return {
      data: {} as any,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    console.log("getOne", {
      resource,
      id,
      meta,
    });

    // TODO: send request to the API
    // const response = await httpClient.get(url, {});

    return {
      data: {} as any,
    };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    console.log("deleteOne", {
      resource,
      id,
      variables,
      meta,
    });

    // TODO: send request to the API
    // const response = await httpClient.post(url, {});

    return {
      data: {} as any,
    };
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
    meta,
  }) => {
    console.log("custom", {
      url,
      method,
      filters,
      sorters,
      payload,
      query,
      headers,
      meta,
    });

    // TODO: send request to the API
    // const requestMethod = meta.method
    // const response = await httpClient[requestMethod](url, {});

    return {} as any;
  },
});
