import { ProjectTypes } from "@definitions/projectTypes";
import { getProjectType } from "@utils/project";
import { type Command, Option } from "commander";
import { updateNotifier } from "src/update-notifier";
import { projectScripts } from "../projectScripts";
import { runScript } from "../runScript";
import { getPlatformOptionDescription, getRunnerDescription } from "../utils";

const start = (program: Command) => {
  return program
    .command("start")
    .description(getRunnerDescription("start"))
    .allowUnknownOption(true)
    .addOption(
      new Option(
        "-p, --platform <platform>",
        getPlatformOptionDescription(),
      ).choices(
        Object.values(ProjectTypes).filter(
          (type) => type !== ProjectTypes.UNKNOWN,
        ),
      ),
    )
    .argument("[args...]")
    .action(action);
};

const action = async (
  args: string[],
  { platform }: { platform: ProjectTypes },
) => {
  const projectType = getProjectType(platform);

  const binPath = projectScripts[projectType].getBin("start");
  const command = projectScripts[projectType].getStart(args);

  await updateNotifier();

  runScript(binPath, command);
};

export default start;
