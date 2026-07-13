import type { IResourceItem } from "@refinedev/core";
import { prettyString } from "../pretty-string";
import type { InferField } from "../../types";

export const translatePrettyString = (payload: {
  resource: IResourceItem;
  field: InferField;
  i18n?: boolean;
  noQuotes?: boolean;
  noBraces?: boolean;
}) => {
  const { resource, field, i18n } = payload;

  if (i18n) {
    const translate = `translate("${resource.name}.fields.${field.key}")`;

    if (payload.noBraces) {
      return `${translate}`;
    }
    return `{${translate}}`;
  }

  const prettedString = prettyString(field.key);
  if (payload.noQuotes) {
    return prettedString;
  }

  return `"${prettedString}"`;
};
