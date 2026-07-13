import path from "path";
import type { RefineConfig } from "../../definitions";
import { provideCliHelpers } from "./provideCliHelpers";

export const getRefineConfig = async (
  packagePath: string,
  isAbsolute?: boolean,
) => {
  try {
    provideCliHelpers(packagePath, isAbsolute);

    const config = require(
      path.join(
        isAbsolute ? packagePath : path.join(process.cwd(), packagePath),
        "refine.config.js",
      ),
    ) as RefineConfig;

    return config;
  } catch (error) {
    return undefined;
  }
};
