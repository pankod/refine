import React from "react";
import clsx from "clsx";
import { Button } from "./button";
import { PlusCircleIcon } from "./icons/plus-circle";
import type { AvailablePackageType } from "@refinedev/devtools-shared";

type PackageItemProps = {
  onInstall?: () => void;
} & AvailablePackageType;

export const AddPackageItem = ({
  name,
  description,
  onInstall,
}: PackageItemProps) => {
  return (
    <div
      className={clsx(
        "re-rounded-lg",
        "re-border",
        "re-border-gray-700",
        "re-bg-gray-800",
      )}
    >
      <div
        className={clsx(
          "re-py-4",
          "re-px-4",
          "re-border-b",
          "re-border-b-gray-700",
          "re-flex",
          "re-flex-col",
        )}
      >
        <div
          className={clsx("re-flex", "re-items-center", "re-justify-between")}
        >
          <div
            className={clsx(
              "re-font-semibold",
              "re-text-sm",
              "re-leading-6",
              "re-text-gray-300",
            )}
          >
            {name}
          </div>
          <Button
            onClick={onInstall}
            className={clsx(
              "re-text-alt-blue",
              "re-bg-alt-blue",
              "re-bg-opacity-[0.15]",
              "!re-px-2",
            )}
            contentClassName={clsx(
              "re-gap-2",
              "re-flex-nowrap",
              "re-flex",
              "re-items-center",
              "re-justify-between",
            )}
          >
            <PlusCircleIcon className="re-text-alt-blue" />
            <span className="re-text-alt-blue">Install</span>
          </Button>
        </div>
        <div className={clsx("re-text-xs", "re-leading-5", "re-text-gray-400")}>
          {description ?? ""}
        </div>
      </div>
      <div
        className={clsx(
          "re-p-4",
          "re-flex",
          "re-items-center",
          "re-justify-between",
        )}
      >
        <div>
          <a
            href={name.replace("@refinedev/", "https://c.refine.dev/")}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx("re-text-alt-blue", "re-text-xs")}
          >
            changelog
          </a>
        </div>
        <div>
          <a
            href={name.replace("@refinedev/", "https://d.refine.dev/")}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx("re-text-alt-blue", "re-text-xs")}
          >
            documentation
          </a>
        </div>
      </div>
    </div>
  );
};
