import { ProjectTypes } from "../../definitions/projectTypes";
import camelCase from "camelcase";

export const getResourcePath = (
  projectType: ProjectTypes,
): { path: string; alias: string } => {
  switch (projectType) {
    case ProjectTypes.NEXTJS:
      return {
        path: "src/components",
        alias: "../src/components",
      };
    case ProjectTypes.REMIX:
    case ProjectTypes.REMIX_VITE:
    case ProjectTypes.REMIX_SPA:
      return {
        path: "app/components",
        alias: "~/components",
      };
  }

  // vite and react
  return {
    path: "src/pages",
    alias: "pages",
  };
};

export const getProviderPath = (
  projectType: ProjectTypes,
): { path: string; alias: string } => {
  switch (projectType) {
    case ProjectTypes.NEXTJS:
      return {
        path: "src/providers",
        alias: "../src/providers",
      };
    case ProjectTypes.REMIX:
    case ProjectTypes.REMIX_VITE:
    case ProjectTypes.REMIX_SPA:
      return {
        path: "app/providers",
        alias: "~/providers",
      };
  }

  // vite and react
  return {
    path: "src/providers",
    alias: "providers",
  };
};

export const getFilesPathByProject = (projectType?: ProjectTypes) => {
  switch (projectType) {
    case ProjectTypes.REMIX:
    case ProjectTypes.REMIX_VITE:
    case ProjectTypes.REMIX_SPA:
      return "./app";
    default:
      return "./src";
  }
};

export const getComponentNameByResource = (resource: string): string => {
  return camelCase(resource, {
    preserveConsecutiveUppercase: true,
    pascalCase: true,
  });
};
