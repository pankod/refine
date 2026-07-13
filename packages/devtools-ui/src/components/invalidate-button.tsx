import React from "react";
import type { Activity } from "../interfaces/activity";
import { UpdateIcon } from "./icons/update";
import clsx from "clsx";
import {
  DevToolsContext,
  DevtoolsEvent,
  send,
} from "@refinedev/devtools-shared";

export const InvalidateButton = ({ activity }: { activity: Activity }) => {
  const { ws } = React.useContext(DevToolsContext);

  if (activity.type !== "query") return null;

  if (activity.status === "success" || activity.status === "error") {
    const isFetching = activity.state.fetchStatus === "fetching";

    return (
      <>
        <button
          type="button"
          onClick={() => {
            if (!ws || !activity.key) return;
            send(ws, DevtoolsEvent.DEVTOOLS_INVALIDATE_QUERY, {
              queryKey: activity.key,
            });
          }}
          className={clsx(
            "re-ml-2",
            "re-rounded-xl",
            "re-py-0.5",
            "re-pl-1",
            "re-pr-1.5",
            "re-text-[10px]",
            "re-text-alt-blue",
            "re-bg-alt-blue",
            "re-bg-opacity-20",
            "re-border",
            "re-border-alt-blue",
            "re-flex",
            "re-items-center",
            "re-gap-1",
            "re-font-normal",
            "hover:re-bg-opacity-30",
            "active:re-bg-opacity-40",
          )}
        >
          <UpdateIcon
            className={clsx(
              isFetching && "re-animate-spin",
              "re-w-3",
              "re-h-3",
            )}
          />
          Invalidate Query
        </button>
      </>
    );
  }

  return null;
};
