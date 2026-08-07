import type { Collection, JSCodeshift } from "jscodeshift";

export const useQueryAndResultFieldsInUseInfiniteListHook = (
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
    "fetchNextPage",
    "fetchPreviousPage",
    "isFetchingNextPage",
    "isFetchingPreviousPage",
    "refetch",
    "remove",
    "status",
    "fetchStatus",
  ]);

  // Properties that should be accessed from result
  const resultProperties = new Set(["data", "hasNextPage", "hasPreviousPage"]);

  // Find all variable declarators that use useInfiniteList
  root.find(j.VariableDeclarator).forEach((path) => {
    const { node } = path;

    // Check if this is a useInfiniteList call (with or without generics)
    if (
      node.init?.type === "CallExpression" &&
      node.id?.type === "ObjectPattern"
    ) {
      // Check for direct useInfiniteList call
      const isDirectCall =
        node.init.callee?.type === "Identifier" &&
        node.init.callee.name === "useInfiniteList";

      // Check for generic useInfiniteList call (like useInfiniteList<T>())
      const isGenericCall =
        node.init.callee?.type === "CallExpression" &&
        node.init.callee.callee?.type === "Identifier" &&
        node.init.callee.callee.name === "useInfiniteList";

      if (isDirectCall || isGenericCall) {
        const objectPattern = node.id;
        const properties = objectPattern.properties;

        const queryProps: any[] = [];
        const resultProps: any[] = [];
        const otherProps: any[] = [];

        // Categorize properties
        properties.forEach((prop: any) => {
          if (
            (prop.type === "Property" || prop.type === "ObjectProperty") &&
            prop.key?.type === "Identifier"
          ) {
            const propName = prop.key.name;

            if (queryProperties.has(propName)) {
              queryProps.push(prop);
            } else if (resultProperties.has(propName)) {
              resultProps.push(prop);
            } else {
              otherProps.push(prop);
            }
          } else {
            otherProps.push(prop);
          }
        });

        // Only transform if we have query or result properties
        if (queryProps.length > 0 || resultProps.length > 0) {
          const newProperties: any[] = [];

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

          // Add result object if we have result properties
          if (resultProps.length > 0) {
            newProperties.push(
              j.property(
                "init",
                j.identifier("result"),
                j.objectPattern(resultProps),
              ),
            );
          }

          // Add other properties at the top level
          newProperties.push(...otherProps);

          // Replace the object pattern
          objectPattern.properties = newProperties;
        }
      }
    }
  });

  return root.toSource({
    quote: "double",
  });
};

useQueryAndResultFieldsInUseInfiniteListHook.parser = "tsx";

export default useQueryAndResultFieldsInUseInfiniteListHook;
