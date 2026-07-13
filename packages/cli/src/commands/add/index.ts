import type { Command } from "commander";

import { addCommandPrompt } from "./prompt";
import { IntegrationCommand } from "./sub-commands/integration/command";
import { availableIntegrations } from "./sub-commands/integration/packages";
import { ProviderCommand } from "./sub-commands/provider/command";
import { createProviders } from "./sub-commands/provider/create-providers";
import { ResourceCommand } from "./sub-commands/resource/command";
import { createResources } from "./sub-commands/resource/create-resources";

const load = (program: Command) => {
  return program
    .command("add")
    .description("Add new resources, providers, or integrations")
    .allowExcessArguments(false)
    .action(addCommandAction)
    .addCommand(ResourceCommand)
    .addCommand(ProviderCommand)
    .addCommand(IntegrationCommand);
};

const addCommandAction = async () => {
  const { component } = await addCommandPrompt();

  if (component.group === "provider") {
    createProviders([component.component]);
  }

  if (component.group === "integration") {
    const integration = availableIntegrations.find(
      (integration) => integration.id === component.component,
    );

    await integration?.runTransformer();
  }

  if (component.group === "resource") {
    await createResources({}, []);
  }
};

export default load;
