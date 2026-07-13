export type PackageType = {
  name: string;
  currentVersion: string;
  description?: string;
  changelog?: string;
  documentation?: string;
};

export type PackageLatestVersionType = {
  name: string;
  latestVersion: string;
};

export type AvailablePackageType = {
  name: string;
  description: string;
  install: string;
  usage: string;
};
