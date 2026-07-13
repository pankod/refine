import type { Collection, JSCodeshift } from "jscodeshift";
import { exported } from "../../definitions/separated-imports/react-router-v6";
import {
  CONFIG_FILE_NAME,
  CodemodConfig,
  separateImports,
} from "../../helpers";

export const separateImportsReactRouterV6 = (
  j: JSCodeshift,
  source: Collection,
) => {
  const config = new CodemodConfig(CONFIG_FILE_NAME);

  if (
    source.find(j.ImportDeclaration, {
      source: { value: "@pankod/refine-react-router-v6" },
    }).length > 0
  ) {
    config.addPackage("react-router-dom", "^6.8.1");
  }

  separateImports({
    j,
    source,
    imports: exported,
    renameImports: {},
    otherImports: {},
    currentLibName: "@pankod/refine-react-router-v6",
    nextLibName: "react-router-dom",
  });
};
