/** @type {import('@refinedev/cli').RefineConfig} */
module.exports = {
  group: "Data Provider",
  swizzle: {
    items: [
      {
        group: "Providers",
        label: "Strapi v4",
        requiredPackages: ["axios@1.6.2, qs@6.10.1"],
        files: [
          {
            src: "./src/index.ts",
            dest: "./providers/strapi-v4/index.ts",
          },
          {
            src: "./src/dataProvider.ts",
            dest: "./providers/strapi-v4/dataProvider.ts",
          },
          {
            src: "./src/utils/index.ts",
            dest: "./providers/strapi-v4/utils/index.ts",
          },
          {
            src: "./src/utils/axios.ts",
            dest: "./providers/strapi-v4/utils/axios.ts",
          },
          {
            src: "./src/utils/generateFilter.ts",
            dest: "./providers/strapi-v4/utils/generateFilter.ts",
          },
          {
            src: "./src/utils/generateSort.ts",
            dest: "./providers/strapi-v4/utils/generateSort.ts",
          },
          {
            src: "./src/utils/mapOperator.ts",
            dest: "./providers/strapi-v4/utils/mapOperator.ts",
          },
          {
            src: "./src/utils/normalizeData.ts",
            dest: "./providers/strapi-v4/utils/normalizeData.ts",
          },
          {
            src: "./src/utils/transformErrorMessages.ts",
            dest: "./providers/strapi-v4/utils/transformErrorMessages.ts",
          },
          {
            src: "./src/utils/transformHttpError.ts",
            dest: "./providers/strapi-v4/utils/transformHttpError.ts",
          },
          {
            src: "./src/helpers/index.ts",
            dest: "./providers/strapi-v4/helpers/index.ts",
          },
          {
            src: "./src/helpers/auth.ts",
            dest: "./providers/strapi-v4/helpers/auth.ts",
          },
          {
            src: "./src/helpers/normalize.ts",
            dest: "./providers/strapi-v4/helpers/normalize.ts",
          },
        ],
        message: `
                  **\`Usage\`**

                  \`\`\`
                  // title: App.tsx
                  import { AuthHelper, DataProvider } from "providers/strapi-v4";

                  const App = () => {
                      return (
                          <Refine
                              dataProvider={DataProvider(API_URL)}
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
