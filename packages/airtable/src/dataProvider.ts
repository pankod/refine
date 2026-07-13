import type { DataProvider } from "@refinedev/core";
import Airtable from "airtable";
import type { AirtableBase } from "airtable/lib/airtable_base";
import { generateSort, generateFilter } from "./utils";

export const dataProvider = (
  apiKey: string,
  baseId: string,
  airtableClient?: AirtableBase,
): Required<DataProvider> => {
  const base = airtableClient || new Airtable({ apiKey: apiKey }).base(baseId);

  return {
    getList: async ({ resource, pagination, sorters, filters }) => {
      const {
        currentPage = 1,
        pageSize = 10,
        mode = "server",
      } = pagination ?? {};

      const generatedSort = generateSort(sorters) || [];
      const queryFilters = generateFilter(filters);

      const { all } = base(resource).select({
        pageSize: 100,
        sort: generatedSort,
        ...(queryFilters ? { filterByFormula: queryFilters } : {}),
      });

      const data = await all();
      const isServerPaginationEnabled = mode === "server";

      return {
        data: data
          .slice(
            isServerPaginationEnabled
              ? (currentPage - 1) * pageSize
              : undefined,
            isServerPaginationEnabled ? currentPage * pageSize : undefined,
          )
          .map((p) => ({
            id: p.id,
            ...p.fields,
          })) as any,
        total: data.length,
      };
    },

    getMany: async ({ resource, ids }) => {
      const { all } = base(resource).select({
        pageSize: 100,
      });

      const data = await all();

      return {
        data: data
          .filter((p) => ids.includes(p.id))
          .map((p) => ({
            id: p.id,
            ...p.fields,
          })) as any,
      };
    },

    create: async ({ resource, variables }) => {
      const { id, fields } = await (base(resource) as any).create(variables);

      return {
        data: {
          id: id,
          ...fields,
        } as any,
      };
    },

    createMany: async ({ resource, variables }) => {
      const data = await base(resource).create(variables as any);

      return {
        data: data.map((p) => ({
          id: p.id,
          ...p.fields,
        })) as any,
      };
    },

    update: async ({ resource, id, variables }) => {
      const { fields } = await (base(resource) as any).update(
        id.toString(),
        variables,
      );

      return {
        data: {
          id,
          ...fields,
        } as any,
      };
    },

    updateMany: async ({ resource, ids, variables }) => {
      const requestParams = ids.map((id) => ({
        id: id.toString(),
        fields: { ...variables },
      }));
      const data = await base(resource).update(requestParams as any);

      return {
        data: data.map((p) => ({
          id: p.id,
          ...p.fields,
        })) as any,
      };
    },

    getOne: async ({ resource, id }) => {
      const { fields } = await base(resource).find(id.toString());

      return {
        data: {
          id,
          ...fields,
        } as any,
      };
    },

    deleteOne: async ({ resource, id }) => {
      const { fields } = await base(resource).destroy(id.toString());

      return {
        data: {
          id,
          ...fields,
        } as any,
      };
    },

    deleteMany: async ({ resource, ids }) => {
      const data = await base(resource).destroy(ids.map(String));

      return {
        data: data.map((p) => ({
          id: p.id,
          ...p.fields,
        })) as any,
      };
    },

    getApiUrl: () => {
      throw Error("Not implemented on refine-airtable data provider.");
    },

    custom: async () => {
      throw Error("Not implemented on refine-airtable data provider.");
    },
  };
};
