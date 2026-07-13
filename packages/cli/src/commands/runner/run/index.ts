import { getPreferedPM, getScripts } from "@utils/package";
import chalk from "chalk";
import type { Command } from "commander";
import { runScript } from "../runScript";

const run = (program: Command) => {
  return program
    .command("run")
    .description(
      "Runs a defined package script. If no `command` is provided, it will list the available scripts",
    )
    .allowUnknownOption(true)
    .argument("[command] [args...]")
    .action(action);
};

const action = async (args: string[]) => {
  const [script, ...restArgs] = args;

  const scriptsInPackage = getScripts();

  // Show available scripts when no script is provided
  if (!script) {
    console.log(`Available via ${chalk.blue("`refine run`")}:\n`);
    for (const [key, value] of Object.entries(scriptsInPackage)) {
      console.log(`  ${key}`);
      console.log(`    ${chalk.dim(value)}`);
      console.log();
    }

    return;
  }

  // Check if script exists in package.json
  const isDefinedScript = Object.keys(scriptsInPackage).includes(script);
  // If script is not defined, run from node_modules
  if (!isDefinedScript) {
    const binPath = `${process.cwd()}/node_modules/.bin/${script}`;
    runScript(binPath, restArgs);
    return;
  }

  const pm = await getPreferedPM();
  runScript(pm.name, ["run", script, ...restArgs]);
};

export default run;
