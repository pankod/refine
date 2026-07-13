import { useCallback } from "react";

import {
  type InvalidateOptions,
  type InvalidateQueryFilters,
  useQueryClient,
} from "@tanstack/react-query";

import { pickDataProvider } from "@definitions";
import { useKeys, useResourceParams } from "@hooks";

import type { BaseKey, IQueryKeys } from "../../contexts/data/types";

export type UseInvalidateProp = {
  resource?: string;
  id?: BaseKey;
  dataProviderName?: string;
  invalidates: Array<keyof IQueryKeys> | false;
  invalidationFilters?: InvalidateQueryFilters;
  invalidationOptions?: InvalidateOptions;
};

export const useInvalidate = (): ((
  props: UseInvalidateProp,
) => Promise<void>) => {
  const { resources } = useResourceParams();
  const queryClient = useQueryClient();
  const { keys } = useKeys();

  const invalidate = useCallback(
    async ({
      resource,
      dataProviderName,
      invalidates,
      id,
      invalidationFilters = { type: "all", refetchType: "active" },
      invalidationOptions = { cancelRefetch: false },
    }: UseInvalidateProp) => {
      if (invalidates === false) {
        return;
      }
      const dp = pickDataProvider(resource, dataProviderName, resources);

      const queryKey = keys()
        .data(dp)
        .resource(resource ?? "");

      await Promise.all(
        invalidates.map((key) => {
          switch (key) {
            case "all":
              return queryClient.invalidateQueries({
                queryKey: keys().data(dp).get(),
                ...invalidationFilters,
                ...invalidationOptions,
              });
            case "list":
              return queryClient.invalidateQueries({
                queryKey: queryKey.action("list").get(),
                ...invalidationFilters,
                ...invalidationOptions,
              });
            case "many":
              return queryClient.invalidateQueries({
                queryKey: queryKey.action("many").get(),
                ...invalidationFilters,
                ...invalidationOptions,
              });
            case "resourceAll":
              return queryClient.invalidateQueries({
                queryKey: queryKey.get(),
                ...invalidationFilters,
                ...invalidationOptions,
              });
            case "detail":
              return queryClient.invalidateQueries({
                queryKey: queryKey
                  .action("one")
                  .id(id || "")
                  .get(),
                ...invalidationFilters,
                ...invalidationOptions,
              });
            default:
              return;
          }
        }),
      );

      return;
    },
    [],
  );

  return invalidate;
};
