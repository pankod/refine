import React from "react";
import clsx from "clsx";
import type { Feed as FeedType } from "@refinedev/devtools-shared";
import { FeedItem } from "src/components/feed-item";

export const Feed = () => {
  const [feed, setFeed] = React.useState<FeedType | null>(null);

  const fetchFeed = React.useCallback(async () => {
    try {
      const response = await fetch("api/feed");
      const { data } = (await response.json()) as {
        data: FeedType | null;
      };
      setFeed(data);
    } catch (error) {
      //
    }
  }, []);

  React.useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return (
    <div
      className={clsx(
        "re-flex-1",
        "re-flex",
        "re-flex-col",
        "re-h-full",
        "re-w-full",
        "large:re-max-w-[380px]",
        "re-justify-center",
        "re-mx-auto",
      )}
    >
      <div
        className={clsx(
          "re-text-sm",
          "re-text-gray-0",
          "re-font-semibold",
          "re-leading-8",
          "re-flex-shrink-0",
        )}
      >
        Updates from the Refine team
      </div>
      <div className={clsx("re-flex-1", "re-overflow-auto")}>
        <div className={clsx("re-flex", "re-flex-col", "re-gap-8")}>
          <div className="re-h-px re-w-full re-flex-shrink-0" />
          {feed?.map((item, index) => (
            <FeedItem key={index} item={item} />
          ))}
          <div className="re-h-px re-w-full re-flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};
