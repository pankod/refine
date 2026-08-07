import type { AxiosInstance } from "axios";
import type { DataProvider } from "@refinedev/core";
import { axiosInstance } from "./utils";

/*
 * Cursor pagination is left simple for example.
 */

export const githubDataProvider = (
  httpClient: AxiosInstance = axiosInstance,
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({ resource, pagination }) => {
    const { data } = await httpClient.get(
      `https://api.github.com/${resource}?until=${
        pagination?.currentPage || new Date().toISOString()
      }`,
    );

    return {
      data,
      total: 0,
    };
  },

  getMany: async () => {
    throw new Error("Method not implemented.");
  },

  create: async () => {
    throw new Error("Method not implemented.");
  },

  update: async () => {
    throw new Error("Method not implemented.");
  },

  getOne: async () => {
    throw new Error("Method not implemented.");
  },

  deleteOne: async () => {
    throw new Error("Method not implemented.");
  },

  getApiUrl: () => {
    return "https://api.github.com";
  },

  custom: async () => {
    throw new Error("Method not implemented.");
  },
});
