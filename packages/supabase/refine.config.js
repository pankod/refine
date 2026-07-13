/** @type {import('@refinedev/cli').RefineConfig} */
module.exports = {
  group: "Data Provider",
  swizzle: {
    items: [
      {
        group: "Providers",
        label: "Supabase",
        requiredPackages: ["@supabase/supabase-js@2.7.0"],
        files: [
          {
            src: "./src/index.ts",
            dest: "./providers/supabase/index.ts",
          },
          {
            src: "./src/dataProvider/index.ts",
            dest: "./providers/supabase/dataProvider/index.ts",
          },
          {
            src: "./src/liveProvider/index.ts",
            dest: "./providers/supabase/liveProvider/index.ts",
          },
          {
            src: "./src/types/index.ts",
            dest: "./providers/supabase/types/index.ts",
          },
          {
            src: "./src/utils/index.ts",
            dest: "./providers/supabase/utils/index.ts",
          },
          {
            src: "./src/utils/generateFilter.ts",
            dest: "./providers/supabase/utils/generateFilter.ts",
          },
          {
            src: "./src/utils/handleError.ts",
            dest: "./providers/supabase/utils/handleError.ts",
          },
          {
            src: "./src/utils/mapOperator.ts",
            dest: "./providers/supabase/utils/mapOperator.ts",
          },
        ],
        message: `
                    **\`Usage\`**

                    \`\`\`
                    // title: App.tsx
                    import { dataProvider, liveProvider, createClient } from "providers/supabase";

                    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
                      /* ... */
                    });
                  
                    const App = () => {
                        return (
                            <Refine
                                dataProvider={dataProvider(supabaseClient)}
                                liveProvider={liveProvider(supabaseClient)}
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
