import type { Collection, JSCodeshift } from "jscodeshift";
import {
  CONFIG_FILE_NAME,
  CodemodConfig,
  separateImports,
} from "../../helpers";
import { exported, rename } from "../../definitions/separated-imports/chakra";

export const separateImportsChakra = (j: JSCodeshift, source: Collection) => {
  const config = new CodemodConfig(CONFIG_FILE_NAME);

  if (
    source.find(j.ImportDeclaration, {
      source: { value: "@pankod/refine-chakra-ui" },
    }).length > 0
  ) {
    config.addPackage("@chakra-ui/react", "^2.5.1");
  }

  separateImports({
    j,
    source,
    imports: exported,
    renameImports: rename,
    otherImports: {},
    currentLibName: "@pankod/refine-chakra-ui",
    nextLibName: "@chakra-ui/react",
  });
};
