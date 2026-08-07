/** @type {import('@refinedev/cli').RefineConfig} */
module.exports = {
  group: "Rest Data Provider",
  swizzle: {
    items: [
      {
        group: "Default Options",
        label: "Data Provider Default Options",
        requiredPackages: ["deepmerge@4.3.1", "ky@1.10.0", "qs@6.10.1"],
        files: [
          {
            src: "./src/default.options.ts",
            dest: "./providers/default.options.ts",
          },
        ],
        message: `
                **\`Usage\`**

                \`\`\`
                // title: providers/data.ts
                import { createDataProvider } from "@refinedev/rest";
                import { defaultOptions } from "./default.options";

                export const MyDataProvider = createDataProvider(
                  'https://example.com',
                  defaultOptions,
                );
                \`\`\`
                `,
      },
      {
        group: "Hooks",
        label: "Auth Header Hook",
        requiredPackages: ["deepmerge@4.3.1", "ky@1.10.0", "qs@6.10.1"],
        files: [
          {
            src: "./src/hooks/auth-header.before-request.hook.ts",
            dest: "./providers/hooks/auth-header.before-request.hook.ts",
          },
        ],
        message: `
                **\`Usage\`**

                \`\`\`
                // title: providers/data.ts
                import { createDataProvider } from "@refinedev/rest";
                import { defaultOptions } from "./default.options";
                import { authHeaderBeforeRequestHook } from "./hooks/auth-header.before-request.hook.ts

                const ACCESS_TOKEN_KEY = 'access-token'

                export const MyDataProvider = createDataProvider(
                  'https://example.com',
                  defaultOptions,
                  {
                    hooks: {
                      beforeRequest: [
                        authHeaderBeforeRequestHook({ ACCESS_TOKEN_KEY })
                      ]
                    }
                  }
                );
                \`\`\`
                `,
      },
      {
        group: "Hooks",
        label: "Refresh Token Hook",
        requiredPackages: ["deepmerge@4.3.1", "ky@1.10.0", "qs@6.10.1"],
        files: [
          {
            src: "./src/hooks/refresh-token.after-response.hook.ts",
            dest: "./providers/hooks/refresh-token.after-response.hook.ts",
          },
        ],
        message: `
                **\`Usage\`**

                \`\`\`
                // title: providers/data.ts
                import { createDataProvider } from "@refinedev/rest";
                import { defaultOptions } from "./default.options";
                import { refreshTokenAfterResponseHook } from "./hooks/auth-header.before-request.hook.ts

                const ACCESS_TOKEN_KEY = 'access-token'
                const REFRESH_TOKEN_KEY = 'refresh-token'
                const REFRESH_TOKEN_URL = 'https://example.com/refresh-token'

                export const MyDataProvider = createDataProvider(
                  'https://example.com',
                  defaultOptions,
                  {
                    hooks: {
                      afterResponse: [
                        refreshTokenAfterResponseHook(
                          {
                            ACCESS_TOKEN_KEY,
                            REFRESH_TOKEN_KEY,
                            REFRESH_TOKEN_URL,
                          }
                        )
                      ]
                    }
                  }
                );
                \`\`\`
                `,
      },
    ],
  },
};
