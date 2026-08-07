```ts
import {
  DataProvider,
  HttpError,
  Pagination,
  CrudSorting,
  CrudFilters,
  CrudOperators,
} from "@refinedev/core";
import { stringify } from "query-string";
import axios, { AxiosInstance } from "axios";

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";

const axiosInstance = axios.create();

export const dataProvider = (
  apiUrl: string,
  // get axios instance from user or use default one.
  httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
  getOne: async ({ resource, id, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const { data } = await httpClient[requestMethod](url, { headers });

    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "patch";

    const { data } = await httpClient[requestMethod](url, variables, {
      headers,
    });

    return {
      data,
    };
  },

  create: async ({ resource, variables, meta }) => {
    const url = `${apiUrl}/${resource}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "post";

    const { data } = await httpClient[requestMethod](url, variables, {
      headers,
    });

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "delete";

    const { data } = await httpClient[requestMethod](url, {
      data: variables,
      headers,
    });

    return {
      data,
    };
  },

  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const url = `${apiUrl}/${resource}`;

    const { headers: headersFromMeta, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    // init query object for pagination and sorting
    const query: {
      _start?: number;
      _end?: number;
      _sort?: string;
      _order?: string;
    } = {};

    const generatedPagination = generatePagination(pagination);
    if (generatedPagination) {
      const { _start, _end } = generatedPagination;
      query._start = _start;
      query._end = _end;
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query._sort = _sort.join(",");
      query._order = _order.join(",");
    }

    const queryFilters = generateFilter(filters);

    const { data, headers } = await httpClient[requestMethod](
      `${url}?${stringify(query)}&${stringify(queryFilters)}`,
      {
        headers: headersFromMeta,
      },
    );

    const total = +headers["x-total-count"];

    return {
      data,
      total: total || data.length,
    };
  },

  getApiUrl: () => apiUrl,
});

// Convert axios errors to HttpError on every response.
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  },
);

// convert Refine CrudOperators to the format that API accepts.
const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "ne":
    case "gte":
    case "lte":
      return `_${operator}`;
    case "contains":
      return "_like";
    case "eq":
    default:
      return "";
  }
};

// generate query string from Refine CrudFilters to the format that API accepts.
const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};

  if (filters) {
    filters.map((filter) => {
      if (filter.operator === "or" || filter.operator === "and") {
        throw new Error(
          `[@refinedev/simple-rest]: /core/docs/data/data-provider#creating-a-data-provider`,
        );
      }

      if ("field" in filter) {
        const { field, operator, value } = filter;

        if (field === "q") {
          queryFilters[field] = value;
          return;
        }

        const mappedOperator = mapOperator(operator);
        queryFilters[`${field}${mappedOperator}`] = value;
      }
    });
  }

  return queryFilters;
};

// generate query string from Refine CrudSorting to the format that API accepts.
const generateSort = (sorters?: CrudSorting) => {
  if (sorters && sorters.length > 0) {
    const _sort: string[] = [];
    const _order: string[] = [];

    sorters.map((item) => {
      _sort.push(item.field);
      _order.push(item.order);
    });

    return {
      _sort,
      _order,
    };
  }

  return;
};

// generate query string from Refine Pagination to the format that API accepts.
const generatePagination = (pagination?: Pagination) => {
  // pagination is optional on data hooks, so we need to set default values.
  const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

  const query: {
    _start?: number;
    _end?: number;
  } = {};

  if (mode === "server") {
    query._start = (current - 1) * pageSize;
    query._end = current * pageSize;
  }

  return query;
};
```
