import inquirer from "inquirer";
import semverDiff from "semver-diff";
import chalk from "chalk";
import { findDuplicates } from "@utils/array";
import { parsePackageNameAndVersion } from "@utils/package";
import type {
  PackageDependency,
  RefinePackageInstalledVersionData,
} from "../../../definitions/package";

type UIGroup = {
  patch: {
    name: string;
    from: string;
    to: string;
  }[];
  minor: {
    name: string;
    from: string;
    to: string;
  }[];
  major: {
    name: string;
    from: string;
    to: string;
  }[];
};

export const promptInteractiveRefineUpdate = async (
  packages: RefinePackageInstalledVersionData[],
) => {
  const uiGroup = createUIGroup(packages);
  if (!uiGroup) {
    console.log("All `Refine` packages are up to date. 🎉");
    return;
  }

  const inquirerUI = createInquirerUI(uiGroup);

  const answers = await inquirer.prompt<{
    packages: string[];
  }>([
    {
      type: "checkbox",
      name: "packages",
      message: "Choose packages to update",
      pageSize: inquirerUI.pageSize,
      choices: inquirerUI.choices,
      validate: validatePrompt,
    },
  ]);

  if (answers.packages.length > 0) {
    // convert to object for easy access
    const packagesObject: PackageDependency = {};
    answers.packages.forEach((pckg) => {
      const { name, version } = parsePackageNameAndVersion(pckg);
      packagesObject[name] = version ?? "latest";
    });

    return packagesObject;
  }

  return null;
};

export const validatePrompt = (input: string[]) => {
  const inputParsed = input.map((pckg) => {
    return parsePackageNameAndVersion(pckg);
  });

  const names = inputParsed.map((pckg) => pckg.name);
  const duplicates = findDuplicates(names);

  if (duplicates.length > 0) {
    return `You can't update the same package more than once. Please choice one.\n Duplicates: ${duplicates.join(
      ", ",
    )}`;
  }

  return true;
};

export const createUIGroup = (
  packages: RefinePackageInstalledVersionData[],
): UIGroup | null => {
  if (packages.length === 0) {
    return null;
  }

  const packagesCategorized: UIGroup = {
    patch: [],
    minor: [],
    major: [],
  };

  packages.forEach((pckg) => {
    const current = pckg.current;

    const diffWanted = semverDiff(current, pckg.wanted) as keyof UIGroup;
    const diffLatest = semverDiff(current, pckg.latest) as keyof UIGroup;

    if (diffWanted === diffLatest) {
      if (diffLatest) {
        packagesCategorized[diffLatest].push({
          name: pckg.name,
          from: current,
          to: pckg.latest,
        });
        return;
      }
    }

    if (diffWanted) {
      packagesCategorized[diffWanted].push({
        name: pckg.name,
        from: current,
        to: pckg.wanted,
      });
    }

    if (diffLatest) {
      packagesCategorized[diffLatest].push({
        name: pckg.name,
        from: current,
        to: pckg.latest,
      });
    }
  });

  return packagesCategorized;
};

const createInquirerUI = (uiGroup: UIGroup) => {
  let maxNameLength = 0;
  let maxFromLength = 0;

  [uiGroup.patch, uiGroup.minor, uiGroup.major].forEach((group) => {
    group.forEach((pckg) => {
      if (pckg.name.length > maxNameLength) {
        maxNameLength = pckg.name.length;
      }

      if (pckg.from.length > maxFromLength) {
        maxFromLength = pckg.from.length;
      }
    });
  });

  maxNameLength += 2;

  const choices: (
    | inquirer.Separator
    | {
        name: string;
        value: string;
      }
  )[] = [];

  const packageColumnText = "Package".padEnd(maxNameLength);
  const currentColumnText = "From".padEnd(maxFromLength);
  const toColumnText = "To";
  const header = `\n   ${packageColumnText} ${currentColumnText}${toColumnText.padStart(
    maxFromLength,
  )}`;
  choices.push(new inquirer.Separator(header));

  if (uiGroup.patch.length > 0) {
    choices.push(
      new inquirer.Separator(chalk.reset.bold.blue("\nPatch Updates")),
    );
    uiGroup.patch.forEach((pckg) => {
      choices.push({
        name: `${pckg.name.padEnd(maxNameLength)} ${pckg.from.padStart(
          maxFromLength,
        )} -> ^${pckg.to}`,
        value: `${pckg.name}@^${pckg.to}`,
      });
    });
  }

  if (uiGroup.minor.length > 0) {
    choices.push(
      new inquirer.Separator(chalk.reset.bold.blue("\nMinor Updates")),
    );
    uiGroup.minor.forEach((pckg) => {
      choices.push({
        name: `${pckg.name.padEnd(maxNameLength)} ${pckg.from.padStart(
          maxFromLength,
        )} -> ^${pckg.to}`,
        value: `${pckg.name}@^${pckg.to}`,
      });
    });
  }

  if (uiGroup.major.length > 0) {
    choices.push(
      new inquirer.Separator(chalk.reset.bold.blue("\nMajor Updates")),
    );
    uiGroup.major.forEach((pckg) => {
      choices.push({
        name: `${pckg.name.padEnd(maxNameLength)} ${pckg.from.padStart(
          maxFromLength,
        )} -> ^${pckg.to}`,
        value: `${pckg.name}@^${pckg.to}`,
      });
    });
  }

  const pageSize = choices.length + 6;

  return { choices, pageSize };
};
