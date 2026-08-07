import { vi } from "vitest";
import * as utilsPackage from "@utils/package";
import { hasDefaultScript } from ".";

test("Has default script", () => {
  const testCases = [
    {
      input: {
        scripts: {
          dev: "refine dev",
        },
      },
      output: {
        dev: true,
      },
    },
    {
      input: {
        scripts: {
          dev: "PORT=5252 refine dev --force",
        },
      },
      output: {
        dev: true,
      },
    },
    {
      input: {
        scripts: {
          dev: "refine dev",
        },
      },
      output: {
        dev: true,
      },
    },
    {
      input: {
        scripts: {
          dev: "refine dev2",
        },
      },
      output: {
        dev: false,
      },
    },
    {
      input: {
        scripts: {
          dev: "refine dev;echo '1'",
        },
      },
      output: {
        dev: true,
      },
    },
  ];

  testCases.forEach((testCase) => {
    vi.spyOn(utilsPackage, "getPackageJson").mockReturnValueOnce({
      name: "test",
      version: "1.0.0",
      ...testCase.input,
    });

    const result = hasDefaultScript();

    expect(result).toEqual(testCase.output);
  });
});
