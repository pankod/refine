import type { RefinePackageInstalledVersionData } from "../../definitions/package";
import chalk from "chalk";
import center from "center-align";
import {
  getDependencies,
  getPreferedPM,
  getScripts,
} from "../../utils/package";
import { getVersionTable } from "../version-table";

export interface UpdateWarningTableParams {
  data: RefinePackageInstalledVersionData[];
}

export const printUpdateWarningTable = async (
  params: UpdateWarningTableParams,
) => {
  const data = params?.data;
  const tableHead = Object.keys(data?.[0] || {});
  if (!data || !tableHead.length) return;

  const { table, width } = getVersionTable(data);
  console.log();
  console.log(center("Update Available", width));
  console.log();
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
  console.log(table);
  console.log(
    center(
      `To update ${chalk.bold("`Refine`")} packages with wanted version`,
      width,
    ),
  );
  console.log(
    center(
      ` Run the following command: ${chalk.yellowBright(
        await getInstallCommand(),
      )}`,
      width,
    ),
  );
  console.log();
};

export const getInstallCommand = async () => {
  const fallbackCommand = "npx @refinedev/cli update";

  const dependencies = getDependencies();
  const scriptKeys = Object.keys(getScripts());

  const hasCli = dependencies.includes("@refinedev/cli");
  const hasScript = scriptKeys.includes("refine");

  if (!hasCli && !hasScript) {
    return fallbackCommand;
  }

  const pm = await getPreferedPM();

  if (hasScript) {
    return `${pm.name} run refine update`;
  }

  if (hasCli) {
    return "npx refine update";
  }

  return fallbackCommand;
};
