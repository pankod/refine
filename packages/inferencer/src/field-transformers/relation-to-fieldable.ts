import type { FieldTransformer, InferField } from "../types";

export const relationToFieldable: FieldTransformer = (
  fields,
  resources,
  resource,
  record,
  infer,
  type,
) => {
  const mapped: Array<InferField> = fields.map((field) => {
    if (field.relation && field.type === "relation" && !field.resource) {
      const value = field.accessor
        ? (record[field.key] as any)[field.accessor as string]
        : record[field.key];

      const inferredType = infer(field.key, value, record, infer, type);

      if (inferredType && inferredType.type !== "relation") {
        return {
          ...field,
          fieldable: true,
          relation: false,
          type: inferredType.type,
          canRelation: true,
        };
      }
    }

    return field;
  });

  return mapped;
};
