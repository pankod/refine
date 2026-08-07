const { getImports } = require("@refinedev/cli");

/** @type {import('@refinedev/cli').RefineConfig} */
module.exports = {
  group: "UI Framework",
  swizzle: {
    items: [
      {
        group: "Buttons",
        label: "ShowButton",
        files: [
          {
            src: "./src/components/buttons/show/index.tsx",
            dest: "./components/buttons/show.tsx",
          },
        ],
      },
      {
        group: "Buttons",
        label: "CreateButton",
        message: `
                **\`Warning:\`**
                This component is used in the below component. If you want to change it, you can run the **swizzle** command for the below component or you can use props to override the default buttons.
                    - <List/>
                `,
        files: [
          {
            src: "./src/components/buttons/create/index.tsx",
            dest: "./components/buttons/create.tsx",
          },
        ],
      },
      {
        group: "Buttons",
        label: "CloneButton",
        files: [
          {
            src: "./src/components/buttons/clone/index.tsx",
            dest: "./components/buttons/clone.tsx",
          },
        ],
      },
      {
        group: "Buttons",
        label: "DeleteButton",
        message: `
                **\`Warning:\`**
                This component is used in the below components. If you want to change it, you can run the **swizzle** command for the below components or you can use props to override the default buttons.
                    - <Edit/>
                    - <List/>
                `,
        files: [
          {
            src: "./src/components/buttons/delete/index.tsx",
            dest: "./components/buttons/delete.tsx",
          },
        ],
      },
      {
        group: "Buttons",
        label: "EditButton",
        message: `
                **\`Warning:\`**
                This component is used in the below component. If you want to change it, you can run the **swizzle** command for the below component or you can use props to override the default buttons.
                    - <Show/>
                `,
        files: [
          {
            src: "./src/components/buttons/edit/index.tsx",
            dest: "./components/buttons/edit.tsx",
          },
        ],
      },
      {
        group: "Buttons",
        label: "ExportButton",
        files: [
          {
            src: "./src/components/buttons/export/index.tsx",
            dest: "./components/buttons/export.tsx",
          },
        ],
      },
      {
        group: "Buttons",
        label: "ImportButton",
        files: [
          {
            src: "./src/components/buttons/import/index.tsx",
            dest: "./components/buttons/import.tsx",
          },
        ],
      },
      {
        group: "Buttons",
        label: "ListButton",
        message: `
                **\`Warning:\`**
                This component is used in the below components. If you want to change it, you can run the **swizzle** command for the below components or you can use props to override the default buttons.
                    - <Edit/>
                    - <Show/>
                `,
        files: [
          {
            src: "./src/components/buttons/list/index.tsx",
            dest: "./components/buttons/list.tsx",
          },
        ],
      },
      {
        group: "Buttons",
        label: "RefreshButton",
        message: `
                **\`Warning:\`**
                This component is used in the below components. If you want to change it, you can run the **swizzle** command for the below components or you can use props to override the default buttons.
                    - <Edit/>
                    - <Show/>
                `,
        files: [
          {
            src: "./src/components/buttons/refresh/index.tsx",
            dest: "./components/buttons/refresh.tsx",
          },
        ],
      },
      {
        group: "Buttons",
        label: "SaveButton",
        message: `
                **\`Warning:\`**
                This component is used in the below components. If you want to change it, you can run the **swizzle** command for the below components or you can use props to override the default buttons.
                    - <Create/>
                    - <Edit/>
                `,
        files: [
          {
            src: "./src/components/buttons/save/index.tsx",
            dest: "./components/buttons/save.tsx",
          },
        ],
      },
      {
        group: "Fields",
        label: "BooleanField",
        files: [
          {
            src: "./src/components/fields/boolean/index.tsx",
            dest: "./components/fields/boolean.tsx",
          },
        ],
      },
      {
        group: "Fields",
        label: "DateField",
        files: [
          {
            src: "./src/components/fields/date/index.tsx",
            dest: "./components/fields/date.tsx",
          },
        ],
      },
      {
        group: "Fields",
        label: "EmailField",
        files: [
          {
            src: "./src/components/fields/email/index.tsx",
            dest: "./components/fields/email.tsx",
          },
        ],
      },
      {
        group: "Fields",
        label: "FileField",
        files: [
          {
            src: "./src/components/fields/file/index.tsx",
            dest: "./components/fields/file.tsx",
          },
        ],
      },
      {
        group: "Fields",
        label: "MarkdownField",
        files: [
          {
            src: "./src/components/fields/markdown/index.tsx",
            dest: "./components/fields/markdown.tsx",
          },
        ],
      },
      {
        group: "Fields",
        label: "NumberField",
        files: [
          {
            src: "./src/components/fields/number/index.tsx",
            dest: "./components/fields/number.tsx",
          },
        ],
      },
      {
        group: "Fields",
        label: "TagField",
        files: [
          {
            src: "./src/components/fields/tag/index.tsx",
            dest: "./components/fields/tag.tsx",
          },
        ],
      },
      {
        group: "Fields",
        label: "TextField",
        files: [
          {
            src: "./src/components/fields/text/index.tsx",
            dest: "./components/fields/text.tsx",
          },
        ],
      },
      {
        group: "Fields",
        label: "UrlField",
        files: [
          {
            src: "./src/components/fields/url/index.tsx",
            dest: "./components/fields/url.tsx",
          },
        ],
      },
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
            transform: (content) => {
              let newContent = content;

              // for remove RefineErorrPageProps
              const refineErrorPagePropsRegex =
                /React\.FC<RefineErrorPageProps>/g;

              newContent = newContent.replace(
                refineErrorPagePropsRegex,
                "React.FC",
              );

              return newContent;
            },
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
            transform: (content) => {
              let newContent = content;

              // for change style import path
              const styleImportRegex = /"\.\.\/styles";/g;

              newContent = newContent.replace(styleImportRegex, `"./styles";`);

              // for change index import path
              const indexImportRegex = /"\.\.\/\.\.\";/g;

              newContent = newContent.replace(indexImportRegex, `"../index";`);

              return newContent;
            },
          },
          {
            src: "./src/components/pages/auth/components/login/index.tsx",
            dest: "./components/pages/auth/components/login.tsx",
            transform: (content) => {
              let newContent = content;

              // for change style import path
              const styleImportRegex = /"\.\.\/styles";/g;

              newContent = newContent.replace(styleImportRegex, `"./styles";`);

              // for change index import path
              const indexImportRegex = /"\.\.\/\.\.\";/g;

              newContent = newContent.replace(indexImportRegex, `"../index";`);

              return newContent;
            },
          },
          {
            src: "./src/components/pages/auth/components/register/index.tsx",
            dest: "./components/pages/auth/components/register.tsx",
            transform: (content) => {
              let newContent = content;

              // for change style import path
              const styleImportRegex = /"\.\.\/styles";/g;

              newContent = newContent.replace(styleImportRegex, `"./styles";`);

              // for change index import path
              const indexImportRegex = /"\.\.\/\.\.\";/g;

              newContent = newContent.replace(indexImportRegex, `"../index";`);

              return newContent;
            },
          },
          {
            src: "./src/components/pages/auth/components/updatePassword/index.tsx",
            dest: "./components/pages/auth/components/updatePassword.tsx",
            transform: (content) => {
              let newContent = content;

              // for change style import path
              const styleImportRegex = /"\.\.\/styles";/g;

              newContent = newContent.replace(styleImportRegex, `"./styles";`);

              // for change index import path
              const indexImportRegex = /"\.\.\/\.\.\";/g;

              newContent = newContent.replace(indexImportRegex, `"../index";`);

              return newContent;
            },
          },
          {
            src: "./src/components/pages/auth/components/index.ts",
            dest: "./components/pages/auth/components/index.ts",
          },
          {
            src: "./src/components/pages/auth/components/styles.ts",
            dest: "./components/pages/auth/components/styles.ts",
          },
        ],
      },
      {
        group: "Other",
        label: "Breadcrumb",
        message: `
                **\`Warning:\`**
                This component is used in the below components. If you want to change it, you can use props to override the default breadcrumb or you can manage globally with the **options** prop to the **<Refine/>** component.
                    - <Edit/>
                    - <List/>
                    - <Show/>
                    - <Create/>

                **\`Passing Breadcrumb Globally:\`**

                \`\`\`
                // title: App.tsx
                import { Breadcrumb } from "components/breadcrumb";

                const App = () => {
                    return (
                        <Refine
                            options={{
                                breadcrumb: <Breadcrumb />
                                /* ... */
                            }}
                            /* ... */
                        />
                    );
                }
                \`\`\`
                `,
        files: [
          {
            src: "./src/components/breadcrumb/index.tsx",
            dest: "./components/breadcrumb.tsx",
            transform: (content) => {
              let newContent = content;

              // for remove type export
              const breadcrumbPropsExportRegex =
                /export type BreadcrumbProps = RefineBreadcrumbProps<ChakraBreadcrumbProps>;?/g;

              newContent = newContent.replace(
                breadcrumbPropsExportRegex,
                `import { BreadcrumbProps } from "@refinedev/chakra-ui";`,
              );

              const breadcrumbPropsImportRegex =
                /BreadcrumbProps as ChakraBreadcrumbProps,/g;

              newContent = newContent.replace(breadcrumbPropsImportRegex, "");

              return newContent;
            },
          },
        ],
      },
      {
        group: "Other",
        label: "ThemedLayout",
        message: `
                **\`Warning:\`**
                If you want to change the default themed layout;
                You should pass layout related components to the **<ThemedLayout />** component's props.

                \`\`\`
                // title: App.tsx
                import { ThemedLayout } from "components/layout";
                import { ThemedHeader } from "components/layout/header";
                import { ThemedSider } from "components/layout/sider";
                import { ThemedTitle } from "components/layout/title";

                const App = () => {
                    return (
                        <Refine
                            /* ... */
                        >
                            <ThemedLayout Header={ThemedHeader} Sider={ThemedSider} Title={ThemedTitle}>
                                /* ... */
                            </ThemedLayout>
                        </Refine>
                    );
                }
                \`\`\`
                `,
        files: [
          {
            src: "./src/components/themedLayout/sider/index.tsx",
            dest: "./components/layout/sider.tsx",
            transform: (content) => {
              let newContent = content;
              const imports = getImports(content);
              imports.map((importItem) => {
                // handle @contexts import replacement
                if (importItem.importPath === "@hooks") {
                  const newStatement = `import ${importItem.namedImports} from "@refinedev/chakra-ui";`;

                  newContent = newContent.replace(
                    importItem.statement,
                    newStatement,
                  );
                }
              });

              // for change style import path
              const styleImportRegex = /".\.\/title";/g;
              newContent = newContent.replace(styleImportRegex, `"./title";`);

              return newContent;
            },
          },
          {
            src: "./src/components/themedLayout/header/index.tsx",
            dest: "./components/layout/header.tsx",
            transform: (content) => {
              let newContent = content;

              // for change style import path
              const styleImportRegex = /".\.\/hamburgerMenu";/g;
              newContent = newContent.replace(
                styleImportRegex,
                `"./hamburgerMenu";`,
              );

              return newContent;
            },
          },
          {
            src: "./src/components/themedLayout/title/index.tsx",
            dest: "./components/layout/title.tsx",
          },
          {
            src: "./src/components/themedLayout/index.tsx",
            dest: "./components/layout/index.tsx",
            transform: (content) => {
              let newContent = content;
              const imports = getImports(content);

              imports.map((importItem) => {
                // handle @contexts import replacement
                if (importItem.importPath === "../../contexts") {
                  const newStatement = `import ${importItem.namedImports} from "@refinedev/chakra-ui";`;

                  newContent = newContent.replace(
                    importItem.statement,
                    newStatement,
                  );
                }
              });

              return newContent;
            },
          },
          {
            src: "./src/components/themedLayout/hamburgerMenu/index.tsx",
            dest: "./components/layout/hamburgerMenu.tsx",
            transform: (content) => {
              let newContent = content;
              const imports = getImports(content);

              imports.map((importItem) => {
                // handle @hooks import replacement
                if (importItem.importPath === "@hooks") {
                  const newStatement = `import ${importItem.namedImports} from "@refinedev/chakra-ui";`;

                  newContent = newContent.replace(
                    importItem.statement,
                    newStatement,
                  );
                }
              });

              return newContent;
            },
          },
        ],
      },
      {
        group: "Basic Views",
        label: "Create",
        files: [
          {
            src: "./src/components/crud/create/index.tsx",
            dest: "./components/crud/create.tsx",
          },
        ],
      },
      {
        group: "Basic Views",
        label: "List",
        files: [
          {
            src: "./src/components/crud/list/index.tsx",
            dest: "./components/crud/list.tsx",
          },
        ],
      },
      {
        group: "Basic Views",
        label: "Show",
        files: [
          {
            src: "./src/components/crud/show/index.tsx",
            dest: "./components/crud/show.tsx",
          },
        ],
      },
      {
        group: "Basic Views",
        label: "Edit",
        files: [
          {
            src: "./src/components/crud/edit/index.tsx",
            dest: "./components/crud/edit.tsx",
          },
        ],
      },
    ],
    transform: (content) => {
      let newContent = content;
      const imports = getImports(content);

      imports.map((importItem) => {
        if (importItem.importPath === "@components") {
          const newStatement = `import ${importItem.namedImports} from "@refinedev/chakra-ui";`;

          newContent = newContent.replace(importItem.statement, newStatement);
        }

        // for ui-types
        if (importItem.importPath === "@refinedev/ui-types") {
          newContent = newContent.replace(importItem.statement, "");

          // prop is data-testid
          // remove data-testid={*} from props
          const testIdPropRegex = /data-testid={.*?}/g;

          newContent = newContent.replace(testIdPropRegex, "");
        }

        // for prop types
        if (
          importItem.importPath === "../types" ||
          importItem.importPath === "./types"
        ) {
          const newStatement = `import type ${importItem.namedImports} from "@refinedev/chakra-ui";`;

          newContent = newContent.replace(importItem.statement, newStatement);
        }
      });

      return newContent;
    },
  },
};
