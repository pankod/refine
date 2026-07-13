import { parsePackageNameAndVersion } from "@utils/package";

test("Get package name and version from string", () => {
  const testCases = [
    {
      input: "@refinedev/antd@2.36.2",
      output: {
        name: "@refinedev/antd",
        version: "2.36.2",
      },
    },
    {
      input: "@owner/package_name@2.36.2_beta.1",
      output: {
        name: "@owner/package_name",
        version: "2.36.2_beta.1",
      },
    },
    {
      input: "@owner/package-name",
      output: {
        name: "@owner/package-name",
        version: null,
      },
    },
    {
      input: "owner/package-name",
      output: {
        name: "owner/package-name",
        version: null,
      },
    },
    {
      input: "owner/package-name@3.2.1",
      output: {
        name: "owner/package-name",
        version: "3.2.1",
      },
    },
  ];

  testCases.forEach((testCase) => {
    const result = parsePackageNameAndVersion(testCase.input);
    expect(result).toEqual(testCase.output);
  });
});
