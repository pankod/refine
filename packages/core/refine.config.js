const { getImports, appendAfterImports } = require("@refinedev/cli");

/** @type {import('@refinedev/cli').RefineConfig} */
module.exports = {
  group: "UI Framework",
  swizzle: {
    items: [
      {
        group: "Pages",
        label: "ErrorPage",
        message: `
                **\`Info:\`**
                If you want to see an example of error page in use, you can refer to the documentation at https://refine.dev/docs/packages/documentation/routers
                `,
        files: [
          {
            src: "./src/components/pages/error/index.tsx",
            dest: "./components/pages/error.tsx",
          },
        ],
      },
      {
        group: "Pages",
        label: "AuthPage",
        message: `
                **\`Info:\`**
                If you want to see examples of authentication pages in use, you can refer to the documentation at https://refine.dev/docs/packages/documentation/routers
                `,
        files: [
          {
            src: "./src/components/pages/auth/index.tsx",
            dest: "./components/pages/auth/index.tsx",
          },
          {
            src: "./src/components/pages/auth/components/forgotPassword/index.tsx",
            dest: "./components/pages/auth/components/forgotPassword.tsx",
          },
          {
            src: "./src/components/pages/auth/components/login/index.tsx",
            dest: "./components/pages/auth/components/login.tsx",
          },
          {
            src: "./src/components/pages/auth/components/register/index.tsx",
            dest: "./components/pages/auth/components/register.tsx",
          },
          {
            src: "./src/components/pages/auth/components/updatePassword/index.tsx",
            dest: "./components/pages/auth/components/updatePassword.tsx",
          },
          {
            src: "./src/components/pages/auth/components/index.ts",
            dest: "./components/pages/auth/components/index.ts",
          },
        ],
      },
      {
        group: "Other",
        label: "CanAccess",
        files: [
          {
            src: "./src/components/canAccess/index.tsx",
            dest: "./components/canAccess.tsx",
          },
        ],
      },
      {
        group: "Other",
        label: "Authenticated",
        files: [
          {
            src: "./src/components/authenticated/index.tsx",
            dest: "./components/authenticated.tsx",
          },
        ],
      },
      {
        group: "Other",
        label: "AutoSaveIndicator",
        files: [
          {
            src: "./src/components/autoSaveIndicator/index.tsx",
            dest: "./components/autoSaveIndicator.tsx",
          },
        ],
      },
    ],
    transform: (content) => {
      let newContent = content;
      const imports = getImports(content);

      imports.map((importItem) => {
        if (
          importItem.importPath.includes("/types") ||
          importItem.importPath === "@hooks" ||
          importItem.importPath === "@hooks/translate" ||
          importItem.importPath === "@definitions/index" ||
          importItem.importPath === "@definitions/helpers"
        ) {
          const newStatement = `import ${importItem.namedImports} from "@refinedev/core";`;

          newContent = newContent.replace(importItem.statement, newStatement);
        }

        if (importItem.importPath === "../..") {
          const typesLine = `
                    type DivPropsType = React.DetailedHTMLProps<
                        React.HTMLAttributes<HTMLDivElement>,
                        HTMLDivElement
                    >;
                    type FormPropsType = React.DetailedHTMLProps<
                        React.FormHTMLAttributes<HTMLFormElement>,
                        HTMLFormElement
                    >;
                    `;

          newContent = newContent.replace(importItem.statement, "");

          newContent = appendAfterImports(newContent, typesLine);
        }
      });

      return newContent;
    },
  },
};
