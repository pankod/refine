import type { JSCodeshift, Collection } from "jscodeshift";

const deprecatedPropName = "ignoreAccessControlProvider";
const newName = "accessControl";
const newProperty = "enabled";

export const moveDeprecatedAccessControlProps = (
  j: JSCodeshift,
  source: Collection,
) => {
  source.find(j.JSXElement).forEach((path) => {
    const attributes = path.node.openingElement.attributes;
    if (!attributes) return;

    const hasAccessControl = attributes.some(
      (attribute) => attribute?.["name"]?.["name"] === "accessControl",
    );

    if (hasAccessControl) return;

    const oldProp = path.node.openingElement.attributes.find((attribute) => {
      return attribute?.["name"]?.["name"] === deprecatedPropName;
    });

    if (oldProp) {
      const oldValue = oldProp?.["value"]?.["expression"]?.["value"];
      const newValue = !oldValue;

      oldProp["name"]["name"] = newName;

      oldProp["value"]["expression"] = j.objectExpression([
        j.objectProperty(j.identifier(newProperty), j.booleanLiteral(newValue)),
      ]);
    }
  });
};
