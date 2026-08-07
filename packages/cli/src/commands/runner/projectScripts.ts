import path from "path";
import fs from "fs";
import { ProjectTypes } from "@definitions/projectTypes";

function resolveBin(name: string) {
  // Walk up from the current working directory to find node_modules/.bin/${name}.
  // This handles monorepo/workspace setups where packages may be hoisted to a
  // parent directory's node_modules.
  let dir = process.cwd();
  while (true) {
    if (process.platform === "win32") {
      const exePath = path.join(dir, "node_modules", ".bin", `${name}.exe`);
      if (fs.existsSync(exePath)) return exePath;
      const cmdPath = path.join(dir, "node_modules", ".bin", `${name}.cmd`);
      if (fs.existsSync(cmdPath)) return cmdPath;
    } else {
      const binPath = path.join(dir, "node_modules", ".bin", name);
      if (fs.existsSync(binPath)) return binPath;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break; // reached filesystem root
    dir = parent;
  }

  // Fall back to require.resolve for backward compatibility
  if (process.platform === "win32") {
    try {
      return require.resolve(`.bin/${name}.exe`);
    } catch {}
  }
  return require.resolve(`.bin/${name}`);
}

/**
 * Map `Refine` cli commands to project script
 */
export const projectScripts = {
  [ProjectTypes.REACT_SCRIPT]: {
    getDev: (args: string[]) => ["start", ...args],
    getStart: (args: string[]) => ["start", ...args],
    getBuild: (args: string[]) => ["build", ...args],
    getBin: () => resolveBin("react-scripts"),
  },
  [ProjectTypes.VITE]: {
    getDev: (args: string[]) => ["dev", ...args],
    getStart: (args: string[]) => ["preview", ...args],
    getBuild: (args: string[]) => ["build", ...args],
    getBin: () => resolveBin("vite"),
  },
  [ProjectTypes.NEXTJS]: {
    getDev: (args: string[]) => ["dev", ...args],
    getStart: (args: string[]) => ["start", ...args],
    getBuild: (args: string[]) => ["build", ...args],
    getBin: () => resolveBin("next"),
  },
  [ProjectTypes.REMIX]: {
    getDev: (args: string[]) => ["dev", ...args],
    getStart: (args: string[]) => {
      // remix-serve accepts a path to the entry file as an argument
      // if we have arguments, we will pass them to remix-serve and do nothing.
      // ex: `refine start ./build/index.js`
      const hasArgs = args?.length;
      if (hasArgs) {
        return args;
      }

      // otherwise print a warning and use `./build/index.js` as default
      console.log();
      console.warn(
        "🚨 Remix requires a path to the entry file. Please provide it as an argument to `refine start` command in package.json scripts",
      );
      console.warn("Refine will use `./build/index.js` as default");
      console.warn("Example: `refine start ./build/index.js`");
      console.log();

      return ["./build/index.js"];
    },
    getBuild: (args: string[]) => ["build", ...args],
    getBin: (type?: "dev" | "start" | "build") => {
      return resolveBin(type === "start" ? "remix-serve" : "remix");
    },
  },
  [ProjectTypes.REMIX_VITE]: {
    getDev: (args: string[]) => ["vite:dev", ...args],
    getStart: (args: string[]) => {
      // remix-serve accepts a path to the entry file as an argument
      // if we have arguments, we will pass them to remix-serve and do nothing.
      // ex: `refine start ./build/server/index.js`
      const hasArgs = args?.length;
      if (hasArgs) {
        return args;
      }

      // otherwise print a warning and use `./build/server/index.js` as default
      console.log();
      console.warn(
        "🚨 Remix requires a path to the entry file. Please provide it as an argument to `refine start` command in package.json scripts",
      );
      console.warn("Refine will use `./build/server/index.js` as default");
      console.warn("Example: `refine start ./build/server/index.js`");
      console.log();

      return ["./build/server/index.js"];
    },
    getBuild: (args: string[]) => ["vite:build", ...args],
    getBin: (type?: "dev" | "start" | "build") => {
      return resolveBin(type === "start" ? "remix-serve" : "remix");
    },
  },
  [ProjectTypes.REMIX_SPA]: {
    getDev: (args: string[]) => ["vite:dev", ...args],
    getStart: (args: string[]) => ["preview", ...args],
    getBuild: (args: string[]) => ["vite:build", ...args],
    getBin: (type?: "dev" | "start" | "build") => {
      return resolveBin(type === "start" ? "vite" : "remix");
    },
  },
  [ProjectTypes.CRACO]: {
    getDev: (args: string[]) => ["start", ...args],
    getStart: (args: string[]) => ["start", ...args],
    getBuild: (args: string[]) => ["build", ...args],
    getBin: () => resolveBin("craco"),
  },
  [ProjectTypes.PARCEL]: {
    getDev: (args: string[]) => ["start", ...args],
    getStart: (args: string[]) => ["start", ...args],
    getBuild: (args: string[]) => ["build", ...args],
    getBin: () => resolveBin("parcel"),
  },
  [ProjectTypes.UNKNOWN]: {
    getDev: (args: string[]) => [...args],
    getStart: (args: string[]) => [...args],
    getBuild: (args: string[]) => [...args],
    getBin: () => {
      return "unknown";
    },
  },
};
