import clsx from "clsx";
import React from "react";

export const Blockquote = ({
  className,
  ...props
}: React.ComponentProps<"blockquote">) => (
  <blockquote
    className={clsx("refine-wider-container", className)}
    {...props}
  />
);
