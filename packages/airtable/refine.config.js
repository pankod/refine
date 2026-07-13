/** @type {import('@refinedev/cli').RefineConfig} */

module.exports = {
  group: "Data Provider",
  swizzle: {
    items: [
      {
        label: "Data Provider",
        requiredPackages: [
          "@qualifyze/airtable-formulator@1.0.1",
          "airtable@0.11.1",
          "asyncairtable@2.1.0",
          "query-string@7.1.1",
        ],
        files: [
          {
            src: "./src/index.ts",
            dest: "./providers/airtable/index.ts",
          },
          {
            src: "./src/dataProvider.ts",
            dest: "./providers/airtable/dataProvider.ts",
          },
          {
            src: "./src/utils/index.ts",
            dest: "./providers/airtable/utils/index.ts",
          },
          {
            src: "./src/utils/generateFilter.ts",
            dest: "./providers/airtable/utils/generateFilter.ts",
          },
          {
            src: "./src/utils/generateFilterFormula.ts",
            dest: "./providers/airtable/utils/generateFilterFormula.ts",
          },
          {
            src: "./src/utils/generateLogicalFilterFormula.ts",
            dest: "./providers/airtable/utils/generateLogicalFilterFormula.ts",
          },
          {
            src: "./src/utils/generateLogicalFilterFormula.ts",
            dest: "./providers/airtable/utils/generateLogicalFilterFormula.ts",
          },
          {
            src: "./src/utils/generateSort.ts",
            dest: "./providers/airtable/utils/generateSort.ts",
          },
          {
            src: "./src/utils/isContainsOperator.ts",
            dest: "./providers/airtable/utils/isContainsOperator.ts",
          },
          {
            src: "./src/utils/isSimpleOperator.ts",
            dest: "./providers/airtable/utils/isSimpleOperator.ts",
          },
        ],
        message: `
              **\`Usage\`**

              \`\`\`
              // title: App.tsx
              import { dataProvider } from "./providers/airtable";

              const API_TOKEN = "dummy-api-token";
              const BASE_ID = "dummy-base-id";

              const App = () => {
                  return (
                      <Refine
                          dataProvider={dataProvider(API_TOKEN, BASE_ID)}
                          /* ... */
                      />
                  );
              }
              \`\`\`
              `,
      },
    ],
  },
};
