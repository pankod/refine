import type { InferField } from "../../types";

const dotAccessableRegex = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;

export const shouldDotAccess = (property: string) => {
  return dotAccessableRegex.test(property);
};

function accessorSingle(variableName: string, key?: string, accessor?: string) {
  let base = `${variableName}`;

  if (key) {
    base += "?.";
    if (shouldDotAccess(key)) {
      base += key;
    } else {
      base += `['${key}']`;
    }
  }

  if (accessor) {
    base += "?.";
    if (shouldDotAccess(accessor)) {
      base += accessor;
    } else {
      base += `['${accessor}']`;
    }
  }

  return base;
}

function accessorMultiple(variable: string, key?: string, accessor?: string[]) {
  const all = (accessor ?? []).map((a) => accessorSingle(variable, key, a));

  return all;
}

/**
 * Returns a string that can be used to access the given field.
 * @example accessor("myVar", "some", "thing") === "myVar?.some?.thing"
 * @example accessor("myVar", "so-me", th.ing") === "myVar?.['so-me']['th.ing']"
 */
export const accessor = (
  variable: string,
  key?: string,
  accessor?: string | string[],
  joiner: string | false = ' + " " + ',
): string => {
  if (Array.isArray(accessor)) {
    if (joiner) {
      return accessorMultiple(variable, key, accessor).join(joiner);
    }
    return accessorSingle(variable, key, accessor[0]);
  }
  return accessorSingle(variable, key, accessor);
};

export const dotAccessor = (
  variable: string,
  key?: string,
  accessor?: string | string[],
) => {
  let str = variable;

  if (key) {
    str += `.${key}`;
  }

  if (accessor) {
    if (Array.isArray(accessor)) {
      str += `.${accessor[0]}`;
    } else {
      str += `.${accessor}`;
    }
  }

  return str;
};

export const getAccessorKey = (field: InferField) => {
  return Array.isArray(field.accessor) || field.multiple
    ? `accessorKey: "${field.key}"`
    : field.accessor
      ? `accessorKey: "${dotAccessor(field.key, undefined, field.accessor)}"`
      : `accessorKey: "${field.key}"`;
};
