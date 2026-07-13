import React from "react";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { Text } from "@mantine/core";

dayjs.extend(LocalizedFormat);

const defaultLocale = dayjs.locale();

import type { DateFieldProps } from "../types";

/**
 * This field is used to display dates. It uses {@link https://day.js.org/docs/en/display/format `Day.js`} to display date format and
 * Mantine {@link https://mantine.dev/core/text `<Text>`} component
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/fields/date} for more details.
 */
export const DateField: React.FC<DateFieldProps> = ({
  value,
  locales,
  format: dateFormat = "L",
  ...rest
}) => {
  return (
    <Text {...rest}>
      {value
        ? dayjs(value)
            .locale(locales || defaultLocale)
            .format(dateFormat)
        : ""}
    </Text>
  );
};
