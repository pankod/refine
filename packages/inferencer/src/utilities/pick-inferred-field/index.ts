import type { InferField } from "../../types";

/**
 * Each field inferencer will run with every property of a record and output a result.
 * In these outputs, one with the highest priority will be picked as the inferred field.
 */
export const pickInferredField = (
  inferredFields: Array<InferField | null | false>,
): InferField | null => {
  // filter out null and false values and sort by priority then return the first one
  // priority is a number, the higher the number the higher the priority
  // if there is no priority, it will be 0
  const field = ([...inferredFields].filter(Boolean) as Array<InferField>).sort(
    (a, b) => (b.priority || 0) - (a.priority || 0),
  )[0];

  if (!field) {
    return null;
  }

  return field;
};
