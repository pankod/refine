import { ProjectTypes } from "@definitions/projectTypes";
import { getProjectType } from "@utils/project";
import { projectScripts } from "../projectScripts";

export const getRunnerDescription = (runner: "dev" | "start" | "build") => {
  let projectType = getProjectType();

  let command: string[] = [];
  switch (runner) {
    case "dev":
      command = projectScripts[projectType].getDev([""]);
      break;
    case "start":
      command = projectScripts[projectType].getStart([""]);
      break;
    case "build":
      command = projectScripts[projectType].getBuild([""]);
      break;
  }

  if (runner === "start") {
    switch (projectType) {
      case ProjectTypes.REMIX:
      case ProjectTypes.REMIX_VITE:
        projectType = "remix-serve" as ProjectTypes;
        break;
      case ProjectTypes.REMIX_SPA:
        projectType = ProjectTypes.VITE;
        break;
    }
  }

  return `It runs: \`${projectType} ${command.join(
    " ",
  )}\`. Also accepts all the arguments \`${projectType}\` accepts.`;
};

export const getPlatformOptionDescription = () => {
  return `Platform to run command on. \nex: ${Object.values(ProjectTypes).join(
    ", ",
  )}`;
};
