import React, { useMemo } from "react";
import clsx from "clsx";
import { Select } from "./select";
import { Button } from "./button";
import { FilterIcon } from "./icons/filter";
import { FilterInput } from "./filter-input";
import { FilterField } from "./filter-field";
import { CheckboxGroup } from "./checkbox-group";
import { scopes } from "@refinedev/devtools-shared";
import { MonitorAppliedFilterGroup } from "./monitor-applied-filter-group";
import type { Activity } from "src/interfaces/activity";

export type Filters = {
  scope: string[];
  hook: string[];
  parent: string[];
  resource: string | undefined;
  status: Array<"loading" | "success" | "error" | "idle" | "paused">;
};

type Props = {
  filters: Filters;
  activities: Activity[];
  onSubmit: (filters: Filters) => void;
};

const filterScopes = [
  {
    label: "Auth",
    value: "auth",
  },
  {
    label: "Data",
    value: "data",
  },
  {
    label: "Access Control",
    value: "access-control",
  },
  {
    label: "Audit Log",
    value: "audit-log",
  },
];

const filterHooks = Object.keys(scopes).map((hookname) => ({
  label: hookname,
  value: hookname,
}));

const filterStatus = [
  {
    label: "Success",
    value: "success",
  },
  {
    label: "Error",
    value: "error",
  },
  {
    label: "Loading",
    value: "loading",
  },
  {
    label: "Idle",
    value: "idle",
  },
  {
    label: "Paused",
    value: "paused",
  },
];

export const MonitorFilters = ({
  filters: defaultFilters,
  activities,
  onSubmit,
}: Props) => {
  const [filters, setFilters] = React.useState<Filters>(defaultFilters);

  const hasFilters =
    defaultFilters.hook.length > 0 ||
    defaultFilters.scope.length > 0 ||
    defaultFilters.status.length > 0 ||
    defaultFilters.parent.length > 0 ||
    defaultFilters.resource;

  const panelRef = React.useRef<HTMLButtonElement>(null);
  const [panelVisible, setPanelVisible] = React.useState(false);

  const filterParent = useMemo(() => {
    const traces = activities
      .map((activity) => activity.trace?.map((t) => t.function))
      .flatMap((t) => t);

    const tracesUnique = Array.from(new Set(traces)).filter(
      (t) => !!t,
    ) as string[];

    const tracesWithoutScopes = tracesUnique.filter(
      (trace) => Object.keys(scopes).includes(trace) === false,
    );

    tracesWithoutScopes.sort((a, b) => a.localeCompare(b));

    const traceOptions = tracesWithoutScopes.map((trace) => {
      return {
        label: trace,
        value: trace,
      };
    });

    return traceOptions;
  }, [activities]);

  const onApply = () => {
    onSubmit(filters);
    setPanelVisible(false);
  };

  const onToggle = () => {
    setPanelVisible((p) => !p);
  };

  const onCancel = () => {
    setPanelVisible(false);
  };

  React.useEffect(() => {
    if (panelVisible) {
      const listener = (event: MouseEvent) => {
        if (
          panelRef.current &&
          !panelRef.current.contains(event.target as Node)
        ) {
          setPanelVisible(false);
        }
      };

      document.addEventListener("mousedown", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
      };
    }

    return () => 0;
  }, [panelVisible]);

  return (
    <Button
      ref={panelRef}
      className={clsx(
        "re-ml-4",
        "!re-px-2",
        "!re-py-2",
        "re-bg-alt-blue",
        "re-bg-opacity-[0.15]",
        "!re-text-alt-blue",
        "re-relative",
        hasFilters && "re-rounded-tr-none",
        hasFilters && "re-rounded-br-none",
        hasFilters && "re-border-r re-border-r-gray-700",
      )}
      contentClassName={clsx(
        "re-flex",
        "re-items-center",
        "re-justify-center",
        "re-gap-2",
      )}
      onClick={onToggle}
    >
      <FilterIcon />
      <span className="re-text-alt-blue">Filters</span>
      <MonitorAppliedFilterGroup
        filters={defaultFilters}
        onClear={() => {
          const emptyFilters = {
            scope: [],
            hook: [],
            parent: [],
            resource: undefined,
            status: [],
          };
          setFilters(emptyFilters);
          onSubmit(emptyFilters);
        }}
      />
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className={clsx(
          "re-absolute",
          "re-top-10",
          "re--left-2",
          "re-z-[2]",
          "re-transition-[opacity,transform]",
          "re-duration-200",
          "re-ease-in-out",
          "re-origin-top-left",
          panelVisible
            ? "re-scale-100 re-opacity-100"
            : "re-scale-0 re-opacity-0",
        )}
      >
        <div
          className={clsx(
            "re-shadow-monitor-filters",
            "re-shadow-gray-900",
            "re-bg-gray-800",
            "re-border",
            "re-border-gray-700",
            "re-rounded",
            "re-flex",
            "re-flex-col",
            "re-w-[600px]",
          )}
        >
          <div
            className={clsx(
              "re-flex",
              "re-flex-col",
              "re-p-4",
              "re-gap-4",
              "re-border-b",
              "re-border-b-gray-700",
            )}
          >
            <FilterField label="Scope">
              <Select
                type="multiple"
                value={filters.scope}
                onChange={(v) =>
                  setFilters((p) => ({
                    ...p,
                    scope: v,
                  }))
                }
                placeholder="Select Scope"
                options={filterScopes}
              />
            </FilterField>
            <FilterField label="Hook">
              <Select
                type="multiple"
                value={filters.hook}
                onChange={(v) =>
                  setFilters((p) => ({
                    ...p,
                    hook: v,
                  }))
                }
                placeholder="Select Hook"
                options={filterHooks}
              />
            </FilterField>
            <FilterField label="Parent">
              <Select
                type="multiple"
                value={filters.parent}
                onChange={(v) =>
                  setFilters((p) => ({
                    ...p,
                    parent: v,
                  }))
                }
                placeholder="Select Parent"
                options={filterParent}
              />
            </FilterField>
            <FilterField label="Resource">
              <FilterInput
                value={filters.resource}
                onChange={(v) =>
                  setFilters((p) => ({
                    ...p,
                    resource: v,
                  }))
                }
                placeholder="Type to filter by Resource"
              />
            </FilterField>
            <FilterField label="Status">
              <CheckboxGroup
                options={filterStatus}
                onChange={(v) =>
                  setFilters((p) => ({
                    ...p,
                    status: v as any,
                  }))
                }
                values={filters.status}
              />
            </FilterField>
          </div>
          <div
            className={clsx(
              "re-p-5",
              "re-flex",
              "re-items-center",
              "re-justify-between",
            )}
          >
            <button
              type="button"
              onClick={onCancel}
              className={clsx(
                "re-rounded",
                "re-border",
                "re-border-gray-700",
                "re-py-2",
                "re-px-4",
                "re-text-xs",
                "re-capitalize",
                "re-text-gray-300",
              )}
            >
              cancel
            </button>
            <button
              type="button"
              onClick={onApply}
              className={clsx(
                "re-rounded",
                "re-py-2",
                "re-px-4",
                "re-text-xs",
                "re-capitalize",
                "re-text-gray-0",
                "re-bg-brand-blue",
              )}
            >
              Apply filters
            </button>
          </div>
        </div>
      </div>
    </Button>
  );
};
