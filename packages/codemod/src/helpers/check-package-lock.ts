import fs from "fs";
import path from "path";

export function checkPackageLock(
  root: string,
): "package-lock.json" | "yarn.lock" {
  const yarnLockPath = path.join(root, "yarn.lock");

  try {
    if (fs.existsSync(yarnLockPath)) {
      return "yarn.lock";
    }
  } catch (err) {
    return "package-lock.json";
  }
}
