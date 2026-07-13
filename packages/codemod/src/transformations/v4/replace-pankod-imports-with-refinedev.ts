import type { Collection, JSCodeshift } from "jscodeshift";
import { CONFIG_FILE_NAME, CodemodConfig } from "../../helpers";

export const parser = "tsx";

const previousScope = "@pankod/refine-";
const newScope = "@refinedev/";

const deprecatedPackages = [
  "@pankod/refine-react-location",
  "@pankod/refine-react-router",
];

const getOldPackageName = (oldName: string) => {
  return `${previousScope}${oldName.replace(previousScope, "").split("/")[0]}`;
};

const getNewPackageName = (oldName: string) => {
  return `${newScope}${oldName.replace(previousScope, "").split("/")[0]}`;
};

const getNewImportValue = (oldValue: string) => {
  return oldValue.replace(previousScope, newScope);
};

const renameImports = (j: JSCodeshift, source: Collection) => {
  const config = new CodemodConfig(CONFIG_FILE_NAME);

  source
    .find(j.ImportDeclaration)
    .filter(
      (path) =>
        path.node.source.value?.toString()?.startsWith(previousScope) &&
        !deprecatedPackages.includes(path.node.source.value?.toString() ?? ""),
    )
    .forEach((path) => {
      // for example import line is: @pankod/refine-antd/dist/style.css
      const oldImportValue = path.node.source.value?.toString() ?? "";

      // getOldPackageName will return @pankod/refine-antd
      const oldName = getOldPackageName(oldImportValue);

      // getNewPackageName will return @refinedev/antd
      const newName = getNewPackageName(oldName);

      // getNewImportValue will return @refinedev/antd/dist/style.css
      const newImportValue = getNewImportValue(oldImportValue);

      config.addPackage(newName);
      config.removePackage(oldName);

      j(path).replaceWith(
        j.importDeclaration(path.node.specifiers, j.literal(newImportValue)),
      );
    });
};

const renameExports = (j: JSCodeshift, source: Collection) => {
  const config = new CodemodConfig(CONFIG_FILE_NAME);

  source
    .find(j.ExportNamedDeclaration)
    .filter(
      (path) =>
        path.node.source?.value?.toString()?.startsWith(previousScope) &&
        !deprecatedPackages.includes(path.node.source.value?.toString() ?? ""),
    )
    .forEach((path) => {
      // for example import line is: @pankod/refine-antd/dist/style.css
      const oldImportValue = path.node.source.value?.toString() ?? "";

      // getOldPackageName will return @pankod/refine-antd
      const oldName = getOldPackageName(oldImportValue);

      // getNewPackageName will return @refinedev/antd
      const newName = getNewPackageName(oldName);

      // getNewImportValue will return @refinedev/antd/dist/style.css
      const newImportValue = getNewImportValue(oldImportValue);

      config.addPackage(newName);
      config.removePackage(oldName);

      j(path).replaceWith(
        j.exportNamedDeclaration(
          path.node.declaration,
          path.node.specifiers,
          j.literal(newImportValue),
        ),
      );
    });
};

export const replacePankodImportsWithRefineDev = async (
  j: JSCodeshift,
  source: Collection,
) => {
  renameImports(j, source);
  renameExports(j, source);
};
