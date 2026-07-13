import React from "react";
import clsx from "clsx";
import { CheckboxFilledIcon } from "./icons/checkbox-filled";
import { CheckboxEmptyIcon } from "./icons/checkbox-empty";

type Props = {
  options: {
    label: string;
    value: string;
  }[];
  values: string[];
  onChange: (values: string[]) => void;
  className?: string;
};

export const CheckboxGroup = ({
  options,
  values,
  onChange,
  className,
}: Props) => {
  return (
    <div
      className={clsx(
        "re-relative",
        "re-flex",
        "re-flex-1",
        "re-gap-3",
        "re-min-h-[32px]",
        "re-items-center",
        "re-justify-start",
        className,
      )}
    >
      {options.map(({ label, value }) => {
        const selected = values.includes(value);

        return (
          <button
            key={value}
            type="button"
            className={clsx(
              "re-flex",
              "re-gap-1.5",
              "re-items-center",
              "re-bg-none",
              "re-border-none",
              "re-appearance-none",
              "re-outline-none",
            )}
            onClick={() => {
              if (values.includes(value)) {
                onChange(values.filter((v) => v !== value));
              } else {
                onChange([...values, value]);
              }
            }}
          >
            <span className={clsx("re-flex-shrink-0", "re-w-3", "re-h-3")}>
              {selected && (
                <CheckboxFilledIcon className="re-pointer-events-none" />
              )}
              {!selected && (
                <CheckboxEmptyIcon className="re-pointer-events-none" />
              )}
            </span>
            <span className={clsx("re-text-xs", "re-text-gray-300")}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
