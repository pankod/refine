import type { FieldInferencer } from "../types";
import { pickInferredField } from "../utilities";

/**
 * Compose multiple field inferencers into one
 * @param inferencers The inferencer functions to compose
 */
export const composeInferencers = (
  inferencers: Array<FieldInferencer>,
): FieldInferencer => {
  const fieldInferencer: FieldInferencer = (
    key,
    value,
    record,
    infer = fieldInferencer,
    type,
  ) => {
    const inferences = inferencers.map((inferencer) =>
      inferencer(key, value, record, infer, type),
    );
    const picked = pickInferredField(inferences);

    return picked;
  };

  return fieldInferencer;
};
