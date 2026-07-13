import type { SandpackBundlerFiles } from "@codesandbox/sandpack-client";
import * as React from "react";

import type { SandpackOptions } from "@codesandbox/sandpack-react";

import { Directory } from "./directory";
import { File } from "./file";
import { fromPropsToModules } from "./utils";

import type { SandpackFileExplorerProp } from ".";

export interface ModuleListProps extends SandpackFileExplorerProp {
  prefixedPath: string;
  files: SandpackBundlerFiles;
  selectFile: (path: string) => void;
  activeFile: NonNullable<SandpackOptions["activeFile"]>;
  depth?: number;
  visibleFiles: NonNullable<SandpackOptions["visibleFiles"]>;
}

export const ModuleList: React.FC<ModuleListProps> = ({
  depth = 0,
  activeFile,
  selectFile,
  prefixedPath,
  files,
  autoHiddenFiles,
  visibleFiles,
  initialCollapsedFolder,
}) => {
  const { directories, modules } = fromPropsToModules({
    visibleFiles,
    autoHiddenFiles,
    prefixedPath,
    files,
  });

  return (
    <div>
      {directories.map((dir) => (
        <Directory
          key={dir}
          activeFile={activeFile}
          autoHiddenFiles={autoHiddenFiles}
          depth={depth}
          files={files}
          initialCollapsedFolder={initialCollapsedFolder}
          prefixedPath={dir}
          selectFile={selectFile}
          visibleFiles={visibleFiles}
        />
      ))}

      {modules.map((file) => (
        <File
          key={file}
          active={activeFile === file}
          depth={depth}
          path={file}
          selectFile={selectFile}
        />
      ))}
    </div>
  );
};
