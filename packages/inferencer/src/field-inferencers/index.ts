import { arrayInfer } from "./array";
import { booleanInfer } from "./boolean";
import { dateInfer } from "./date";
import { emailInfer } from "./email";
import { imageInfer } from "./image";
import { nullishInfer } from "./nullish";
import { numberInfer } from "./number";
import { objectInfer } from "./object";
import { relationInfer } from "./relation";
import { richtextInfer } from "./richtext";
import { textInfer } from "./text";
import { urlInfer } from "./url";

export const defaultElements = [
  arrayInfer,
  booleanInfer,
  dateInfer,
  emailInfer,
  imageInfer,
  nullishInfer,
  numberInfer,
  objectInfer,
  relationInfer,
  richtextInfer,
  textInfer,
  urlInfer,
];
