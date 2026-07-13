import execa from "execa";
import whichPMRuns from "which-pm-runs";

export function findPM() {
  try {
    const { name } = whichPMRuns() || {};
    return name ?? "npm";
  } catch (err) {
    return "npm";
  }
}

export async function installDependencies(root: string) {
  try {
    await execa(findPM(), ["install"], {
      cwd: root,
      stdio: "ignore",
    });
    return true;
  } catch (err) {
    return false;
  }
}
