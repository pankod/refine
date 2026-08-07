import React from "react";
import clsx from "clsx";

export function Date({
  date,
  formattedDate,
  className = "",
  itemProp = "datePublished",
}) {
  return (
    <time
      dateTime={date}
      itemProp={itemProp}
      className={clsx("uppercase", className)}
    >
      {formattedDate}
    </time>
  );
}
