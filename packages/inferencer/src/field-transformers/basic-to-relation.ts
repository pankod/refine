import type { FieldTransformer, InferField } from "../types";

export const basicToRelation: FieldTransformer = (
  fields,
  resources,
  resource,
  record,
) => {
  const mapped: Array<InferField> = fields.map((field) => {
    if (
      !field.relation &&
      (field.type === "text" ||
        field.type === "richtext" ||
        field.type === "number") &&
      !field.canRelation
    ) {
      // check if value is a valid id (regex)
      // if multiple, check value by value
      // take accessor into account (should be single only)
      // valid id should be a valid uuid (meaning, lowercase alphanumeric with dashes)
      const validUUIdRegex = /^[a-z0-9-]+$/;

      const isValidUUID = (value: unknown) => {
        return validUUIdRegex.test(`${value}`);
      };

      const isNotSelf = field.key.toLowerCase() !== "id";

      const singleOrNoAccessor =
        !field.accessor || typeof field.accessor === "string";

      // in case of multiple accessors, we can't infer a relation
      // or if the field is the id field
      if (!singleOrNoAccessor || !isNotSelf) {
        return field;
      }

      const valuesToCheck = field.multiple
        ? (record[field.key] as unknown[])
        : [record[field.key]];

      const allValid = valuesToCheck.every((value) => {
        return isValidUUID(
          field.accessor
            ? (value as Record<string, unknown>)[field.accessor as string]
            : value,
        );
      });

      if (allValid) {
        return {
          ...field,
          canRelation: true,
        };
      }

      return field;
    }
    return field;
  });

  return mapped;
};
