import React from "react";
import { cleanFilePath } from "src/utils/clean-file-path";
import type { Activity } from "src/interfaces/activity";
import clsx from "clsx";
import { getOwners } from "src/utils/get-owners";
import { DevToolsContext } from "@refinedev/devtools-shared";

export const Owners = ({ activity }: { activity: Activity }) => {
  const { httpUrl } = React.useContext(DevToolsContext);

  const owners = getOwners(activity);

  return (
    <ul className={clsx("re-list-disc", "re-list-inside")}>
      {owners.map((owner, i) => {
        const cleanPath = cleanFilePath(owner.file);

        const openerUrl = `${httpUrl}/open-in-editor/${cleanPath}?line=${
          owner.line ?? 1
        }&column=${owner.column ?? 1}`;

        return (
          <li key={i}>
            <div
              className={clsx(
                "re--ml-2",
                "re-inline-flex",
                "re-flex-col",
                "re-items-start",
                "re-gap-1",
                "re-max-w-[calc(100%-20px)]",
              )}
            >
              <span
                className={clsx(
                  "re-text-xs",
                  "re-text-gray-300",
                  "re-font-mono",
                  "re-break-all",
                )}
              >
                {owner.function}
              </span>
              <a
                href={openerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "re-no-underline",
                  "hover:re-underline",
                  "re-text-[10px]",
                  "re-text-gray-500",
                  "re-break-all",
                )}
              >
                {"at "}
                {cleanPath}
                {owner.line && `:${owner.line}`}
                {owner.column && `:${owner.column}`}
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
