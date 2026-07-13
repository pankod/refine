const fs = require("fs");
const path = require("path");

const content = "#! /usr/bin/env node";

const packageNames = ["cli", "devtools-server"];

for (const packageName of packageNames) {
  const distPath = path.resolve(process.cwd(), "packages", packageName, "dist");
  fs.mkdirSync(distPath, { recursive: true });

  fs.writeFileSync(path.resolve(distPath, "cli.cjs"), content);
}
