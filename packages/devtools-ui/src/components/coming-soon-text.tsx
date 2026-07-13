import clsx from "clsx";
import * as React from "react";

export const ComingSoonText = (props: { className?: string }) => {
  return (
    <h2
      className={clsx(
        "re-bg-coming-soon-text",
        "re-drop-shadow-coming-soon-text",
        "re-text-2xl lg:re-text-[32px] lg:re-leading-10",
        "re-bg-clip-text",
        "re-text-transparent",
        "re-font-semibold",
        props.className,
      )}
    >
      Coming Soon!
    </h2>
  );
};
