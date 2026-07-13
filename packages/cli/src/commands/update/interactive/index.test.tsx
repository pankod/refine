import { createUIGroup, validatePrompt } from ".";

test("Validate interactive prompt", () => {
  const testCases = [
    {
      input: [
        "@refinedev/airtable@1.7.8",
        "@refinedev/airtable@2.7.8",
        "@refinedev/airtable@3.33.0",
        "@refinedev/simple-rest@2.7.8",
        "@refinedev/simple-rest@3.35.2",
        "@refinedev/core@3.88.4",
      ],
      output: `You can't update the same package more than once. Please choice one.\n Duplicates: @refinedev/airtable, @refinedev/simple-rest`,
    },
    {
      input: [],
      output: true,
    },
  ];

  testCases.forEach((testCase) => {
    const result = validatePrompt(testCase.input);
    expect(result).toEqual(testCase.output);
  });
});

test("Categorize UI Group", () => {
  const testCases = [
    {
      input: [] as any,
      output: null,
    },
    {
      input: [
        {
          name: "@refinedev/airtable",
          current: "2.1.1",
          wanted: "2.7.8",
          latest: "3.33.0",
        },
        {
          name: "@refinedev/core",
          current: "3.88.1",
          wanted: "3.88.4",
          latest: "3.88.4",
        },
        {
          name: "@refinedev/react-hook-form",
          current: "3.31.0",
          wanted: "3.33.2",
          latest: "3.33.2",
        },
        {
          name: "@refinedev/simple-rest",
          current: "2.6.0",
          wanted: "2.7.8",
          latest: "3.35.2",
        },
        {
          name: "@refinedev/strapi",
          current: "3.18.0",
          wanted: "3.37.0",
          latest: "3.37.0",
        },
      ],
      output: {
        patch: [
          {
            name: "@refinedev/core",
            from: "3.88.1",
            to: "3.88.4",
          },
        ],
        minor: [
          {
            name: "@refinedev/airtable",
            from: "2.1.1",
            to: "2.7.8",
          },
          {
            name: "@refinedev/react-hook-form",
            from: "3.31.0",
            to: "3.33.2",
          },
          {
            name: "@refinedev/simple-rest",
            from: "2.6.0",
            to: "2.7.8",
          },
          {
            name: "@refinedev/strapi",
            from: "3.18.0",
            to: "3.37.0",
          },
        ],
        major: [
          {
            name: "@refinedev/airtable",
            from: "2.1.1",
            to: "3.33.0",
          },
          {
            name: "@refinedev/simple-rest",
            from: "2.6.0",
            to: "3.35.2",
          },
        ],
      },
    },
  ];

  testCases.forEach((testCase) => {
    const result = createUIGroup(testCase.input);
    expect(result).toEqual(testCase.output);
  });
});
