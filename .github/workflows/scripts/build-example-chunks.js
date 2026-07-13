#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const EXAMPLES_DIR = "./examples";
const ignoredRegexes = [
  /^monorepo-/,
  /^with-nx/,
  /with-nextjs-headless/,
  /^blog-/,
  /store/,
  // Skip MUI + Remix (non-Vite) examples - MUI X v8 exports CSS files that Node.js can't handle.
  // Non-Vite Remix runs on Node.js which throws "SyntaxError: Unexpected token '.'" on CSS imports.
  // TODO: Re-enable once these examples migrate to Remix + Vite.
  /^with-remix-m/, // matches with-remix-material-ui and with-remix-mui
];
const CHUNK_COUNT = Number(process.env.CHUNKS ? process.env.CHUNKS : 1);
const BASE_REF = process.env.BASE_REF ? process.env.BASE_REF : "main";
const BUILD_ALL_EXAMPLES = process.env.BUILD_ALL_EXAMPLES === "true";

const getChangedPackages = () => {
  const p = require.resolve("lerna/dist/cli.js");

  const output = execSync(`node ${p} ls --since origin/${BASE_REF} --json`, {
    stdio: "pipe",
  });

  const changedPackages = JSON.parse(output.toString());

  return changedPackages.map((pkg) => pkg.name);
};

const isExampleAffected = (example, changedPackages) => {
  const examplePath = path.join(EXAMPLES_DIR, example);

  if (changedPackages.length === 0) {
    return false;
  }

  const pkgJson = JSON.parse(
    fs.readFileSync(path.join(examplePath, "package.json")),
  );

  const dependencies = Object.keys(pkgJson.dependencies || {});
  const devDependencies = Object.keys(pkgJson.devDependencies || {});

  const allDependencies = [...dependencies, ...devDependencies];

  return allDependencies.some((dependency) => {
    return changedPackages.includes(dependency);
  });
};

const isExampleModified = (example) => {
  const output = execSync(
    `git diff --quiet HEAD origin/${BASE_REF} -- ${EXAMPLES_DIR}/${example} cypress/e2e/${example} || echo changed`,
    { stdio: "pipe" },
  );

  return output.toString().includes("changed");
};

const hasPackageJson = (example) => {
  return fs.existsSync(path.join(EXAMPLES_DIR, example, "package.json"));
};

const hasE2eTests = (example) => {
  return fs.existsSync(path.join("./cypress/e2e", example));
};

const isDirectory = (example) => {
  return fs.statSync(path.join(EXAMPLES_DIR, example)).isDirectory();
};

const isIgnored = (example) => {
  return ignoredRegexes.some((regex) => regex.test(example));
};

const getExamples = () => {
  return fs
    .readdirSync(EXAMPLES_DIR)
    .filter((dir) => isDirectory(dir))
    .filter((dir) => !isIgnored(dir))
    .filter((dir) => hasPackageJson(dir));
};

//
// Get changed packages and affected examples
//
const changedPackages = getChangedPackages();

const examples = getExamples().filter((dir) =>
  BUILD_ALL_EXAMPLES
    ? true
    : isExampleAffected(dir, changedPackages) || isExampleModified(dir),
);

console.log(
  `Changed packages (${changedPackages.length}):\n- ${changedPackages.join(
    "\n- ",
  )}`,
);

console.log("");

console.log(
  `Affected examples (${examples.length}):\n- ${examples.join("\n- ")}`,
);

//
// Get examples with and without e2e tests
//
const examplesWithE2eTests = examples.filter((dir) => hasE2eTests(dir));

const examplesWithoutE2eTests = examples.filter(
  (dir) => !examplesWithE2eTests.includes(dir),
);

console.log(
  `\nFound ${examplesWithE2eTests.length} examples with e2e tests and ${examplesWithoutE2eTests.length} without.\n`,
);

//
// Split examples into chunks
//
const chunkSize = Math.ceil(examples.length / CHUNK_COUNT);

const chunks = [];

for (let i = 0; i < examples.length; i += chunkSize) {
  const tempChunk = [];

  for (j = 0; j < chunkSize; j++) {
    if (j % (CHUNK_COUNT / 2) === 1) {
      if (examplesWithE2eTests.length > 0) {
        tempChunk.push(examplesWithE2eTests.shift());
      } else if (examplesWithoutE2eTests.length > 0) {
        tempChunk.push(examplesWithoutE2eTests.shift());
      }
    } else {
      if (examplesWithoutE2eTests.length > 0) {
        tempChunk.push(examplesWithoutE2eTests.shift());
      }
    }
  }

  if (i + chunkSize >= examples.length) {
    tempChunk.push(...examplesWithE2eTests);

    tempChunk.push(...examplesWithoutE2eTests);
  }

  chunks.push(tempChunk);
}

//
// Set outputs
//

chunks.forEach((chunk, i) => {
  console.log(`::set-output name=CHUNK_${i + 1}::${chunk.join(",")}`);
});
