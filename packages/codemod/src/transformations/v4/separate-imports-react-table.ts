import type { Collection, JSCodeshift } from "jscodeshift";
import { exported } from "../../definitions/separated-imports/react-table";
import {
  CONFIG_FILE_NAME,
  CodemodConfig,
  separateImports,
} from "../../helpers";

export const separateImportsReactTable = (
  j: JSCodeshift,
  source: Collection,
) => {
  const config = new CodemodConfig(CONFIG_FILE_NAME);

  if (
    source.find(j.ImportDeclaration, {
      source: { value: "@pankod/refine-react-table" },
    }).length > 0
  ) {
    config.addPackage("@tanstack/react-table", "^8.2.6");
  }

  separateImports({
    j,
    source,
    imports: exported,
    renameImports: {},
    otherImports: {},
    currentLibName: "@pankod/refine-react-table",
    nextLibName: "@tanstack/react-table",
  });
};
