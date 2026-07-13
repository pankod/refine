import type { LiveProvider, LiveEvent } from "@refinedev/core";
import Ably from "ably/promises";
import type { Types } from "ably";
interface MessageType extends Types.Message {
  data: LiveEvent;
}

const liveProvider = (client: Ably.Realtime): LiveProvider => {
  return {
    subscribe: ({ channel, types, params, callback }) => {
      const channelInstance = client.channels.get(channel);

      const listener = (message: MessageType) => {
        if (types.includes("*") || types.includes(message.data.type)) {
          if (
            message.data.type !== "created" &&
            params?.ids !== undefined &&
            message.data?.payload?.ids !== undefined
          ) {
            if (
              params.ids
                .map(String)
                .filter((value) =>
                  message.data.payload.ids?.map(String).includes(value),
                ).length > 0
            ) {
              callback(message.data as LiveEvent);
            }
          } else {
            callback(message.data);
          }
        }
      };
      channelInstance.subscribe(listener);

      return { channelInstance, listener };
    },

    unsubscribe: (payload: {
      channelInstance: Types.RealtimeChannelPromise;
      listener: () => void;
    }) => {
      const { channelInstance, listener } = payload;
      channelInstance.unsubscribe(listener);
    },

    publish: (event: LiveEvent) => {
      const channelInstance = client.channels.get(event.channel);

      channelInstance.publish(event.type, event);
    },
  };
};

export { liveProvider, Ably };
