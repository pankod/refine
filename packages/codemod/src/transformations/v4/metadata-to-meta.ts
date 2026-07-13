import type { JSCodeshift, Collection } from "jscodeshift";

export const metaDataToMeta = (j: JSCodeshift, source: Collection) => {
  // find all JSX elements
  source.find(j.JSXElement).forEach((path) => {
    const attributes = path.node.openingElement.attributes;
    if (!attributes) return;

    // if they have a meta attribute, skip them.
    const hasMeta = attributes.some(
      (attribute) => attribute?.["name"]?.["name"] === "meta",
    );
    if (hasMeta) return;

    // if they have a metaData change it to meta.
    path.node.openingElement.attributes.forEach((attribute) => {
      if (attribute?.["name"]?.["name"] === "metaData") {
        attribute["name"]["name"] = "meta";
      }
    });
  });

  // find all call expressions
  source.find(j.CallExpression).forEach((path) => {
    // find all arguments
    path.node.arguments.forEach((argument) => {
      const properties = argument["properties"];
      if (!properties) return;

      // if they have a meta argument, skip them.
      const hasMeta = properties.some(
        (property) => property?.["key"]?.["name"] === "meta",
      );
      if (hasMeta) return;

      // if they have a metaData change it to meta.
      properties.forEach((property) => {
        if (
          property?.["shorthand"] &&
          property?.["key"]?.["name"] === "metaData"
        ) {
          property["key"]["name"] = "meta";
          property["value"]["name"] === "metaData";
          property["shorthand"] = false;
        } else {
          if (property?.["key"]?.["name"] === "metaData") {
            property["key"]["name"] = "meta";
          }
        }
      });
    });
  });
};
