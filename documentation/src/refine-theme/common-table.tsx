import clsx from "clsx";
import React from "react";

type Props = React.ComponentProps<"table"> & {};

export const FULL_WIDTH_TABLE_VARIABLE_NAME = "preferred-full-table-width";

export const Table = (props: Props) => (
  <div className={clsx("table-container")}>
    <table {...props} />
  </div>
);

export const FullTable = ({ children }: React.PropsWithChildren<{}>) => {
  return <div className="table-full-width">{children}</div>;
};
