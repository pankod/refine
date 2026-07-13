import { server } from "@refinedev/devtools-server";
import { addDevtoolsComponent } from "@transformers/add-devtools-component";
import {
  getInstalledRefinePackagesFromNodeModules,
  getPackageJson,
  getPreferedPM,
  installPackagesSync,
  isDevtoolsInstalled,
} from "@utils/package";
import { hasDefaultScript } from "@utils/refine";
import spinner from "@utils/spinner";
import boxen from "boxen";
import cardinal from "cardinal";
import chalk from "chalk";
import { Argument, type Command } from "commander";
import dedent from "dedent";
import semver from "semver";

type DevtoolsCommand = "start" | "init";

const commands: DevtoolsCommand[] = ["start", "init"];
const defaultCommand: DevtoolsCommand = "start";

const minRefineCoreVersionForDevtools = "4.42.0";

const load = (program: Command) => {
  return program
    .command("devtools")
    .description(
      "Start or install Refine Devtools server; it starts on port 5001.",
    )
    .addArgument(
      new Argument("[command]", "devtools related commands")
        .choices(commands)
        .default(defaultCommand),
    )
    .addHelpText(
      "after",
      `
Commands:
    start     Start Refine Devtools server
    init      Install Refine Devtools client and adds it to your project
`,
    )
    .action(action);
};

export const action = async (command: DevtoolsCommand) => {
  switch (command) {
    case "start":
      devtoolsRunner();
      return;
    case "init":
      devtoolsInstaller();
      return;
  }
};

const devtoolsInstaller = async () => {
  const corePackage = await getRefineCorePackage();

  const isInstalled = await spinner(
    isDevtoolsInstalled,
    "Checking if devtools is installed...",
  );
  if (isInstalled) {
    console.log("🎉 Refine Devtools is already installed");
    return;
  }

  if (
    corePackage &&
    (await validateCorePackageIsNotDeprecated({ pkg: corePackage }))
  ) {
    return;
  }

  console.log("🌱 Installing Refine Devtools...");
  const packagesToInstall = ["@refinedev/devtools@latest"];
  // we should update core package if it is lower than minRefineCoreVersionForDevtools
  if (
    !corePackage ||
    semver.lt(corePackage.version, minRefineCoreVersionForDevtools)
  ) {
    packagesToInstall.push("@refinedev/core@latest");
    console.log("🌱 Refine core package is being updated for devtools...");
  }
  await installPackagesSync(packagesToInstall);

  // empty line
  console.log("");
  console.log("");

  console.log("🌱 Adding devtools component to your project....");
  await addDevtoolsComponent();
  console.log(
    "✅ Refine Devtools package and components added to your project",
  );
  // if core package is updated, we should show the updated version
  if (packagesToInstall.includes("@refinedev/core@latest")) {
    const updatedCorePackage = await getRefineCorePackage();
    console.log(
      `✅ Refine core package updated from ${
        corePackage?.version ?? "unknown"
      } to ${updatedCorePackage?.version ?? "unknown"}`,
    );
    console.log(
      `   Changelog: ${chalk.underline.blueBright(
        `https://c.refine.dev/core#${
          corePackage?.version.replaceAll(".", "") ?? ""
        }`,
      )}`,
    );
  }

  // empty line
  console.log("");

  const { dev } = hasDefaultScript();
  if (dev) {
    console.log(
      `🙌 You're good to go. "npm run dev" will automatically starts the devtools server.`,
    );
    console.log(
      `👉 You can also start the devtools server manually by running "refine devtools start"`,
    );
    return;
  }

  if (!dev) {
    const scriptDev = getPackageJson().scripts?.dev;

    console.log(
      `🚨 Your have modified the "dev" script in your package.json. Because of that, "npm run dev" will not start the devtools server automatically.`,
    );
    console.log(`👉 You can append "refine devtools" to "dev" script`);
    console.log(
      `👉 You can start the devtools server manually by running "refine devtools"`,
    );

    // empty line
    console.log("");
    console.log(
      boxen(
        cardinal.highlight(
          dedent(`
                {
                    "scripts": {
                        "dev": "${scriptDev} & refine devtools",
                        "refine": "refine"
                    }
                }  
        `),
        ),
        {
          padding: 1,
          title: "package.json",
          dimBorder: true,
          borderColor: "blueBright",
          borderStyle: "round",
        },
      ),
    );
  }
};

export const devtoolsRunner = async ({
  exitOnError = true,
}: { exitOnError?: boolean } = {}) => {
  const corePackage = await getRefineCorePackage();

  if (corePackage) {
    if (await validateCorePackageIsNotDeprecated({ pkg: corePackage })) {
      return;
    }

    if (semver.lt(corePackage.version, minRefineCoreVersionForDevtools)) {
      console.log(
        `🚨 You're using an old version of Refine(${corePackage.version}). Refine version should be @4.42.0 or higher to use devtools.`,
      );
      const pm = await getPreferedPM();
      console.log(
        `👉 You can update @refinedev/core package by running "${pm.name} run refine update"`,
      );
      return;
    }
  }

  server({
    onError: () => {
      if (exitOnError) {
        process.exit(1);
      }
    },
  }).catch((e) => {});
};

const getRefineCorePackage = async () => {
  const installedRefinePackages =
    await getInstalledRefinePackagesFromNodeModules();
  const corePackage = installedRefinePackages?.find(
    (pkg) =>
      pkg.name === "@refinedev/core" || pkg.name === "@pankod/refine-core",
  );

  if (!corePackage) {
    return undefined;
  }

  return corePackage;
};

export const validateCorePackageIsNotDeprecated = async ({
  pkg,
}: {
  pkg: { name: string; version: string };
}) => {
  if (pkg.name === "@pankod/refine-core" || semver.lt(pkg.version, "4.0.0")) {
    console.log(
      `🚨 You're using an old version of Refine(${pkg.version}). Refine version should be @4.42.0 or higher to use devtools.`,
    );
    console.log("You can follow migration guide to update Refine.");
    console.log(
      chalk.blue("https://refine.dev/docs/migration-guide/3x-to-4x/"),
    );
    return true;
  }

  return false;
};

export default load;
