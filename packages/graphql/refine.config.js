/** @type {import('@refinedev/cli').RefineConfig} */
module.exports = {
  group: "Data Provider",
  swizzle: {
    items: [
      {
        group: "Providers",
        label: "GraphQL Default Options",
        requiredPackages: [
          "@urql/core@5.0.6",
          "camelcase@6.2.0",
          "pluralize@8.0.0",
        ],
        files: [
          {
            src: "./src/dataProvider/options.ts",
            dest: "./providers/graphql/dataProvider/options.ts",
          },
          {
            src: "./test/utils/options.spec.ts",
            dest: "./providers/graphql/dataProvider/options.spec.ts",
          },
        ],
        message: `
              **\`Usage\`**

              \`\`\`
              You can modify the swizzled options.ts file and pass it to the GraphQL data provider as a 2nd argument.

              import createDataProvider from "@refinedev/graphql";

              const myOptions = { /* your options */ };

              const dataProvider = createDataProvider(client, myOptions);
              \`\`\`
              `,
      },
      {
        group: "Providers",
        label: "GraphQL",
        requiredPackages: [
          "@urql/core@5.0.6",
          "camelcase@6.2.0",
          "deepmerge@4.3.1",
          "graphql@15.6.1",
          "graphql-ws@5.9.1",
          "pluralize@8.0.0",
        ],
        files: [
          {
            src: "./src/index.ts",
            dest: "./providers/graphql/index.ts",
          },
          {
            src: "./src/dataProvider/index.ts",
            dest: "./providers/graphql/dataProvider/index.ts",
          },
          {
            src: "./src/dataProvider/options.ts",
            dest: "./providers/graphql/dataProvider/options.ts",
          },
          {
            src: "./src/liveProvider/index.ts",
            dest: "./providers/graphql/liveProvider/index.ts",
          },
          {
            src: "./src/liveProvider/helpers.ts",
            dest: "./providers/graphql/liveProvider/helpers.ts",
          },
          {
            src: "./src/utils/index.ts",
            dest: "./providers/graphql/utils/index.ts",
          },
          {
            src: "./src/utils/graphql.ts",
            dest: "./providers/graphql/utils/graphql.ts",
          },
          {
            src: "./src/utils/getListHelpers.ts",
            dest: "./providers/graphql/utils/getListHelpers.ts",
          },
        ],
        message: `
              **\`Usage\`**

              \`\`\`
              // title: App.tsx
              import createDataProvider, { createLiveProvider } from "providers/graphql";
              import { Client, fetchExchange } from "@urql/core";
              import { createClient } from "graphql-ws";

              const API_URL = "https://api.nestjs-query.refine.dev/graphql";
              const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";

              const client = new Client({ url: API_URL, exchanges: [fetchExchange] });

              const dataProvider = createDataProvider(client)

              const wsClient = createClient({ url: WS_URL })

              const liveProvider = createLiveProvider(wsClient)

              const App = () => {
                  return (
                      <Refine
                          dataProvider={dataProvider}
                          liveProvider={liveProvider}
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
