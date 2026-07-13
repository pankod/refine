import type { JSCodeshift, Collection } from "jscodeshift";

export const useQueryAndResultFieldsInUseCustomHook = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  // Properties that should be accessed from query
  const queryProperties = new Set([
    "isLoading",
    "isFetching",
    "isError",
    "isSuccess",
    "error",
    "refetch",
    "remove",
    "status",
    "fetchStatus",
    "isFetched",
    "isFetchedAfterMount",
    "isInitialLoading",
    "isPending",
    "isPlaceholderData",
    "isRefetching",
    "isStale",
  ]);

  // Properties that should be accessed from result
  const resultProperties = new Set(["data"]);

  // Find all variable declarators that use useCustom
  root.find(j.VariableDeclarator).forEach((path) => {
    const { node } = path;

    // Check if this is a useCustom call (with or without generics)
    if (
      node.init?.type === "CallExpression" &&
      node.id?.type === "ObjectPattern"
    ) {
      // Check for direct useCustom call
      const isDirectCall =
        node.init.callee?.type === "Identifier" &&
        node.init.callee.name === "useCustom";

      // Check for generic useCustom call (like useCustom<T>())
      const isGenericCall =
        node.init.callee?.type === "CallExpression" &&
        node.init.callee.callee?.type === "Identifier" &&
        node.init.callee.callee.name === "useCustom";

      if (isDirectCall || isGenericCall) {
        const objectPattern = node.id;
        const properties = objectPattern.properties;

        // Categorize and transform properties
        const newProperties: any[] = [];
        const queryProps: any[] = [];
        const resultProps: any[] = [];
        const otherProps: any[] = [];
        let hasTransformations = false;

        properties.forEach((prop: any) => {
          if (
            (prop.type === "Property" || prop.type === "ObjectProperty") &&
            prop.key?.type === "Identifier"
          ) {
            const propName = prop.key.name;

            if (queryProperties.has(propName)) {
              queryProps.push(prop);
              hasTransformations = true;
            } else if (resultProperties.has(propName)) {
              resultProps.push(prop);
              hasTransformations = true;
            } else {
              otherProps.push(prop);
            }
          } else {
            otherProps.push(prop);
          }
        });

        // Only apply transformation if we made changes
        if (hasTransformations) {
          // Add query object if we have query properties
          if (queryProps.length > 0) {
            newProperties.push(
              j.property(
                "init",
                j.identifier("query"),
                j.objectPattern(queryProps),
              ),
            );
          }

          // Add result properties as simple renaming
          if (resultProps.length > 0) {
            resultProps.forEach((prop: any) => {
              const alias =
                prop.value?.type === "Identifier"
                  ? prop.value.name
                  : prop.key.name;
              newProperties.push(
                j.property("init", j.identifier("result"), j.identifier(alias)),
              );
            });
          }

          // Add other properties at the end
          newProperties.push(...otherProps);

          objectPattern.properties = newProperties;
        }
      }
    }
  });

  const result = root.toSource({
    quote: "double",
    objectCurlySpacing: false,
  });

  // Fix formatting for simple cases with single properties
  return result
    .replace(/const {\s+(\w+:\s*\w+)\s+}/g, "const { $1 }")
    .replace(/{\s+(\w+:\s*{\s*[\w\s:,\n]+\s*})\s+}/g, "{ $1 }");
};

useQueryAndResultFieldsInUseCustomHook.parser = "tsx";

export default useQueryAndResultFieldsInUseCustomHook;
