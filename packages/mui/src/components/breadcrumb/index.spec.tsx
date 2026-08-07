import { vi } from "vitest";
import { breadcrumbTests } from "@refinedev/ui-tests";

import { Breadcrumb } from "./";

describe("Breadcrumb", () => {
  beforeAll(() => {
    vi.spyOn(console, "warn").mockImplementation(vi.fn());
  });

  breadcrumbTests.bind(this)(Breadcrumb);
});
