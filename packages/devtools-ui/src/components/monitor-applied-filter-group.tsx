import React from "react";
import clsx from "clsx";
import type { Filters } from "./monitor-filters";
import { CloseIcon } from "./icons/close";

type Props = {
  filters: Filters;
  onClear: () => void;
};

const filterLabels: Record<keyof Filters, string> = {
  scope: "Scope",
  hook: "Hook",
  parent: "Parent",
  resource: "Resource",
  status: "Status",
};

const filterKeys: (keyof Filters)[] = [
  "scope",
  "hook",
  "resource",
  "parent",
  "status",
];

const prettyPrint = (value: string) => {
  // replace `-` with space and capitalize
  return value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
};

export const MonitorAppliedFilterGroup = ({ filters, onClear }: Props) => {
  const hasFilters =
    filters.hook.length > 0 ||
    filters.scope.length > 0 ||
    filters.status.length > 0 ||
    filters.parent.length > 0 ||
    filters.resource;

  const renderSection = (key: keyof Filters) => {
    const value = filters[key];
    const mapValue = typeof value === "string" ? [value] : value;

    if (!value || value.length === 0) {
      return null;
    }

    return (
      <div
        className={clsx(
          "re-py-1",
          "re-px-2",
          "re-flex",
          "re-items-center",
          "re-gap-1",
          "re-border-l",
          "re-border-l-gray-700",
        )}
      >
        <div className={clsx("re-text-xs", "re-text-gray-300")}>
          {`${filterLabels[key]}:`}
        </div>
        <div className={clsx("re-flex", "re-items-center", "re-gap-1")}>
          {mapValue?.map((el) => {
            const prettyValue = key === "scope" ? prettyPrint(el) : el;
            return (
              <div
                key={el}
                className={clsx(
                  "re-py-0.5",
                  "re-px-1",
                  "re-bg-gray-700",
                  "re-rounded-sm",
                  "re-text-gray-300",
                  "re-text-xs",
                  "re-flex-shrink-0",
                  "re-whitespace-nowrap",
                  "re-break-keep",
                )}
              >
                {prettyValue}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className={clsx(
        "re-absolute",
        "re-left-full",
        "re-top-0",
        "re-h-full",
        "re-border",
        "re-border-gray-700",
        "re-border-l-0",
        "re-rounded-tr",
        "re-rounded-br",
        hasFilters && "re-flex",
        !hasFilters && "re-hidden",
      )}
    >
      {filterKeys.map((key) => renderSection(key as any))}
      <div
        className={clsx(
          "re-p-2",
          "re-flex",
          "re-items-center",
          "re-justify-center",
          "re-border-l",
          "re-border-l-gray-700",
        )}
      >
        <button
          type="button"
          className={clsx(
            "re-appearance-none",
            "re-border-none",
            "re-bg-none",
            "re-outline-none",
            "re-p-0",
            "re-m-0",
          )}
          onClick={(event) => {
            event.stopPropagation();
            onClear();
          }}
        >
          <CloseIcon className={clsx("re-text-gray-500", "re-w-4", "re-h-4")} />
        </button>
      </div>
    </div>
  );
};
