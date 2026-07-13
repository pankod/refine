import inquirer from "inquirer";

import { getProjectType } from "@utils/project";
import { availableIntegrations, type IntegrationId } from "./packages";

export const buildIntegrationChoices = () => {
  const projectType = getProjectType();

  const integrationChoices = availableIntegrations.map((integration) =>
    integration.getChoice(projectType),
  );

  if (integrationChoices.every((choice) => choice.disabled)) {
    return [
      {
        value: "none",
        name: "No integration available for this project type.",
      },
      ...integrationChoices,
    ];
  }
  return integrationChoices;
};

export const addIntegrationPrompt = async () => {
  return await inquirer.prompt<{ id: IntegrationId }>([
    {
      type: "list",
      name: "id",
      message: "Which integration do you want to add?",
      choices: buildIntegrationChoices(),
      default: "none",
    },
  ]);
};
