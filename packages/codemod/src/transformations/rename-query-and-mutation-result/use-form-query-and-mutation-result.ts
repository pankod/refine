import type { Collection, JSCodeshift } from "jscodeshift";

// ```diff
// - const { queryResult, mutationResult } = useForm();
// + const { query, mutation} = useSelect();
// ```
export const renameUseFormQueryResultAndMutationResult = (
  j: JSCodeshift,
  source: Collection,
) => {
  const renameProperties = (prop) => {
    // just a type guard
    if ("shorthand" in prop && "key" in prop && "name" in prop.key) {
      const renameMap = {
        queryResult: "query",
        mutationResult: "mutation",
      };
      const newName = renameMap[prop.key.name];
      if (newName) {
        prop.key.name = newName;

        if (prop.shorthand) {
          prop.shorthand = false;
          prop.value = j.identifier(
            prop.key.name === "query" ? "queryResult" : "mutationResult",
          );
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
      init: { callee: { name: "useForm" } },
    })
    .forEach((path) => {
      if ("properties" in path.node.id) {
        path.node.id.properties.forEach((prop) => {
          // just a type guard
          if ("shorthand" in prop && "key" in prop && "name" in prop.key) {
            switch (prop.key.name) {
              case "refineCore":
                if ("properties" in prop.value) {
                  prop.value.properties.forEach(renameProperties);
                }
                return;

              default:
                renameProperties(prop);
            }
          }
        });
      }
    });
};
