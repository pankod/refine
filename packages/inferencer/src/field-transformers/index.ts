import { basicToRelation } from "./basic-to-relation";
import { imageByKey } from "./image-by-key";
import { relationByResource } from "./relation-by-resource";
import { relationToFieldable } from "./relation-to-fieldable";

export const defaultTransformers = [
  imageByKey,
  relationByResource,
  relationToFieldable,
  basicToRelation,
];
