import type { SandpackBundlerFiles } from "@codesandbox/sandpack-client";

export const fromPropsToModules = ({
  autoHiddenFiles,
  visibleFiles,
  files,
  prefixedPath,
}: {
  prefixedPath: string;
  files: SandpackBundlerFiles;
  autoHiddenFiles?: boolean;
  visibleFiles: string[];
}): { directories: string[]; modules: string[] } => {
  const hasVisibleFilesOption = visibleFiles.length > 0;

  /**
   * When visibleFiles or activeFile are set, the hidden and active flags on the files prop are ignored.
   */
  const filterByHiddenProperty = autoHiddenFiles && !hasVisibleFilesOption;
  const filterByVisibleFilesOption = autoHiddenFiles && !!hasVisibleFilesOption;

  const fileListWithoutPrefix = Object.keys(files)
    .filter((filePath) => {
      const isValidatedPath = filePath.startsWith(prefixedPath);
      if (filterByVisibleFilesOption) {
        return isValidatedPath && visibleFiles.includes(filePath);
      }

      if (filterByHiddenProperty) {
        return isValidatedPath && !files[filePath]?.hidden;
      }

      return isValidatedPath;
    })
    .map((file) => file.substring(prefixedPath.length));

  const directories = new Set(
    fileListWithoutPrefix
      .filter((file) => file.includes("/"))
      .map((file) => `${prefixedPath}${file.split("/")[0]}/`),
  );

  const modules = fileListWithoutPrefix
    .filter((file) => !file.includes("/"))
    .map((file) => `${prefixedPath}${file}`);

  return { directories: Array.from(directories), modules };
};
