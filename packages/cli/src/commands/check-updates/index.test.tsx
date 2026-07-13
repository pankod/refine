import { vi } from "vitest";
import type {
  NpmOutdatedResponse,
  RefinePackageInstalledVersionData,
} from "@definitions/package";
import * as checkUpdates from "./index";
import * as packageUtils from "@utils/package";
import * as utils from "./utils";

const { getOutdatedRefinePackages } = checkUpdates;

test("Get outdated refine packages", async () => {
  const testCase: {
    input: NpmOutdatedResponse;
    output: RefinePackageInstalledVersionData[];
  } = {
    input: {
      "@refinedev/core": {
        current: "1.0.0",
        wanted: "1.0.1",
        latest: "2.0.0",
        dependent: "",
        location: "",
      },
      "@refinedev/cli": {
        current: "1.1.1",
        wanted: "1.1.1",
        latest: "1.1.0",
        dependent: "",
        location: "",
      },
      "@pankod/canvas2video": {
        current: "1.1.1",
        wanted: "1.1.1",
        latest: "1.1.1",
        dependent: "",
        location: "",
      },
      "@owner/package-name": {
        current: "1.1.1",
        wanted: "1.1.1",
        latest: "1.1.0",
        dependent: "",
        location: "",
      },
      "@owner/package-name1": {
        current: "N/A",
        wanted: "undefined",
        latest: "NaN",
        dependent: "",
        location: "",
      },
      "@owner/refine-react": {
        current: "1.0.0",
        wanted: "1.0.1",
        latest: "2.0.0",
        dependent: "",
        location: "",
      },
    },
    output: [
      {
        name: "@refinedev/core",
        current: "1.0.0",
        wanted: "1.0.1",
        latest: "2.0.0",
        changelog: "https://c.refine.dev/core",
        dependent: "",
        location: "",
      },
    ],
  };

  vi.spyOn(utils, "getOutdatedPackageList").mockResolvedValue(testCase.input);

  const result = await getOutdatedRefinePackages();
  expect(result).toEqual(testCase.output);
});

describe("getWantedWithPreferredWildcard", () => {
  it("package not found in package.json", () => {
    vi.spyOn(packageUtils, "getDependenciesWithVersion").mockReturnValue({});

    const result = checkUpdates.getWantedWithPreferredWildcard(
      "@refinedev/core",
      "1.0.1",
    );
    expect(result).toEqual("^1.0.1");
  });

  it("with carret", () => {
    vi.spyOn(packageUtils, "getDependenciesWithVersion").mockReturnValue({
      "@refinedev/core": "^1.0.0",
    });

    const result = checkUpdates.getWantedWithPreferredWildcard(
      "@refinedev/core",
      "1.0.1",
    );
    expect(result).toEqual("^1.0.1");
  });

  it("with tilda", () => {
    vi.spyOn(packageUtils, "getDependenciesWithVersion").mockReturnValue({
      "@refinedev/core": "~1.0.0",
    });

    const result = checkUpdates.getWantedWithPreferredWildcard(
      "@refinedev/core",
      "1.0.1",
    );
    expect(result).toEqual("~1.0.1");
  });

  it("without caret and tilda", () => {
    vi.spyOn(packageUtils, "getDependenciesWithVersion").mockReturnValue({
      "@refinedev/core": "1.0.0",
    });

    const result = checkUpdates.getWantedWithPreferredWildcard(
      "@refinedev/core",
      "1.0.1",
    );
    expect(result).toEqual("1.0.1");
  });

  it("with `.x.x`", () => {
    vi.spyOn(packageUtils, "getDependenciesWithVersion").mockReturnValue({
      "@refinedev/core": "1.x.x",
    });

    const result = checkUpdates.getWantedWithPreferredWildcard(
      "@refinedev/core",
      "1.10.1",
    );
    expect(result).toEqual("1.x.x");
  });

  it("with `.x`", () => {
    vi.spyOn(packageUtils, "getDependenciesWithVersion").mockReturnValue({
      "@refinedev/core": "1.1.x",
    });

    const result = checkUpdates.getWantedWithPreferredWildcard(
      "@refinedev/core",
      "1.1.10",
    );
    expect(result).toEqual("1.1.x");
  });

  it("with `latest`", () => {
    vi.spyOn(packageUtils, "getDependenciesWithVersion").mockReturnValue({
      "@refinedev/core": "latest",
    });

    const result = checkUpdates.getWantedWithPreferredWildcard(
      "@refinedev/core",
      "3.1.1",
    );
    expect(result).toEqual("latest");
  });

  it("with range", () => {
    vi.spyOn(packageUtils, "getDependenciesWithVersion").mockReturnValue({
      "@refinedev/core": ">=1.0.0 <=1.1.9",
    });

    const result = checkUpdates.getWantedWithPreferredWildcard(
      "@refinedev/core",
      "1.0.0-rc.10",
    );
    expect(result).toEqual(">=1.0.0 <=1.1.9");
  });

  it("multiple sets", () => {
    vi.spyOn(packageUtils, "getDependenciesWithVersion").mockReturnValue({
      "@refinedev/core": "^2 <2.2 || > 2.3",
    });

    const result = checkUpdates.getWantedWithPreferredWildcard(
      "@refinedev/core",
      "2.3.1",
    );
    expect(result).toEqual("^2 <2.2 || > 2.3");
  });

  it("with `*`", () => {
    vi.spyOn(packageUtils, "getDependenciesWithVersion").mockReturnValue({
      "@refinedev/core": "*",
    });

    const result = checkUpdates.getWantedWithPreferredWildcard(
      "@refinedev/core",
      "3.1.1",
    );
    expect(result).toEqual("*");
  });
});

describe("getLatestMinorVersionOfPackage", () => {
  it.each([
    {
      versionList: [
        "1.0.0",
        "1.0.1",
        "1.0.2",
        "1.1.0",
        "1.1.1",
        "1.1.2",
        "2.0.0",
      ],
      currentVersion: "1.1.0",
      expected: "1.1.2",
    },
    {
      versionList: ["1.0.0", "1.0.1"],
      currentVersion: "1.0.1",
      expected: "1.0.1",
    },
    {
      versionList: [],
      currentVersion: "1.0.1",
      expected: "1.0.1",
    },
  ])("should return %p", async ({ versionList, currentVersion, expected }) => {
    vi.spyOn(packageUtils, "getAllVersionsOfPackage").mockResolvedValueOnce(
      versionList,
    );
    const result = await checkUpdates.getLatestMinorVersionOfPackage(
      "@refinedev/core",
      currentVersion,
    );
    expect(result).toEqual(expected);
  });
});
