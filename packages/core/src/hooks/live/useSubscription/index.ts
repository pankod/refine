import { useContext, useEffect } from "react";

import { LiveContext } from "@contexts/live";

import type {
  BaseKey,
  CrudFilter,
  CrudSort,
  MetaQuery,
  Pagination,
} from "../../../contexts/data/types";
import type { LiveEvent } from "../../../contexts/live/types";

export type UseSubscriptionProps = {
  /**
   * Channel name to subscribe.
   */
  channel: string;
  /**
   * Callback that is run when new events from subscription arrive.
   */
  onLiveEvent: (event: LiveEvent) => void;
  /**
   * Type of events to subscribe. `"*"` means all events.
   * @type Array<"deleted" | "updated" | "created" | "*" | string>
   */
  types?: LiveEvent["type"][];
  /**
   * Determines subscription should subscribe or not.
   * @type Array<"deleted" | "updated" | "created" | "*" | string>
   */
  enabled?: boolean;
  params?: {
    ids?: BaseKey[];
    id?: BaseKey;
    sorters?: CrudSort[];
    filters?: CrudFilter[];
    subscriptionType?: "useList" | "useOne" | "useMany";
    resource?: string;
    [key: string]: any;
  };
  meta?: MetaQuery & { dataProviderName?: string };
};

export const useSubscription = ({
  params,
  channel,
  types = ["*"],
  enabled = true,
  onLiveEvent,
  meta,
}: UseSubscriptionProps): void => {
  const { liveProvider } = useContext(LiveContext);

  useEffect(() => {
    let subscription: any;

    if (enabled) {
      subscription = liveProvider?.subscribe({
        channel,
        params,
        types,
        callback: onLiveEvent,
        meta: {
          ...meta,
          dataProviderName: meta?.dataProviderName ?? "default",
        },
      });
    }

    return () => {
      if (subscription) {
        liveProvider?.unsubscribe(subscription);
      }
    };
  }, [enabled]);
};
