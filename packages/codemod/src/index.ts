#!/usr/bin/env node

/**
 * Copyright 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// Based on https://github.com/vercel/next.js/blob/canary/packages/next-codemod/bin/cli.ts
// and https://github.com/reactjs/react-codemod/blob/dd8671c9a470a2c342b221ec903c574cf31e9f57/bin/cli.js
// @refinedev/codemod name-of-transform optional/path/to/src [...options]

import chalk from "chalk";
import execa from "execa";
import globby from "globby";
import inquirer from "inquirer";
import isGitClean from "is-git-clean";
import meow from "meow";
import path from "path";
import { checkAntdVersionIs3x } from "./helpers/check-antd-version-is-3x";

export const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");
export const transformerDirectory = path.join(
  __dirname,
  "../",
  "dist/transformations",
);

const transformsWithPostTransform = [
  "refine1-to-refine2",
  "refine2-to-refine3",
  "refine3-to-refine4",
];

export function checkGitStatus(force) {
  let clean = false;
  let errorMessage = "Unable to determine if git directory is clean";
  try {
    clean = isGitClean.sync(process.cwd());
    errorMessage = "Git directory is not clean";
  } catch (err) {
    if (err?.stderr && err.stderr.indexOf("Not a git repository") >= 0) {
      clean = true;
    }
  }

  if (!clean) {
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
    } else {
      console.log("Thank you for using @refinedev/codemod!");
      console.log(
        chalk.yellow(
          "\nBut before we continue, please stash or commit your git changes.",
        ),
      );
      console.log(
        "\nYou may use the --force flag to override this safety check.",
      );
      process.exit(1);
    }
  }
}

export function runTransform({ files, flags, transformer }) {
  const transformerPath = path.join(transformerDirectory, `${transformer}.js`);

  let args = [];

  const { dry, print, runInBand } = flags;

  if (dry) {
    args.push("--dry");
  }
  if (print) {
    args.push("--print");
  }
  if (runInBand) {
    args.push("--run-in-band");
  }

  args.push("--verbose=2");

  args.push("--ignore-pattern=**/node_modules/**");
  args.push("--ignore-pattern=**/build/**");
  args.push("--ignore-pattern=**/.next/**");
  args.push("--ignore-pattern=**/dist/**");
  args.push("--ignore-pattern=**/.cache/**");
  args.push("--ignore-pattern=theme.d.ts");

  args.push("--extensions=tsx,ts,jsx,js");
  args.push("--parser=tsx");

  args = args.concat(["--transform", transformerPath]);

  if (flags.jscodeshift) {
    args = args.concat(flags.jscodeshift);
  }

  args = args.concat(files);

  console.log(`Executing command: jscodeshift ${args.join(" ")}`);

  const result = execa.sync(jscodeshiftExecutable, args, {
    stdio: "inherit",
    stripFinalNewline: false,
  });

  if (result.failed) {
    throw new Error(`jscodeshift exited with code ${result.exitCode}`);
  }
}

const TRANSFORMER_INQUIRER_CHOICES = [
  {
    name: "refine4-to-refine5: Transform from refine 4.x.x to at least 5.0.0",
    value: "refine4-to-refine5",
  },
  {
    name: "Rename '@refinedev/react-router-v6' imports to '@refinedev/react-router'",
    value: "refine-react-router-v6-to-refine-react-router",
  },
  {
    name: "Rename 'react-router-dom' imports to 'react-router'",
    value: "react-router-dom-to-react-router",
  },
  {
    name: "Rename deprecated names (queryResult, tableQueryResult, mutationResult) to (query, tableQuery, mutation).",
    value: "rename-query-and-mutation-result",
  },
  {
    name: "Transform mutation hook return types from spreading to mutation property",
    value: "v5/mutation-result-to-mutation-property",
  },
  {
    name: "refine3-to-refine4: Transform from refine 3.x.x to at least 4.0.0",
    value: "refine3-to-refine4",
  },
  {
    name: "antd4-to-antd5: Transform from antd 4.x.x to at least 5.x.x",
    value: "antd4-to-antd5",
  },
  {
    name: "refine2-to-refine3: Transform from refine 2.x.x to at least 3.0.0",
    value: "refine2-to-refine3",
  },
  {
    name: "refine1-to-refine2: Transform from refine 1.x.x to at least 2.0.0",
    value: "refine1-to-refine2",
  },
];

function expandFilePathsIfNeeded(filesBeforeExpansion) {
  const shouldExpandFiles = filesBeforeExpansion.some((file) =>
    file.includes("*"),
  );
  return shouldExpandFiles
    ? globby.sync(filesBeforeExpansion)
    : filesBeforeExpansion;
}

export async function run(): Promise<void> {
  const cli = meow({
    description: "Codemods for updating refine apps.",
    help: `
    Usage
      $ npx @refinedev/codemod <transform> <path> <...options>
        path         Files or directory to transform. Can be a glob like pages/**.js
    Options
      --force            Bypass Git safety checks and forcibly run codemods
      --dry              Dry run (no changes are made to files)
      --print            Print transformed files to your terminal
      --jscodeshift  (Advanced) Pass options directly to jscodeshift
    `,
    flags: {
      boolean: ["force", "dry", "print", "help"],
      string: ["_"],
      alias: {
        h: "help",
      },
    },
  } as meow.Options<meow.AnyFlags>);

  if (!cli.flags.dry) {
    checkGitStatus(cli.flags.force);
  }

  if (
    cli.input[0] &&
    !TRANSFORMER_INQUIRER_CHOICES.find((x) => x.value === cli.input[0])
  ) {
    console.error("Invalid transform choice, pick one of:");
    console.error(
      TRANSFORMER_INQUIRER_CHOICES.map((x) => `- ${x.value}`).join("\n"),
    );
    process.exit(1);
  }

  const { files, transformer } = await inquirer.prompt([
    {
      type: "input",
      name: "files",
      message: "On which files or directory should the codemods be applied?",
      when: !cli.input[1],
      default: ".",
      filter: (files) => files.trim(),
    },
    {
      type: "list",
      name: "transformer",
      message: "Which transform would you like to apply?",
      when: !cli.input[0],
      pageSize: TRANSFORMER_INQUIRER_CHOICES.length,
      choices: TRANSFORMER_INQUIRER_CHOICES,
    },
  ]);

  const filesBeforeExpansion = cli.input[1] || files;
  const filesExpanded = expandFilePathsIfNeeded([filesBeforeExpansion]);

  const selectedTransformer = cli.input[0] || transformer;

  if (selectedTransformer === "refine3-to-refine4") {
    const isAntdVersion3x = await checkAntdVersionIs3x();

    if (isAntdVersion3x) {
      console.log();

      console.log(
        "Uppss!, we encountered an issue that prevents us from upgrading your project to refine@4",
      );
      console.log(
        "You are using version 4 of Ant Design. refine@4 uses version 5 of Ant Design.",
      );
      console.log(
        `Before upgrading your project to refine@4, please upgrade your Ant Design to version 5. Don't worry, we have codemod support for this upgrade 🎉.`,
      );
      console.log(
        `To upgrade now, visit Migration Guide document > ${chalk.green(
          "https://refine.dev/docs/api-reference/antd/migration-guide/v4-to-v5/",
        )}`,
      );

      process.exit(0);
    }
  }

  if (!filesExpanded.length) {
    console.log(`No files found matching ${filesBeforeExpansion.join(" ")}`);
    return null;
  }

  await runTransform({
    files: filesExpanded,
    flags: cli.flags,
    transformer: selectedTransformer,
  });

  if (transformsWithPostTransform.includes(selectedTransformer)) {
    const transformerPath = path.join(
      transformerDirectory,
      `${selectedTransformer}.js`,
    );

    await require(transformerPath).postTransform(filesExpanded, cli.flags);
  }
}

run();
