import type { Collection, JSCodeshift } from "jscodeshift";
import { getNameAsString } from "../../helpers";

const UI_PACKAGES = [
  "@refinedev/antd",
  "@refinedev/mui",
  "@refinedev/chakra-ui",
  "@refinedev/mantine",
];

const CORE_PACKAGE = "@refinedev/core";
const COMPONENT_NAME = "WelcomePage";

export const welcomePageImportFromCore = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  let hasChanges = false;

  UI_PACKAGES.forEach((packageName) => {
    // Find import declarations from UI packages that import WelcomePage
    root
      .find(j.ImportDeclaration, {
        source: { value: packageName },
      })
      .forEach((importPath) => {
        const specifiers = importPath.value.specifiers || [];

        // Check if WelcomePage is imported from this package
        const welcomePageIndex = specifiers.findIndex(
          (spec) =>
            j.ImportSpecifier.check(spec) &&
            spec.imported &&
            j.Identifier.check(spec.imported) &&
            spec.imported.name === COMPONENT_NAME,
        );

        if (welcomePageIndex !== -1) {
          const welcomePageSpecifier = specifiers[welcomePageIndex];

          // Remove WelcomePage from the current import
          specifiers.splice(welcomePageIndex, 1);

          // If this was the only import, remove the entire import declaration
          if (specifiers.length === 0) {
            j(importPath).remove();
          }

          // Check if @refinedev/core import already exists
          const coreImport = root.find(j.ImportDeclaration, {
            source: { value: CORE_PACKAGE },
          });

          if (coreImport.length > 0) {
            // Add WelcomePage to existing @refinedev/core import
            coreImport.forEach((coreImportPath) => {
              const coreSpecifiers = coreImportPath.value.specifiers || [];

              // Check if WelcomePage is already imported from core
              const alreadyImported = coreSpecifiers.some(
                (spec) =>
                  j.ImportSpecifier.check(spec) &&
                  spec.imported &&
                  j.Identifier.check(spec.imported) &&
                  spec.imported.name === COMPONENT_NAME,
              );

              if (!alreadyImported) {
                coreSpecifiers.push(
                  j.importSpecifier(
                    j.identifier(COMPONENT_NAME),
                    j.identifier(
                      getNameAsString(welcomePageSpecifier.local?.name) ||
                        COMPONENT_NAME,
                    ),
                  ),
                );
              }
            });
          } else {
            // Create a new import for @refinedev/core with WelcomePage
            const newImport = j.importDeclaration(
              [
                j.importSpecifier(
                  j.identifier(COMPONENT_NAME),
                  j.identifier(
                    getNameAsString(welcomePageSpecifier.local?.name) ||
                      COMPONENT_NAME,
                  ),
                ),
              ],
              j.literal(CORE_PACKAGE),
            );

            // Add the new import at the top of the file
            const firstImport = root.find(j.ImportDeclaration).at(0);
            if (firstImport.length > 0) {
              firstImport.insertBefore(newImport);
            } else {
              // If no imports exist, add at the beginning of the program
              root.find(j.Program).get("body", 0).insertBefore(newImport);
            }
          }

          hasChanges = true;
        }
      });
  });

  return hasChanges;
};
