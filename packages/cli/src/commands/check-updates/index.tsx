import type { Command } from "commander";
import { printUpdateWarningTable } from "@components/update-warning-table";
import {
  getAllVersionsOfPackage,
  getDependenciesWithVersion,
} from "@utils/package";
import spinner from "@utils/spinner";
import type { RefinePackageInstalledVersionData } from "../../definitions/package";
import semverDiff from "semver-diff";
import { maxSatisfying } from "semver";
import { getOutdatedPackageList } from "./utils";

const load = (program: Command) => {
  return program
    .command("check-updates")
    .description("Check all installed `Refine` packages are up to date")
    .action(action);
};

const action = async () => {
  const packages = await spinner(isRefineUptoDate, "Checking for updates...");
  if (!packages.length) {
    console.log("All `Refine` packages are up to date 🎉\n");
    return;
  }

  await printUpdateWarningTable({ data: packages });
};

/**
 *
 * @returns `Refine` packages that have updates.
 * @returns `[]` if no Refine package found.
 * @returns `[]` if all `Refine` packages are up to date.
 */
export const isRefineUptoDate = async () => {
  const refinePackages = await getOutdatedRefinePackages();

  return refinePackages;
};

/**
 * Uses `npm outdated` command to get the list of outdated packages.
 * @returns `[]` if no Refine package found.
 * @returns `Refine` packages that have updates.
 */
export const getOutdatedRefinePackages = async () => {
  const packages = await getOutdatedPackageList();
  if (!packages) return [];

  const list: RefinePackageInstalledVersionData[] = [];

  Object.keys(packages).forEach((packageName) => {
    const dependency = packages[packageName];

    if (packageName.includes("@refinedev")) {
      list.push({
        ...dependency,
        name: packageName,
        changelog: packageName.replace(/@refinedev\//, "https://c.refine.dev/"),
      });
    }
  });

  // When user has installed `next` version, it will be ahead of the `latest` version. But `npm outdated` command still returns as an outdated package.
  // So we need to filter out the if `current` version is ahead of `latest` version.
  // ex: in the npm registry `next` version is 1.1.1 -> [current:1.1.1, wanted:1.1.1, latest:1.1.0]
  const filteredList = list.filter((item) => {
    const diff = semverDiff(item.current, item.latest);
    return !!diff;
  });

  return filteredList;
};

/**
 * The `npm outdated` command's `wanted` field shows the desired update version (e.g., `^1.2.0` in `package.json` resolves to `1.2.1`).
 * This function returns the version that matches the semver range in `package.json` (e.g., `^1.2.0` resolves to `^1.2.1`).
 *
 * @param packageName The name of the package.
 * @param versionWanted The version that the user wants to update to. Wihtout semver range.
 * @returns The version that satisfies the semver range in `package.json` with the preferred wildcard.
 */
export const getWantedWithPreferredWildcard = (
  packageName: RefinePackageInstalledVersionData["name"],
  versionWanted: RefinePackageInstalledVersionData["wanted"],
): string => {
  const dependencies = getDependenciesWithVersion();
  const versionInPackageJson = dependencies[packageName];

  if (!versionInPackageJson) {
    return `^${versionWanted}`;
  }

  if (versionInPackageJson === "latest") {
    return "latest";
  }

  if (versionInPackageJson === "*") {
    return "*";
  }

  // has range
  // if the version in the package.json has a range, it means the user has installed the package with a range.
  // in that case, we should not change the version. package manager will install the latest version that satisfies the semver range.
  if (
    [">", "<", ">=", "<=", "||"].some((char) =>
      versionInPackageJson.includes(char),
    )
  ) {
    return versionInPackageJson;
  }

  // has `x`
  // if the version in the package.json has `x` in it, it means the user has installed the package with a wildcard.
  // in that case, we should not change the version. package manager will install the latest version that satisfies the semver range.
  if (versionInPackageJson?.includes("x")) {
    return `${versionInPackageJson}`;
  }

  // has tilda
  if (versionInPackageJson?.startsWith("~")) {
    return `~${versionWanted}`;
  }

  // has caret
  if (versionInPackageJson?.startsWith("^")) {
    return `^${versionWanted}`;
  }

  return versionWanted;
};

/**
 *
 * @param packageName to get the latest minor version of the package available on npm.
 * @param version current installed version of the package. This will be used to calculate the latest minor version.
 * @returns The latest minor version of the package available on npm.
 */
export const getLatestMinorVersionOfPackage = async (
  packageName: RefinePackageInstalledVersionData["name"],
  version: RefinePackageInstalledVersionData["wanted"],
) => {
  const versionAll = await getAllVersionsOfPackage(packageName);

  /**
   * The `semver` package's `maxSatisfying` function returns the highest version in the list that satisfies the range.
   */
  const versionLatest = maxSatisfying(versionAll, `^${version}`);
  return versionLatest ?? version;
};

export default load;
