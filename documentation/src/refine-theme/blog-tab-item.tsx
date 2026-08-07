import clsx from "clsx";
import React from "react";

export default function BlogTabItem({
  children,
  hidden,
  className,
  label,
  value,
}: any) {
  const tabHeading = label || value;

  return (
    <div
      role="tabpanel"
      className={clsx(
        "blog-tab-item",
        "bg-white",
        "dark:bg-zinc-900",
        "p-4",
        "[&_.refine-common-code-block]:mb-0",
        className,
      )}
      {...{ hidden }}
    >
      <h5 className="hidden max-w-0 max-h-0">{tabHeading}</h5>
      {children}
    </div>
  );
}
