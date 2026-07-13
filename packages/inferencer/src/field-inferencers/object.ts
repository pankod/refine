import { getFieldableKeys } from "../utilities";
import type { FieldInferencer } from "../types";

const idPropertyRegexp = /id$/i;

export const objectInfer: FieldInferencer = (
  key,
  value,
  record,
  infer,
  type,
) => {
  const isNotNull = value !== null;
  const isNotArray = !Array.isArray(value);
  const isObject = typeof value === "object";

  if (isNotNull && isNotArray && isObject) {
    const onlyHasId =
      Object.keys(value).length === 1 &&
      idPropertyRegexp.test(Object.keys(value)[0]);

    const hasId = Object.keys(value).some((k) => idPropertyRegexp.test(k));

    if (onlyHasId) {
      return {
        key,
        type: "relation",
        relation: true,
        accessor: "id",
        priority: 1,
      };
    }

    const fieldableKeys = getFieldableKeys(
      key,
      value as Record<string, unknown>,
    );

    const hasFieldableKeys = fieldableKeys ? fieldableKeys.length > 0 : false;

    if (hasFieldableKeys && fieldableKeys) {
      const innerFieldKey =
        fieldableKeys && Array.isArray(fieldableKeys)
          ? fieldableKeys[0]
          : fieldableKeys;

      const innerFieldType = infer(
        innerFieldKey,
        (value as Record<string, unknown>)[innerFieldKey],
        value as Record<string, unknown>,
        infer,
        type,
      );

      if (innerFieldType) {
        const accessor = Array.isArray(fieldableKeys)
          ? fieldableKeys.map((el) => {
              if (innerFieldType.accessor) {
                return `${el}.${
                  Array.isArray(innerFieldType.accessor)
                    ? innerFieldType.accessor[0]
                    : innerFieldType.accessor
                }`;
              }
              return el;
            })
          : innerFieldType.accessor
            ? Array.isArray(innerFieldType.accessor)
              ? `${fieldableKeys}.${innerFieldType.accessor[0]}`
              : `${fieldableKeys}.${innerFieldType.accessor}`
            : fieldableKeys;

        if (
          innerFieldType?.type === "text" &&
          (type === "create" || type === "edit") &&
          hasId
        ) {
          return {
            key,
            type: "relation",
            relation: true,
            accessor: "id",
            priority: 1,
          };
        }

        return {
          ...innerFieldType,
          fieldable: true,
          key,
          accessor: accessor,
          priority: 1,
        };
      }
    }

    return {
      key,
      fieldable: false,
      type: "object",
      priority: 1,
    };
  }

  return false;
};
