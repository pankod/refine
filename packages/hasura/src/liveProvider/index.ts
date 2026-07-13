import type { LiveProvider } from "@refinedev/core";
import type { Client } from "graphql-ws";

import {
  generateUseManySubscription,
  generateUseOneSubscription,
  generateUseListSubscription,
} from "../utils";
import { getIdType, type HasuraProviderOptions } from "../types";

const subscriptions = {
  useList: generateUseListSubscription,
  useOne: generateUseOneSubscription,
  useMany: generateUseManySubscription,
};

export type HasuraLiveProviderOptions = HasuraProviderOptions & {};

export const liveProvider = (
  client: Client,
  options?: HasuraLiveProviderOptions,
): LiveProvider => {
  return {
    subscribe: ({ callback, params }) => {
      const {
        resource,
        meta,
        pagination,
        sorters,
        filters,
        subscriptionType,
        id,
        ids,
      } = params ?? {};

      if (!meta) {
        throw new Error(
          "[useSubscription]: `meta` is required in `params` for graphql subscriptions",
        );
      }

      if (!subscriptionType) {
        throw new Error(
          "[useSubscription]: `subscriptionType` is required in `params` for graphql subscriptions",
        );
      }

      if (!resource) {
        throw new Error(
          "[useSubscription]: `resource` is required in `params` for graphql subscriptions",
        );
      }

      const generateSubscription = subscriptions[subscriptionType];

      const idType = getIdType(resource, options?.idType);
      const namingConvention = options?.namingConvention ?? "hasura-default";
      const { query, variables, operation } = generateSubscription({
        ids,
        id,
        idType,
        namingConvention,
        resource,
        filters,
        meta,
        pagination,
        sorters,
      });

      const onNext = (payload: any) => {
        callback(payload.data[operation]);
      };

      const unsubscribe = client.subscribe(
        {
          query,
          variables,
        },
        {
          next: onNext,
          error: () => null,
          complete: () => null,
        },
      );

      return unsubscribe;
    },
    unsubscribe: (unsubscribe) => {
      unsubscribe();
    },
  };
};
