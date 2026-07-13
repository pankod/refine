import { vi } from "vitest";
import * as packageUtils from "@utils/package";
import { getInstallCommand } from "./table";

test("Update warning npm command", async () => {
  const testCases: {
    output: string;
    dependencies: string[];
    scripts: Record<string, string>;
  }[] = [
    // have script, have dependency
    {
      output: "pnpm run refine update",
      dependencies: ["@refinedev/cli"],
      scripts: {
        refine: "refine",
      },
    },
    // has script, no dependency
    {
      output: "pnpm run refine update",
      dependencies: ["@pankod/refine-cli"],
      scripts: {
        refine: "refine",
      },
    },
    // no script, has dependency
    {
      output: "npx refine update",
      dependencies: ["@refinedev/cli"],
      scripts: {},
    },
    // no script, no dependency
    {
      output: "npx @refinedev/cli update",
      dependencies: [],
      scripts: {},
    },
  ];

  for (const testCase of testCases) {
    vi.spyOn(packageUtils, "getDependencies").mockReturnValue(
      testCase.dependencies,
    );
    vi.spyOn(packageUtils, "getScripts").mockReturnValue(testCase.scripts);

    expect(await getInstallCommand()).toBe(testCase.output);
  }
});
