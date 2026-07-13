import { Argument, Command } from "commander";
import { availableIntegrations } from "./packages";
import { addIntegrationPrompt } from "./prompt";

const addIntegrationAction = async (name?: string) => {
  let integrationID = name;

  if (!integrationID) {
    const answer = await addIntegrationPrompt();

    integrationID = answer.id;
  }

  const integration = availableIntegrations.find(
    (integration) => integration.id === integrationID,
  );

  if (integration) {
    await integration.runTransformer();
  }
};

export const IntegrationCommand = new Command("integration")
  .addArgument(
    new Argument("[name]", "Name of the integration").choices(
      availableIntegrations.map((integration) => integration.id),
    ),
  )
  .action(addIntegrationAction);
