import React from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  label: string;
};

export const FilterField = ({ label, children }: Props) => {
  return (
    <div
      className={clsx(
        "re-flex",
        "re-items-start",
        "re-justify-start",
        "re-gap-2",
      )}
    >
      <div
        className={clsx(
          "re-text-left",
          "re-w-20",
          "re-text-gray-300",
          "re-capitalize",
          "re-text-xs",
          "re-leading-8",
          "re-flex-shrink-0",
        )}
      >
        {label}
      </div>
      {children}
    </div>
  );
};
