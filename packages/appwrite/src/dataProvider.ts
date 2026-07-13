import type { DataProvider } from "@refinedev/core";
import {
  type Client as Appwrite,
  Databases,
  Permission,
  Role,
  ID,
} from "appwrite";
import {
  getAppwriteFilters,
  getAppwritePagination,
  getAppwriteSorting,
} from "./utils";

type DataProviderOptions = {
  databaseId: string;
  defaultReadPermissions?: Permission[];
  defaultWritePermissions?: Permission[];
};

export const dataProvider = (
  appwriteClient: Appwrite,
  options?: DataProviderOptions,
): Required<DataProvider> => {
  const {
    databaseId = "default",
    defaultReadPermissions = [Permission.read(Role.any())],
    defaultWritePermissions = [Permission.write(Role.any())],
  } = options ?? {};

  const database = new Databases(appwriteClient);

  return {
    getList: async ({ resource, pagination, filters, sorters }) => {
      const {
        currentPage = 1,
        pageSize = 10,
        mode = "server",
      } = pagination ?? {};

      const appwriteFilters = getAppwriteFilters(filters);

      const appwritePagination =
        mode === "server" ? getAppwritePagination(currentPage, pageSize) : [];

      const appwriteSorts = getAppwriteSorting(sorters);

      const { total, documents: data } = await database.listDocuments<any>(
        databaseId,
        resource,
        [...appwriteFilters, ...appwritePagination, ...appwriteSorts],
      );

      return {
        data: data.map(({ $id, ...restData }: { $id: string }) => ({
          id: $id,
          ...restData,
        })) as any,
        total,
      };
    },
    getOne: async ({ resource, id }) => {
      const { $id, ...restData } = await database.getDocument(
        databaseId,
        resource,
        id.toString(),
      );
      return {
        data: {
          id: $id,
          ...restData,
        },
      } as any;
    },
    update: async ({ resource, id, variables, meta }) => {
      const readPermissions = meta?.readPermissions ?? defaultReadPermissions;
      const writePermissions =
        meta?.writePermissions ?? defaultWritePermissions;

      const { $id, ...restData } = await database.updateDocument(
        databaseId,
        resource,
        id.toString(),
        variables as any,
        [...readPermissions, ...writePermissions],
      );

      return {
        data: {
          id: $id,
          ...restData,
        },
      } as any;
    },
    create: async ({ resource, variables, meta }) => {
      const readPermissions = meta?.readPermissions ?? defaultReadPermissions;
      const writePermissions =
        meta?.writePermissions ?? defaultWritePermissions;

      const { $id, ...restData } = await database.createDocument(
        databaseId,
        resource,
        meta?.documentId ?? ID.unique(),
        variables as unknown as object,
        [...readPermissions, ...writePermissions],
      );

      return {
        data: {
          id: $id,
          ...restData,
        },
      } as any;
    },
    createMany: async ({ resource, variables, meta }) => {
      const readPermissions = meta?.readPermissions ?? defaultReadPermissions;
      const writePermissions =
        meta?.writePermissions ?? defaultWritePermissions;

      const data = await Promise.all(
        variables.map((document) =>
          database.createDocument<any>(
            databaseId,
            resource,
            meta?.documentId ?? ID.unique(),
            document as unknown as any,
            [...readPermissions, ...writePermissions],
          ),
        ),
      );

      return {
        data: data.map(({ $id, ...restData }) => ({
          id: $id,
          ...restData,
        })),
      } as any;
    },
    deleteOne: async ({ resource, id }) => {
      await database.deleteDocument(databaseId, resource, id.toString());
      return {
        data: { id },
      } as any;
    },
    deleteMany: async ({ resource, ids }) => {
      await Promise.all(
        ids.map((id) =>
          database.deleteDocument(databaseId, resource, id.toString()),
        ),
      );
      return {
        data: ids.map((id) => ({
          id,
        })),
      } as any;
    },
    getMany: async ({ resource, ids }) => {
      const data = await Promise.all(
        ids.map((id) =>
          database.getDocument<any>(databaseId, resource, id.toString()),
        ),
      );
      return {
        data: data.map(({ $id, ...restData }) => ({
          id: $id,
          ...restData,
        })),
      } as any;
    },
    updateMany: async ({ resource, ids, variables, meta }) => {
      const readPermissions = meta?.readPermissions ?? defaultReadPermissions;
      const writePermissions =
        meta?.writePermissions ?? defaultWritePermissions;

      const data = await Promise.all(
        ids.map((id) =>
          database.updateDocument<any>(
            databaseId,
            resource,
            id.toString(),
            variables as unknown as object,
            [...readPermissions, ...writePermissions],
          ),
        ),
      );
      return {
        data: data.map(({ $id, ...restData }) => ({
          id: $id,
          ...restData,
        })),
      } as any;
    },
    getApiUrl: () => {
      throw Error(
        "'getApiUrl' method is not implemented on refine-appwrite data provider.",
      );
    },
    custom: () => {
      throw Error(
        "'custom' method is not implemented on refine-appwrite data provider.",
      );
    },
  };
};
