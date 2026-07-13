import React from "react";
import clsx from "clsx";

import type {
  PackageLatestVersionType,
  PackageType,
} from "@refinedev/devtools-shared";
import semverDiff from "semver-diff";
import { UpdateIcon } from "./icons/update";
import { CheckIcon } from "./icons/check";
import { InfoIcon } from "./icons/info";
import { getLatestInfo } from "src/utils/packages";

type Props = {
  item: PackageType;
  blocked?: boolean;
  onUpdate: (packageName: string) => Promise<boolean>;
  onOutdated: (packageName: string) => void;
};

export const PackageItem = ({ item, blocked, onUpdate, onOutdated }: Props) => {
  const [latestLoading, setLatestLoading] = React.useState(true);
  const [latestData, setLatestData] =
    React.useState<PackageLatestVersionType | null>(null);

  React.useEffect(() => {
    setLatestLoading(true);

    getLatestInfo(item.name)
      .then((data) => {
        setLatestData(data);
      })
      .catch(() => 0)
      .finally(() => {
        setLatestLoading(false);
      });
  }, []);

  const updateKind =
    latestData && item.currentVersion && latestData.latestVersion
      ? semverDiff(item.currentVersion, latestData.latestVersion)
      : undefined;

  const hasUpdate = typeof updateKind !== "undefined";

  const [status, setStatus] = React.useState<
    "idle" | "updating" | "done" | "error"
  >("idle");

  const icon = React.useMemo(() => {
    switch (status) {
      case "updating":
        return <UpdateIcon className="re-animate-spin" />;
      case "done":
        return <CheckIcon />;
      case "error":
        return <InfoIcon className="re-rotate-180" />;
      case "idle":
        return <UpdateIcon />;
    }
  }, [status]);

  const statusText = React.useMemo(() => {
    switch (status) {
      case "updating":
        return "Updating";
      case "done":
        return "Updated";
      case "error":
        return "Error";
      case "idle":
        return "Update";
    }
  }, [status]);

  const updatePackage = React.useCallback(async () => {
    if (status !== "idle") return;
    try {
      setStatus("updating");
      const response = await onUpdate?.(item.name);

      if (response) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
      //
    }
  }, [item.name, status]);

  React.useEffect(() => {
    if (hasUpdate) {
      onOutdated(item.name);
    }
  }, [hasUpdate]);

  return (
    <div
      className={clsx(
        "re-border",
        "re-border-gray-700",
        "re-rounded-lg",
        "re-bg-gray-900",
        hasUpdate && "re-bg-package-item-has-updates",
        "re-flex",
        "re-flex-col",
      )}
    >
      <div
        className={clsx(
          "re-flex-1",
          "re-px-4",
          "re-pt-4",
          "re-pb-6",
          "re-flex",
          "re-flex-col",
          "re-gap-3",
          "re-border-b",
          "re-border-b-gray-700",
        )}
      >
        <div
          className={clsx("re-flex", "re-items-center", "re-justify-between")}
        >
          <div
            className={clsx(
              "re-text-base",
              "re-leading-8",
              "re-font-semibold",
              "re-text-gray-300",
            )}
          >
            {item.name}
          </div>
          {hasUpdate && (
            <button
              type="button"
              disabled={(blocked && status === "idle") || status !== "idle"}
              onClick={updatePackage}
              className={clsx(
                "re-py-2",
                "re-pl-2",
                "re-pr-3",
                "re-rounded",
                (status === "idle" || status === "updating") &&
                  "re-bg-alt-blue re-text-alt-blue",
                status === "done" && "re-bg-alt-green re-text-alt-green",
                status === "error" && "re-bg-alt-red re-text-alt-red",
                "re-bg-opacity-[0.15]",
                "re-text-xs",
                "re-flex",
                "re-items-center",
                "re-flex-shrink-0",
                "re-gap-2",
              )}
            >
              {icon}
              <span>{statusText}</span>
            </button>
          )}
          {!hasUpdate && (
            <div
              className={clsx(
                "re-text-gray-500",
                "re-text-xs",
                "re-flex",
                "re-items-center",
                "re-gap-2",
              )}
            >
              {latestLoading ? (
                <span className="re-block re-h-4 re-w-20 re-bg-gray-700 re-animate-pulse re-rounded-md" />
              ) : (
                <>
                  <CheckIcon />
                  <span>Up to date</span>
                </>
              )}
            </div>
          )}
        </div>
        <div className={clsx("re-text-xs", "re-leading-5", "re-text-gray-400")}>
          {item.description ?? ""}
        </div>
      </div>
      <div
        className={clsx(
          "re-p-4",
          "re-flex",
          "re-flex-col",
          "re-gap-3",
          "re-flex-shrink-0",
        )}
      >
        {hasUpdate && (
          <div
            className={clsx(
              "re-text-alt-green",
              "re-text-xs",
              "re-leading-5",
              "re-flex",
              "re-items-center",
              "re-flex-shrink-0",
              "re-gap-2",
            )}
          >
            <InfoIcon />
            <span>
              <span>{"There's a "}</span>
              <span className="re-font-semibold">{updateKind}</span>
              <span>{" release "}</span>
              <span
                className={clsx(
                  "re-py-1",
                  "re-px-2",
                  "re-rounded",
                  "re-bg-alt-green",
                  "re-bg-opacity-30",
                  "re-text-alt-green",
                  "re-font-mono",
                  "re-font-bold",
                  "re-leading-4",
                )}
              >
                {latestData?.latestVersion
                  ? `v${latestData.latestVersion}`
                  : ""}
              </span>
            </span>
          </div>
        )}
        <div
          className={clsx(
            "re-flex",
            "re-items-center",
            "re-gap-2",
            "re-text-xs",
            "re-text-gray-500",
          )}
        >
          {item.documentation && (
            <>
              <a
                href={item.documentation}
                rel="noopener noreferrer"
                target="_blank"
              >
                documentation
              </a>
              <span className="re-font-black re-text-gray-600 re-text-base re-leading-4">
                ·
              </span>
            </>
          )}
          {item.changelog && (
            <>
              <a
                href={item.changelog}
                rel="noopener noreferrer"
                target="_blank"
              >
                changelog
              </a>
              <span className="re-font-black re-text-gray-600 re-text-base re-leading-4">
                ·
              </span>
            </>
          )}
          <span
            className={clsx(
              "re-block",
              "re-py-1",
              "re-px-2",
              "re-rounded",
              "re-bg-gray-700",
              "re-text-gray-400",
              "re-font-mono",
              "re-font-bold",
            )}
          >
            v{item.currentVersion}
          </span>
        </div>
      </div>
    </div>
  );
};
