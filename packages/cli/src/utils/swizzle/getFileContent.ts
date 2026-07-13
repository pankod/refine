import { readFileSync } from "fs-extra";
import { join } from "path";

export function getFileContent(
  this: undefined | { absolutePackageDir?: string },
  path: string,
): string | undefined {
  if (!this?.absolutePackageDir) {
    return undefined;
  }
  try {
    return readFileSync(join(this.absolutePackageDir, path)).toString();
  } catch (err) {
    return undefined;
  }
}
