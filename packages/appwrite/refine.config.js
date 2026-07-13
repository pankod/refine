/** @type {import('@refinedev/cli').RefineConfig} */
module.exports = {
  group: "Data Provider",
  swizzle: {
    items: [
      {
        label: "Data Provider",
        requiredPackages: ["appwrite@10.0.1"],
        files: [
          {
            src: "./src/index.ts",
            dest: "./providers/appwrite/index.ts",
          },
          {
            src: "./src/dataProvider.ts",
            dest: "./providers/appwrite/dataProvider.ts",
          },
          {
            src: "./src/liveProvider.ts",
            dest: "./providers/appwrite/liveProvider.ts",
          },
          {
            src: "./src/utils/index.ts",
            dest: "./providers/appwrite/utils/index.ts",
          },
          {
            src: "./src/utils/generateFilter.ts",
            dest: "./providers/appwrite/utils/generateFilter.ts",
          },
          {
            src: "./src/utils/getAppwriteFilters.ts",
            dest: "./providers/appwrite/utils/getAppwriteFilters.ts",
          },
          {
            src: "./src/utils/getAppwritePagination.ts",
            dest: "./providers/appwrite/utils/getAppwritePagination.ts",
          },
          {
            src: "./src/utils/getAppwriteSorting.ts",
            dest: "./providers/appwrite/utils/getAppwriteSorting.ts",
          },
          {
            src: "./src/utils/getRefineEvent.ts",
            dest: "./providers/appwrite/utils/getRefineEvent.ts",
          },
        ],
        message: `
                **\`Usage\`**

                \`\`\`
                // title: App.tsx
                import { dataProvider, liveProvider } from "./providers/appwrite";
                import { appwriteClient } from "utility";
                
                const App = () => {
                    return (
                        <Refine
                            dataProvider={dataProvider(appwriteClient, {
                                databaseId: "default",
                            })}
                            liveProvider={liveProvider(appwriteClient, {
                                databaseId: "default",
                            })}
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
