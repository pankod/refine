import React from "react";

import dayjs from "dayjs";

import LocalizedFormat from "dayjs/plugin/localizedFormat";

import Typography from "@mui/material/Typography";

import type { DateFieldProps } from "../types";

dayjs.extend(LocalizedFormat);

const defaultLocale = dayjs.locale();

/**
 * This field is used to display dates. It uses {@link https://day.js.org/docs/en/display/format `Day.js`} to display date format and
 * Material UI {@link https://mui.com/material-ui/react-typography/#main-content `<Typography>`} component
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/fields/date} for more details.
 */
export const DateField: React.FC<DateFieldProps> = ({
  value,
  locales,
  format: dateFormat = "L",
  ...rest
}) => {
  return (
    <Typography variant="body2" {...rest}>
      {value
        ? dayjs(value)
            .locale(locales || defaultLocale)
            .format(dateFormat)
        : ""}
    </Typography>
  );
};
