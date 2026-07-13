import { Argument, Command } from "commander";

import { createProviders } from "./create-providers";
import { addProviderPrompt } from "./prompt";
import { availableProviders, type ProviderId } from "./providers";

export const createProviderAction = async (
  providers: ProviderId[],
  options: { path?: string },
) => {
  if (!providers.length) {
    const { providers, providersPath } = await addProviderPrompt();

    return createProviders(providers, providersPath);
  }

  createProviders(providers, options.path);
};

export const ProviderCommand = new Command("provider")
  .addArgument(
    new Argument("[providers...]", "Create provider(s)")
      .choices(availableProviders.map((provider) => provider.id))
      .default([]),
  )
  .option("-p, --path [path]", "Path to generate providers")
  .action(createProviderAction);
