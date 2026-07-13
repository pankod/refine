import type { Collection, JSCodeshift } from "jscodeshift";

// Internal transform function used by refine4-to-refine5
export const useTableReturnTypeUpdate = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  // Find all variable declarators that use useTable from @refinedev/react-table
  root.find(j.VariableDeclarator).forEach((path) => {
    const { node } = path;

    // Check if this is a useTable call and has object pattern destructuring
    if (
      node.init?.type === "CallExpression" &&
      node.id?.type === "ObjectPattern"
    ) {
      // Check for direct useTable call
      const isDirectCall =
        node.init.callee?.type === "Identifier" &&
        node.init.callee.name === "useTable";

      // Check for generic useTable call (like useTable<T>())
      const isGenericCall =
        node.init.callee?.type === "CallExpression" &&
        node.init.callee.callee?.type === "Identifier" &&
        node.init.callee.callee.name === "useTable";

      if (isDirectCall || isGenericCall) {
        // Check if useTable is imported from @refinedev/react-table
        let isFromReactTablePackage = false;

        root.find(j.ImportDeclaration).forEach((importPath) => {
          if (importPath.node.source.value === "@refinedev/react-table") {
            importPath.node.specifiers?.forEach((spec) => {
              if (
                spec.type === "ImportSpecifier" &&
                spec.imported?.type === "Identifier" &&
                spec.imported.name === "useTable"
              ) {
                isFromReactTablePackage = true;
              }
            });
          }
        });

        if (!isFromReactTablePackage) {
          return; // Skip if not from @refinedev/react-table
        }

        const objectPattern = node.id;
        const properties = objectPattern.properties;

        // Check if already transformed (has reactTable property)
        const hasReactTableProperty = properties.some(
          (prop: any) =>
            (prop.type === "Property" || prop.type === "ObjectProperty") &&
            prop.key?.type === "Identifier" &&
            prop.key.name === "reactTable",
        );

        if (hasReactTableProperty) {
          return; // Skip if already transformed
        }

        const reactTableProps: any[] = [];
        const refineCoreProps: any[] = [];
        let spreadElement: any = null;

        // Categorize properties
        properties.forEach((prop: any) => {
          if (prop.type === "RestElement") {
            spreadElement = prop;
          } else if (
            (prop.type === "Property" || prop.type === "ObjectProperty") &&
            prop.key?.type === "Identifier"
          ) {
            const propName = prop.key.name;

            if (propName === "refineCore") {
              refineCoreProps.push(prop);
            } else {
              // All properties except refineCore go to reactTable
              reactTableProps.push(prop);
            }
          } else {
            reactTableProps.push(prop);
          }
        });

        // Only transform if we have spread element or react-table properties
        // If we only have refineCore and no other changes needed, skip transformation
        if (spreadElement || reactTableProps.length > 0) {
          const newProperties: any[] = [];

          // Add reactTable object
          const reactTableObjectProps: any[] = [];

          if (spreadElement) {
            reactTableObjectProps.push(spreadElement);
          }

          if (reactTableProps.length > 0) {
            reactTableObjectProps.push(...reactTableProps);
          }

          if (reactTableObjectProps.length > 0) {
            newProperties.push(
              j.property(
                "init",
                j.identifier("reactTable"),
                j.objectPattern(reactTableObjectProps),
              ),
            );
          }

          // Add refineCore properties if they exist
          if (refineCoreProps.length > 0) {
            newProperties.push(...refineCoreProps);
          }

          // Replace the object pattern
          objectPattern.properties = newProperties;
        }
      }
    }
  });

  return root.toSource({
    quote: "double",
    lineTerminator: "\n",
    trailingComma: false,
  });
};

useTableReturnTypeUpdate.parser = "tsx";

export default useTableReturnTypeUpdate;
