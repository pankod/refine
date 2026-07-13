#!/usr/bin/env node
import { Command } from "commander";

import figlet from "figlet";

import checkUpdates from "@commands/check-updates";
import createResource from "@commands/create-resource";
import { build, dev, run, start } from "@commands/runner";
import swizzle from "@commands/swizzle";
import update from "@commands/update";
import whoami from "@commands/whoami";
import devtools from "@commands/devtools";
import add from "@commands/add";
import { telemetryHook } from "@telemetryindex";
import { printAnnouncements } from "@utils/announcement";
import "@utils/env";

// It reads and updates from package.json during build. ref: tsup.config.ts
const REFINE_CLI_VERSION = "1.0.0";

const bootstrap = () => {
  const program = new Command();

  program
    .version(
      `@refinedev/cli@${REFINE_CLI_VERSION}`,
      "-v, --version",
      "Output the current version.",
    )
    .description(
      figlet.textSync("refine", {
        font: "Isometric1",
        horizontalLayout: "full",
        verticalLayout: "full",
        whitespaceBreak: true,
      }),
    )
    .usage("<command> [options]")
    .helpOption("-h, --help", "Output usage information.");

  // load commands
  swizzle(program);
  createResource(program);
  update(program);
  dev(program);
  build(program);
  start(program);
  run(program);
  checkUpdates(program);
  whoami(program);
  devtools(program);
  add(program);

  program.hook("preAction", async (thisCommand) => {
    if (thisCommand.args.includes("dev")) {
      await printAnnouncements();
    }
  });

  program.hook("postAction", (thisCommand) => {
    const command = thisCommand.args[0];

    if (["run"].includes(command)) return;

    telemetryHook();
  });

  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

bootstrap();
