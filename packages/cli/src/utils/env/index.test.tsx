import { getNodeEnv } from ".";

test("Get NODE_ENV", async () => {
  const testCases = [
    {
      input: "development",
      expected: "development",
    },
    {
      input: "dev",
      expected: "development",
    },
    {
      input: "Production",
      expected: "production",
    },
    {
      input: "prod",
      expected: "production",
    },
    {
      input: "test",
      expected: "test",
    },
    {
      input: "TESTING",
      expected: "test",
    },
    {
      input: "ci",
      expected: "continuous-integration",
    },
    {
      input: "UAT",
      expected: "user-acceptance-testing",
    },
    {
      input: "SIT",
      expected: "system-integration-testing",
    },
    {
      input: "another-node-env",
      expected: "custom",
    },
    {
      input: "",
      expected: "development",
    },
  ];

  for (const testCase of testCases) {
    process.env.NODE_ENV = testCase.input;
    expect(getNodeEnv()).toEqual(testCase.expected);
  }
});
