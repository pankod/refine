import { stringToBase64 } from "@utils/encode";
import { ENV } from "@utils/env";
import { getInstalledRefinePackages } from "@utils/package";
import chalk from "chalk";
import { store } from ".";

export const isPackagesCacheExpired = () => {
  const lastUpdated = store.get("lastUpdated");

  if (!lastUpdated) return true;

  const now = Date.now();

  const diff = now - lastUpdated;
  const cacheTTL = Number(ENV.UPDATE_NOTIFIER_CACHE_TTL);

  return diff >= cacheTTL;
};

/**
 * @returns `true` if key is valid
 * @returns `false` if key is invalid
 * @returns `null` if there is an error
 */
export const validateKey = async () => {
  const key = store.get("key");
  const newKey = await generateKeyFromPackages();

  if (newKey === null) return null;

  return key === newKey;
};

/**
 * @returns `null` if there is an error
 * @returns `string` if key is generated
 */
export const generateKeyFromPackages = async () => {
  const packages = await getInstalledRefinePackages();
  if (!packages) {
    console.error(
      chalk.red(
        "Something went wrong when trying to get installed `Refine` packages.",
      ),
    );

    return null;
  }

  const currentVersionsWithName = packages.map((p) => `${p.name}@${p.version}`);
  const hash = stringToBase64(currentVersionsWithName.toString());

  return hash;
};

export const isUpdateNotifierDisabled = () => {
  return ENV.UPDATE_NOTIFIER_IS_DISABLED.toLocaleLowerCase() === "true";
};
