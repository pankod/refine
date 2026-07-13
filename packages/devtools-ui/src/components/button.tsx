import clsx from "clsx";
import React, { Children } from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  contentClassName?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  function Button(
    { children, onClick, className, type, disabled, loading, contentClassName },
    ref,
  ) {
    return (
      <button
        type={type}
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          "re-relative",
          "re-rounded",
          "re-py-2",
          "re-px-4",
          "re-text-xs",
          "re-text-gray-0",
          !disabled && "re-bg-brand-blue",
          disabled && "re-bg-brand-blue/60",
          className,
        )}
      >
        <div
          className={clsx(
            !loading && "re-visible",
            loading && "re-invisible",
            contentClassName,
          )}
        >
          {children}
        </div>
        <div
          className={clsx(
            "re-rounded",
            !loading && "re-hidden",
            loading && "re-flex",
            "re-absolute",
            "re-inset-0",
            "re-items-center",
            "re-justify-center",
          )}
        >
          <div
            className={clsx(
              "re-spinner re-w-5 re-h-5 re-border-2 re-border-gray-200 re-border-t-alt-blue re-border-b-gray-200 re-border-solid re-rounded-full re-border-l-gray-200 re-border-r-gray-200 re-animate-spin",
            )}
          />
        </div>
      </button>
    );
  },
);
