#!/usr/bin/env node

const fs = require("fs");

const COMMENT_BODY = process.env.COMMENT_BODY || false;

const NETLIFY_SITES = [
  "finefoods-antd",
  "finefoods-client",
  "finefoods-material-ui",
  "app-crm",
  "pixels",
  "invoicer",
  "win95",
];

const setOutput = (output) =>
  console.log(`::set-output name=EXAMPLES::${output}`);

const getPublishDir = (exampleName) => {
  if (fs.existsSync(`./examples/${exampleName}/next-env.d.ts`))
    return `./examples/${exampleName}/.next`;

  if (fs.existsSync(`./examples/${exampleName}/remix.config.js`))
    return `./examples/${exampleName}/build`;

  return `./examples/${exampleName}/dist`;
};

const getNetlifyConfigPath = (exampleName) => {
  const configPath = `./examples/${exampleName}/netlify.toml`;

  if (fs.existsSync(configPath)) return configPath;

  return "";
};

const buildExamplesOutput = (comment) => {
  if (!COMMENT_BODY) {
    setOutput("[]");
    return;
  }

  const re = /(?:\/deploy\s{1})((?:[\w-]*(?:,|, {1}| {1})?)*)(?:\n)?/g;

  const match = re.exec(comment);

  const examples = match?.[1]
    ?.split(",")
    .filter((m) => m.length > 1)
    .map((e) => e.trim())
    .filter((e) => NETLIFY_SITES.includes(e));

  if (!examples?.length) {
    setOutput("[]");

    return;
  }

  const output = examples.map((e) => {
    return {
      name: e,
      publish_dir: getPublishDir(e),
      netlify_config_path: getNetlifyConfigPath(e),
    };
  });

  setOutput(JSON.stringify({ include: output }));
};

buildExamplesOutput(COMMENT_BODY.trim());
