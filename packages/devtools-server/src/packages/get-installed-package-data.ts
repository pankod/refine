import fs from "fs";
import { getInstalledPackageJSONPath } from "./get-installed-package-json-path";

export const getInstalledPackageData = async (packageName: string) => {
  try {
    const packagePath = await getInstalledPackageJSONPath(packageName);

    if (!packagePath) {
      return null;
    }

    const parsed = JSON.parse(
      fs.readFileSync(packagePath, { encoding: "utf-8" }),
    );

    return {
      name: parsed.name,
      version: parsed.version,
      description: parsed.description,
    };
  } catch (e) {
    return null;
  }
};
