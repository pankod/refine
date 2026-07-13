import React from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "./icons/chevron-down";
import { CloseIcon } from "./icons/close";

type SelectCommonProps = {
  placeholder?: string;
  hint?: string;
  className?: string;
  options: {
    label: string;
    value: string;
  }[];
};

type SelectSingleProps = {
  type: "single";
  value?: string;
  onChange?: (value: string | undefined) => void;
};

type SelectMultiProps = {
  type: "multiple";
  value?: string[];
  onChange?: (value: string[]) => void;
};

type SelectProps<TType extends "multiple" | "single"> = SelectCommonProps &
  (TType extends "multiple" ? SelectMultiProps : SelectSingleProps);

export const Select = <TType extends "multiple" | "single">({
  type,
  options,
  placeholder,
  hint,
  value,
  onChange,
  className,
}: SelectProps<TType>) => {
  return (
    <div
      className={clsx(
        "re-relative",
        "re-flex",
        "re-flex-1",
        "re-rounded",
        "re-border",
        "re-border-gray-700",
        "re-bg-gray-900",
        className,
      )}
    >
      <div
        className={clsx(
          "re-z-[2]",
          "re-min-h-[32px]",
          "re-h-full",
          "re-flex-1",
          "re-py-1.5",
          "re-pl-1.5",
          "re-pr-8",
          "re-pointer-events-none",
          "re-flex",
          "re-flex-wrap",
          "re-items-center",
          "re-gap-2",
        )}
      >
        {((Array.isArray(value) && value.length === 0) || !value) && (
          <span
            className={clsx("re-text-gray-500", "re-text-xs", "re-leading-4")}
          >
            {placeholder}
          </span>
        )}
        {type === "multiple" && (
          <>
            {(value as string[])?.map((item) => (
              <div
                key={item}
                className={clsx(
                  "re-py-0.5",
                  "re-pl-2",
                  "re-pr-1",
                  "re-flex",
                  "re-items-center",
                  "re-justify-center",
                  "re-flex-nowrap",
                  "re-gap-2",
                  "re-rounded-sm",
                  "re-bg-gray-800",
                )}
              >
                <span
                  className={clsx(
                    "re-text-gray-300",
                    "re-text-xs",
                    "re-whitespace-nowrap",
                    "re-break-keep",
                  )}
                >
                  {options?.find((i) => i.value === item)?.label}
                </span>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();

                    if (type === "multiple") {
                      const newValue = [...((value as string[]) ?? [])].filter(
                        (v) => v !== item,
                      );
                      onChange?.(newValue as any);
                    }
                  }}
                  className={clsx(
                    "re-pointer-events-auto",
                    "re-text-gray-500",
                    "re-flex-shrink-0",
                    "re-appearance-none",
                    "re-outline-none",
                    "re-border-none",
                    "re-bg-none",
                    "re-px-0",
                    "re-py-0.5",
                  )}
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </>
        )}
        {type === "single" && value && (
          <span
            className={clsx("re-text-gray-300", "re-text-xs", "re-leading-4")}
          >
            {options?.find((i) => i.value === value)?.label}
          </span>
        )}
      </div>
      {type === "single" && value ? (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            onChange?.(undefined as any);
          }}
          className={clsx(
            "re-z-[2]",
            "re-appearance-none",
            "re-border-none",
            "re-bg-none",
            "re-pointer-events-auto",
            "re-absolute",
            "re-right-0",
            "re-h-full",
            "re-flex",
            "re-items-center",
            "re-justify-center",
            "re-p-2",
            "re-text-gray-500",
          )}
        >
          <CloseIcon />
        </button>
      ) : (
        <div
          className={clsx(
            "re-pointer-events-none",
            "re-absolute",
            "re-right-0",
            "re-h-full",
            "re-flex",
            "re-items-center",
            "re-justify-center",
            "re-p-2",
            "re-text-gray-700",
          )}
        >
          <ChevronDownIcon />
        </div>
      )}
      <select
        id="filter-1"
        className={clsx(
          "re-opacity-0",
          "re-w-full",
          "re-h-full",
          "re-absolute",
          "re-left-0",
          "re-top-0",
          "re-bg-none",
          "re-bg-transparent",
          "re-appearance-none",
          "re-border-none",
          "re-outline-none",
        )}
        value=""
        onChange={(event) => {
          if (!event.target.value) return;

          if (type === "multiple") {
            const newValue = [...((value as any) ?? []), event.target.value];

            onChange?.(newValue as any);
          } else {
            const newValue = event.target.value;

            onChange?.(newValue as any);
          }
        }}
      >
        <option value="" selected disabled>
          {hint ?? placeholder ?? ""}
        </option>
        {(type === "multiple"
          ? options.filter((i) => !value?.includes(i.value))
          : options
        ).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
