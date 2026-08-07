import type { Collection, JSCodeshift } from "jscodeshift";

export const renameITreeMenuToTreeMenuItem = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  // Check if TreeMenuItem already exists in any @refinedev/core import
  const hasTreeMenuItem =
    root
      .find(j.ImportDeclaration, {
        source: { value: "@refinedev/core" },
      })
      .find(j.ImportSpecifier, {
        imported: { name: "TreeMenuItem" },
      }).length > 0;

  if (hasTreeMenuItem) {
    return root;
  }

  // Find import declarations from @refinedev/core that have ITreeMenu
  root
    .find(j.ImportDeclaration, {
      source: { value: "@refinedev/core" },
    })
    .forEach((path) => {
      const importDecl = path.value;
      if (!importDecl.specifiers) return;

      // Check if this import has ITreeMenu
      const hasITreeMenu = importDecl.specifiers.some(
        (spec) =>
          spec.type === "ImportSpecifier" && spec.imported.name === "ITreeMenu",
      );

      if (!hasITreeMenu) return;

      // Replace ITreeMenu specifiers
      importDecl.specifiers = importDecl.specifiers.map((spec) => {
        if (
          spec.type === "ImportSpecifier" &&
          spec.imported.name === "ITreeMenu"
        ) {
          // Create new specifier with TreeMenuItem as ITreeMenu
          const newSpec = j.importSpecifier(
            j.identifier("TreeMenuItem"),
            j.identifier("ITreeMenu"),
          );

          // Copy importKind if it exists (for type imports)
          if ((spec as any).importKind) {
            (newSpec as any).importKind = (spec as any).importKind;
          }

          return newSpec;
        }
        return spec;
      });
    });

  return root;
};
