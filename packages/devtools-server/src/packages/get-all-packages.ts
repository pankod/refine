import type { PackageType } from "@refinedev/devtools-shared";
import { getInstalledPackageData } from "./get-installed-package-data";
import { getPackagesFromPackageJSON } from "./get-packages-from-package-json";
import { getChangelog } from "./get-changelog";
import { getDocumentation } from "./get-documentation";

export const getAllPackages = async (projectPath?: string) => {
  try {
    const refinePackages = await getPackagesFromPackageJSON(projectPath);
    const installedVersions = await Promise.all(
      refinePackages.map(async (packageName) => {
        const currentInfo = await getInstalledPackageData(packageName);

        return {
          name: packageName,
          currentVersion: currentInfo?.version,
          description: currentInfo?.description,
          changelog: getChangelog(packageName),
          documentation: getDocumentation(packageName),
        } as PackageType;
      }),
    );

    return installedVersions;
  } catch (error) {
    return [];
  }
};
