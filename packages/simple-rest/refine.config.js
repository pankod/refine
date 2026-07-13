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
            src: "./src/provider.ts",
            dest: "./rest-data-provider/index.ts",
          },
          {
            src: "./src/utils/axios.ts",
            dest: "./rest-data-provider/utils/axios.ts",
          },
          {
            src: "./src/utils/generateFilter.ts",
            dest: "./rest-data-provider/utils/generateFilter.ts",
          },
          {
            src: "./src/utils/generateSort.ts",
            dest: "./rest-data-provider/utils/generateSort.ts",
          },
          {
            src: "./src/utils/mapOperator.ts",
            dest: "./rest-data-provider/utils/mapOperator.ts",
          },
          {
            src: "./src/utils/index.ts",
            dest: "./rest-data-provider/utils/index.ts",
          },
        ],
        message: `
                **\`Usage\`**

                \`\`\`
                // title: App.tsx
                import { dataProvider } from "./rest-data-provider";

                const App = () => {
                    return (
                        <Refine
                            dataProvider={dataProvider}
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
