import React from "react";
import clsx from "clsx";

type Props = {
  title: string;
  step: number;
};

export const StepTitle = ({ title, step }: Props) => {
  return (
    <div
      className={clsx(
        "w-full",
        "pb-6",
        "flex",
        "items-start",
        "justify-start",
        "gap-4",
      )}
    >
      <div
        className={clsx(
          "h-8 w-8",
          "flex-shrink-0",
          "bg-gray-darkest",
          "text-base",
          "text-gray-lightest",
          "font-semibold",
          "flex",
          "items-center",
          "justify-center",
          "rounded-full",
        )}
      >
        {step}
      </div>
      <div
        className={clsx(
          "text-2xl",
          "font-semibold",
          "text-gray-darkest",
          "capitalize",
        )}
      >
        {title}
      </div>
    </div>
  );
};
