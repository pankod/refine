import * as React from "react";
import clsx from "clsx";
import {
  useSandpack,
  useClassNames,
  stackClassName,
} from "@codesandbox/sandpack-react";

import type { SandpackBundlerFiles } from "@codesandbox/sandpack-client";

import { ModuleList } from "./module-list";

export interface SandpackFileExplorerProp {
  /**
   * enable auto hidden file in file explorer
   *
   * @description set with hidden property in files property
   * @default false
   */
  autoHiddenFiles?: boolean;

  initialCollapsedFolder?: string[];

  hasSolve?: boolean;
}

export const TutorialFileExplorer = ({
  className,
  autoHiddenFiles = false,
  initialCollapsedFolder = [],
  hasSolve,
  ...props
}: SandpackFileExplorerProp &
  React.HTMLAttributes<HTMLDivElement>): JSX.Element | null => {
  const {
    sandpack: {
      status,
      updateFile,
      deleteFile,
      activeFile,
      files,
      openFile,
      visibleFilesFromProps,
    },
    listen,
  } = useSandpack();
  const classNames = useClassNames();

  const [visibleFiles, setVisibleFiles] = React.useState<string[]>(
    visibleFilesFromProps,
  );

  const [defaultHiddenFiles] = React.useState<string[]>(
    Object.keys(files).filter((path) => !visibleFilesFromProps.includes(path)),
  );

  React.useEffect(() => {
    const visible = Object.keys(files).filter((path) => {
      const file = files[path];
      const isHidden = file.hidden || defaultHiddenFiles.includes(path);

      return !isHidden;
    });

    setVisibleFiles(visible);
  }, [files, defaultHiddenFiles]);

  React.useEffect(
    function watchFSFilesChanges() {
      if (status !== "running") return;

      const unsubscribe = listen((message) => {
        if (message.type === "fs/change") {
          updateFile(message.path, message.content, false);
        }

        if (message.type === "fs/remove") {
          deleteFile(message.path, false);
        }
      });

      return unsubscribe;
    },
    [status],
  );

  const orderedFiles = Object.keys(files)
    .sort()
    .reduce<SandpackBundlerFiles>((obj, key) => {
      obj[key] = files[key];
      return obj;
    }, {});

  return (
    <div
      className={clsx(
        classNames("file-explorer", [stackClassName, className]),
        "!h-full",
        "border-r border-r-zinc-300 dark:border-r-zinc-700",
        "flex-shrink-0",
        "!w-40",
        hasSolve && "pb-12",
      )}
      {...props}
    >
      <div
        className={clsx(
          classNames("file-explorer-list"),
          "h-full",
          "overflow-auto",
          "py-3",
          "px-1",
        )}
      >
        <ModuleList
          activeFile={activeFile}
          autoHiddenFiles={autoHiddenFiles}
          files={orderedFiles}
          initialCollapsedFolder={initialCollapsedFolder}
          prefixedPath="/"
          selectFile={openFile}
          visibleFiles={visibleFiles}
        />
      </div>
    </div>
  );
};

export const ExplorerToggleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M14 4a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1ZM14 8a1 1 0 0 0-1-1H7a1 1 0 0 0 0 2h6a1 1 0 0 0 1-1ZM14 12a1 1 0 0 0-1-1H3a1 1 0 1 0 0 2h10a1 1 0 0 0 1-1Z"
    />
  </svg>
);
