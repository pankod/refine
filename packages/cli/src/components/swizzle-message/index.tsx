import React from "react";
import dedent from "dedent";
import { SWIZZLE_CODES } from "@utils/swizzle/codes";
import chalk from "chalk";
import { markedTerminalRenderer } from "@utils/marked-terminal-renderer";

type Params = {
  label: string;
  files: [targetPath: string, statusCode: string][];
  message?: string;
};

export const printSwizzleMessage = ({
  label,
  files,
  message = "**`Warning:`** You should use the component where you want to use it.",
}: Params) => {
  const errors = files.filter(([, statusCode]) =>
    Object.values(SWIZZLE_CODES)
      .filter((code) => code !== SWIZZLE_CODES.SUCCESS)
      .includes(statusCode),
  );

  let status = "success";

  switch (errors.length) {
    // no errors
    case 0:
      status = "success";
      break;
    // all errors
    case files.length:
      status = "error";
      break;
    // some errors
    default:
      status = "warning";
      break;
  }

  const clearFilePath = (filePath: string) => {
    const relative = filePath?.replace(process.cwd(), "");

    if (relative?.startsWith("/")) {
      return relative.slice(1);
    }
    if (relative?.startsWith("./")) {
      return relative.slice(2);
    }
    return relative;
  };

  const printStatusMessage = () => {
    switch (status) {
      case "success":
        console.log(
          chalk.blueBright(`Successfully swizzled ${chalk.bold(label)}`),
        );
        return;
      case "warning":
        console.log(
          chalk.yellowBright(
            `Swizzle completed with errors for ${chalk.bold(label)}`,
          ),
        );
        return;
      case "error":
        console.log(chalk.redBright(`Swizzle failed for ${chalk.bold(label)}`));
        return;
      default:
        return;
    }
  };

  const printFiles = () => {
    const chalks = [];

    chalks.push(chalk.dim(`File${files.length > 1 ? "s" : ""} created:`));
    chalks.push(
      files
        .map(([targetPath, statusCode]) => {
          if (statusCode === SWIZZLE_CODES.SUCCESS) {
            return chalk.cyanBright.dim(` - ${clearFilePath(targetPath)}`);
          }
          if (statusCode === SWIZZLE_CODES.TARGET_ALREADY_EXISTS) {
            return chalk.cyanBright.dim(
              ` - ${chalk.yellowBright.bold(
                "[FILE_ALREADY_EXISTS] ",
              )}${clearFilePath(targetPath)}`,
            );
          }
          if (statusCode === SWIZZLE_CODES.SOURCE_PATH_NOT_A_FILE) {
            return chalk.cyanBright.dim(
              ` - ${chalk.yellowBright.bold(
                "[SOURCE NOT FOUND] ",
              )}${clearFilePath(targetPath)}`,
            );
          }

          return chalk.cyanBright.dim(
            ` - ${chalk.yellowBright.bold(`[${statusCode}]`)}${clearFilePath(
              targetPath,
            )}`,
          );
        })
        .join("\n"),
    );

    console.log(chalks.join("\n"));
  };

  const printSwizzleMessage = () => {
    if (message && status !== "error") {
      console.log(markedTerminalRenderer(dedent(`\n${message}`)));
    }
  };

  console.log("");
  printStatusMessage();
  printFiles();
  console.log("");
  printSwizzleMessage();
};
