import chalk from "chalk";
import inquirer, { type ListChoiceOptions } from "inquirer";

import type { IntegrationId } from "./sub-commands/integration/packages";
import { buildIntegrationChoices } from "./sub-commands/integration/prompt";
import { buildProviderChoices } from "./sub-commands/provider/prompt";
import type { ProviderId } from "./sub-commands/provider/providers";

const wrapChoices = (
  group: string,
  choices: ListChoiceOptions[],
): ListChoiceOptions<AddCommandComponentAnswer>[] => {
  return choices.map((choice) => {
    return {
      ...choice,
      name: ` . ${choice.name}`,
      value: {
        group,
        component: choice.value,
      },
    };
  });
};

type AddCommandComponentAnswer =
  | { group: "provider"; component: ProviderId }
  | { group: "integration"; component: IntegrationId }
  | { group: "resource"; component: "resource" };

interface AddCommandAnswer {
  component: AddCommandComponentAnswer;
}

export const addCommandPrompt = async () => {
  return await inquirer.prompt<AddCommandAnswer>([
    {
      type: "list",
      name: "component",
      message: "What do you want to add?",
      choices: [
        new inquirer.Separator(chalk.bold("Provider")),
        ...wrapChoices("provider", buildProviderChoices()),
        new inquirer.Separator(chalk.bold("Integration")),
        ...wrapChoices("integration", buildIntegrationChoices()),
        new inquirer.Separator(chalk.bold("Resource")),
        {
          name: chalk.blueBright(" .  Add new resource"),
          value: {
            group: "resource",
            component: "resource",
          },
        },
      ],
      pageSize: 25,
    },
  ]);
};
