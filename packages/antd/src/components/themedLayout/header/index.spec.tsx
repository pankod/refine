import { layoutHeaderTests } from "@refinedev/ui-tests";

import { ThemedHeader } from "./index";

describe("Header", () => {
  layoutHeaderTests.bind(this)(ThemedHeader);
});
