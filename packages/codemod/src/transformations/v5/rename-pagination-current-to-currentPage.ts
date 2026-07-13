import type { API, FileInfo, Collection, JSCodeshift } from "jscodeshift";

const HOOK_PACKAGE_MAPPINGS = {
  useTable: ["@refinedev/core", "@refinedev/react-table", "@refinedev/antd"],
  useDataGrid: ["@refinedev/mui"],
  useList: ["@refinedev/core"],
  useSimpleList: ["@refinedev/antd"],
  useSelect: [
    "@refinedev/core",
    "@refinedev/antd",
    "@refinedev/mui",
    "@refinedev/mantine",
    "@refinedev/chakra-ui",
  ],
  useInfiniteList: ["@refinedev/core"],
};

export const renamePaginationCurrentToCurrentPage = (
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

  // Second pass: find and transform hook calls (pagination parameters)
  root
    .find(j.CallExpression)
    .filter((path) => {
      const { node } = path;
      return (
        node.callee?.type === "Identifier" &&
        hookSources.has(node.callee.name) &&
        node.arguments.length > 0 &&
        node.arguments[0].type === "ObjectExpression"
      );
    })
    .forEach((path) => {
      const { node } = path;
      const hookName = (node.callee as any).name;
      const optionsObject = node.arguments[0] as any;

      // Only proceed if this hook is from a supported package
      if (!hookSources.has(hookName)) return;

      // Find pagination property in the options object
      optionsObject.properties.forEach((prop: any) => {
        if (
          (prop.type === "ObjectProperty" || prop.type === "Property") &&
          prop.key?.type === "Identifier" &&
          prop.key.name === "pagination" &&
          prop.value?.type === "ObjectExpression"
        ) {
          // Transform current property inside pagination object
          prop.value.properties = prop.value.properties.map(
            (paginationProp: any) => {
              if (
                (paginationProp.type === "ObjectProperty" ||
                  paginationProp.type === "Property") &&
                paginationProp.key?.type === "Identifier" &&
                paginationProp.key.name === "current"
              ) {
                return j.objectProperty(
                  j.identifier("currentPage"),
                  paginationProp.value,
                );
              }
              return paginationProp;
            },
          );
        }
      });
    });

  return root;
};

export default function transformer(
  j: JSCodeshift,
  root: Collection<any>,
): string {
  renamePaginationCurrentToCurrentPage(j, root);

  return root.toSource();
}
