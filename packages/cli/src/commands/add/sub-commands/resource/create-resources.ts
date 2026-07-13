import { ProjectTypes } from "@definitions/projectTypes";
import { compileDir } from "@utils/compile";
import { installPackages, isInstalled } from "@utils/package";
import { getProjectType, getUIFramework } from "@utils/project";
import { getResourcePath } from "@utils/resource";
import spinner from "@utils/spinner";
import { uppercaseFirstChar } from "@utils/text";
import execa from "execa";
import {
  copySync,
  mkdirSync,
  moveSync,
  pathExistsSync,
  unlinkSync,
} from "fs-extra";
import inquirer from "inquirer";
import { join } from "path";
import { plural } from "pluralize";
import temp from "temp";
import { getCommandRootDir } from "./get-command-root-dir";

export const defaultActions = ["list", "create", "edit", "show"];

export const createResources = async (
  params: { actions?: string; path?: string },
  resources: string[],
) => {
  const destinationPath =
    params?.path || getResourcePath(getProjectType()).path;
  let actions = params.actions || defaultActions.join(",");

  if (!resources.length) {
    const { name, selectedActions } = await inquirer.prompt<{
      name: string;
      selectedActions: string[];
    }>([
      {
        type: "input",
        name: "name",
        message: "Resource Name (users, products, orders etc.)",
        validate: (value) => {
          if (!value) {
            return "Resource Name is required";
          }

          return true;
        },
      },
      {
        type: "checkbox",
        name: "selectedActions",
        message: "Select Actions",
        choices: defaultActions,
        default: params?.actions?.split(","),
      },
    ]);

    resources = [name];
    actions = selectedActions.join(",");
  }

  let isAtleastOneResourceCreated = false;
  resources.forEach((resourceName) => {
    const customActions = actions ? actions.split(",") : undefined;
    const resourceFolderName = plural(resourceName).toLowerCase();

    // check exist resource
    const resourcePath = join(
      process.cwd(),
      destinationPath,
      resourceFolderName,
    );

    if (pathExistsSync(resourcePath)) {
      console.error(
        `❌ Resource (${join(
          destinationPath,
          resourceFolderName,
        )}) already exist!`,
      );
      return;
    }
    isAtleastOneResourceCreated = true;

    // uppercase first letter
    const resource = uppercaseFirstChar(resourceName);

    // get the project type
    const uiFramework = getUIFramework();

    // if next.js, need to add the use client directive
    const projectType = getProjectType();
    const isNextJs = projectType === ProjectTypes.NEXTJS;

    const sourceDir = `${getCommandRootDir()}/../templates/resource/components`;

    // create temp dir
    const tempDir = generateTempDir();

    // copy template files
    copySync(sourceDir, tempDir);

    const compileParams = {
      resourceName,
      resource,
      actions: customActions || defaultActions,
      uiFramework,
      isNextJs,
    };

    // compile dir
    compileDir(tempDir, compileParams);

    // delete ignored actions
    if (customActions) {
      defaultActions.forEach((action) => {
        if (!customActions.includes(action)) {
          unlinkSync(`${tempDir}/${action}.tsx`);
        }
      });
    }

    // create desctination dir
    mkdirSync(destinationPath, { recursive: true });

    // copy to destination
    const destinationResourcePath = `${destinationPath}/${resourceFolderName}`;

    let moveSyncOptions = {};

    // empty dir override
    if (pathExistsSync(destinationResourcePath)) {
      moveSyncOptions = { overwrite: true };
    }
    moveSync(tempDir, destinationResourcePath, moveSyncOptions);

    // clear temp dir
    temp.cleanupSync();

    // if use Next.js, generate page files. This makes easier to use the resource
    if (isNextJs) {
      generateNextJsPages(
        resource,
        resourceFolderName,
        customActions || defaultActions,
      );
    }

    const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");
    const { stderr } = execa.sync(jscodeshiftExecutable, [
      "./",
      "--extensions=ts,tsx,js,jsx",
      "--parser=tsx",
      `--transform=${getCommandRootDir()}/../src/transformers/resource.ts`,
      "--ignore-pattern=.cache",
      "--ignore-pattern=node_modules",
      "--ignore-pattern=build",
      "--ignore-pattern=.next",
      "--ignore-pattern=dist",
      // pass custom params to transformer file
      `--__actions=${compileParams.actions}`,
      `--__pathAlias=${getResourcePath(getProjectType()).alias}`,
      `--__resourceFolderName=${resourceFolderName}`,
      `--__resource=${resource}`,
      `--__resourceName=${resourceName}`,
    ]);

    if (stderr) {
      console.log(stderr);
    }

    console.log(
      `🎉 Resource (${destinationResourcePath}) generated successfully!`,
    );
  });

  if (isAtleastOneResourceCreated) {
    installInferencer();
  }

  return;
};

const generateTempDir = (): string => {
  temp.track();
  return temp.mkdirSync("resource");
};

/**
 * generate resource pages for Next.js App Router
 */
const generateNextJsPages = (
  resource: string,
  resourceFolderName: string,
  actions: string[],
): void => {
  const resourcePageRootDirPath = join(
    process.cwd(),
    "src/app/",
    resourceFolderName,
  );

  // this is specific to Next.js, so defined here
  const actionPageRelativeDirPaths: { [key: string]: string } = {
    list: "/",
    create: "/create",
    edit: "/edit/[id]",
    show: "/show/[id]",
  };

  actions.forEach((action) => {
    // create page dir
    const actionPageRelativeDirPath = actionPageRelativeDirPaths[action];
    const actionPageDirPath = join(
      resourcePageRootDirPath,
      actionPageRelativeDirPath,
    );
    mkdirSync(actionPageDirPath, { recursive: true });

    // copy template files as page files
    const sourceFilePath = `${getCommandRootDir()}/../templates/resource/pages/next/${actionPageRelativeDirPath}/page.tsx.hbs`;
    const destFilePath = join(actionPageDirPath, "page.tsx.hbs");
    copySync(sourceFilePath, destFilePath);
  });

  // compile page files
  const compileParams = { resource, resourceFolderName };
  compileDir(resourcePageRootDirPath, compileParams);
};

export const installInferencer = async () => {
  console.log();
  const isInferencerInstalled = await spinner(
    () => isInstalled("@refinedev/inferencer"),
    "Checking if '@refinedev/inferencer' package is installed...",
  );
  if (!isInferencerInstalled) {
    console.log("📦 Installing '@refinedev/inferencer' package...");
    await installPackages(
      ["@refinedev/inferencer@latest"],
      "add",
      "✅ '@refinedev/inferencer' package installed successfully!",
    );
  }
};
