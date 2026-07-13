import { packageMap, packageScopeMap } from "@/src/scope/map";
import { isDevelopmentModeByCookie } from "./development-cookie";
import { prettySpaces } from "./pretty-spaces";

const packageRegex =
  /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(?:['"])(?:;?)/g;
//
const sideEffectRegex = /import[ \n\t](?:['"])([^'"\n]+)(?:['"])(?:;?)/g;

const nameChangeRegex = /((?:\w|\s|_)*)( as )((?:\w|\s|_)*)( |,)?/g;

export const replaceImports = (content: string): string => {
  const matches = content.matchAll(packageRegex);

  const imports = new Set();

  for (const match of matches) {
    const [
      ,
      baseDefaultImport,
      baseNamedImports,
      namespaceImport,
      packageName,
    ] = match;
    let defaultImport: string | undefined = baseDefaultImport;
    let namedImports: string | undefined = baseNamedImports;

    const regexMatch = Object.entries(packageScopeMap).find(([key, value]) =>
      // value is regexp, key is package name
      value.test(packageName),
    );
    const regexPackage = regexMatch ? regexMatch[0] : null;

    if (regexPackage && !(packageName in packageMap)) {
      const importName = packageMap[regexPackage];

      if (regexMatch) {
        // If `regexMatch` is present, it means we have a scoped import
        // In this case if there's a default import, we should use the scope name instead
        // Because the default import name may not match the root export name
        // eg: import Button$1 from "@mui/material/Button";
        // We'll convert it to a named export: import { /scopedImportName/ as /defaultImport/ } from "@mui/material";
        if (defaultImport) {
          const scopedImportName = packageName.match(regexMatch[1])?.[1];
          if (scopedImportName) {
            if (namedImports) {
              namedImports = `{ ${scopedImportName} as ${defaultImport}, ${namedImports.slice(
                1,
                -1,
              )} }`;
            } else {
              namedImports = ` { ${scopedImportName} as ${defaultImport} }`;
            }
            defaultImport = undefined;
          }
        }
        if (namedImports) {
          // If the import is made like this: import { default as Button$1 } from "@mui/material/Button";
          // We should convert it to: import { Button as Button$1 } from "@mui/material";
          if (namedImports.includes("default as")) {
            const scopedImportName = packageName.match(regexMatch[1])?.[1];
            namedImports = namedImports.replace(
              "default as",
              `${scopedImportName} as`,
            );
          }
        }
      }

      if (defaultImport) {
        imports.add(`const { ${defaultImport} } = ${importName};`);
      }

      if (namedImports) {
        imports.add(
          `const${namedImports.replace(
            nameChangeRegex,
            "$1: $3$4",
          )} = ${importName};`,
        );
      }
    }

    if (packageName in packageMap) {
      const importName = packageMap[packageName];

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

  const pretty = prettySpaces(`
    ${Array.from(imports).join("\n")}
    ${content
      .replace(packageRegex, "")
      .replace(sideEffectRegex, "")
      .replace(
        "React.createElement(GoogleButton,",
        "React.createElement(MockGoogleButton,",
      )}
    `);

  if (isDevelopmentModeByCookie()) {
    console.log("== Incoming Code ==");
    console.log(content);
    console.log("== ==");
    console.log("== Transformed Code ==");
    console.log(pretty);
    console.log("== ==");
  }

  return pretty;
};
