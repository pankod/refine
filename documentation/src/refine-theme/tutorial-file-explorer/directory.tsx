import * as React from "react";

import type { SandpackBundlerFiles } from "@codesandbox/sandpack-client";
import type { SandpackOptions } from "@codesandbox/sandpack-react";

import { File } from "./file";
import { ModuleList } from "./module-list";

import type { SandpackFileExplorerProp } from ".";

export interface Props extends SandpackFileExplorerProp {
  prefixedPath: string;
  files: SandpackBundlerFiles;
  selectFile: (path: string) => void;
  activeFile: NonNullable<SandpackOptions["activeFile"]>;
  depth: number;
  visibleFiles: NonNullable<SandpackOptions["visibleFiles"]>;
}

export const Directory: React.FC<Props> = ({
  prefixedPath,
  files,
  selectFile,
  activeFile,
  depth,
  autoHiddenFiles,
  visibleFiles,
  initialCollapsedFolder,
}) => {
  const [open, setOpen] = React.useState(
    !initialCollapsedFolder?.includes(prefixedPath),
  );

  const toggle = (): void => setOpen((prev) => !prev);

  return (
    <div key={prefixedPath}>
      <File
        depth={depth}
        isDirOpen={open}
        onClick={toggle}
        path={`${prefixedPath}/`}
      />

      {open && (
        <ModuleList
          activeFile={activeFile}
          autoHiddenFiles={autoHiddenFiles}
          depth={depth + 1}
          files={files}
          initialCollapsedFolder={initialCollapsedFolder}
          prefixedPath={prefixedPath}
          selectFile={selectFile}
          visibleFiles={visibleFiles}
        />
      )}
    </div>
  );
};
