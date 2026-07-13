import React from "react";
import dayjs from "dayjs";
import clsx from "clsx";

import type { FeedSection } from "@refinedev/devtools-shared";

type Props = {
  item: FeedSection;
};

export const FeedItem = ({ item }: Props) => {
  const isNew = dayjs().diff(dayjs(item.date), "day") <= 3;
  const isFeatured = item.featured;

  return (
    <div
      className={clsx(
        "re-border",
        "re-border-gray-700",
        "re-rounded-lg",
        "re-bg-gray-900",
        isFeatured && "re-bg-feed-item-featured",
        isNew && "re-bg-feed-item-new",
        "re-p-6",
        "re-flex",
        "re-flex-col",
        "re-gap-4",
      )}
    >
      <div className={clsx("re-flex", "re-items-center", "re-justify-between")}>
        <div
          className={clsx(
            "re-flex",
            "re-items-center",
            "re-justify-center",
            "re-gap-2",
          )}
        >
          {item.avatar && (
            <img
              src={item.avatar}
              className={clsx("re-w-5", "re-h-5", "re-rounded-lg")}
            />
          )}
          <div className={clsx("re-text-xs", "re-text-gray-500")}>
            {item.author}
          </div>
          <div
            className={clsx(
              "re-text-sm",
              "re-leading-4",
              "re-text-gray-600",
              "re-font-black",
            )}
          >
            ·
          </div>
          <div className={clsx("re-text-xs", "re-text-gray-500")}>
            {dayjs(item.date).format("DD MMM, HH:mm")}
          </div>
        </div>
        <div
          className={clsx(
            isFeatured || isNew ? "re-flex" : "re-hidden",
            "re-text-[8px]",
            "re-leading-[10px]",
            "re-border",
            isFeatured && "re-text-alt-pink",
            isFeatured && "re-border-alt-pink",
            isNew && "re-text-alt-cyan",
            isNew && "re-border-alt-cyan",
            "re-py-0.5",
            "re-px-1.5",
            "re-rounded-xl",
            "re-bg-gray-900",
            "re-bg-opacity-10",
            "re-border-opacity-20",
            "re-uppercase",
            "re-font-semibold",
          )}
        >
          {isFeatured ? "featured" : isNew ? "new" : ""}
        </div>
      </div>
      {item.cover && (
        <img
          src={item.cover}
          className={clsx(
            "re-w-full",
            "re-aspect-[10/6]",
            "re-bg-gray-900",
            "re-border",
            "re-border-gray-700",
            "re-rounded",
          )}
        />
      )}
      <div className={clsx("re-flex", "re-flex-col", "re-gap-2")}>
        <div
          className={clsx("re-text-sm", "re-text-gray-300", "re-font-semibold")}
        >
          {item.title}
        </div>
        <div
          className={clsx(
            "re-prose",
            "prose",
            "re-text-gray-400",
            "re-text-xs",
            "re-leading-5",
            "prose-a:re-text-alt-blue",
            "prose-a:re-underline",
          )}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </div>
    </div>
  );
};
