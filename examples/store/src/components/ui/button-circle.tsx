import clsx from "clsx";
import React from "react";

type Props = React.ComponentProps<"button"> & {
  badge?: number;
};

export const ButtonCircle = ({
  badge,
  className,
  children,
  ...props
}: Props) => {
  return (
    <button
      type="button"
      data-badge-count={badge}
      className={clsx(
        "appearance-none",
        "border-none",
        "p-3",
        "rounded-full",
        "bg-gray-light",
        "text-gray-dark",
        "relative",
        "after:content-[attr(data-badge-count)]",
        "after:absolute",
        "after:-bottom-1.5",
        "after:-right-1.5",
        "after:border-2",
        "after:border-gray-lightest",
        "after:bg-gray-darkest",
        "after:text-gray-lightest",
        "after:text-sm",
        "after:w-6",
        "after:h-6",
        !badge && "after:hidden",
        badge && "after:flex",
        "after:items-center",
        "after:justify-center",
        "after:rounded-full",
      )}
      {...props}
    >
      {children}
    </button>
  );
};
