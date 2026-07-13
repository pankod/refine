import React from "react";
import { TutorialDocumentLayout } from "./tutorial-document-layout";
import clsx from "clsx";

import type {
  CodeEditorProps,
  SandpackFiles,
  SandpackInternal,
  SandpackInternalOptions,
  SandpackPredefinedTemplate,
  TemplateFiles,
} from "@codesandbox/sandpack-react";

import { nightOwl, aquaBlue } from "@codesandbox/sandpack-themes";

import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from "@codesandbox/sandpack-react";

import { useColorMode } from "@docusaurus/theme-common";
import { TutorialFileExplorer } from "./tutorial-file-explorer";
import { motion, AnimatePresence } from "framer-motion";
import { useTutorialLayout } from "../context/tutorial-layout-context";

type SandpackProps = React.ComponentProps<SandpackInternal> & {
  startRoute?: string;
  showOpenInCodeSandbox?: boolean;
  showNavigator?: boolean;
  showLineNumbers?: boolean;
  initialPercentage?: number;
  dependencies?: React.ComponentProps<SandpackInternal>["customSetup"]["dependencies"];
  height?: number;
  previewOnly?: boolean;
  layout?: "row" | "col" | "col-reverse";
  className?: string;
  wrapperClassName?: string;
  showFiles?: boolean;
  showReadOnly?: boolean;
  showConsole?: boolean;
  hidePreview?: boolean;
  parentResizing?: boolean;
};

type Props = React.PropsWithChildren<
  SandpackProps & {
    contentOnly?: boolean;
    contentPercentage?: number;
    finalFiles?: SandpackFiles;
  }
>;

const maxPercentage = 70;

export const TutorialSandpack = ({
  children,
  contentOnly,
  finalFiles,
  ...sandpackProps
}: Props) => {
  const { contentPercentage, setContentPercentage } = useTutorialLayout();
  const [resizing, setResizing] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [mobileVisiblePanel, setMobileVisiblePanel] = React.useState<
    "editor" | "tutorial"
  >("tutorial");

  React.useEffect(() => {
    const handleMouseUp = () => {
      setResizing(false);
    };

    if (resizing !== null) {
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }

    return;
  }, [resizing]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizing) {
        const containerRect = containerRef.current?.getBoundingClientRect();

        if (!containerRect) return;

        const newContentPercentage = Math.min(
          maxPercentage,
          Math.max(
            100 - maxPercentage,
            ((e.clientX - containerRect.left) / containerRect.width) * 100,
          ),
        );

        setContentPercentage(newContentPercentage);
      }
    };

    if (resizing !== null) {
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }

    return;
  }, [resizing]);

  React.useEffect(() => {
    const currentCursor = document.body.style.cursor;

    if (resizing) {
      document.body.style.cursor = "col-resize";
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      document.body.style.cursor = currentCursor;
    };
  }, [resizing]);

  const codeEditorOptions: CodeEditorProps = {
    showTabs: sandpackProps?.options?.showTabs,
    showLineNumbers: sandpackProps?.options?.showLineNumbers,
    showInlineErrors: sandpackProps?.options?.showInlineErrors,
    wrapContent: sandpackProps?.options?.wrapContent,
    closableTabs: sandpackProps?.options?.closableTabs,
    initMode: sandpackProps?.options?.initMode,
    extensions: sandpackProps?.options?.codeEditor?.extensions,
    extensionsKeymap: sandpackProps?.options?.codeEditor?.extensionsKeymap,
    readOnly: sandpackProps?.options?.readOnly,
    showReadOnly:
      sandpackProps.showReadOnly ?? sandpackProps?.options?.showReadOnly,
    additionalLanguages:
      sandpackProps?.options?.codeEditor?.additionalLanguages,
  };

  return (
    <TutorialSandpackBase parentResizing={resizing} {...sandpackProps}>
      <div
        className={clsx(
          "h-[calc(100dvh-112px-57px)]",
          "tutorial-sm:h-[calc(100dvh-64px-57px)]",
          "flex-1",
          "flex",
          "!w-full",
          "items-stretch",
          "justify-start",
          "bg-zinc-100 dark:bg-refine-tutorial-dark-bg",
        )}
        ref={containerRef}
      >
        <div
          className={clsx(
            "overflow-hidden",
            "border-r",
            "border-r-zinc-300 dark:border-r-zinc-700",
            "bg-zinc-0 dark:bg-zinc-800",
            mobileVisiblePanel === "editor" && "max-w-0 tutorial-md:max-w-none",
            mobileVisiblePanel === "tutorial" &&
              "min-w-full tutorial-md:min-w-0",
          )}
          style={{
            width: contentOnly
              ? "100%"
              : `calc(${contentPercentage}% - (0.625rem / 2))`,
          }}
        >
          <div
            className={clsx(
              "w-full",
              "max-h-full",
              "h-full",
              "overflow-scroll",
              "px-6 tutorial-sm:px-8",
              "pb-6",
            )}
          >
            <TutorialDocumentLayout>
              <div>{children}</div>
            </TutorialDocumentLayout>
          </div>
        </div>
        <button
          type="button"
          className={clsx(
            contentOnly ? "hidden" : "hidden tutorial-md:flex",
            "w-2",
            "appearance-none",
            "outline-none",
            "bg-zinc-100 dark:bg-refine-tutorial-dark-bg",
            "border-0",
            "cursor-col-resize",
            "items-center justify-center",
          )}
          onMouseDown={(event) => {
            setResizing(true);
            event.preventDefault();
          }}
        >
          <ResizeHandleIcon
            className={clsx(
              "w-1",
              "text-zinc-400",

              "dark:text-zinc-700",
            )}
          />
        </button>
        <div
          className={clsx(
            contentOnly ? "hidden" : "",
            "overflow-hidden",
            mobileVisiblePanel === "tutorial" &&
              "max-w-0 tutorial-md:max-w-none",
            mobileVisiblePanel === "editor" && "min-w-full tutorial-md:min-w-0",
          )}
          style={{
            width: `calc(${100 - contentPercentage}% - (0.625rem / 2))`,
          }}
        >
          <SandpackRightSide
            sandpackProps={sandpackProps}
            startRoute={sandpackProps.startRoute}
            parentResizing={resizing}
            codeEditorOptions={codeEditorOptions}
            finalFiles={finalFiles}
          />
        </div>
      </div>
      <div
        className={clsx(
          "flex tutorial-md:hidden",
          "p-2",
          "w-full",
          "border-t",
          "border-t-zinc-300 dark:border-t-zinc-700",
          "justify-center",
        )}
      >
        <div
          className={clsx(
            "rounded-[40px]",
            "p-1",
            "gap-1",
            "flex",
            "items-center",
            "justify-center",
            "bg-zinc-100 dark:bg-zinc-700",
            "text-sm",
          )}
        >
          <button
            type="button"
            onClick={() => setMobileVisiblePanel("tutorial")}
            className={clsx(
              "appearance-none",
              "outline-none",
              "border-none",
              "w-[166px]",
              "p-1.5",
              "rounded-[32px]",
              "text-center",
              mobileVisiblePanel !== "tutorial" &&
                "text-zinc-500 dark:text-zinc-400",
              mobileVisiblePanel === "tutorial" && [
                "text-zinc-800 dark:text-zinc-100",
                "bg-zinc-0 dark:bg-zinc-600",
                "shadow-[0px_1px_0px_0px_#E3E4E5] dark:shadow-[0px_-1px_0px_0px_#667084]",
              ],
              "transition-colors",
              "ease-in-out",
              "duration-200",
            )}
          >
            Tutorial
          </button>
          <button
            type="button"
            onClick={() => setMobileVisiblePanel("editor")}
            className={clsx(
              contentOnly ? "hidden" : "",
              "appearance-none",
              "outline-none",
              "border-none",
              "w-[166px]",
              "p-1.5",
              "rounded-[32px]",
              "text-center",
              mobileVisiblePanel !== "editor" &&
                "text-zinc-500 dark:text-zinc-400",
              mobileVisiblePanel === "editor" && [
                "text-zinc-800 dark:text-zinc-100",
                "bg-zinc-0 dark:bg-zinc-600",
                "shadow-[0px_1px_0px_0px_#E3E4E5] dark:shadow-[0px_-1px_0px_0px_#667084]",
              ],
              "transition-colors",
              "ease-in-out",
              "duration-200",
            )}
          >
            Editor
          </button>
        </div>
      </div>
    </TutorialSandpackBase>
  );
};

const TutorialSandpackBase = ({
  children,
  initialPercentage = 50,
  dependencies,
  options = {
    showTabs: true,
    initMode: "lazy",
    classes: {
      "sp-layout": "!rounded-lg !border-zinc-300 dark:!border-zinc-700",
      "sp-close-button": "!visible",
      "sp-editor":
        "!h-full !gap-0 border-r !border-r-zinc-300 dark:!border-r-zinc-700 overflow-hidden",
      "sp-stack": "!h-full",
      "sp-tabs":
        "!border-b-zinc-300 dark:!border-b-zinc-700 !bg-zinc-0 dark:!bg-zinc-800",
      "sp-tabs-scrollable-container": "!min-h-[32px] scrollbar-hidden",
      "sp-input":
        "!text-zinc-800 dark:!text-zinc-100 !bg-zinc-200 dark:!bg-zinc-700 !pb-[5px]",
      "sp-cm": clsx(
        "p-0 bg-transparent",
        "[&>.cm-editor]:!bg-refine-react-light-code",
        "[&>.cm-editor]:dark:!bg-refine-react-dark-code",
        "[&_.cm-gutters]:!bg-refine-react-light-code",
        "[&_.cm-gutters]:dark:!bg-refine-react-dark-code",
        "[&_.cm-activeLine]:!bg-zinc-100 [&_.cm-activeLine]:dark:!bg-zinc-800",
      ),
      "sp-icon-standalone":
        "!bg-zinc-300 dark:!bg-zinc-700 !text-zinc-400 dark:!text-zinc-500",
      "sp-tab-button": clsx(
        "!h-8",
        "!px-2 !pb-2 !pt-1.5",
        "!text-zinc-800 dark:!text-zinc-100",
        "!border !border-solid !border-b-0 !border-x-zinc-300 dark:!border-x-zinc-700",
        "-ml-px first:ml-0",
        "!border-t-2 !border-t-transparent [&[data-active='true']]:!border-t-refine-react-light-link dark:[&[data-active='true']]:!border-t-refine-react-dark-link",
      ),
    },
  },
  template = "react-ts",
  customSetup,
  files,
  ...props
}: Props) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { colorMode } = useColorMode();
  options ??= {};
  options.resizablePanels ??= true;
  options.editorWidthPercentage ??= initialPercentage ?? 50;

  const providerOptions: SandpackInternalOptions<
    SandpackFiles,
    SandpackPredefinedTemplate
  > = {
    /**
     * TS-why: Type 'string | number | symbol' is not assignable to type 'string'
     */
    activeFile: options.activeFile as unknown as string,
    visibleFiles: options.visibleFiles as unknown as string[],
    recompileMode: options.recompileMode,
    recompileDelay: options.recompileDelay,
    autorun: options.autorun,
    autoReload: options.autoReload,
    bundlerURL: options.bundlerURL,
    startRoute: options.startRoute,
    skipEval: options.skipEval,
    fileResolver: options.fileResolver,
    initMode: options.initMode,
    initModeObserverOptions: options.initModeObserverOptions,
    externalResources: options.externalResources,
    logLevel: options.logLevel,
    classes: options.classes,
  };

  return (
    <SandpackProvider
      key={`${template}-${colorMode}-${mounted}`}
      customSetup={{ dependencies, ...customSetup }}
      files={files as TemplateFiles<SandpackPredefinedTemplate>}
      options={providerOptions}
      template={template}
      theme={
        colorMode === "light"
          ? {
              ...aquaBlue,
              colors: {
                ...aquaBlue.colors,
                accent: "#1D1E30",
                surface1: "transparent",
                surface2: "transparent",
                surface3: "transparent",
              },
            }
          : {
              ...nightOwl,
              colors: {
                ...nightOwl.colors,
                surface1: "transparent",
                surface2: "transparent",
                surface3: "transparent",
              },
            }
      }
      className="!w-full"
      {...props}
    >
      {children}
    </SandpackProvider>
  );
};

const SandpackRightSide = ({
  codeEditorOptions,
  startRoute,
  parentResizing,
  sandpackProps,
  finalFiles,
}: {
  parentResizing: boolean;
  startRoute: string;
  codeEditorOptions: CodeEditorProps;
  sandpackProps: SandpackProps;
  finalFiles?: SandpackFiles;
}) => {
  const { editorPercenage, setEditorPercentage } = useTutorialLayout();
  const [resizing, setResizing] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { previewOnly, hidePreview, showFiles = true } = sandpackProps ?? {};

  React.useEffect(() => {
    const handleMouseUp = () => {
      setResizing(false);
    };

    if (resizing !== null) {
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }

    return;
  }, [resizing]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizing) {
        const containerRect = containerRef.current?.getBoundingClientRect();

        if (!containerRect) return;

        const newEditorPercenage = Math.min(
          maxPercentage,
          Math.max(
            100 - maxPercentage,
            ((e.clientY - containerRect.top) / containerRect.height) * 100,
          ),
        );

        setEditorPercentage(newEditorPercenage);
      }
    };

    if (resizing !== null) {
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }

    return;
  }, [resizing]);

  React.useEffect(() => {
    const currentCursor = document.body.style.cursor;

    if (resizing) {
      document.body.style.cursor = "row-resize";
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      document.body.style.cursor = currentCursor;
    };
  }, [resizing]);

  return (
    <div className={clsx("w-full", "h-full", "flex", "flex-col")}>
      <div
        className={clsx(
          "not-prose",
          "w-full",
          "animate-reveal",
          "!h-full",
          "!overflow-hidden",
        )}
      >
        <div
          ref={containerRef}
          className={clsx(
            "flex",
            "flex-col",
            "h-full",
            "!py-2",
            "!pr-2",
            "bg-zinc-100 dark:bg-refine-tutorial-dark-bg",
          )}
        >
          {previewOnly ? null : (
            <div
              className={clsx(
                "bg-zinc-0 dark:bg-zinc-800",
                "overflow-hidden",
                "rounded-[4px]",
                "border border-zinc-300 dark:border-zinc-700",
                "flex",
                "relative",
              )}
              style={{
                height: hidePreview
                  ? "100%"
                  : `calc(${editorPercenage}% - (0.625rem / 2))`,
              }}
            >
              {showFiles ? (
                <TutorialFileExplorer
                  autoHiddenFiles={true}
                  hasSolve={!!finalFiles}
                />
              ) : null}
              {finalFiles ? <SolveButton finalFiles={finalFiles} /> : null}
              <SandpackCodeEditor
                {...codeEditorOptions}
                showTabs={false}
                showLineNumbers
                closableTabs={true}
                initMode="lazy"
                style={{}}
              />
            </div>
          )}
          {hidePreview || previewOnly ? null : (
            <button
              type="button"
              className={clsx(
                "h-2.5",
                "w-full",
                "appearance-none",
                "outline-none",
                "bg-zinc-100 dark:bg-refine-tutorial-dark-bg",
                "border-0",
                "cursor-row-resize",
                "flex items-center justify-center",
              )}
              onMouseDown={(event) => {
                setResizing(true);
                event.preventDefault();
              }}
            >
              <ResizeHandleIcon
                className={clsx(
                  "w-1",
                  "rotate-90",
                  "text-zinc-400",
                  "dark:text-zinc-700",
                )}
              />
            </button>
          )}
          {hidePreview ? null : (
            <div
              className={clsx(
                "overflow-hidden",
                "bg-zinc-0 dark:bg-zinc-800",
                "rounded-[4px]",
                "border border-zinc-300 dark:border-zinc-700",
                (resizing || parentResizing) && "pointer-events-none",
              )}
              style={{
                height: previewOnly
                  ? "100%"
                  : `calc(${100 - editorPercenage}% - (0.625rem / 2))`,
              }}
            >
              <SandpackPreview
                showOpenInCodeSandbox={false}
                startRoute={startRoute}
                showNavigator={sandpackProps.showNavigator}
                showRefreshButton={true}
                style={{
                  display: "flex",
                  flex: "initial",
                  width: "100%",
                  gap: 0,
                }}
              >
                <div className="sp-custom-loading bg-zinc-0 dark:bg-zinc-800">
                  <Spinner />
                  <LoaderProgress />
                </div>
              </SandpackPreview>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Spinner = () => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "bg-center bg-no-repeat bg-contain",
        "w-16 h-16",
        "bg-[url('/assets/tutorial-spinner-bg.png')]",
      )}
    >
      <img
        src="/assets/tutorial-spinner.gif"
        style={{
          imageRendering: "pixelated",
          scale: 2,
        }}
      />
    </div>
  );
};

const texts = [
  "installing dependencies",
  "downloading assets",
  "preparing the environment",
  "booting up the server",
];

const LoaderProgress = () => {
  const [duration] = React.useState(
    Math.floor(Math.random() * 10 * 1000 + 10000),
  );
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const tick = duration / texts.length;
    const interval = setInterval(() => {
      setIndex((p) => {
        if (p + 1 < texts.length) {
          return p + 1;
        }
        clearInterval(interval);
        return p;
      });
    }, tick);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={clsx("flex", "items-center", "justify-center")}>
      <div
        className={clsx(
          "w-40",
          "h-4",
          "rounded-xl",
          "bg-zinc-300 dark:bg-zinc-700",
          "p-px",
          "relative",
          "overflow-hidden",
        )}
      >
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className={clsx(
              "-top-px",
              "-left-px",
              "pt-px",
              "absolute",
              "w-40",
              "h-4",
              "overflow-hidden",
              "whitespace-nowrap",
              "break-keep",
              "text-zinc-800",
              "dark:text-zinc-200",
              "font-semibold",
              "text-[10px]",
              "text-center",
              "flex",
              "justify-center items-center",
            )}
          >
            {texts[index]}
          </motion.div>
        </AnimatePresence>
        <div
          className={clsx(
            "sp-loading-progress",
            "h-full",
            "rounded-xl",
            "bg-refine-tutorial-green dark:bg-refine-green-alt",
            "min-w-[0.75rem]",
            "overflow-hidden",
            "relative",
          )}
          style={{
            animationDuration: `${duration}ms`,
          }}
        >
          <AnimatePresence>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className={clsx(
                "-left-0.5",
                "-top-0.5",
                "pt-px",
                "absolute",
                "w-40",
                "h-4",
                "overflow-hidden",
                "whitespace-nowrap",
                "break-keep",
                "text-zinc-200",
                "dark:text-zinc-800",
                "font-semibold",
                "text-[10px]",
                "text-center",
                "flex",
                "justify-center items-center",
              )}
            >
              {texts[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const SolveButton = ({ finalFiles }: { finalFiles: SandpackFiles }) => {
  const { sandpack } = useSandpack();
  const [solved, setSolved] = React.useState(false);

  const onClick = () => {
    if (solved) {
      sandpack?.resetAllFiles();
    } else {
      sandpack?.updateFile(finalFiles);
    }
    setSolved((p) => !p);
  };

  return (
    <div
      className={clsx(
        "absolute",
        "left-0",
        "bottom-0",
        "w-40",
        "px-4",
        "pb-4",
        "flex",
        "items-center",
        "justify-center",
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          "appearance-none",
          "focus:outline-none",
          "border-none",
          "relative",
          "p-2",
          "flex",
          "justify-center",
          "items-center",
          solved && [
            "text-zinc-800 dark:text-zinc-100",
            "bg-zinc-300",
            "hover:bg-zinc-200",
            "dark:bg-zinc-600",
          ],
          !solved && [
            "text-zinc-100",
            "bg-refine-react-light-link",
            "dark:bg-refine-react-dark-link",
            "hover:text-zinc-0",
            "hover:brightness-110",
          ],
          "active:brightness-90",
          "rounded-[32px]",
          "group/solve-button",
          "w-full",
          "transition-[filter,color,background-color] duration-200 ease-in-out",
        )}
      >
        <ResetIcon
          className={clsx(
            solved ? "scale-100" : "scale-0",
            "absolute",
            "top-1/2",
            "left-2",
            "-translate-y-1/2",
            "transition-transform duration-200 ease-in-out",
          )}
        />
        <span className={clsx("transition-colors duration-200 ease-in-out")}>
          {solved ? "Reset" : "Solve"}
        </span>
        <ChevronRightIcon
          className={clsx(
            solved ? "scale-0" : "scale-100",
            "absolute",
            "top-1/2",
            "right-2",
            "-translate-y-1/2",
            "transition-transform duration-200 ease-in-out",
          )}
        />
      </button>
    </div>
  );
};

const ResizeHandleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={4}
    height={21}
    viewBox="0 0 4 21"
    fill="none"
    {...props}
  >
    <g fill="currentColor" strokeWidth={0}>
      <path d="M4 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM4 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM2 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </g>
  </svg>
);

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6.646 5.854a.5.5 0 1 1 .708-.708l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L8.793 8 6.646 5.854Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z"
      clipRule="evenodd"
    />
  </svg>
);

const ResetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.993 4.403A6.996 6.996 0 0 1 8 1a6.995 6.995 0 0 1 5.923 3.267.5.5 0 0 0 .845-.534A7.995 7.995 0 0 0 8 0a7.999 7.999 0 0 0-8 8 .5.5 0 0 0 .724.447l3-1.5a.5.5 0 0 0 .118-.812L1.993 4.403Zm13.77 3.172A.5.5 0 0 1 16 8a8 8 0 0 1-8 8 7.995 7.995 0 0 1-6.768-3.733.5.5 0 1 1 .845-.534A6.995 6.995 0 0 0 8 15a6.996 6.996 0 0 0 6.007-3.403l-1.849-1.732a.5.5 0 0 1 .118-.812l3-1.5a.5.5 0 0 1 .487.022Z"
      clipRule="evenodd"
    />
  </svg>
);
