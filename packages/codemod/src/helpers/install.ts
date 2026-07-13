// https://github.com/vercel/next.js/blob/54ca8f41cee490989cdd8d5df8db96307075296c/packages/next-codemod/lib/install.ts

import chalk from "chalk";
import spawn from "cross-spawn";

interface InstallArgs {
  /**
   * Indicate whether to install packages using Yarn.
   */
  useYarn: boolean;
  /**
   * Indicate whether there is an active Internet connection.
   */
  isOnline: boolean;
  /**
   * Indicate whether the given dependencies are devDependencies.
   */
  devDependencies?: boolean;
}

interface RemoveArgs {
  /**
   * Indicate whether to install packages using Yarn.
   */
  useYarn: boolean;
}

/**
 * Spawn a package manager installation with either Yarn or NPM.
 *
 * @returns A Promise that resolves once the installation is finished.
 */
export function install(
  root: string,
  dependencies: string[] | null,
  { useYarn, isOnline, devDependencies }: InstallArgs,
): Promise<void> {
  /**
   * NPM-specific command-line flags.
   */
  const npmFlags: string[] = ["--force"];
  /**
   * Yarn-specific command-line flags.
   */
  const yarnFlags: string[] = [];
  /**
   * Return a Promise that resolves once the installation is finished.
   */
  return new Promise((resolve, reject) => {
    let args: string[];
    const command: string = useYarn ? "yarnpkg" : "npm";

    if (dependencies?.length) {
      /**
       * If there are dependencies, run a variation of `{displayCommand} add`.
       */
      if (useYarn) {
        /**
         * Call `yarn add --exact (--offline)? (-D)? ...`.
         */
        args = ["add"];
        if (!isOnline) args.push("--offline");
        args.push("--cwd", root);
        if (devDependencies) args.push("--dev");
        args.push(...dependencies);
      } else {
        /**
         * Call `npm install [--save|--save-dev] ...`.
         */
        args = ["install"];
        args.push(devDependencies ? "--save-dev" : "--save");
        args.push(...dependencies);
      }
    } else {
      /**
       * If there are no dependencies, run a variation of `{displayCommand}
       * install`.
       */
      args = ["install"];
      if (useYarn) {
        if (!isOnline) {
          console.log(chalk.yellow("You appear to be offline."));
          console.log(chalk.yellow("Falling back to the local Yarn cache."));
          console.log();
          args.push("--offline");
        }
      } else {
        if (!isOnline) {
          console.log(chalk.yellow("You appear to be offline."));
          console.log();
        }
      }
    }
    /**
     * Add any package manager-specific flags.
     */
    if (useYarn) {
      args.push(...yarnFlags);
    } else {
      args.push(...npmFlags);
    }
    /**
     * Spawn the installation process.
     */
    const child = spawn(command, args, {
      stdio: "inherit",
      env: { ...process.env, ADBLOCK: "1", DISABLE_OPENCOLLECTIVE: "1" },
    });
    child.on("close", (code) => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(" ")}` });
        return;
      }
      resolve();
    });
  });
}

/**
 * Spawn a package manager removing with either Yarn or NPM.
 *
 * @returns A Promise that resolves once the removing is finished.
 */
export function remove(
  root: string,
  dependencies: string[] | null,
  { useYarn }: RemoveArgs,
): Promise<void> {
  /**
   * NPM-specific command-line flags.
   */
  const npmFlags: string[] = [];
  /**
   * Yarn-specific command-line flags.
   */
  const yarnFlags: string[] = [];
  /**
   * Return a Promise that resolves once the installation is finished.
   */
  return new Promise((resolve, reject) => {
    let args: string[];
    const command: string = useYarn ? "yarnpkg" : "npm";

    if (dependencies?.length) {
      /**
       * If there are dependencies, run a variation of `{displayCommand} remove`.
       */
      if (useYarn) {
        /**
         * Call `yarn remove --exact (--offline)? (-D)? ...`.
         */
        args = ["remove"];
      } else {
        /**
         * Call `npm remove [--save|--save-dev] ...`.
         */
        args = ["remove", "--save"];
        args.push(...dependencies);
      }
    }
    /**
     * Add any package manager-specific flags.
     */
    if (useYarn) {
      args.push(...yarnFlags);
    } else {
      args.push(...npmFlags);
    }
    /**
     * Spawn the installation process.
     */
    const child = spawn(command, args, {
      stdio: "inherit",
      env: { ...process.env, ADBLOCK: "1", DISABLE_OPENCOLLECTIVE: "1" },
    });
    child.on("close", (code) => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(" ")}` });
        return;
      }
      resolve();
    });
  });
}
