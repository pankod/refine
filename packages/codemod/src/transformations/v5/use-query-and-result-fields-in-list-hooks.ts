import type { Collection, JSCodeshift } from "jscodeshift";

const HOOK_PACKAGE_MAPPINGS = {
  useList: ["@refinedev/core"],
  useMany: ["@refinedev/core"],
};

export const useQueryAndResultFieldsInListHooks = (
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

  // Second pass: find and transform destructuring assignments for useList and useMany
  ["useList", "useMany"].forEach((hookName) => {
    if (!hookSources.has(hookName)) return;

    root
      .find(j.VariableDeclarator)
      .filter((path) => {
        const { node } = path;
        return (
          node.id?.type === "ObjectPattern" &&
          node.init?.type === "CallExpression" &&
          node.init.callee?.type === "Identifier" &&
          node.init.callee.name === hookName
        );
      })
      .forEach((path) => {
        const { node } = path;
        const objectPattern = node.id as any;

        // Collect query fields that need to be moved
        const queryFields: any[] = [];
        const queryFieldNames = [
          "dataUpdatedAt",
          "error",
          "errorUpdateCount",
          "errorUpdatedAt",
          "failureCount",
          "failureReason",
          "fetchStatus",
          "isError",
          "isFetched",
          "isFetchedAfterMount",
          "isFetching",
          "isInitialLoading",
          "isLoading",
          "isLoadingError",
          "isPaused",
          "isPlaceholderData",
          "isPreviousData",
          "isRefetchError",
          "isRefetching",
          "isStale",
          "isSuccess",
          "refetch",
          "remove",
          "status",
        ];

        // Transform the properties in the destructuring
        const newProperties = [];

        for (const prop of objectPattern.properties) {
          if (
            (prop.type === "ObjectProperty" || prop.type === "Property") &&
            prop.key?.type === "Identifier"
          ) {
            // Handle data field transformation
            if (prop.key.name === "data") {
              // Handle cases like { data } -> { result: data }
              if (prop.shorthand) {
                newProperties.push(
                  j.objectProperty(
                    j.identifier("result"),
                    j.identifier("data"),
                  ),
                );
              } else {
                // Handle cases like { data: variableName } -> { result: variableName }
                newProperties.push(
                  j.objectProperty(j.identifier("result"), prop.value),
                );
              }
            }
            // Handle query fields
            else if (queryFieldNames.includes(prop.key.name)) {
              queryFields.push(prop);
            }
            // Keep other properties as-is
            else {
              newProperties.push(prop);
            }
          } else {
            // Keep non-identifier properties as-is
            newProperties.push(prop);
          }
        }

        // Add query object if we have query fields
        if (queryFields.length > 0) {
          const queryObjectPattern = j.objectProperty(
            j.identifier("query"),
            j.objectPattern(queryFields),
          );
          newProperties.push(queryObjectPattern);
        }

        objectPattern.properties = newProperties;
      });

    // Third pass: find and transform variable assignments (non-destructuring) for useList and useMany
    root
      .find(j.VariableDeclarator)
      .filter((path) => {
        const { node } = path;
        return (
          node.id?.type === "Identifier" &&
          node.init?.type === "CallExpression" &&
          node.init.callee?.type === "Identifier" &&
          node.init.callee.name === hookName
        );
      })
      .forEach((path) => {
        const { node } = path;
        const originalVariableName = (node.id as any).name;
        const migratedVariableName = `migrated${
          originalVariableName.charAt(0).toUpperCase() +
          originalVariableName.slice(1)
        }`;

        // Change the original variable to use the migrated name
        (node.id as any).name = migratedVariableName;

        // Create the spread assignment after this declaration
        const parentDeclaration = path.parent;
        if (parentDeclaration?.value?.type === "VariableDeclaration") {
          const newDeclaration = j.variableDeclaration("const", [
            j.variableDeclarator(
              j.identifier(originalVariableName),
              j.objectExpression([
                j.spreadElement(
                  j.memberExpression(
                    j.identifier(migratedVariableName),
                    j.identifier("result"),
                  ),
                ),
                j.spreadElement(
                  j.memberExpression(
                    j.identifier(migratedVariableName),
                    j.identifier("query"),
                  ),
                ),
                j.spreadElement(j.identifier(migratedVariableName)),
              ]),
            ),
          ]);

          // Insert the new declaration after the current one
          const parentStatement = path.parent.parent;
          if (
            parentStatement?.value?.type === "Program" ||
            parentStatement?.value?.type === "BlockStatement"
          ) {
            const statements = parentStatement.value.body;
            const currentIndex = statements.indexOf(parentDeclaration.value);
            statements.splice(currentIndex + 1, 0, newDeclaration);
          }
        }
      });
  });

  return root;
};

export default function transformer(
  j: JSCodeshift,
  root: Collection<any>,
): string {
  useQueryAndResultFieldsInListHooks(j, root);

  return root.toSource({
    quote: "double",
    trailingComma: true,
  });
}
