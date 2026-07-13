import React from "react";
import clsx from "clsx";

export const CommonCodeBlockContainer = ({ as: As, ...props }) => {
  return <As {...props} className={clsx(props.className)} />;
};
