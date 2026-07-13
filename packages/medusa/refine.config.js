/** @type {import('@refinedev/cli').RefineConfig} */
module.exports = {
  group: "Data Provider",
  swizzle: {
    items: [
      {
        label: "Data Provider",
        requiredPackages: ["query-string@7.1.1", "axios@1.6.2"],
        files: [
          {
            src: "./src/index.ts",
            dest: "./providers/medusa/index.ts",
          },
          {
            src: "./src/dataProvider/index.ts",
            dest: "./providers/medusa/dataProvider/index.ts",
          },
          {
            src: "./src/authProvider/index.ts",
            dest: "./providers/medusa/authProvider/index.ts",
          },
          {
            src: "./src/utils/index.ts",
            dest: "./providers/medusa/utils/index.ts",
          },
          {
            src: "./src/utils/axios.ts",
            dest: "./providers/medusa/utils/axios.ts",
          },
          {
            src: "./src/utils/generateFilter.ts",
            dest: "./providers/medusa/utils/generateFilter.ts",
          },
          {
            src: "./src/utils/mapOperator.ts",
            dest: "./providers/medusa/utils/mapOperator.ts",
          },
        ],
        message: `
              **\`Usage\`**

              \`\`\`
              // title: App.tsx
              import dataProvider, { authProvider } from "/src/providers/medusa";

              export const API_URL = "dummy-api-url";

              const App = () => {
                  return (
                      <Refine
                          dataProvider={dataProvider(API_URL)}
                          authProvider={authProvider(API_URL)}
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
