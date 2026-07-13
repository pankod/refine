import type { Collection, JSCodeshift } from "jscodeshift";
import { exported } from "../../definitions/separated-imports/react-hook-form";
import {
  CONFIG_FILE_NAME,
  CodemodConfig,
  separateImports,
} from "../../helpers";

const REFINE_LIB_PATH = "@pankod/refine-react-hook-form";
const REACT_HOOK_FORM_PATH = "react-hook-form";
const REACT_HOOK_FORM_VERSION = "^7.43.5";

export const separateImportsReactHookForm = (
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
    nextLibName: REACT_HOOK_FORM_PATH,
  });

  // if use `react-hook-form` add package.json
  const reactQuery = source.find(j.ImportDeclaration, {
    source: {
      value: REACT_HOOK_FORM_PATH,
    },
  });

  if (reactQuery.length) {
    config.addPackage(REACT_HOOK_FORM_PATH, REACT_HOOK_FORM_VERSION);
  }
};
