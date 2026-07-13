import type { Collection, JSCodeshift } from "jscodeshift";

// List of mutation hooks affected by this change
const MUTATION_HOOKS = [
  "useCreate",
  "useCreateMany",
  "useUpdate",
  "useUpdateMany",
  "useDelete",
  "useDeleteMany",
  "useCustomMutation",
];

export const mutationResultToMutationProperty = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  // Step 1: Find all destructuring assignments from mutation hooks and track variable mappings
  const variableMappings = new Map<string, string>(); // old name -> new name

  root
    .find(j.VariableDeclarator)
    .filter((path) => {
      const { node } = path;
      return (
        node.id?.type === "ObjectPattern" &&
        node.init?.type === "CallExpression" &&
        node.init.callee?.type === "Identifier" &&
        MUTATION_HOOKS.includes(node.init.callee.name)
      );
    })
    .forEach((path) => {
      const { node } = path;
      const objectPattern = node.id as any;
      const hookName = (node.init as any).callee.name;

      // Track if we need to move mutation-related properties
      const mutationProperties: any[] = [];
      const newProperties = [];
      let hasDirectMutationAccess = false;

      for (const prop of objectPattern.properties) {
        if (
          (prop.type === "ObjectProperty" || prop.type === "Property") &&
          prop.key?.type === "Identifier"
        ) {
          const propertyName = prop.key.name;

          // Properties that are now under the mutation object
          if (
            [
              "isPending",
              "isLoading",
              "isError",
              "isSuccess",
              "isIdle",
              "data",
              "error",
              "status",
              "failureCount",
              "failureReason",
              "isPaused",
              "variables",
              "submittedAt",
              "context",
              "reset",
            ].includes(propertyName)
          ) {
            // Map isLoading to isPending
            if (propertyName === "isLoading") {
              // If it's a simple property (isLoading destructured as isLoading)
              if (prop.key.name === prop.value?.name) {
                // Create shorthand property: isPending
                const newProp = j.objectProperty.from({
                  key: j.identifier("isPending"),
                  value: j.identifier("isPending"),
                  shorthand: true,
                });
                mutationProperties.push(newProp);
                // Track mapping for variable renaming
                variableMappings.set("isLoading", "isPending");
              } else {
                // If it's renamed (isLoading: customName), keep the custom name but use isPending key
                const newProp = j.objectProperty(
                  j.identifier("isPending"),
                  prop.value,
                );
                mutationProperties.push(newProp);
                // No variable mapping needed as user provided custom name
              }
            } else {
              mutationProperties.push(prop);
            }
            hasDirectMutationAccess = true;
          } else {
            // Keep other properties (mutate, mutateAsync, overtime)
            newProperties.push(prop);
          }
        } else {
          // Keep non-identifier properties as-is
          newProperties.push(prop);
        }
      }

      // If we have mutation properties, wrap them in a mutation object
      if (hasDirectMutationAccess) {
        const mutationObjectPattern = j.objectProperty(
          j.identifier("mutation"),
          j.objectPattern(mutationProperties),
        );
        newProperties.push(mutationObjectPattern);
      }

      objectPattern.properties = newProperties;
    });

  // Step 2: Update variable usages based on mappings
  variableMappings.forEach((newName, oldName) => {
    root
      .find(j.Identifier)
      .filter((path) => {
        // Only rename identifiers that are actually references to the old variable
        // Skip object keys and property names
        return (
          path.value.name === oldName &&
          path.parentPath.value.type !== "ObjectProperty" &&
          path.parentPath.value.type !== "Property" &&
          path.parentPath.value.key !== path.value
        );
      })
      .replaceWith(j.identifier(newName));
  });

  // Step 3: Transform direct property access on mutation variables
  // Find variable declarations that extract mutation hooks
  const mutationVariableNames = new Set<string>();

  root
    .find(j.VariableDeclarator)
    .filter((path) => {
      const { node } = path;
      return (
        node.init?.type === "CallExpression" &&
        node.init.callee?.type === "Identifier" &&
        MUTATION_HOOKS.includes(node.init.callee.name)
      );
    })
    .forEach((path) => {
      const { node } = path;
      if (node.id?.type === "Identifier") {
        mutationVariableNames.add(node.id.name);
      }
    });

  // Transform property access patterns
  mutationVariableNames.forEach((varName) => {
    // Transform direct property access like `mutationResult.isLoading` to `mutationResult.mutation.isPending`
    root
      .find(j.MemberExpression)
      .filter((path) => {
        const expr = path.value;
        return (
          j.Identifier.check(expr.object) &&
          expr.object.name === varName &&
          j.Identifier.check(expr.property) &&
          [
            "isPending",
            "isLoading",
            "isError",
            "isSuccess",
            "isIdle",
            "data",
            "error",
            "status",
            "failureCount",
            "failureReason",
            "isPaused",
            "variables",
            "submittedAt",
            "context",
            "reset",
          ].includes(expr.property.name)
        );
      })
      .replaceWith((path) => {
        const expr = path.value;
        // Map isLoading to isPending in property access
        const currentPropertyName = j.Identifier.check(expr.property)
          ? expr.property.name
          : expr.property;
        const propertyName =
          currentPropertyName === "isLoading"
            ? "isPending"
            : currentPropertyName;
        return j.memberExpression(
          j.memberExpression(expr.object, j.identifier("mutation")),
          typeof propertyName === "string"
            ? j.identifier(propertyName)
            : propertyName,
        );
      });

    // Transform optional chaining like `mutationResult?.isLoading` to `mutationResult.mutation.isPending`
    root
      .find(j.OptionalMemberExpression)
      .filter((path) => {
        const expr = path.value;
        return (
          j.Identifier.check(expr.object) &&
          expr.object.name === varName &&
          j.Identifier.check(expr.property) &&
          [
            "isPending",
            "isLoading",
            "isError",
            "isSuccess",
            "isIdle",
            "data",
            "error",
            "status",
            "failureCount",
            "failureReason",
            "isPaused",
            "variables",
            "submittedAt",
            "context",
            "reset",
          ].includes(expr.property.name)
        );
      })
      .replaceWith((path) => {
        const expr = path.value;
        // Map isLoading to isPending in optional chaining
        const currentPropertyName = j.Identifier.check(expr.property)
          ? expr.property.name
          : expr.property;
        const propertyName =
          currentPropertyName === "isLoading"
            ? "isPending"
            : currentPropertyName;
        return j.optionalMemberExpression(
          j.optionalMemberExpression(expr.object, j.identifier("mutation")),
          typeof propertyName === "string"
            ? j.identifier(propertyName)
            : propertyName,
        );
      });
  });
};

export default function transform(file: any, api: any) {
  const j = api.jscodeshift;
  const root = j(file.source);

  mutationResultToMutationProperty(j, root);

  return root.toSource();
}

export const parser = "tsx";
