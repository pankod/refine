import type { ProjectTypes } from "@definitions/projectTypes";
import { getProjectType } from "@utils/project";
import { getFilesPathByProject } from "@utils/resource";

export const getPathPrefix = () => {
  let projectType: ProjectTypes | undefined = undefined;

  try {
    projectType = getProjectType();
  } catch (error) {
    projectType = undefined;
  }

  const pathPrefix = getFilesPathByProject(projectType);

  return pathPrefix;
};
