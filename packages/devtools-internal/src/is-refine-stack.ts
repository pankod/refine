import { REFINE_PACKAGE_FILEPATH_REGEXP } from "./constants";

export const isRefineStack = (filename?: string) => {
  if (!filename) return false;

  const match = filename.match(REFINE_PACKAGE_FILEPATH_REGEXP);

  return !!match;
};
