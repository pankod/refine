import type { Collection, JSCodeshift } from "jscodeshift";
import { getNameAsString } from "../../helpers";

const SUPPORTED_PACKAGES = [
  "@refinedev/mui",
  "@refinedev/antd",
  "@refinedev/mantine",
  "@refinedev/chakra-ui",
  "@refinedev/ui-types",
];

const V2_MAPPINGS = {
  // Component mappings (all UI packages)
  ThemedLayoutV2: "ThemedLayout",
  ThemedTitleV2: "ThemedTitle",
  ThemedSiderV2: "ThemedSider",
  ThemedHeaderV2: "ThemedHeader",
  // Type mappings (all UI packages + ui-types)
  RefineThemedLayoutV2Props: "RefineThemedLayoutProps",
  RefineThemedLayoutV2SiderProps: "RefineThemedLayoutSiderProps",
  RefineThemedLayoutV2HeaderProps: "RefineThemedLayoutHeaderProps",
};

export const renameThemedV2Imports = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  SUPPORTED_PACKAGES.forEach((packageName) => {
    // Check if any of the new names already exist in imports
    const hasNewNames = Object.values(V2_MAPPINGS).some(
      (newName) =>
        root
          .find(j.ImportDeclaration, {
            source: { value: packageName },
          })
          .find(j.ImportSpecifier, {
            imported: { name: newName },
          }).length > 0,
    );

    if (hasNewNames) {
      return;
    }

    // Find import declarations from the current package that have any V2 items
    root
      .find(j.ImportDeclaration, {
        source: { value: packageName },
      })
      .forEach((path) => {
        const importDecl = path.value;
        if (!importDecl.specifiers) return;

        // Check if this import has any V2 items
        const hasV2Items = importDecl.specifiers.some(
          (spec) =>
            spec.type === "ImportSpecifier" &&
            Object.keys(V2_MAPPINGS).includes(
              getNameAsString(spec.imported.name),
            ),
        );

        if (!hasV2Items) return;

        // Replace V2 specifiers
        importDecl.specifiers = importDecl.specifiers.map((spec) => {
          if (
            spec.type === "ImportSpecifier" &&
            Object.keys(V2_MAPPINGS).includes(
              getNameAsString(spec.imported.name),
            )
          ) {
            const oldName = getNameAsString(spec.imported.name);
            const newName = V2_MAPPINGS[oldName];

            // Check if the import has a user-defined alias
            const hasUserAlias =
              spec.local && getNameAsString(spec.local.name) !== oldName;

            // maintain backward compatibility with aliases for all imports
            const localName = hasUserAlias
              ? getNameAsString(spec.local.name)
              : oldName;
            const newSpec = j.importSpecifier(
              j.identifier(newName),
              j.identifier(localName),
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
  });

  return root;
};
