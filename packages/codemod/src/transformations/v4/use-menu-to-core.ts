import type { JSCodeshift, Collection } from "jscodeshift";

const REFINE_ANTD_PATH = "@pankod/refine-antd";
const REFINE_MUI_PATH = "@pankod/refine-mui";
const REFINE_CORE_PATH = "@pankod/refine-core";

const ANTD_IMPORTS_TO_MOVE_CORE = ["useMenu"];
const MUI_IMPORTS_TO_MOVE_CORE = ["useMenu"];

const moveImports = (
  j: JSCodeshift,
  source: Collection,
  importNamesToMove: string[],
  fromModule: string,
  toModule: string,
) => {
  importNamesToMove.forEach((importName) => {
    // get the import declaration to be moved
    const importsFromModule = source
      .find(j.ImportDeclaration)
      .filter((path) => path.node.source.value === fromModule)
      .find(j.ImportSpecifier);

    // filter the imports to be moved
    const importsToBeMoved = importsFromModule.filter(
      (path) =>
        path.node.imported.name === importName ||
        path.node.local?.name === importName,
    );

    if (!importsToBeMoved?.length) return;

    importsToBeMoved.forEach((importToMove) => {
      // get the import declaration of the import to move
      const importsToModule = source
        .find(j.ImportDeclaration)
        .filter((path) => path.node.source.value === toModule);

      // if there is no import declaration for the import to move, create import declaration and add it to the top of the file.
      if (!importsToModule?.length) {
        source
          .get()
          .node.program.body.unshift(
            j.importDeclaration(
              [importToMove.get().node],
              j.stringLiteral(toModule),
            ),
          );

        // remove the moved import
        j(importToMove).remove();
        return;
      }

      // add new import from importsToBeMoved to the existing import declaration.
      // we select the first import declaration if there are multiple import declarations.
      const importTo = importsToModule.at(0).paths().at(0).get();
      j(importTo).replaceWith(
        j.importDeclaration(
          [...importTo.node.specifiers, importToMove.get().node],
          importTo.node.source,
        ),
      );

      // remove the  moved import
      j(importToMove).remove();
    });
  });

  // remove empty import declarations after moving imports e.g. import { } from "@pankod/refine-antd"
  source
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === fromModule)
    .filter((path) => !path.node.specifiers?.length)
    .forEach((path) => j(path).remove());
};

export const useMenuToCore = (j: JSCodeshift, source: Collection) => {
  moveImports(
    j,
    source,
    ANTD_IMPORTS_TO_MOVE_CORE,
    REFINE_ANTD_PATH,
    REFINE_CORE_PATH,
  );

  moveImports(
    j,
    source,
    MUI_IMPORTS_TO_MOVE_CORE,
    REFINE_MUI_PATH,
    REFINE_CORE_PATH,
  );
};
