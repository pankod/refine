export enum PackageManagerTypes {
  NPM = "npm",
  YARN = "yarn",
  PNPM = "pnpm",
}

/**
 * type of `npm outdated` command response
 */
export type NpmOutdatedResponse = Record<
  string,
  {
    current: string;
    wanted: string;
    latest: string;
    dependent: string;
    location: string;
  }
>;

export type RefinePackageInstalledVersionData = {
  name: string;
  /**
   * version of the package that is currently installed. Without semver range wildcard.
   */
  current: string;
  /**
   * version that the user wants to update to. Without semver range wildcard.
   * e.g. `^1.0.0` in `package.json` resolves to `1.0.1` in the this field.
   */
  wanted: string;
  /**
   * latest version of the package available on npm
   */
  latest: string;
  /**
   * changelog url
   */
  changelog?: string;
  /**
   * dependent package name
   */
  dependent: string;
  /**
   * location of the package
   */
  location: string;
};

/**
 * key is the script name and value is the script command
 */
export type PackageDependency = Record<string, string>;

export type PackageJson = {
  name: string;
  version: string;
  scripts?: Record<string, string>;
  dependencies?: PackageDependency;
  devDependencies?: PackageDependency;
  peerDependencies?: PackageDependency;
  refine?: {
    projectId?: string;
  };
};
