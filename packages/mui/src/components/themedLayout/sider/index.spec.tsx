import { layoutSiderTests } from "@refinedev/ui-tests";

import { ThemedSider } from "./index";

describe("Sider", () => {
  layoutSiderTests.bind(this)(ThemedSider);
});
