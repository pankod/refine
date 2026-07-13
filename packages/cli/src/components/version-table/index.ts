import type { RefinePackageInstalledVersionData } from "../../definitions/package";
import Table from "cli-table3";
import chalk from "chalk";
import { removeANSIColors } from "@utils/text";

const columns = {
  name: "name",
  current: "current",
  wanted: "wanted",
  latest: "latest",
  changelog: "changelog",
} as const;

const orderedColumns: (typeof columns)[keyof typeof columns][] = [
  columns.name,
  columns.current,
  columns.wanted,
  columns.latest,
  columns.changelog,
];

export const getVersionTable = (
  packages: RefinePackageInstalledVersionData[] = [],
) => {
  const tableHead = Object.keys(packages?.[0] || {});
  if (!packages || !tableHead.length) return { table: "", width: 0 };

  const terminalWidth = process.stdout.columns || 80;

  const nameColumnWidth =
    Math.max(...packages.map((row) => row.name.length)) + 2;
  const versionColumnWidth = 7 + 2;
  const bordersWidth = 6;
  const changelogColumnWidth = Math.min(
    35,
    terminalWidth - nameColumnWidth - versionColumnWidth * 3 - bordersWidth,
  );

  const columnWidths = {
    name: nameColumnWidth,
    current: versionColumnWidth,
    wanted: versionColumnWidth,
    latest: versionColumnWidth,
    changelog: changelogColumnWidth,
  } as const;

  const table = new Table({
    head: orderedColumns,
    wordWrap: false,
    wrapOnWordBoundary: true,
    colWidths: orderedColumns.map((column) => columnWidths[column]),
    style: {
      head: ["blue"],
    },
  });

  const ellipsisFromCenter = (text: string, length: number) => {
    // if text is longer than length, cut it from the center to fit the length (add ellipsis)
    if (text.length > length) {
      const fitLength = length - 3;
      const start = text.slice(0, Math.floor(fitLength / 2));
      const end = text.slice(-Math.ceil(fitLength / 2));
      return `${start}...${end}`;
    }
    return text;
  };

  packages.forEach((row) => {
    table.push(
      orderedColumns.map((column) => {
        const columnValue = row[column];
        if (!columnValue) return columnValue;

        if (column === "latest" || column === "wanted") {
          const installedVersion = parseVersions(row.current);
          const latestVersion = parseVersions(columnValue);
          const colors = getColorsByVersionDiffrence(
            installedVersion,
            latestVersion,
          );
          const textMajor = chalk[colors.major](latestVersion.major);
          const textMinor = chalk[colors.minor](latestVersion.minor);
          const textPatch = chalk[colors.patch](latestVersion.patch);
          return `${textMajor}.${textMinor}.${textPatch}`;
        }

        if (column === "changelog") {
          return chalk.blueBright.underline(columnValue);
        }

        return columnValue;
      }),
    );
  });

  const tableString = table.toString();
  const tableWidth = removeANSIColors(
    tableString.split("\n")?.[0] || "",
  ).length;

  return { table: tableString, width: tableWidth };
};

const parseVersions = (text: string) => {
  const versions = text.split(".");
  return {
    major: versions[0],
    minor: versions[1],
    patch: versions[2],
  };
};

const getColorsByVersionDiffrence = (
  installedVersion: ReturnType<typeof parseVersions>,
  nextVersion: ReturnType<typeof parseVersions>,
) => {
  const isMajorDiffrence =
    installedVersion.major.trim() !== nextVersion.major.trim();

  if (isMajorDiffrence)
    return {
      major: "red",
      minor: "red",
      patch: "red",
    } as const;

  const isMinorDiffrence =
    installedVersion.minor.trim() !== nextVersion.minor.trim();

  if (isMinorDiffrence)
    return {
      major: "white",
      minor: "yellow",
      patch: "yellow",
    } as const;

  const isPatchDiffrence =
    installedVersion.patch.trim() !== nextVersion.patch.trim();
  if (isPatchDiffrence)
    return {
      major: "white",
      minor: "white",
      patch: "green",
    } as const;

  return {
    major: "white",
    minor: "white",
    patch: "white",
  } as const;
};
