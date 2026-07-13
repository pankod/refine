import type { FieldTransformer, InferField } from "../types";

const imageFieldLikeRegexp = /(image|photo|avatar|cover|thumbnail|icon)/i;

export const imageByKey: FieldTransformer = (fields) => {
  const mapped: Array<InferField> = fields.map((field) => {
    if (field.type === "url" && imageFieldLikeRegexp.test(field.key)) {
      return {
        ...field,
        type: "image",
      };
    }

    return field;
  });

  return mapped;
};
