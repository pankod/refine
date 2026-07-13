import type { Collection, JSCodeshift } from "jscodeshift";
import { exported } from "../../definitions/separated-imports/mui";
import {
  CONFIG_FILE_NAME,
  CodemodConfig,
  separateImports,
} from "../../helpers";

export const separateImportsMUI = (j: JSCodeshift, source: Collection) => {
  const config = new CodemodConfig(CONFIG_FILE_NAME);

  if (
    source.find(j.ImportDeclaration, {
      source: { value: "@pankod/refine-mui" },
    }).length > 0
  ) {
    config.addPackage("@emotion/react", "^11.8.2");
    config.addPackage("@emotion/styled", "^11.8.1");
    config.addPackage("@mui/lab", "^5.0.0-alpha.85");
    config.addPackage("@mui/material", "^5.8.6");
    config.addPackage("@mui/x-data-grid", "^5.12.1");
  }

  separateImports({
    j,
    source,
    imports: ["MuiList"],
    renameImports: {
      MuiList: "List",
    },
    otherImports: exported,
    currentLibName: "@pankod/refine-mui",
    nextLibName: "@mui/material",
  });
};
