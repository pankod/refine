import type { CrudFilter } from "@refinedev/core";

/**
 * Replace ID("id") With Appwrite ID("$id")
 * @param filter Filter to replace
 * @returns Filter with replaced ID
 */
export const replaceIdWithAppwriteId = (filter: CrudFilter): CrudFilter => {
  if ("field" in filter && filter.field === "id") {
    filter.field = "$id";
  }

  return {
    ...filter,
    value: filter.value,
  };
};
