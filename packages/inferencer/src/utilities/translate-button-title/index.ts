import { prettyString } from "../pretty-string";

export const translateButtonTitle = (payload: {
  action: "list" | "create" | "edit" | "show" | "save" | "delete";
  i18n?: boolean;
  noQuotes?: boolean;
}) => {
  const { action, i18n, noQuotes } = payload;

  if (i18n) {
    return `{translate("buttons.${action}")}`;
  }

  if (noQuotes) {
    return prettyString(action);
  }
  return `"${prettyString(action)}"`;
};
