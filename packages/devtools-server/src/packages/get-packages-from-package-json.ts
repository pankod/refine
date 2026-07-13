import path from "path";
import { readJSON } from "fs-extra";

export const getPackagesFromPackageJSON = async (
  projectPath: string = process.cwd(),
) => {
  const packageJson = await readJSON(path.join(projectPath, "package.json"), {
    encoding: "utf-8",
  });

  const refinePackages = Object.keys(packageJson.dependencies).filter(
    (packageName) => packageName.startsWith("@refinedev/"),
  );

  return refinePackages;
};
