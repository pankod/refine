import { LiveProvider } from "@refinedev/core";

/**
 * Check out the Live Provider documentation for detailed information
 * https://refine.dev/docs/api-reference/core/providers/live-provider/
 **/
export const liveProvider = (): LiveProvider => ({
  subscribe: ({ callback, channel, types, params }) => {
    console.log("subscribe", {
      callback,
      channel,
      types,
      params,
    });
  },
  unsubscribe: ({ channel, types, params }) => {
    console.log("unsubscribe", {
      channel,
      types,
      params,
    });
  },
  publish: ({ channel, type, date, payload }) => {
    console.log("publish", {
      channel,
      type,
      date,
      payload,
    });
  },
});
