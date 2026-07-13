import React from "react";
import clsx from "clsx";

import type { TraceType } from "@refinedev/devtools-shared";

export const TraceList = ({ trace }: { trace?: TraceType[] }) => {
  return (
    <div className={clsx("re-flex", "trace-list")}>
      {[...(trace ?? [])].reverse().map((t, i, arr) => (
        <div
          key={`${t}-${i}`}
          className={clsx(
            "trace-item",
            i > 0 && "-re-ml-px",
            i === 0 && "re-pl-2",
            i === arr.length - 1 && "re-pr-2",
            i === 0 && "re-rounded-l-xl",
            i === arr.length - 1 && "re-rounded-r-xl",
            "re-border",
            "re-border-gray-700",
            "re-py-1",
            "re-pl-1.5",
            "re-pr-2",
            "re-text-gray-300",
            "re-text-xs",
          )}
        >
          {t.function}
        </div>
      ))}
    </div>
  );
};
