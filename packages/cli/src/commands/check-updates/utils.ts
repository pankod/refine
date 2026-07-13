import type { NpmOutdatedResponse } from "@definitions/package";
import { pmCommands } from "@utils/package";
import execa from "execa";

/**
 * @returns `npm outdated` command response
 */
export const getOutdatedPackageList = async () => {
  const pm = "npm";

  const { stdout, timedOut } = await execa(pm, pmCommands[pm].outdatedJson, {
    reject: false,
    timeout: 25 * 1000,
  });

  if (timedOut) {
    throw new Error("Timed out while checking for updates.");
  }

  if (!stdout) return null;

  return JSON.parse(stdout) as NpmOutdatedResponse | null;
};
