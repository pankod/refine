import { getInstalledRefinePackages } from "@utils/package";
import type { Command } from "commander";
import envinfo from "envinfo";
import ora from "ora";

const whoami = (program: Command) => {
  return program
    .command("whoami")
    .description("View the details of the development environment")
    .action(action);
};

const action = async () => {
  const spinner = ora("Loading environment details...").start();
  const info = await envinfo.run(
    {
      System: ["OS", "CPU"],
      Binaries: ["Node", "Yarn", "npm"],
      Browsers: ["Chrome", "Firefox", "Safari"],
    },
    { showNotFound: true, markdown: true },
  );

  const packages = (await getInstalledRefinePackages()) || [];
  const packagesMarkdown = packages
    .map((pkg) => {
      return ` - ${pkg.name}: ${pkg.version}`;
    })
    .join("\n");

  spinner.stop();
  console.log(info);
  console.log("## Refine Packages:");
  console.log(packagesMarkdown);
};

export default whoami;
