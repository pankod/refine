import { resourceFromInferred } from "../utilities";
import type { FieldTransformer, InferField } from "../types";

export const relationByResource: FieldTransformer = (
  fields,
  resources,
  // resource,
  // record,
  // infer,
) => {
  const mapped: Array<InferField> = fields.map((field) => {
    const inferResource = resourceFromInferred(field, resources);

    if (inferResource) {
      return {
        ...field,
        relation: true,
        type: "relation",
        resource: inferResource,
      };
    }

    return field;
  });

  return mapped;
};
