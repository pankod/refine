import { fieldEmailTests } from "@refinedev/ui-tests";

import { EmailField } from "./";

describe("EmailField", () => {
  fieldEmailTests.bind(this)(EmailField);
});
