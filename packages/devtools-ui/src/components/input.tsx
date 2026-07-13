import React from "react";
import clsx from "clsx";

type Props = {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
};

export const Input = ({
  label,
  required,
  placeholder,
  value,
  onChange,
  className,
  disabled,
  error,
  onBlur,
  loading,
}: Props) => {
  return (
    <label className={clsx(className, "re-relative")}>
      {label && (
        <span
          className={clsx(
            "re-block",
            "re-mb-2",
            "re-text-gray-300",
            "re-text-base",
            "re-leading-7",
            "re-font-normal",
          )}
        >
          {label}
          {required && <span className="re-text-alt-red">{" * "}</span>}
        </span>
      )}
      <input
        disabled={disabled}
        type="text"
        placeholder={loading ? "" : placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        className={clsx(
          "re-border",
          !error && "re-border-gray-700",
          error && "re-border-alt-red/80",
          "re-bg-transparent",
          "re-rounded",
          "re-placeholder-gray-500",
          "re-text-gray-300",
          "re-outline-none",
          "re-py-2.5",
          "re-px-3",
          "re-w-full",
        )}
      />
      {loading && (
        <div
          className={clsx(
            "re-bg-gray-700 re-opacity-80 re-animate-pulse",
            "re-absolute re-left-0 re-right-0 re-bottom-0",
            "re-top-[46px]",
            "re-mx-2",
            "re-h-6",
            "re-rounded",
          )}
        />
      )}
      <div className={clsx("re-absolute", "-re-bottom-5")}>
        {error && (
          <span
            className={clsx(
              "re-text-alt-red",
              "re-text-xs",

              "re-block",
            )}
          >
            {error}
          </span>
        )}
      </div>
    </label>
  );
};
