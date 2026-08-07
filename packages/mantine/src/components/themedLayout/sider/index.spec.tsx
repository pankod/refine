import { layoutSiderTests } from "@refinedev/ui-tests";

import { ThemedSider } from "./index";

describe("ThemedSider", () => {
  layoutSiderTests.bind(this)(ThemedSider);
});
