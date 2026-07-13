import dayjs from "dayjs";
import type { FieldInferencer } from "../types";

const dateSuffixRegexp = /(_at|_on|At|On|AT|ON)(\[\])?$/;

const dateSeparators = ["/", ":", "-", "."];

export const dateInfer: FieldInferencer = (key, value) => {
  const isDateField =
    dateSuffixRegexp.test(key) && dayjs(value as string).isValid();

  const isValidDateString = typeof value === "string" && dayjs(value).isValid();

  const hasDateSeparator =
    typeof value === "string" && dateSeparators.some((s) => value.includes(s));

  if (hasDateSeparator && (isDateField || isValidDateString)) {
    return {
      key,
      type: "date",
      priority: 1,
    };
  }

  return false;
};
