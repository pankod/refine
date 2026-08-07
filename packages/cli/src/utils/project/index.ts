import { ProjectTypes, UIFrameworks } from "../../definitions";
import { getDependencies, getDevDependencies } from "@utils/package";

export const getProjectType = (platform?: ProjectTypes): ProjectTypes => {
  if (platform) {
    return platform;
  }
  // read dependencies from package.json
  let dependencies: string[] = [];
  let devDependencies: string[] = [];

  try {
    dependencies = getDependencies();
    devDependencies = getDevDependencies();
  } catch (error) {}

  // check for craco
  // craco and react-scripts installs together. We need to check for craco first
  if (
    dependencies.includes("@craco/craco") ||
    devDependencies.includes("@craco/craco")
  ) {
    return ProjectTypes.CRACO;
  }

  // check for react-scripts
  if (
    dependencies.includes("react-scripts") ||
    devDependencies.includes("react-scripts")
  ) {
    return ProjectTypes.REACT_SCRIPT;
  }

  // check for next
  if (dependencies.includes("next") || devDependencies.includes("next")) {
    return ProjectTypes.NEXTJS;
  }

  // check for remix
  if (
    dependencies.includes("@remix-run/react") ||
    devDependencies.includes("@remix-run/react")
  ) {
    // check for remix-vite
    if (dependencies.includes("vite") || devDependencies.includes("vite")) {
      return ProjectTypes.REMIX_VITE;
    }

    return ProjectTypes.REMIX;
  }

  // check for vite
  if (dependencies.includes("vite") || devDependencies.includes("vite")) {
    return ProjectTypes.VITE;
  }

  if (dependencies.includes("parcel") || devDependencies.includes("parcel")) {
    return ProjectTypes.PARCEL;
  }

  return ProjectTypes.UNKNOWN;
};

export const getUIFramework = (): UIFrameworks | undefined => {
  // read dependencies from package.json
  const dependencies = getDependencies();

  // check for antd
  if (dependencies.includes("@refinedev/antd")) {
    return UIFrameworks.ANTD;
  }

  // check for mui
  if (dependencies.includes("@refinedev/mui")) {
    return UIFrameworks.MUI;
  }

  // check for chakra
  if (dependencies.includes("@refinedev/chakra-ui")) {
    return UIFrameworks.CHAKRA;
  }

  // check for mantine
  if (dependencies.includes("@refinedev/mantine")) {
    return UIFrameworks.MANTINE;
  }

  return;
};

export const getDevtoolsEnvKeyByProjectType = (
  projectType: ProjectTypes,
): string => {
  switch (projectType) {
    case ProjectTypes.REACT_SCRIPT:
      return "REACT_APP_REFINE_DEVTOOLS_PORT";
    case ProjectTypes.NEXTJS:
      return "NEXT_PUBLIC_REFINE_DEVTOOLS_PORT";
    case ProjectTypes.VITE:
      return "VITE_REFINE_DEVTOOLS_PORT";
    default:
      return "REFINE_DEVTOOLS_PORT";
  }
};
