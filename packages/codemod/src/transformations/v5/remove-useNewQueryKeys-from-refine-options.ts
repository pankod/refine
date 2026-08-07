import type { Collection, JSCodeshift } from "jscodeshift";

export const removeUseNewQueryKeysFromRefineOptions = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  // Find all JSX elements named "Refine"
  const refineElements = root.find(j.JSXElement, {
    openingElement: {
      name: {
        name: "Refine",
      },
    },
  });

  refineElements.forEach((refineElement) => {
    const openingElement = refineElement.value.openingElement;
    const attributes = openingElement.attributes;

    if (!attributes) {
      return;
    }

    // Find the "options" prop
    const optionsAttribute = attributes.find((attr) => {
      return (
        attr.type === "JSXAttribute" &&
        attr.name &&
        attr.name.type === "JSXIdentifier" &&
        attr.name.name === "options"
      );
    });

    if (!optionsAttribute || optionsAttribute.type !== "JSXAttribute") {
      return;
    }

    // Check if the value is a JSXExpressionContainer with an ObjectExpression
    if (
      optionsAttribute.value &&
      optionsAttribute.value.type === "JSXExpressionContainer" &&
      optionsAttribute.value.expression &&
      optionsAttribute.value.expression.type === "ObjectExpression"
    ) {
      const objectExpression = optionsAttribute.value.expression;

      // Filter out the useNewQueryKeys property
      const filteredProperties = objectExpression.properties.filter(
        (property) => {
          if (
            property.type === "ObjectProperty" ||
            property.type === "Property"
          ) {
            if (property.key && property.key.type === "Identifier") {
              return property.key.name !== "useNewQueryKeys";
            }
          }
          return true;
        },
      );

      // If useNewQueryKeys was found and removed
      if (filteredProperties.length !== objectExpression.properties.length) {
        objectExpression.properties = filteredProperties;
      }
    }
  });
};
