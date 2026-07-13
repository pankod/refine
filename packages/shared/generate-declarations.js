const { execSync } = require("child_process");
const fs = require("fs");
const { globSync } = require("glob");

const generateDeclarations = () => {
  execSync("tsc --project tsconfig.declarations.json", {
    stdio: [process.stdin, process.stdout, process.stdout],
  });
};

const getAllDtsFiles = (outDir) => {
  const files = globSync(`${outDir}/**/*.d.ts`);

  return files;
};

const organizeExtensionsForDts = (dtsFile) => {
  const mapFile = dtsFile.replace(".d.ts", ".d.ts.map");

  const ctsFile = dtsFile.replace(".d.ts", ".d.cts");
  const ctsMapFile = mapFile.replace(".d.ts.map", ".d.cts.map");

  const mtsFile = dtsFile.replace(".d.ts", ".d.mts");
  const mtsMapFile = mapFile.replace(".d.ts.map", ".d.mts.map");

  fs.copyFileSync(dtsFile, ctsFile);
  fs.copyFileSync(mapFile, ctsMapFile);
  fs.copyFileSync(dtsFile, mtsFile);
  fs.copyFileSync(dtsFile, mtsMapFile);
};

const main = () => {
  console.log("Generating declarations...");
  generateDeclarations();

  console.log("Generating d.mts and d.cts files...");
  getAllDtsFiles("dist").forEach((dtsFile) => {
    organizeExtensionsForDts(dtsFile);
  });

  console.log("✓ Declarations are generated.");
};

main();
