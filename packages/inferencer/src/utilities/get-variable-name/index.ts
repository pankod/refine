import { prettyString } from "../pretty-string";

/**
 * Returns the valid variable name for the given string and the given suffixOrPrefix.
 * @example getVariableName("user", "data") === "usersData"
 * @example getVariableName("1234", "data") === "data1234"
 * @example getVariableName("users-account", "selectProps") === "usersAccountSelectProps"
 */
export const getVariableName = (fieldKey: string, suffixOrPrefix = "") => {
  // if fieldKey is number, return with prefix
  // e.g. (12345, Data) => "data12345"
  if (Number.isInteger(Number(fieldKey))) {
    const lowerCaseFirstLetter =
      suffixOrPrefix.charAt(0).toLowerCase() + suffixOrPrefix.slice(1);
    return lowerCaseFirstLetter + fieldKey;
  }

  // if fieldKey is start with numbers, replace the numbers with empty string
  // e.g. 123users => "users"
  const fieldKeyWithoutNumbers = fieldKey.replace(/^\d+/, "");

  // if fieldKeyWithoutNumbers has invalid characters, replace them with "-"
  // e.g. "users/account" => "users-account"
  const fieldKeyWithoutInvalidCharacters = fieldKeyWithoutNumbers.replace(
    /[^a-zA-Z0-9]/g,
    "-",
  );

  // Convert to PascalCase
  const prettyPluralVariableName = prettyString(
    fieldKeyWithoutInvalidCharacters,
  ).replace(/ /g, "");

  const variableName = `${
    prettyPluralVariableName.charAt(0).toLowerCase() +
    prettyPluralVariableName.slice(1)
  }${suffixOrPrefix.charAt(0).toUpperCase() + suffixOrPrefix.slice(1)}`;

  return variableName;
};
