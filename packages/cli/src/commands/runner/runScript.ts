import { ProjectTypes } from "@definitions/projectTypes";
import { ENV } from "@utils/env";
import execa from "execa";

export const runScript = async (
  binPath: string,
  args: string[],
  env: Record<string, string> = {},
) => {
  if (binPath === "unknown") {
    const supportedProjectTypes = Object.values(ProjectTypes)
      .filter((v) => v !== "unknown")
      .join(", ");

    console.error(
      `We couldn't find executable for your project. Supported executables are ${supportedProjectTypes}.\nPlease use your own script directly. If you think this is an issue, please report it at: https://github.com/refinedev/refine/issues`,
    );

    return;
  }

  const execution = execa(binPath, args, {
    stdio: "pipe",
    windowsHide: false,
    env: {
      FORCE_COLOR: "true",
      REFINE_NO_TELEMETRY: ENV.REFINE_NO_TELEMETRY,
      ...env,
      ...process.env,
    },
  });

  execution.stdout?.pipe(process.stdout);
  execution.stderr?.pipe(process.stderr);

  return await execution;
};
