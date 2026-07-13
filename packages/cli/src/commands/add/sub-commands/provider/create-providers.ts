import { getProjectType } from "@utils/project";
import { getFilesPathByProject, getProviderPath } from "@utils/resource";
import {
  copySync,
  existsSync,
  mkdirSync,
  pathExistsSync,
  readdirSync,
} from "fs-extra";
import { join, relative } from "path";
import {
  availableProviders,
  type Provider,
  type ProviderId,
} from "./providers";

const baseTemplatePath = `${__dirname}/../templates/provider`;
const baseAssetsPath = `${__dirname}/../templates/assets`;

export const createProviders = (
  providerIds: ProviderId[],
  pathFromArgs?: string,
) => {
  providerIds.forEach((providerId) => {
    const { fileName, templateFileName } = getProviderOptions(providerId);
    const projectFilesBasePath = getFilesPathByProject(getProjectType());
    const folderPath = pathFromArgs ?? getDefaultPath();
    const filePath = join(folderPath, fileName);
    const fullPath = join(process.cwd(), folderPath, fileName);
    const projectFilesPath = join(process.cwd(), projectFilesBasePath);

    if (pathExistsSync(fullPath)) {
      console.error(`❌ Provider (${filePath}) already exist!`);
      return;
    }

    // create destination dir
    mkdirSync(folderPath, { recursive: true });

    // copy template file to destination
    copySync(`${baseTemplatePath}/${templateFileName}`, fullPath);

    console.log(`🎉 Provider (${filePath}) created successfully!`);

    const copiedAssets: string[] = [];
    const failedAssets: string[] = [];

    if (pathExistsSync(`${baseAssetsPath}/${providerId}`)) {
      try {
        readdirSync(`${baseAssetsPath}/${providerId}`, {
          recursive: true,
          withFileTypes: true,
        }).forEach((file) => {
          if (!file.isDirectory()) {
            const fromPath = join(file.path, file.name);
            const destinationPath = join(
              projectFilesPath,
              relative(join(baseAssetsPath, providerId), file.path),
              file.name,
            );
            const relativeDestinationPath = join(
              projectFilesBasePath,
              relative(projectFilesPath, destinationPath),
            );

            if (existsSync(destinationPath)) {
              failedAssets.push(relativeDestinationPath);
            } else {
              try {
                copySync(fromPath, destinationPath);
                copiedAssets.push(relativeDestinationPath);
              } catch (error) {
                failedAssets.push(relativeDestinationPath);
              }
            }
          }
        });
      } catch (error) {}
    }

    if (copiedAssets.length) {
      console.log(`🎉 Created additional assets: ${copiedAssets.join(", ")}`);
    }
    if (failedAssets.length) {
      console.error(`❌ Failed to create assets: ${failedAssets.join(", ")}`);
    }
  });
};

export const getProviderOptions = (providerId: ProviderId): Provider => {
  const provider = availableProviders.find((p) => p.id === providerId);

  if (!provider) {
    throw new Error(`Invalid provider: ${providerId}`);
  }

  return provider;
};

export const getDefaultPath = () => {
  const projectType = getProjectType();
  const { path } = getProviderPath(projectType);
  return path;
};
