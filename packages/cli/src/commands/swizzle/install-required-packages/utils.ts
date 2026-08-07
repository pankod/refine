import inquirer from "inquirer";
import chalk from "chalk";
import { getPreferedPM, pmCommands } from "@utils/package";

export const promptForPackageInstallation = async (
  requiredPackages: string[],
) => {
  const message =
    "This component requires following packages to be installed:\n"
      .concat(requiredPackages.map((pkg) => ` - ${pkg}`).join("\n"))
      .concat("\nDo you want to install them?");

  const { installRequiredPackages } = await inquirer.prompt<{
    installRequiredPackages: boolean;
  }>([
    {
      type: "confirm",
      name: "installRequiredPackages",
      default: true,
      message,
    },
  ]);

  return installRequiredPackages;
};

export const displayManualInstallationCommand = async (
  requiredPackages: string[],
) => {
  const pm = await getPreferedPM();
  const pmCommand = pmCommands[pm.name].add.join(" ");
  const packages = requiredPackages.join(" ");
  const command = `${pm.name} ${pmCommand} ${packages}`;

  console.log("\nYou can install them manually by running this command:");
  console.log(chalk.bold.blueBright(command));
};
