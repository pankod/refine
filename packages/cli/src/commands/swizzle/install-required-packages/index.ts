import { installPackages } from "@utils/package";
import {
  displayManualInstallationCommand,
  promptForPackageInstallation,
} from "./utils";

export const installRequiredPackages = async (requiredPackages: string[]) => {
  const installRequiredPackages =
    await promptForPackageInstallation(requiredPackages);

  if (!installRequiredPackages) {
    await displayManualInstallationCommand(requiredPackages);
  } else {
    await installPackages(requiredPackages);
  }
};
