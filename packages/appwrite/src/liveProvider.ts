import type { LiveProvider } from "@refinedev/core";
import type { Client as Appwrite } from "appwrite";
import { getRefineEvent } from "./utils";

export const liveProvider = (
  appwriteClient: Appwrite,
  options: { databaseId: string } = { databaseId: "default" },
): LiveProvider => {
  const { databaseId } = options;
  return {
    subscribe: ({ channel, types, params, callback }): any => {
      const resource = channel.replace("resources/", "");

      let appwriteChannel;

      if (params?.ids) {
        appwriteChannel = params.ids.map(
          (id) =>
            `databases.${databaseId}.collections.${resource}.documents.${id}`,
        );
      } else {
        appwriteChannel = `databases.${databaseId}.collections.${resource}.documents`;
      }

      return appwriteClient.subscribe(appwriteChannel, (event) => {
        const refineEvent = getRefineEvent(event.events[0]);
        if (
          types.includes("*") ||
          (refineEvent && types.includes(refineEvent))
        ) {
          callback({
            channel,
            type: getRefineEvent(event.events[0]) ?? event.events[0],
            payload: event.payload as any,
            date: new Date(event.timestamp * 1000),
          });
        }
      });
    },

    unsubscribe: async (unsubscribe: () => void) => {
      unsubscribe();
    },
  };
};
