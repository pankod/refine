import { vi, afterEach, describe, test, expect } from "vitest";
import path from "path";
import fs from "fs";
import { projectScripts } from "./projectScripts";
import { ProjectTypes } from "@definitions/projectTypes";

describe("REACT_SCRIPT project type", () => {
  const projectType = ProjectTypes.REACT_SCRIPT;

  describe("getDev with empty args", () => {
    test('should return array with only "start" if args is empty', () => {
      expect(projectScripts[projectType].getDev([])).toEqual(["start"]);
    });
  });

  describe("getStart with empty args", () => {
    test('should return array with only "start" if args is empty', () => {
      expect(projectScripts[projectType].getStart([])).toEqual(["start"]);
    });
  });

  describe("getBuild with empty args", () => {
    test('should return array with only "build" if args is empty', () => {
      expect(projectScripts[projectType].getBuild([])).toEqual(["build"]);
    });
  });

  describe("getDev", () => {
    test('should prepend "start" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getDev(args)).toEqual([
        "start",
        ...args,
      ]);
    });
  });

  describe("getStart", () => {
    test('should prepend "start" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getStart(args)).toEqual([
        "start",
        ...args,
      ]);
    });
  });

  describe("getBuild", () => {
    test('should prepend "build" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getBuild(args)).toEqual([
        "build",
        ...args,
      ]);
    });
  });
});

describe("VITE project type", () => {
  const projectType = ProjectTypes.VITE;

  describe("getDev with empty args", () => {
    test('should return array with only "dev" if args is empty', () => {
      expect(projectScripts[projectType].getDev([])).toEqual(["dev"]);
    });
  });

  describe("getStart with empty args", () => {
    test('should return array with only "preview" if args is empty', () => {
      expect(projectScripts[projectType].getStart([])).toEqual(["preview"]);
    });
  });

  describe("getBuild with empty args", () => {
    test('should return array with only "build" if args is empty', () => {
      expect(projectScripts[projectType].getBuild([])).toEqual(["build"]);
    });
  });

  describe("getDev", () => {
    test('should prepend "dev" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getDev(args)).toEqual([
        "dev",
        ...args,
      ]);
    });
  });

  describe("getStart", () => {
    test('should prepend "preview" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getStart(args)).toEqual([
        "preview",
        ...args,
      ]);
    });
  });

  describe("getBuild", () => {
    test('should prepend "build" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getBuild(args)).toEqual([
        "build",
        ...args,
      ]);
    });
  });
});

describe("NEXTJS project type", () => {
  const projectType = ProjectTypes.NEXTJS;

  describe("getDev with empty args", () => {
    test('should return array with only "dev" if args is empty', () => {
      expect(projectScripts[projectType].getDev([])).toEqual(["dev"]);
    });
  });

  describe("getStart with empty args", () => {
    test('should return array with only "start" if args is empty', () => {
      expect(projectScripts[projectType].getStart([])).toEqual(["start"]);
    });
  });

  describe("getBuild with empty args", () => {
    test('should return array with only "build" if args is empty', () => {
      expect(projectScripts[projectType].getBuild([])).toEqual(["build"]);
    });
  });

  describe("getDev", () => {
    test('should prepend "dev" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getDev(args)).toEqual([
        "dev",
        ...args,
      ]);
    });
  });

  describe("getStart", () => {
    test('should prepend "start" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getStart(args)).toEqual([
        "start",
        ...args,
      ]);
    });
  });

  describe("getBuild", () => {
    test('should prepend "build" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getBuild(args)).toEqual([
        "build",
        ...args,
      ]);
    });
  });
});

describe("REMIX project type", () => {
  const projectType = ProjectTypes.REMIX;

  describe("getDev with empty args", () => {
    test('should return array with only "dev" if args is empty', () => {
      expect(projectScripts[projectType].getDev([])).toEqual(["dev"]);
    });
  });

  describe("getStart with empty args", () => {
    test("should return default", () => {
      const logSpy = vi.spyOn(console, "warn");
      expect(projectScripts[projectType].getStart([])).toEqual([
        "./build/index.js",
      ]);
      expect(logSpy).toHaveBeenCalled();
    });
  });

  describe("getBuild with empty args", () => {
    test('should return array with only "build" if args is empty', () => {
      expect(projectScripts[projectType].getBuild([])).toEqual(["build"]);
    });
  });

  describe("getDev", () => {
    test('should prepend "dev" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getDev(args)).toEqual([
        "dev",
        ...args,
      ]);
    });
  });

  describe("getStart", () => {
    test("should return args", () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getStart(args)).toEqual([...args]);
    });
  });

  describe("getBuild", () => {
    test('should prepend "build" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getBuild(args)).toEqual([
        "build",
        ...args,
      ]);
    });
  });
});

describe("REMIX_VITE project type", () => {
  const projectType = ProjectTypes.REMIX_VITE;

  describe("getDev with empty args", () => {
    test('should return array with only "vite:dev" if args is empty', () => {
      expect(projectScripts[projectType].getDev([])).toEqual(["vite:dev"]);
    });
  });

  describe("getStart with empty args", () => {
    test("should return default", () => {
      const logSpy = vi.spyOn(console, "warn");
      expect(projectScripts[projectType].getStart([])).toEqual([
        "./build/server/index.js",
      ]);
      expect(logSpy).toHaveBeenCalled();
    });
  });

  describe("getBuild with empty args", () => {
    test('should return array with only "vite:build" if args is empty', () => {
      expect(projectScripts[projectType].getBuild([])).toEqual(["vite:build"]);
    });
  });

  describe("getDev", () => {
    test('should prepend "vite:dev" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getDev(args)).toEqual([
        "vite:dev",
        ...args,
      ]);
    });
  });

  describe("getStart", () => {
    test("should return args", () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getStart(args)).toEqual([...args]);
    });
  });

  describe("getBuild", () => {
    test('should prepend "vite:build" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getBuild(args)).toEqual([
        "vite:build",
        ...args,
      ]);
    });
  });
});

describe("REMIX_SPA project type", () => {
  const projectType = ProjectTypes.REMIX_SPA;

  describe("getDev with empty args", () => {
    test('should return array with only "vite:dev" if args is empty', () => {
      expect(projectScripts[projectType].getDev([])).toEqual(["vite:dev"]);
    });
  });

  describe("getStart with empty args", () => {
    test('should return array with only "preview" if args is empty', () => {
      expect(projectScripts[projectType].getStart([])).toEqual(["preview"]);
    });
  });

  describe("getBuild with empty args", () => {
    test('should return array with only "vite:build" if args is empty', () => {
      expect(projectScripts[projectType].getBuild([])).toEqual(["vite:build"]);
    });
  });

  describe("getDev", () => {
    test('should prepend "vite:dev" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getDev(args)).toEqual([
        "vite:dev",
        ...args,
      ]);
    });
  });

  describe("getStart", () => {
    test('should prepend "preview" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getStart(args)).toEqual([
        "preview",
        ...args,
      ]);
    });
  });

  describe("getBuild", () => {
    test('should prepend "vite:build" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getBuild(args)).toEqual([
        "vite:build",
        ...args,
      ]);
    });
  });
});

describe("CRACO project type", () => {
  const projectType = ProjectTypes.CRACO;

  describe("getDev with empty args", () => {
    test('should return array with only "start" if args is empty', () => {
      expect(projectScripts[projectType].getDev([])).toEqual(["start"]);
    });
  });

  describe("getStart with empty args", () => {
    test('should return array with only "start" if args is empty', () => {
      expect(projectScripts[projectType].getStart([])).toEqual(["start"]);
    });
  });

  describe("getBuild with empty args", () => {
    test('should return array with only "build" if args is empty', () => {
      expect(projectScripts[projectType].getBuild([])).toEqual(["build"]);
    });
  });

  describe("getDev", () => {
    test('should prepend "start" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getDev(args)).toEqual([
        "start",
        ...args,
      ]);
    });
  });

  describe("getStart", () => {
    test('should prepend "start" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getStart(args)).toEqual([
        "start",
        ...args,
      ]);
    });
  });

  describe("getBuild", () => {
    test('should prepend "build" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getBuild(args)).toEqual([
        "build",
        ...args,
      ]);
    });
  });
});

describe("PARCEL project type", () => {
  const projectType = ProjectTypes.PARCEL;

  describe("getDev with empty args", () => {
    test('should return array with only "start" if args is empty', () => {
      expect(projectScripts[projectType].getDev([])).toEqual(["start"]);
    });
  });

  describe("getStart with empty args", () => {
    test('should return array with only "start" if args is empty', () => {
      expect(projectScripts[projectType].getStart([])).toEqual(["start"]);
    });
  });

  describe("getBuild with empty args", () => {
    test('should return array with only "build" if args is empty', () => {
      expect(projectScripts[projectType].getBuild([])).toEqual(["build"]);
    });
  });

  describe("getDev", () => {
    test('should prepend "start" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getDev(args)).toEqual([
        "start",
        ...args,
      ]);
    });
  });

  describe("getStart", () => {
    test('should prepend "start" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getStart(args)).toEqual([
        "start",
        ...args,
      ]);
    });
  });

  describe("getBuild", () => {
    test('should prepend "build" to the args array', () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getBuild(args)).toEqual([
        "build",
        ...args,
      ]);
    });
  });
});

describe("UNKNOWN project type", () => {
  const projectType = ProjectTypes.UNKNOWN;

  describe("getDev with empty args", () => {
    test("should return empty array if args is empty", () => {
      expect(projectScripts[projectType].getDev([])).toEqual([]);
    });
  });

  describe("getStart with empty args", () => {
    test("should return empty array if args is empty", () => {
      expect(projectScripts[projectType].getStart([])).toEqual([]);
    });
  });

  describe("getBuild with empty args", () => {
    test("should return empty array if args is empty", () => {
      expect(projectScripts[projectType].getBuild([])).toEqual([]);
    });
  });

  describe("getDev", () => {
    test("should return the args array as is", () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getDev(args)).toEqual([...args]);
    });
  });

  describe("getStart", () => {
    test("should return the args array as is", () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getStart(args)).toEqual([...args]);
    });
  });

  describe("getBuild", () => {
    test("should return the args array as is", () => {
      const args = ["--arg1", "--arg2"];
      expect(projectScripts[projectType].getBuild(args)).toEqual([...args]);
    });
  });
});

describe("resolveBin (workspace support)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should find binary in cwd node_modules/.bin (standard setup)", () => {
    const mockCwd = "/project";
    vi.spyOn(process, "cwd").mockReturnValue(mockCwd);
    vi.spyOn(fs, "existsSync").mockImplementation((p) => {
      return p === path.join(mockCwd, "node_modules", ".bin", "vite");
    });

    expect(projectScripts[ProjectTypes.VITE].getBin()).toBe(
      path.join(mockCwd, "node_modules", ".bin", "vite"),
    );
  });

  test("should find binary in parent node_modules/.bin (monorepo workspace setup)", () => {
    const mockCwd = "/project/apps/admin";
    const workspaceRoot = "/project";
    vi.spyOn(process, "cwd").mockReturnValue(mockCwd);
    vi.spyOn(fs, "existsSync").mockImplementation((p) => {
      // Binary is NOT in the app's local node_modules, but IS in the workspace root
      return p === path.join(workspaceRoot, "node_modules", ".bin", "vite");
    });

    expect(projectScripts[ProjectTypes.VITE].getBin()).toBe(
      path.join(workspaceRoot, "node_modules", ".bin", "vite"),
    );
  });

  test("should find binary for next.js in parent node_modules/.bin (monorepo workspace setup)", () => {
    const mockCwd = "/project/apps/admin";
    const workspaceRoot = "/project";
    vi.spyOn(process, "cwd").mockReturnValue(mockCwd);
    vi.spyOn(fs, "existsSync").mockImplementation((p) => {
      return p === path.join(workspaceRoot, "node_modules", ".bin", "next");
    });

    expect(projectScripts[ProjectTypes.NEXTJS].getBin()).toBe(
      path.join(workspaceRoot, "node_modules", ".bin", "next"),
    );
  });
});
