import { layoutLayoutTests } from "@refinedev/ui-tests";
import { ThemedLayout } from "./index";

describe("Layout", () => {
  layoutLayoutTests.bind(this)(ThemedLayout);
});
