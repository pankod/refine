import React from "react";
import dayjs from "dayjs";
import { Typography } from "antd";

import LocalizedFormat from "dayjs/plugin/localizedFormat";

import type { DateFieldProps } from "../types";

/**
 * This field is used to display dates. It uses {@link https://day.js.org/docs/en/display/format `Day.js`} to display date format.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/fields/date} for more details.
 */
export const DateField: React.FC<DateFieldProps> = ({
  value,
  locales,
  format: dateFormat = "L",
  ...rest
}) => {
  dayjs.extend(LocalizedFormat);

  const defaultLocale = dayjs.locale();

  return (
    <Typography.Text {...rest}>
      {value
        ? dayjs(value)
            .locale(locales || defaultLocale)
            .format(dateFormat)
        : ""}
    </Typography.Text>
  );
};
