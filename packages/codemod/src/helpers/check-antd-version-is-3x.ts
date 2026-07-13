import PackageJson from "@npmcli/package-json";
import path from "path";
import semver from "semver";

export const getAntdVersion = async () => {
  try {
    const rootDir = path.join(process.cwd());

    const pkgJson = await PackageJson.load(rootDir);
    const dependencies = pkgJson.content.dependencies ?? {};
    const antd = dependencies["@pankod/refine-antd"];
    return antd;
  } catch {
    return undefined;
  }
};

export const checkAntdVersionIs3x = async () => {
  const antd = await getAntdVersion();

  if (!antd) return false;

  // remove ^, =, <, > and ~ from version
  const version = antd.replace(/[^\d\.]/g, "");

  return semver.lt(version, "4.0.0");
};
