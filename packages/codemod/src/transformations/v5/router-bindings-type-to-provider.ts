import type { Collection, JSCodeshift } from "jscodeshift";
import { getNameAsString } from "../../helpers";

export const routerBindingsTypeToProvider = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  // Transform type imports from @refinedev/core
  root
    .find(j.ImportDeclaration)
    .filter((path) => {
      const source = path.value.source.value;
      return typeof source === "string" && source === "@refinedev/core";
    })
    .forEach((path) => {
      const specifiers = path.value.specifiers;
      if (!specifiers) return;

      specifiers.forEach((specifier, index) => {
        if (
          specifier.type === "ImportSpecifier" &&
          specifier.imported.type === "Identifier" &&
          specifier.imported.name === "RouterBindings" &&
          ((specifier as any).importKind === "type" || // Individual: { type RouterBindings }
            path.value.importKind === "type") // Inline: import type { RouterBindings }
        ) {
          const localName = getNameAsString(specifier.local?.name);
          const importedName = getNameAsString(specifier.imported.name);

          // Create a new import specifier with proper alias
          const newSpecifier = j.importSpecifier(
            j.identifier("RouterProvider"),
            j.identifier(localName || importedName),
          );

          // Preserve the type import kind
          if ((specifier as any).importKind === "type") {
            (newSpecifier as any).importKind = "type";
          }

          // Replace the specifier
          specifiers[index] = newSpecifier;
        }
      });
    });
};
