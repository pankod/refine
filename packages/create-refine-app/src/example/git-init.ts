import execa from "execa";
import path from "path";
import rimraf from "rimraf";

function isInGitRepository(root: string): boolean {
  try {
    execa.commandSync("git rev-parse --is-inside-work-tree", {
      stdio: "ignore",
      cwd: root,
    });
    return true;
  } catch (_) {}
  return false;
}

function isInMercurialRepository(root: string): boolean {
  try {
    execa.commandSync("hg --cwd . root", { stdio: "ignore", cwd: root });
    return true;
  } catch (_) {}
  return false;
}

export function gitInit(root: string, message: string) {
  let didInit = false;

  try {
    execa.commandSync("git --version", { stdio: "ignore", cwd: root });
  } catch (_) {
    return "git-not-found";
  }

  if (isInGitRepository(root) || isInMercurialRepository(root)) {
    return "already-in-repository";
  }

  try {
    execa.commandSync("git init", { stdio: "ignore", cwd: root });
  } catch (e) {
    return "git-init-failed";
  }

  didInit = true;

  try {
    execa.commandSync("git checkout -b main", {
      stdio: "ignore",
      cwd: root,
    });

    execa.commandSync("git add -A", { stdio: "ignore", cwd: root });

    execa.sync("git", ["commit", `--message="${message}"`], {
      stdio: "ignore",
      cwd: root,
    });
  } catch (e) {
    if (didInit) {
      try {
        rimraf.sync(path.join(root, ".git"));
      } catch (_) {}
    }

    return "git-commit-failed";
  }

  return "success";
}
