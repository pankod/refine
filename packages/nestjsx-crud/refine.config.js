/** @type {import('@refinedev/cli').RefineConfig} */
module.exports = {
  group: "Data Provider",
  swizzle: {
    items: [
      {
        group: "Providers",
        label: "NestJs CRUD",
        message: `
                **\`Warning:\`**
                You should pass dataProvider to <Refine> component.
                \`\`\`
                // title: App.tsx
                import dataProvider from "providers/nestjsx-crud";

                const App = () => {
                    return (
                        <Refine
                            dataProvider={dataProvider}
                            /* ... */
                        >
                        /* ... */
                        </Refine>
                    );
                }
                \`\`\`
                `,
        requiredPackages: [
          "query-string@7.1.1",
          "axios@1.6.2",
          "@nestjsx/crud-request@5.0.0-alpha.3",
        ],
        files: [
          {
            src: "./src/index.ts",
            dest: "./providers/nestjsx-crud/index.ts",
          },
          {
            src: "./src/provider.ts",
            dest: "./providers/nestjsx-crud/provider.ts",
          },
          {
            src: "./src/utils/index.ts",
            dest: "./providers/nestjsx-crud/utils/index.ts",
          },
          {
            src: "./src/utils/handleFilter.ts",
            dest: "./providers/nestjsx-crud/utils/handleFilter.ts",
          },
          {
            src: "./src/utils/handleSort.ts",
            dest: "./providers/nestjsx-crud/utils/handleSort.ts",
          },
          {
            src: "./src/utils/handlePagination.ts",
            dest: "./providers/nestjsx-crud/utils/handlePagination.ts",
          },
          {
            src: "./src/utils/handleJoin.ts",
            dest: "./providers/nestjsx-crud/utils/handleJoin.ts",
          },
          {
            src: "./src/utils/mapOperator.ts",
            dest: "./providers/nestjsx-crud/utils/mapOperator.ts",
          },
          {
            src: "./src/utils/axios.ts",
            dest: "./providers/nestjsx-crud/utils/axios.ts",
          },
          {
            src: "./src/utils/transformErrorMessages.ts",
            dest: "./providers/nestjsx-crud/utils/transformErrorMessages.ts",
          },
          {
            src: "./src/utils/transformHttpError.ts",
            dest: "./providers/nestjsx-crud/utils/transformHttpError.ts",
          },
        ],
      },
    ],
  },
};
