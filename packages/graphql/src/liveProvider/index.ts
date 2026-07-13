import type { LiveProvider } from "@refinedev/core";

import type { Client } from "graphql-ws";
import { generateSubscription } from "./helpers";

type SubscriptionAction = "created" | "updated" | "deleted";

export const createLiveProvider = (client: Client): LiveProvider => {
  const subscribeToResource = (
    client: Client,
    callback: Function,
    params: any,
    meta: any,
    action: SubscriptionAction,
    resource: string,
    unsubscribes: Function[],
  ) => {
    const unsubscribe = generateSubscription(
      client,
      { callback, params, meta },
      action,
    );
    unsubscribes.push(unsubscribe);
  };

  return {
    subscribe({ callback, params, meta }) {
      const { resource, subscriptionType } = params ?? {};

      if (!meta || !subscriptionType || !resource) {
        throw new Error(
          "[useSubscription]: `meta`, `subscriptionType` and `resource` are required in `params` for graphql subscriptions",
        );
      }

      const unsubscribes: any[] = [];

      if (params?.subscriptionType === "useList") {
        ["created", "updated", "deleted"].forEach((action) =>
          subscribeToResource(
            client,
            callback,
            params,
            meta,
            action as SubscriptionAction,
            resource,
            unsubscribes,
          ),
        );
      }

      if (params?.subscriptionType === "useOne") {
        subscribeToResource(
          client,
          callback,
          params,
          meta,
          "updated",
          resource,
          unsubscribes,
        );
      }

      const unsubscribe = () => {
        unsubscribes.forEach((unsubscribe) => unsubscribe());
      };

      return unsubscribe;
    },
    unsubscribe(unsubscribe) {
      unsubscribe();
    },
  };
};
