import ora from "ora";
import path from "path";
import chalk from "chalk";
import boxen from "boxen";
import { gitInit } from "./git-init";
import { makeDir } from "./make-dir";
import { existsInRepo } from "./exists-in-repo";
import { downloadAndExtract } from "./download-and-extract";
import { findPM, installDependencies } from "./install-dependencies";
import { GITHUB_ORG, GITHUB_REPO, GITHUB_BRANCH } from "./constants";

const run = async (
  example: string | boolean | undefined,
  destination?: string,
) => {
  const pm = findPM();

  if (typeof example !== "string") {
    ora("You must specify an example name").fail();
    console.log(
      boxen(
        [
          chalk`You can find {bold refine} examples at:`,
          "",
          chalk`{dim.cyan github.com/}{cyan refinedev/refine/tree/main/examples}`,
        ].join("\n"),
        {
          title: chalk`No example provided`,
          titleAlignment: "center",
          borderStyle: "round",
          borderColor: "gray",
          padding: 1,
          textAlignment: "center",
          margin: 1,
          float: "center",
        },
      ),
    );
    process.exit(1);
  }

  const root = path.resolve(destination || example);

  const existSpinner = ora("Checking if example exists in refine").start();
  const found = await existsInRepo({
    organization: GITHUB_ORG,
    repository: GITHUB_REPO,
    example,
    branch: GITHUB_BRANCH,
  });

  if (found) {
    existSpinner.succeed("Example found in refine repository");
  } else {
    existSpinner.fail(
      `Could not locate an example named ${chalk.red(`"${example}"`)}`,
    );
    console.log(
      boxen(
        [
          chalk`You can find {bold refine} examples at:`,
          "",
          chalk`{dim.cyan github.com/}{cyan refinedev/refine/tree/main/examples}`,
        ].join("\n"),
        {
          title: chalk`Example not found`,
          titleAlignment: "center",
          borderStyle: "round",
          borderColor: "gray",
          padding: 1,
          textAlignment: "center",
          margin: 1,
          float: "center",
        },
      ),
    );
    process.exit(1);
  }

  const cdPath = root.includes(path.resolve(process.cwd()))
    ? root.replace(path.resolve(process.cwd()), ".")
    : root;

  const dirSpinner = ora(`Creating directory ${chalk.cyan(cdPath)}.`).start();

  const dirStatus = await makeDir(root);

  if (dirStatus === "already") {
    dirSpinner.warn(
      `Directory ${chalk.cyan(
        cdPath,
      )} already exists. Files will be overwritten.`,
    );
  } else if (dirStatus === "failed") {
    dirSpinner.fail(`Failed to create directory ${chalk.cyan(cdPath)}.`);
    process.exit(1);
  } else {
    dirSpinner.succeed(`Directory ${chalk.cyan(cdPath)} created.`);
  }

  const downloadSpinner = ora(
    `Downloading files for example ${chalk.cyan(
      example,
    )}. This might take a moment.`,
  ).start();

  const downloadStatus = await downloadAndExtract({
    root,
    name: example,
    branch: GITHUB_BRANCH,
    repo: GITHUB_REPO,
    org: GITHUB_ORG,
  });

  if (downloadStatus === "download-failed") {
    downloadSpinner.fail(
      `Failed to download files for example ${chalk.cyan(example)}.`,
    );
    process.exit(1);
  }

  if (downloadStatus === "extract-failed") {
    downloadSpinner.fail(
      `Failed to extract files for example ${chalk.cyan(example)}.`,
    );
    process.exit(1);
  }

  downloadSpinner.succeed(
    `Files downloaded and extracted for example ${chalk.cyan(example)}.`,
  );

  const installSpinner = ora(
    "Installing packages. This might take a couple of minutes.",
  ).start();

  const installStatus = await installDependencies(root);

  if (installStatus) {
    installSpinner.succeed("Packages installed successfully.");
  } else {
    installSpinner.fail(
      "Failed to install packages. You can try again manually.",
    );
  }

  const gitSpinner = ora(`Initializing Git in ${chalk.cyan(cdPath)}.`).start();

  const gitStatus = gitInit(root, "Initial commit from Create Refine App");

  if (gitStatus === "git-not-found") {
    gitSpinner.warn(
      "Git was not found in your PATH. Skipping Git initialization.",
    );
  }

  if (gitStatus === "already-in-repository") {
    gitSpinner.warn(
      `Directory ${chalk.cyan(
        cdPath,
      )} is already a Git repository. Skipping Git initialization.`,
    );
  }

  if (gitStatus === "git-init-failed") {
    gitSpinner.warn(
      `Failed to initialize Git repository in ${chalk.cyan(cdPath)}.`,
    );
  }

  if (gitStatus === "git-commit-failed") {
    gitSpinner.warn(
      `Failed to commit initial commit to Git repository in ${chalk.cyan(
        cdPath,
      )}.`,
    );
  }

  if (gitStatus === "success") {
    gitSpinner.succeed("Created Git repository with initial commit.");
  }

  const pmRun = pm === "yarn" ? "" : "run ";

  console.log(
    boxen(
      [
        chalk`Created {cyan ${example}} at {cyan ${cdPath}}`,
        "",
        chalk`Start using your new {bold refine} app by running:`,
        "",
        chalk`  {bold cd} {cyan ${cdPath}}`,
        chalk`  {bold ${pm} ${pmRun}}{cyan dev}`,
      ].join("\n"),
      {
        // title: `create-refine-app${version ? ` v${version}` : ""}`,
        title: chalk`{bold.green Success!}`,
        titleAlignment: "center",
        borderStyle: "round",
        padding: 1,
        float: "center",
        margin: 1,
        borderColor: "gray",
      },
    ),
  );
};

export default run;
