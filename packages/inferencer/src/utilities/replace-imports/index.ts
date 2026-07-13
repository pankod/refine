import { prettySpaces } from "../pretty-spaces";

const packageRegex =
  /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(?:['"])(?:;?)/g;

const sideEffectRegex = /import[ \n\t](?:['"])([^'"\n]+)(?:['"])(?:;?)/g;

const nameChangeRegex = /((?:\w|\s|_)*)( as )((?:\w|\s|_)*)( |,)?/g;

/**
 * This function will replace the imports in the code since `react-live` does not support `import` statements.
 * `modules` is an object with keys as `package name` and values as `variable name`.
 */
export const replaceImports = (
  content: string,
  modules: Record<string, string> = {},
): string => {
  const matches = content.matchAll(packageRegex);

  const imports = new Set();

  // @ts-ignore
  for (const match of matches) {
    const [, defaultImport, namedImports, namespaceImport, packageName] = match;

    if (packageName in modules) {
      const importName = modules[packageName];

      /**
       * React and its exports are already available in the scope of the code.
       * Restructuring them in import statements will cause errors.
       * To avoid that, we are not replacing the import statements for React.
       * This way, generated code can have "react" imports without any errors.
       */
      if (packageName === "react") {
        continue;
      }

      if (defaultImport) {
        imports.add(`const { default: ${defaultImport} } = ${importName};`);
      }

      if (namedImports) {
        imports.add(
          `const${namedImports.replace(
            nameChangeRegex,
            "$1: $3$4",
          )} = ${importName};`,
        );
      }

      if (namespaceImport) {
        imports.add(`const ${namespaceImport} = ${importName};`);
      }
    }
  }

  return prettySpaces(`
    ${Array.from(imports).join("\n")}
    ${content.replace(packageRegex, "").replace(sideEffectRegex, "")}
    `);
};
