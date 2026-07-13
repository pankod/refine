import { breadcrumbTests } from "@refinedev/ui-tests";
import { vi } from "vitest";

import { Breadcrumb } from "./";

describe("Breadcrumb", () => {
  beforeAll(() => {
    vi.spyOn(console, "warn").mockImplementation(vi.fn());
  });

  breadcrumbTests.bind(this)(Breadcrumb);
});
