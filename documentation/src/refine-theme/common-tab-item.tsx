import React from "react";
import clsx from "clsx";

export default function CommonTabItem({
  children,
  hidden,
  className,
  label,
  value,
  ...props
}) {
  const tabHeading = label || value;

  return (
    <div role="tabpanel" className={clsx(className)} {...{ hidden }}>
      <h5 className="hidden max-w-0 max-h-0">{tabHeading}</h5>
      {children}
    </div>
  );
}
