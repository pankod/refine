import fs from "fs";
import path from "path";

export const getRefineCoreVersion = () => {
  const packages = fs.readFileSync(
    path.join("..", "core", "package.json"),
    "utf8",
  );
  const { version } = JSON.parse(packages);
  return version;
};
