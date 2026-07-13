import type { SandpackFile, SandpackFiles } from "@codesandbox/sandpack-react";

export const removeActiveFromFiles = (files: SandpackFiles) => {
  const newFiles = Object.keys(files).reduce((acc, file) => {
    const newFile = { ...(files[file] as SandpackFile) };
    delete newFile.active;
    return { ...acc, [file]: newFile };
  }, {} as SandpackFiles);

  return newFiles;
};

export const replaceActiveInFiles = (
  files: SandpackFiles,
  activeFile: string,
) => {
  const newFiles = Object.keys(files).reduce((acc, file) => {
    const newFile = { ...(files[file] as SandpackFile) };
    delete newFile.active;
    if (file === activeFile) {
      newFile.active = true;
    }
    return { ...acc, [file]: newFile };
  }, {} as SandpackFiles);

  return newFiles;
};
