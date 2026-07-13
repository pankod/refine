import React from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "./icons/chevron-down";
import { CloseIcon } from "./icons/close";

type FilterInputProps = {
  placeholder?: string;
  value?: string;
  onChange: (value?: string) => void;
  className?: string;
};

export const FilterInput = ({
  placeholder,
  value,
  onChange,
  className,
}: FilterInputProps) => {
  return (
    <input
      type="text"
      className={clsx(
        "re-appearance-none",
        "re-outline-none",
        "re-relative",
        "re-flex",
        "re-flex-1",
        "re-rounded",
        "re-border",
        "re-border-gray-700",
        "re-bg-gray-900",
        "re-py-[7px]",
        "re-px-1.5",
        "re-text-xs",
        "re-leading-4",
        "re-placeholder-gray-500",
        "re-text-gray-300",
        className,
      )}
      placeholder={placeholder}
      value={value}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
      onChange={(event) => {
        if (event.target.value) {
          onChange(event.target.value);
        } else {
          onChange(undefined);
        }
      }}
    />
  );
};
