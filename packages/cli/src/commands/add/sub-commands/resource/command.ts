import { Argument, Command } from "commander";
import { createResources } from "./create-resources";

const createResourceAction = async (
  resources: string[],
  options: { actions: string },
  command: Command,
) => {
  createResources(
    {
      actions: options?.actions,
      path: command.optsWithGlobals().path,
    },
    resources,
  );
};

export const ResourceCommand = new Command("resource")
  .addArgument(new Argument("[resources...]", "Create new resource(s)"))
  .option("-p, --path [path]", "Path to generated resource files")
  .option(
    "-a, --actions [actions]",
    "Only generate the specified resource actions. (ex: list,create,edit,show)",
    "list,create,edit,show",
  )
  .action(createResourceAction);
