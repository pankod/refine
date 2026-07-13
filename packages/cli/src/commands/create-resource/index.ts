import type { Command } from "commander";
import { getProjectType } from "@utils/project";
import { getResourcePath } from "@utils/resource";
import { createResources } from "@commands/add/sub-commands/resource/create-resources";

const load = (program: Command) => {
  const projectType = getProjectType();
  const { path } = getResourcePath(projectType);

  return program
    .command("create-resource")
    .allowExcessArguments(true)
    .description(
      `Create a new resource files (deprecated, please use "add resource" command)`,
    )
    .option(
      "-a, --actions [actions]",
      "Only generate the specified actions. (ex: list,create,edit,show)",
      "list,create,edit,show",
    )
    .option("-p, --path [path]", "Path to generate the resource files", path)
    .action(action);
};

const action = async (
  params: { actions: string; path: string },
  options: Command,
) => {
  createResources(params, options.args);
};

export default load;
