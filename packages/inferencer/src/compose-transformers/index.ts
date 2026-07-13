import type { FieldTransformer } from "../types";

/**
 * Compose multiple field transformers into one
 * @param transformers The transformer functions to compose
 */
export const composeTransformers = (
  transformers: Array<FieldTransformer>,
): FieldTransformer => {
  const fieldTransformer: FieldTransformer = (
    fields,
    resources,
    resource,
    record,
    infer,
    type,
  ) => {
    return transformers.reduce((acc, transformer) => {
      return transformer(acc, resources, resource, record, infer, type);
    }, fields);
  };

  return fieldTransformer;
};
