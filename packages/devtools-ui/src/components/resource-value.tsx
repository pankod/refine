import type { Scopes } from "@refinedev/devtools-shared";
import clsx from "clsx";
import React from "react";

export type Props = {
  resource: string;
  scope: Scopes;
};

export const ResourceValue: React.FC<Props> = ({ resource, scope }) => {
  if (scope === "auth") {
    return (
      <span
        className={clsx(
          "re-rounded-xl",
          "re-py-0.5",
          "re-px-1",
          "re-text-[10px]",
          "re-text-alt-pink",
          "re-bg-alt-pink",
          "re-bg-opacity-20",
          "re-border",
          "re-border-alt-pink",
        )}
      >
        Auth
      </span>
    );
  }

  return <>{resource}</>;
};
