import chalk from "chalk";
import inquirer from "inquirer";

import { getDefaultPath } from "./create-providers";
import { availableProviders, type ProviderId } from "./providers";

export const buildProviderChoices = () => {
  return availableProviders.map((provider) => {
    const { id, title, description } = provider;

    return {
      value: id,
      name: `${chalk.blueBright(title)} - ${description}`,
    };
  });
};

export const addProviderPrompt = async () => {
  return await inquirer.prompt<{
    providers: ProviderId[];
    providersPath: string;
  }>([
    {
      type: "checkbox",
      name: "providers",
      message: "Which providers do you want to add?",
      choices: buildProviderChoices(),
    },
    {
      type: "input",
      name: "providersPath",
      message: "Where do you want to generate the providers?",
      default: getDefaultPath(),
    },
  ]);
};
