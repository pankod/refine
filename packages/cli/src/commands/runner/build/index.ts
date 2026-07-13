import { Command, Option } from "commander";
import { getProjectType } from "@utils/project";
import { projectScripts } from "../projectScripts";
import { runScript } from "../runScript";
import { updateNotifier } from "src/update-notifier";
import { getPlatformOptionDescription, getRunnerDescription } from "../utils";
import { ProjectTypes } from "@definitions/projectTypes";

const build = (program: Command) => {
    return program
        .command("build")
        .description(getRunnerDescription("build"))
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
    const projectType =  getProjectType(platform);

    const binPath = projectScripts[projectType].getBin("build");
    const command = projectScripts[projectType].getBuild(args);


    await updateNotifier();

    try {
        await runScript(binPath, command);
    } catch (error) {
        process.exit(1);
    }
};

export default build;
