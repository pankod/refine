import type { Collection, JSCodeshift } from "jscodeshift";

const HOOK_PACKAGE_MAPPINGS = {
  useOne: ["@refinedev/core"],
};

export const useQueryAndResultFieldsInUseOneHook = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  // Find all useOne hook calls
  root
    .find(j.VariableDeclarator)
    .filter((path) => {
      const { node } = path;
      return (
        node.id?.type === "ObjectPattern" &&
        node.init?.type === "CallExpression" &&
        node.init.callee?.type === "Identifier" &&
        node.init.callee.name === "useOne"
      );
    })
    .forEach((path) => {
      const { node } = path;
      const objectPattern = node.id as any;

      // Define query fields that should be moved to query object
      const queryFieldNames = [
        "isLoading",
        "refetch",
        "error",
        "status",
        "isSuccess",
        "isStale",
        "fetchStatus",
        "failureCount",
      ];

      // Collect query fields that need to be moved
      const queryFields: any[] = [];
      const newProperties = [];
      let dataPropertyValue = null;
      let hasQueryFields = false;

      for (const prop of objectPattern.properties) {
        if (
          (prop.type === "ObjectProperty" || prop.type === "Property") &&
          prop.key?.type === "Identifier"
        ) {
          // Handle data field transformation
          if (prop.key.name === "data") {
            // Store the original data property value for usage transformation
            dataPropertyValue = prop.value;

            // Handle cases like { data } -> { result }
            if (prop.shorthand) {
              newProperties.push(
                j.objectProperty.from({
                  key: j.identifier("result"),
                  value: j.identifier("result"),
                  shorthand: true,
                }),
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
            hasQueryFields = true;
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
      if (hasQueryFields) {
        const queryObjectPattern = j.objectProperty(
          j.identifier("query"),
          j.objectPattern(queryFields),
        );
        newProperties.push(queryObjectPattern);
      }

      objectPattern.properties = newProperties;

      // Transform data?.data usages to just result
      if (dataPropertyValue && dataPropertyValue.type === "Identifier") {
        const dataVariableName = dataPropertyValue.name;
        const finalDataName =
          dataPropertyValue.name === "data" ? "result" : dataVariableName;

        // Transform data?.data.property to result?.property
        root
          .find(j.MemberExpression)
          .filter((memberPath) => {
            const expr = memberPath.value;
            // Look for patterns like data?.data.property
            return (
              j.OptionalMemberExpression.check(expr.object) &&
              j.Identifier.check(expr.object.object) &&
              expr.object.object.name === dataVariableName &&
              j.Identifier.check(expr.object.property) &&
              expr.object.property.name === "data"
            );
          })
          .replaceWith((memberPath) => {
            const expr = memberPath.value;
            // Create result?.property
            return j.optionalMemberExpression(
              j.identifier(finalDataName),
              expr.property,
              expr.computed,
            );
          });

        // Transform simple data?.data to result
        root
          .find(j.OptionalMemberExpression)
          .filter((memberPath) => {
            const expr = memberPath.value;
            return (
              j.Identifier.check(expr.object) &&
              expr.object.name === dataVariableName &&
              j.Identifier.check(expr.property) &&
              expr.property.name === "data"
            );
          })
          .replaceWith(() => j.identifier(finalDataName));
      }
    });

  return root;
};

export default function transformer(
  j: JSCodeshift,
  root: Collection<any>,
): string {
  useQueryAndResultFieldsInUseOneHook(j, root);

  return root.toSource({
    quote: "double",
  });
}
