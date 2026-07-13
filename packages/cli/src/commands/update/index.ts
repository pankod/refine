import inquirer from "inquirer";
import center from "center-align";
import { type Command, Option } from "commander";
import PackageJson from "@npmcli/package-json";
import spinner from "@utils/spinner";
import {
  getLatestMinorVersionOfPackage,
  getWantedWithPreferredWildcard,
  isRefineUptoDate,
} from "@commands/check-updates";
import { getPreferedPM, installPackages, pmCommands } from "@utils/package";
import { promptInteractiveRefineUpdate } from "@commands/update/interactive";
import type {
  PackageDependency,
  RefinePackageInstalledVersionData,
} from "@definitions/package";
import { getVersionTable } from "@components/version-table";
import chalk from "chalk";

type SelectedPackage = PackageDependency;

enum Tag {
  WANTED = "wanted",
  LATEST = "latest",
  NEXT = "next",
}

enum InstallationType {
  WANTED = "wanted",
  MINOR = "minor",
  INTERACTIVE = "interactive",
}

interface OptionValues {
  tag: Tag;
  dryRun: boolean;
  all: boolean;
}

const load = (program: Command) => {
  return program
    .command("update")
    .description(
      "Interactively select and update all `Refine` packages to selected version. To skip the interactive mode, use the `--all` option.",
    )
    .addOption(
      new Option("-t, --tag [tag]", "Select version to update to.")
        .choices(["next", "latest"])
        .default(
          "wanted",
          "Version ranges in the `package.json` will be installed",
        ),
    )
    .option(
      "-a, --all",
      "Update all `Refine` packages to the selected `tag`. If `tag` is not provided, version ranges in the `package.json` will be installed. This option skips the interactive mode.",
      false,
    )
    .option(
      "-d, --dry-run",
      "Get outdated packages installation command without automatic updating. If `tag` is not provided, version ranges in the `package.json` will be used.",
      false,
    )
    .action(action);
};

const action = async (options: OptionValues) => {
  const { tag, dryRun, all } = options;

  const packages = await spinner(isRefineUptoDate, "Checking for updates...");
  if (!packages?.length) {
    console.log("All `Refine` packages are up to date 🎉");
    return;
  }

  let selectedPackages: SelectedPackage | null | undefined = null;

  if (all) {
    const selectedPackages = await preparePackagesToInstall(tag, packages);
    if (!selectedPackages) return;

    if (dryRun) {
      printInstallCommand(selectedPackages);
      return;
    }

    runInstallation(selectedPackages);
    return;
  }

  // print the table of available updates
  const { table, width } = getVersionTable(packages) ?? "";
  console.log(center("Available Updates", width));
  console.log(table);
  console.log(
    `- ${chalk.yellow(
      chalk.bold("Current"),
    )}: The version of the package that is currently installed`,
  );
  console.log(
    `- ${chalk.yellow(
      chalk.bold("Wanted"),
    )}: The maximum version of the package that satisfies the semver range specified in \`package.json\``,
  );
  console.log(
    `- ${chalk.yellow(
      chalk.bold("Latest"),
    )}: The latest version of the package available on npm`,
  );
  console.log();

  const { installationType } = await inquirer.prompt<{
    installationType: InstallationType;
  }>([
    {
      type: "list",
      name: "installationType",
      message:
        "Do you want to update all Refine packages for minor and patch versions?",
      choices: [
        {
          name: `Update all packages to latest "minor" version without any breaking changes.`,
          value: "minor",
        },
        {
          name: "Update all packages to the latest version that satisfies the semver(`wanted`) range specified in `package.json`",
          value: "wanted",
        },
        {
          name: `Use interactive mode. Choose this option for "major" version updates.`,
          value: "interactive",
        },
      ],
    },
  ]);

  if (installationType === InstallationType.INTERACTIVE) {
    selectedPackages = await promptInteractiveRefineUpdate(packages);
  }
  if (installationType === InstallationType.WANTED) {
    selectedPackages = await preparePackagesToInstall(Tag.WANTED, packages);
  }
  if (installationType === InstallationType.MINOR) {
    selectedPackages = await preparePackagesToInstall(
      InstallationType.MINOR,
      packages,
    );
  }

  if (!selectedPackages) return;

  if (dryRun) {
    printInstallCommand(selectedPackages);
  } else {
    runInstallation(selectedPackages);
  }
};

const preparePackagesToInstall = async (
  tag: Tag | InstallationType,
  packages: RefinePackageInstalledVersionData[],
): Promise<PackageDependency | null> => {
  if (tag === Tag.WANTED) {
    const isAllPackagesAtWantedVersion = packages.every(
      (pkg) => pkg.current === pkg.wanted,
    );
    if (isAllPackagesAtWantedVersion) {
      console.log();
      console.log("✅ All `Refine` packages are already at the wanted version");
      return null;
    }
  }

  // empty line for better readability
  console.log();

  const packagesWithVersion: PackageDependency = {};
  for (const pkg of packages) {
    let version = pkg.latest;

    if (tag === InstallationType.MINOR) {
      const latestMinorVersion = await spinner(
        () => getLatestMinorVersionOfPackage(pkg.name, pkg.wanted),
        `Checking for the latest minor version of ${pkg.name}`,
      );
      version = `^${latestMinorVersion}`;
    }
    if (tag === Tag.WANTED) {
      version = getWantedWithPreferredWildcard(pkg.name, pkg.wanted);
    }
    if (tag === Tag.LATEST) {
      version = `^${pkg.latest}`;
    }
    if (tag === Tag.NEXT) {
      version = Tag.NEXT;
    }

    packagesWithVersion[pkg.name] = version;
  }

  return packagesWithVersion;
};

const printInstallCommand = async (packages: SelectedPackage) => {
  const pm = await getPreferedPM();
  const commandInstall = pmCommands[pm.name].add;
  let packagesListAsString = "";
  for (const [name, version] of Object.entries(packages)) {
    packagesListAsString += `${name}@${version} `;
  }
  console.log();
  console.log(`${pm.name} ${commandInstall.join(" ")} ${packagesListAsString}`);
};

const runInstallation = async (packagesToInstall: SelectedPackage) => {
  console.log("Updating `Refine` packages...");

  // to install packages, first we need to manipulate the package.json file, then install the packages
  const packageJson = await PackageJson.load(process.cwd());

  packageJson.update({
    dependencies: {
      ...((packageJson.content.dependencies ?? {}) as { [x: string]: string }),
      ...(packagesToInstall ?? {}),
    },
  });
  await packageJson.save();

  installPackages([], "all");
};

export default load;
