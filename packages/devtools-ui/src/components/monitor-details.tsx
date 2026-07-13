import React from "react";
import clsx from "clsx";

import type { Activity } from "src/interfaces/activity";
import { Status } from "./status";
import { TraceList } from "./trace-list";
import dayjs from "dayjs";
import { Owners } from "./owners";
import { JsonViewer } from "./json-viewer";
import { excludeKeys } from "src/utils/exclude-keys";
import { InvalidateButton } from "./invalidate-button";
import { getResourceValue } from "src/utils/get-resource-value";
import { ResourceValue } from "./resource-value";
import {
  DevToolsContext,
  type RefineHook,
  scopes,
} from "@refinedev/devtools-shared";
import { getOwners } from "src/utils/get-owners";

export const MonitorDetails = ({ activity }: { activity?: Activity }) => {
  const { ws } = React.useContext(DevToolsContext);

  return (
    <div className={clsx("re-h-full", "re-text-gray-300", "re-relative")}>
      <div
        className={clsx(
          "re-absolute",
          "re-w-full",
          "re-h-full",
          "re-overflow-auto",
        )}
      >
        {activity ? (
          <>
            <div
              className={clsx(
                "re-px-2",
                "re-pt-2",
                "re-pb-4",
                "re-bg-gray-800",
                "re-flex",
                "re-flex-col",
                "re-gap-2",
                "re-rounded-tl-lg",
                "re-rounded-tr-lg",
                "re-border-b",
                "re-border-b-gray-700",
              )}
            >
              <div
                className={clsx(
                  "re-flex",
                  "re-items-center",
                  "re-justify-start",
                  "re-w-full",
                  "re-text-xs",
                  "re-py-1",
                )}
              >
                <div
                  className={clsx(
                    "re-w-20",
                    "re-flex-shrink-0",
                    "re-text-gray-400",
                  )}
                >
                  Resource:
                </div>
                <div className={clsx("re-flex-1", "re-capitalize")}>
                  <ResourceValue
                    resource={getResourceValue(activity)}
                    scope={scopes[activity.hookName as RefineHook]}
                  />
                </div>
              </div>
              <div
                className={clsx(
                  "re-flex",
                  "re-items-center",
                  "re-justify-start",
                  "re-w-full",
                  "re-text-xs",
                  "re-py-1",
                )}
              >
                <div
                  className={clsx(
                    "re-w-20",
                    "re-flex-shrink-0",
                    "re-text-gray-400",
                  )}
                >
                  Hook name:
                </div>
                <div className={clsx("re-flex-1")}>
                  {activity?.hookName}
                  {activity.type === "query" && (
                    <span
                      className={clsx(
                        "re-ml-2",
                        "re-rounded-xl",
                        "re-py-0.5",
                        "re-px-1",
                        "re-text-[10px]",
                        "re-text-alt-blue",
                        "re-bg-alt-blue",
                        "re-bg-opacity-20",
                        "re-border",
                        "re-border-alt-blue",
                      )}
                    >
                      Query
                    </span>
                  )}
                  {activity.type === "mutation" && (
                    <span
                      className={clsx(
                        "re-ml-2",
                        "re-rounded-xl",
                        "re-py-0.5",
                        "re-px-1",
                        "re-text-[10px]",
                        "re-text-alt-cyan",
                        "re-bg-alt-cyan",
                        "re-bg-opacity-20",
                        "re-border",
                        "re-border-alt-cyan",
                      )}
                    >
                      Mutation
                    </span>
                  )}
                </div>
              </div>
              <div
                className={clsx(
                  "re-flex",
                  "re-items-center",
                  "re-justify-start",
                  "re-w-full",
                  "re-text-xs",
                )}
              >
                <div
                  className={clsx(
                    "re-w-[72px]",
                    "re-flex-shrink-0",
                    "re-text-gray-400",
                  )}
                >
                  Trace:
                </div>
                <div
                  className={clsx(
                    "re-flex-1",
                    "no-scrollbar",
                    "re-overflow-auto",
                  )}
                >
                  <TraceList trace={activity.trace} />
                </div>
              </div>
            </div>
            <div
              className={clsx(
                "re-flex",
                "re-flex-col",
                "re-py-4",
                "re-px-2",
                "re-border-b",
                "re-border-b-gray-700",
                "re-text-xs",
              )}
            >
              <div
                className={clsx(
                  "re-flex",
                  "re-items-center",
                  "re-justify-start",
                  "re-w-full",
                  "re-text-xs",
                  "re-py-1",
                )}
              >
                <div
                  className={clsx(
                    "re-w-20",
                    "re-flex-shrink-0",
                    "re-text-gray-400",
                  )}
                >
                  Status:
                </div>
                <div className={clsx("re-flex-1", "re-capitalize")}>
                  <Status activity={activity} />
                </div>
              </div>
              <div
                className={clsx(
                  "re-flex",
                  "re-items-center",
                  "re-justify-start",
                  "re-w-full",
                  "re-text-xs",
                  "re-py-1",
                )}
              >
                <div
                  className={clsx(
                    "re-w-20",
                    "re-flex-shrink-0",
                    "re-text-gray-400",
                  )}
                >
                  Created At:
                </div>
                <div className={clsx("re-flex-1", "re-capitalize")}>
                  {dayjs(activity.createdAt).format("HH:mm:ss:SSS")}
                </div>
              </div>
              <div
                className={clsx(
                  "re-flex",
                  "re-items-center",
                  "re-justify-start",
                  "re-w-full",
                  "re-text-xs",
                  "re-py-1",
                )}
              >
                <div
                  className={clsx(
                    "re-w-20",
                    "re-flex-shrink-0",
                    "re-text-gray-400",
                  )}
                >
                  Updated At:
                </div>
                <div className={clsx("re-flex-1", "re-capitalize")}>
                  {dayjs(activity.updatedAt).format("HH:mm:ss:SSS")}
                </div>
              </div>
            </div>
            <div className={clsx("re-flex", "re-flex-col")}>
              {getOwners(activity).length > 0 && (
                <div
                  className={clsx(
                    "re-px-2",
                    "re-py-4",
                    "re-flex",
                    "re-flex-col",
                    "re-gap-2",
                    "re-border-b",
                    "re-border-b-gray-700",
                  )}
                >
                  <div
                    className={clsx(
                      "re-text-xs",
                      "re-font-semibold",
                      "re-text-gray-300",
                    )}
                  >
                    Owner(s)
                  </div>
                  <Owners activity={activity} />
                </div>
              )}
              <div
                className={clsx(
                  "re-px-2",
                  "re-py-4",
                  "re-flex",
                  "re-flex-col",
                  "re-gap-2",
                  "re-border-b",
                  "re-border-b-gray-700",
                )}
              >
                <div
                  className={clsx(
                    "re-text-xs",
                    "re-font-semibold",
                    "re-text-gray-300",
                  )}
                >
                  Key
                </div>
                <JsonViewer data={activity.key ?? []} label="Key" />
              </div>
              {activity.type === "mutation" && activity.variables && (
                <div
                  className={clsx(
                    "re-px-2",
                    "re-py-4",
                    "re-flex",
                    "re-flex-col",
                    "re-gap-2",
                    "re-border-b",
                    "re-border-b-gray-700",
                  )}
                >
                  <div
                    className={clsx(
                      "re-text-xs",
                      "re-font-semibold",
                      "re-text-gray-300",
                    )}
                  >
                    Variables
                  </div>
                  <JsonViewer
                    data={activity.variables ?? {}}
                    label="Variables"
                  />
                </div>
              )}
              {activity.state.data && (
                <div
                  className={clsx(
                    "re-px-2",
                    "re-py-4",
                    "re-flex",
                    "re-flex-col",
                    "re-gap-2",
                    "re-border-b",
                    "re-border-b-gray-700",
                  )}
                >
                  <div
                    className={clsx(
                      "re-text-xs",
                      "re-font-semibold",
                      "re-text-gray-300",
                      "re-flex",
                      "re-items-center",
                      "re-justify-between",
                    )}
                  >
                    <span>Data</span>
                    <InvalidateButton activity={activity} />
                  </div>
                  <JsonViewer data={activity.state.data ?? {}} label="Data" />
                </div>
              )}
              {activity.state.error && (
                <div
                  className={clsx(
                    "re-px-2",
                    "re-py-4",
                    "re-flex",
                    "re-flex-col",
                    "re-gap-2",
                    "re-border-b",
                    "re-border-b-gray-700",
                  )}
                >
                  <div
                    className={clsx(
                      "re-text-xs",
                      "re-font-semibold",
                      "re-text-gray-300",
                      "re-flex",
                      "re-items-center",
                      "re-justify-between",
                    )}
                  >
                    Error
                    <InvalidateButton activity={activity} />
                  </div>
                  <JsonViewer data={activity.state.error ?? {}} label="Error" />
                </div>
              )}
              {activity.state && (
                <div
                  className={clsx(
                    "re-px-2",
                    "re-py-4",
                    "re-flex",
                    "re-flex-col",
                    "re-gap-2",
                  )}
                >
                  <div
                    className={clsx(
                      "re-text-xs",
                      "re-font-semibold",
                      "re-text-gray-300",
                    )}
                  >
                    Extra
                  </div>
                  <JsonViewer
                    data={excludeKeys(activity.state, [
                      "data",
                      "error",
                      "status",
                    ])}
                    label="Extra"
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <div
            className={clsx(
              "re-w-full",
              "re-h-full",
              "re-flex",
              "re-justify-center",
              "re-items-center",
              "re-text-gray-600",
            )}
          >
            No activity selected
          </div>
        )}
      </div>
    </div>
  );
};
