import { detect } from "package-manager-detector";
import execa from "execa";

export const updatePackage = async (
  packages: string[],
  projectPath: string = process.cwd(),
) => {
  try {
    const detected = await detect({ cwd: projectPath });
    const [pm] = (detected?.agent || "npm").split("@");

    const { failed } = await execa(pm, [
      "install",
      ...packages.map((p) => `${p}@latest`),
    ]);

    return !failed;
  } catch (error) {
    return false;
  }
};
