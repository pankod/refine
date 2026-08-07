import type { DataProvider } from "@refinedev/core";
import dataProvider, { stringify } from "@refinedev/simple-rest";

import { axiosInstance, generateSort, generateFilter } from "./utils";

const API_URL = "https://api.fake-rest.refine.dev";

const restDataProvider: DataProvider = {
  ...dataProvider(API_URL),
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    console.log(`${resource} - getList`, meta);

    const url = `${API_URL}/${resource}`;

    const {
      currentPage = 1,
      pageSize = 10,
      mode = "server",
    } = pagination ?? {};

    const queryFilters = generateFilter(filters);

    const query: {
      _start?: number;
      _end?: number;
      _sort?: string;
      _order?: string;
    } = {};

    if (mode === "server") {
      query._start = (currentPage - 1) * pageSize;
      query._end = currentPage * pageSize;
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query._sort = _sort.join(",");
      query._order = _order.join(",");
    }

    const { data, headers } = await axiosInstance.get(
      `${url}?${stringify(query)}&${stringify(queryFilters)}`,
    );

    const total = +headers["x-total-count"];

    return {
      data,
      total: total || data.length,
    };
  },
};

export default restDataProvider;
