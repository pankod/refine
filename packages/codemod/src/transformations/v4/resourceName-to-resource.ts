import type { Collection, JSCodeshift } from "jscodeshift";

const COMPONENT_NAMES = [
  "ShowButton",
  "EditButton",
  "DeleteButton",
  "CloneButton",
  "ListButton",
  "RefreshButton",
  "CreateButton",
];

const DEPRECATED_PROP_NAMES = ["resourceName", "resourceNameOrRouteName"];
const NEW_PROP_NAME = "resource";

export const resourceNameToResourceForButtons = (
  j: JSCodeshift,
  source: Collection,
) => {
  // find all JSX elements that are named in COMPONENT_NAMES
  const elements = source.find(j.JSXElement, {
    openingElement: {
      name: {
        name: (name: string) => COMPONENT_NAMES.includes(name),
      },
    },
  });

  elements.forEach((path) => {
    const attributes = path.node.openingElement.attributes;
    if (!attributes) return;

    // if they have a NEW_PROP_NAME attribute, skip them.
    const hasNewAttribute = attributes.some(
      (attribute) => attribute?.["name"]?.["name"] === NEW_PROP_NAME,
    );

    if (hasNewAttribute) return;

    // if they have a metaData change it to meta.
    path.node.openingElement.attributes.forEach((attribute) => {
      if (DEPRECATED_PROP_NAMES.includes(attribute?.["name"]?.["name"])) {
        attribute["name"]["name"] = NEW_PROP_NAME;
        return;
      }
    });
  });
};
