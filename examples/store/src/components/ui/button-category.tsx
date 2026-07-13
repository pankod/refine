import clsx from "clsx";
import React from "react";

type Props = React.ComponentProps<"button"> & {
  active?: boolean;
};

export const ButtonCategory = ({ active, className, ...props }: Props) => {
  return (
    <button
      className={clsx(
        "appearance-none",
        "text-left",
        "transition-colors",
        "duration-200",
        "ease-in-out",
        "w-full",
        "py-3",
        "px-5",
        "text-base",
        active ? "font-bold" : "font-normal",
        active ? "text-gray-darkest" : "text-gray-darker",
        "rounded-3xl",
        active ? "bg-gray-light" : "bg-gray-lightest",
        "hover:bg-gray-light",
        className,
      )}
      {...props}
    />
  );
};
