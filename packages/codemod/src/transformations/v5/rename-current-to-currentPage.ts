import type { API, FileInfo, Collection, JSCodeshift } from "jscodeshift";

const HOOK_PACKAGE_MAPPINGS = {
  useTable: ["@refinedev/core", "@refinedev/react-table", "@refinedev/antd"],
  useDataGrid: ["@refinedev/mui"],
  useSimpleList: ["@refinedev/antd"],
};

export const renameCurrentToCurrentPage = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  // Track which hooks are imported from which packages
  const hookSources = new Map<string, string[]>();

  // First pass: collect hook imports and their sources
  Object.keys(HOOK_PACKAGE_MAPPINGS).forEach((hookName) => {
    const supportedPackages = HOOK_PACKAGE_MAPPINGS[hookName];

    supportedPackages.forEach((packageName) => {
      root
        .find(j.ImportDeclaration, {
          source: { value: packageName },
        })
        .forEach((path) => {
          const importDecl = path.value;
          if (!importDecl.specifiers) return;

          const hasHook = importDecl.specifiers.some(
            (spec) =>
              spec.type === "ImportSpecifier" &&
              spec.imported.name === hookName,
          );

          if (hasHook) {
            if (!hookSources.has(hookName)) {
              hookSources.set(hookName, []);
            }
            hookSources.get(hookName)!.push(packageName);
          }
        });
    });
  });

  // Helper function to transform object properties recursively
  const transformObjectProperties = (properties: any[]): any[] => {
    return properties.map((prop: any) => {
      if (
        prop.type === "ObjectProperty" &&
        prop.key?.type === "Identifier" &&
        prop.value?.type === "Identifier"
      ) {
        const keyName = prop.key.name;
        const valueName = prop.value.name;

        if (keyName === "current") {
          return j.objectProperty(
            j.identifier("currentPage"),
            j.identifier(valueName),
          );
        }

        if (keyName === "setCurrent") {
          return j.objectProperty(
            j.identifier("setCurrentPage"),
            j.identifier(valueName),
          );
        }
      }

      // Handle nested object patterns (like refineCore: { current, setCurrent })
      if (
        prop.type === "ObjectProperty" &&
        prop.key?.type === "Identifier" &&
        prop.value?.type === "ObjectPattern"
      ) {
        const nestedPattern = prop.value as any;
        const transformedProperties = transformObjectProperties(
          nestedPattern.properties,
        );

        return j.objectProperty(
          prop.key,
          j.objectPattern(transformedProperties),
        );
      }

      return prop;
    });
  };

  // Second pass: find and transform destructuring assignments
  root
    .find(j.VariableDeclarator)
    .filter((path) => {
      const { node } = path;
      return (
        node.id?.type === "ObjectPattern" &&
        node.init?.type === "CallExpression" &&
        node.init.callee?.type === "Identifier" &&
        hookSources.has(node.init.callee.name)
      );
    })
    .forEach((path) => {
      const { node } = path;
      const hookName = (node.init as any).callee.name;
      const objectPattern = node.id as any;

      // Only proceed if this hook is from a supported package
      if (!hookSources.has(hookName)) return;

      // Transform the properties in the destructuring
      objectPattern.properties = transformObjectProperties(
        objectPattern.properties,
      );
    });

  return root;
};

export default function transformer(
  j: JSCodeshift,
  root: Collection<any>,
): string {
  renameCurrentToCurrentPage(j, root);

  return root.toSource();
}
