import type { Collection, JSCodeshift } from "jscodeshift";

// ```diff
// - const { queryResult } = useShow();
// + const { query } = useShow();
// ```
export const renameUseShowQueryResult = (
  j: JSCodeshift,
  source: Collection,
) => {
  const renameProperties = (prop) => {
    // just a type guard
    if ("shorthand" in prop && "key" in prop && "name" in prop.key) {
      if (prop.key.name === "queryResult") {
        prop.key.name = "query";

        if (prop.shorthand) {
          prop.shorthand = false;
          prop.value = j.identifier("queryResult");
        } else {
          if (prop.key.name === prop?.value?.name) {
            prop.shorthand = true;
          }
        }
      }
    }
  };

  source
    .find(j.VariableDeclarator, {
      id: { type: "ObjectPattern" },
      init: { callee: { name: "useShow" } },
    })
    .forEach((path) => {
      if ("properties" in path.node.id) {
        path.node.id.properties.forEach((prop) => {
          // just a type guard
          if ("shorthand" in prop && "key" in prop && "name" in prop.key) {
            renameProperties(prop);
          }
        });
      }
    });
};
