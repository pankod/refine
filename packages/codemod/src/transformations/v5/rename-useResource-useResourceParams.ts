import type { Collection, JSCodeshift } from "jscodeshift";
import { getNameAsString } from "../../helpers";

export const renameUseResourceToUseResourceParams = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  // Check if useResourceParams is already imported to avoid conflicts
  const hasUseResourceParams =
    root
      .find(j.ImportDeclaration, {
        source: { value: "@refinedev/core" },
      })
      .find(j.ImportSpecifier, {
        imported: { name: "useResourceParams" },
      }).length > 0;

  if (hasUseResourceParams) {
    // Check if useResource is also imported (mixed import scenario)
    const hasUseResource =
      root
        .find(j.ImportDeclaration, {
          source: { value: "@refinedev/core" },
        })
        .find(j.ImportSpecifier, {
          imported: { name: "useResource" },
        }).length > 0;

    if (hasUseResource) {
      // Add a comment above the import statement with migration guidance
      root
        .find(j.ImportDeclaration, {
          source: { value: "@refinedev/core" },
        })
        .filter((path) => {
          const importDecl = path.value;
          return importDecl.specifiers?.some(
            (spec) =>
              spec.type === "ImportSpecifier" &&
              (spec.imported.name === "useResource" ||
                spec.imported.name === "useResourceParams"),
          );
        })
        .at(0)
        .forEach((path) => {
          // Add comments as leading comments to the import declaration
          const existingComments = path.value.comments || [];
          path.value.comments = [
            j.commentLine(
              " TODO: Complete migration from useResource to useResourceParams",
              true,
              false,
            ),
            j.commentLine(
              " See: http://localhost:3000/docs/migration-guide/4x-to-5x/#useresource--useresourceparams",
              true,
              false,
            ),
            ...existingComments,
          ];
        });
    }

    return root;
  }

  // Collect all local names (aliases) for useResource imports BEFORE transformation
  const useResourceAliases = new Set<string>();
  root
    .find(j.ImportDeclaration, {
      source: { value: "@refinedev/core" },
    })
    .forEach((path) => {
      const importDecl = path.value;
      if (!importDecl.specifiers) return;

      importDecl.specifiers.forEach((spec) => {
        if (
          spec.type === "ImportSpecifier" &&
          spec.imported.name === "useResource"
        ) {
          useResourceAliases.add(
            getNameAsString(spec.local?.name) || "useResource",
          );
        }
      });
    });

  // Helper function to transform object properties for parameter mapping
  const transformObjectProperties = (properties: any[]): any[] => {
    return properties.map((prop: any) => {
      if (prop.type === "ObjectProperty" || prop.type === "Property") {
        const keyName = prop.key?.name;

        // Map old property names to new ones
        if (
          keyName === "resourceNameOrRouteName" ||
          keyName === "resourceName"
        ) {
          return j.objectProperty(j.identifier("resource"), prop.value);
        }

        if (keyName === "recordItemId") {
          return j.objectProperty(j.identifier("id"), prop.value);
        }
      }
      return prop;
    });
  };

  // Find and transform useResource function calls (including aliases)
  useResourceAliases.forEach((aliasName) => {
    root
      .find(j.CallExpression, {
        callee: { name: aliasName },
      })
      .forEach((path) => {
        const callExpr = path.value;

        // Transform the function name if it was 'useResource' and not an alias
        if (
          aliasName === "useResource" &&
          callExpr.callee.type === "Identifier"
        ) {
          callExpr.callee.name = "useResourceParams";
        }

        // Handle different argument patterns
        if (callExpr.arguments && callExpr.arguments.length > 0) {
          const firstArg = callExpr.arguments[0];

          // Case 1: String or variable argument - useResource("posts") → useResourceParams({ resource: "posts" })
          if (
            firstArg.type === "Literal" ||
            firstArg.type === "StringLiteral" ||
            firstArg.type === "Identifier"
          ) {
            callExpr.arguments = [
              j.objectExpression([
                j.objectProperty(j.identifier("resource"), firstArg),
              ]),
            ];
          }
          // Case 2: Object argument - transform property names
          else if (firstArg.type === "ObjectExpression") {
            const transformedProperties = transformObjectProperties(
              firstArg.properties,
            );
            callExpr.arguments = [j.objectExpression(transformedProperties)];
          }
        }

        // Case 3: No arguments - useResource() → useResourceParams()
        // Function name transformation is already handled above
      });
  });

  // Find and replace imports: useResource → useResourceParams
  root
    .find(j.ImportDeclaration, {
      source: { value: "@refinedev/core" },
    })
    .forEach((path) => {
      const importDecl = path.value;
      if (!importDecl.specifiers) return;

      // Check if this import has useResource
      const hasUseResource = importDecl.specifiers.some(
        (spec) =>
          spec.type === "ImportSpecifier" &&
          spec.imported.name === "useResource",
      );

      if (!hasUseResource) return;

      // Replace useResource with useResourceParams in import specifiers
      importDecl.specifiers = importDecl.specifiers.map((spec) => {
        if (
          spec.type === "ImportSpecifier" &&
          spec.imported.name === "useResource"
        ) {
          // Only create alias if the original local name was different from 'useResource'
          const originalLocalName =
            getNameAsString(spec.local?.name) || "useResource";
          if (originalLocalName === "useResource") {
            // No alias needed - just import useResourceParams normally
            return j.importSpecifier(j.identifier("useResourceParams"));
          }

          // Keep the alias if it was originally aliased
          return j.importSpecifier(
            j.identifier("useResourceParams"),
            j.identifier(originalLocalName),
          );
        }
        return spec;
      });
    });

  return root;
};

export default function transformer(
  j: JSCodeshift,
  root: Collection<any>,
): string {
  renameUseResourceToUseResourceParams(j, root);

  return root.toSource();
}
