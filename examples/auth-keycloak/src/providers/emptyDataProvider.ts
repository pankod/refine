import { DataProvider } from "@refinedev/core";

export const emptyDataProvider: DataProvider = {
  getList: async () => ({ data: [], total: 0 }),
  getMany: async () => ({ data: [] }),
  getOne: async () => ({ data: {} as any }),
  create: async () => ({ data: {} as any }),
  update: async () => ({ data: {} as any }),
  deleteOne: async () => ({ data: {} as any }),
  getApiUrl: () => "",
  custom: async () => ({ data: {} as any }),
};
