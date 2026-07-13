import { hasIncomatiblePackages, installMissingPackages } from "@utils/package";
import execa from "execa";

interface RunTransformerParams {
  incompatiblePackages: string[];
  requiredPackages: string[];
  integrationName: string;
  transformerFileName: string;
}

export const runTransformer = async (params: RunTransformerParams) => {
  const {
    incompatiblePackages,
    integrationName,
    requiredPackages,
    transformerFileName,
  } = params;
  if (hasIncomatiblePackages(incompatiblePackages)) return;

  await installMissingPackages(requiredPackages);

  console.log(`🚀 Setting up ${integrationName}...`);

  const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");
  const { stderr } = execa.sync(jscodeshiftExecutable, [
    "./",
    "--extensions=ts,tsx,js,jsx",
    "--parser=tsx",
    `--transform=${__dirname}/../src/transformers/integrations/${transformerFileName}.ts`,
    "--ignore-pattern=.cache",
    "--ignore-pattern=node_modules",
    "--ignore-pattern=build",
    "--ignore-pattern=.next",
    "--ignore-pattern=dist",
  ]);

  if (stderr) {
    console.log(stderr);
  }

  console.log(`🎉 ${integrationName} setup completed!`);
};
