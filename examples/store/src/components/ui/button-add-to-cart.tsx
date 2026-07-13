import React from "react";
import clsx from "clsx";
import { IconHourglass } from "../icons/icon-hourglass";
import { IconAdd } from "../icons/icon-add";
import { LoadingDots } from ".";

type Props = Omit<React.ComponentProps<"button">, "children"> & {
  loading?: boolean;
};

export const ButtonAddToCart = ({
  disabled,
  className,
  loading,
  ...props
}: Props) => {
  return (
    <button
      type="button"
      className={clsx(
        "min-w-[232px]",
        "py-3",
        "px-3",
        "flex",
        "items-center",
        "justify-center",
        "gap-2",
        "rounded-lg",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        disabled ? "bg-gray-lighter" : "bg-gray-darkest",
        disabled ? "text-gray-darker" : "text-gray-lightest",
        "uppercase",
        "relative",
        className,
      )}
      {...props}
    >
      {disabled ? (
        <>
          <IconHourglass />
          <span>Soon In Stock</span>
        </>
      ) : (
        <>
          <IconAdd />
          <span>Add to Cart</span>
        </>
      )}
      {loading && (
        <div
          className={clsx(
            "w-full",
            "h-full",
            "bg-gray-darkest",
            "rounded-lg",
            "absolute",
            "inset-0",
            "flex",
            "items-center",
            "justify-center",
          )}
        >
          <LoadingDots />
        </div>
      )}
    </button>
  );
};
