#!/usr/bin/env node

const fs = require("fs");
const waitOn = require("wait-on");
const pidtree = require("pidtree");
const { join: pathJoin } = require("path");
const { exec } = require("child_process");

const EXAMPLES_DIR = "./examples";
const EXAMPLES = process.env.EXAMPLES ? process.env.EXAMPLES : [];

const execPromise = (command) => {
  let commandProcess;
  const promise = new Promise((resolve, reject) => {
    commandProcess = exec(command);

    commandProcess.stdout.on("data", console.log);
    commandProcess.stderr.on("data", console.error);

    commandProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });

  return {
    promise,
    pid: commandProcess.pid,
    process: commandProcess,
  };
};

const getProjectInfo = (path) => {
  // read package.json
  const pkg = fs.readFileSync(pathJoin(path, "package.json"), "utf8");

  // parse package.json
  const packageJson = JSON.parse(pkg);

  const projectName = packageJson.name;

  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});

  const allDependencies = [...dependencies, ...devDependencies];

  const command = `pnpm start --scope ${projectName}`;

  let port = 4173;

  if (
    allDependencies.includes("next") ||
    allDependencies.includes("@remix-run/node")
  ) {
    port = 3000;
  }

  return {
    port,
    command,
  };
};

const prettyLog = (bg, ...args) => {
  const colors = {
    blue: "\x1b[44m",
    red: "\x1b[41m",
    green: "\x1b[42m",
  };
  const code = colors[bg] || colors.blue;

  console.log(code, ...args, "\x1b[0m");
};

const getProjectsWithE2E = () => {
  return EXAMPLES.split(",")
    .map((path) => {
      const dir = pathJoin("./cypress/e2e", path);
      const isDirectory = fs.existsSync(dir);

      if (isDirectory) {
        return path;
      }
    })
    .filter(Boolean);
};

const waitOnFor = async (resource) => {
  try {
    await waitOn({
      resources: [resource],
      log: true,
    });

    return resource;
  } catch (error) {
    if (error) console.log(JSON.stringify(error, null, 2));

    return false;
  }
};

const waitForServer = async (port) => {
  // biome-ignore lint/suspicious/noAsyncPromiseExecutor: We have a valid use-case here.
  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      resolve(false);
    }, 720_000);

    try {
      const resolvedResource = await Promise.any([
        waitOnFor(`tcp:${port}`),
        waitOnFor(`http://localhost:${port}`),
        waitOnFor(`http://127.0.0.1:${port}`),
      ]);

      resolve(resolvedResource);
    } catch (error) {
      if (error) console.log(JSON.stringify(error, null, 2));

      reject(error);
    }
  });
};

const waitForClose = (resource) => {
  // biome-ignore lint/suspicious/noAsyncPromiseExecutor: We have a valid use-case here.
  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      resolve(false);
    }, 720_000);

    try {
      await waitOn({
        resources: [resource],
        reverse: true,
        log: true,
      });

      resolve(resource);
    } catch (error) {
      if (error) console.log(JSON.stringify(error, null, 2));

      reject(error);
    }
  });
};

const runTests = async () => {
  const examplesToRun = getProjectsWithE2E();

  if (examplesToRun.length === 0) {
    return { success: true, empty: true };
  }

  prettyLog("blue", `Running Tests for ${examplesToRun.length} Examples`);
  prettyLog("blue", `Examples: ${examplesToRun.join(", ")}`);
  console.log("\n");

  const failedExamples = []; // { name: string; error: any };

  for await (const path of examplesToRun) {
    console.log(`::group::Example ${path}`);

    const { port, command } = getProjectInfo(`${EXAMPLES_DIR}/${path}`);
    console.log("port", port);
    console.log("command", command);

    prettyLog("blue", `Running for ${path} at port ${port}`);

    prettyLog("blue", "Starting the dev server");

    let start;

    let failed = false;

    // build and start example
    try {
      start = exec(command);

      start.stdout.on("data", console.log);
      start.stderr.on("data", console.error);
    } catch (error) {
      prettyLog("red", "Error occured on starting the dev server");
      failed = true;
    }

    let respondedUrl = false;

    try {
      prettyLog("blue", `Waiting for the server to start at port ${port}`);

      const status = await waitForServer(port);
      if (!status) {
        prettyLog("red", "Error occured on waiting for the server to start");
        failed = true;
      } else {
        respondedUrl = status;
        prettyLog("green", `Server started at ${status}`);
      }
    } catch (error) {
      prettyLog("red", "Error occured on waiting for the server to start");
      if (error) console.log(JSON.stringify(error, null, 2));

      failed = true;
    }

    try {
      if (!failed) {
        const additionalParams = [
          `--record --group ${path}`,
          `--spec cypress/e2e/${path}`,
          `--config baseUrl=http://localhost:${port}`,
          "--browser chrome",
        ];

        const runCommand = `pnpm cypress:run ${additionalParams.join(" ")} `;

        prettyLog("blue", `Running tests for ${path}`);

        const { promise } = execPromise(runCommand);

        await promise;

        prettyLog("green", `Tests for ${path} finished`);
      }
    } catch (error) {
      prettyLog("red", `Error occured on tests for ${path}`);
      if (error) console.log(JSON.stringify(error, null, 2));

      failed = true;
    } finally {
      prettyLog("blue", "Killing the dev server");

      try {
        if (start.pid) {
          const pidsOfStart = await pidtree(start.pid, {
            root: true,
          });

          pidsOfStart.forEach((pid) => {
            process.kill(pid, "SIGINT");
          });

          await waitForClose(respondedUrl);

          prettyLog("green", "Killed the dev server");
        } else {
          failed = true;
        }
      } catch (error) {
        prettyLog("red", "Error occured on killing the dev server");
        if (error) console.log(JSON.stringify(error, null, 2));
        failed = true;
      }
    }

    if (!failed) {
      prettyLog("green", `Tests for ${path} finished successfully`);
    } else {
      failedExamples.push({ name: path });
      prettyLog("red", `Tests for ${path} failed.`);
    }

    console.log("::endgroup::");
  }

  if (failedExamples.length > 0) {
    return { success: false, failedExamples };
  }

  return { success: true };
};

runTests()
  .then(({ error, success, empty, failedExamples }) => {
    if (success) {
      prettyLog("green", empty ? "No Examples To Run" : "All Tests Passed");
      process.exitCode = 0;
      process.exit(0);
    } else {
      prettyLog("red", "Tests Failed or an Error Occured");
      if (error) console.log(JSON.stringify(error, null, 2));

      if (failedExamples)
        prettyLog(
          "red",
          `Failed Examples: \n${failedExamples
            .map(({ name }) => `  |-- ${name}`)
            .join("\n")}`,
        );

      process.exitCode = 1;
      process.exit(1);
    }
  })
  .catch((error) => {
    prettyLog("red", "Tests Failed or an Error Occured");
    if (error) console.log(JSON.stringify(error, null, 2));
    process.exitCode = 1;
    process.exit(1);
  });
