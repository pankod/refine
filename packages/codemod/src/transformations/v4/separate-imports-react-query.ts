import type { Collection, JSCodeshift } from "jscodeshift";
import { exported } from "../../definitions/separated-imports/react-query";
import {
  CONFIG_FILE_NAME,
  CodemodConfig,
  separateImports,
} from "../../helpers";

const REFINE_LIB_PATH = "@pankod/refine-core";
const REACT_QUERY_PATH = "@tanstack/react-query";
const REACT_QUERY_VERSION = "^4.10.1";

export const separateImportsReactQuery = (
  j: JSCodeshift,
  source: Collection,
) => {
  const config = new CodemodConfig(CONFIG_FILE_NAME);

  separateImports({
    j,
    source,
    imports: exported,
    renameImports: {},
    otherImports: {},
    currentLibName: REFINE_LIB_PATH,
    nextLibName: REACT_QUERY_PATH,
  });

  // if use `@tanstack/react-query` add package.json
  const reactQuery = source.find(j.ImportDeclaration, {
    source: {
      value: REACT_QUERY_PATH,
    },
  });

  if (reactQuery.length) {
    config.addPackage(REACT_QUERY_PATH, REACT_QUERY_VERSION);
  }
};
