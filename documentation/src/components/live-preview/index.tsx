import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import base64url from "base64url";
// @ts-expect-error Docusaurus components has an issue with TypeScript
import CodeBlock from "@theme/CodeBlock";
// @ts-expect-error Docusaurus components has an issue with TypeScript
import { useDocsVersion } from "@docusaurus/theme-common/internal";
import styles from "./styles.module.css";
import BrowserWindow from "../../components/browser-window";
import { useInView } from "../../hooks/use-in-view";
import { Conditional } from "../conditional";
import { splitCode } from "../../utils/split-code";
import { useLivePreviewContext } from "../live-preview-context";
import Buffer from "buffer";
import { ArrowUpIcon } from "@site/src/refine-theme/icons/arrow-up";

global.Buffer = global.Buffer || Buffer.Buffer;

/**
 * Live Preview Frame
 */
const LivePreviewFrameBase = ({
  query,
  code,
  css,
}: {
  code: string;
  query?: string;
  css?: string;
}) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const [url, setUrl] = React.useState<string | undefined>(undefined);

  const compressCode = React.useCallback(
    async (uncompressed: string) => {
      if (typeof window !== "undefined" && window.Worker) {
        const worker = new Worker(
          `${location.protocol}//${location.host}/workers/lz-worker.js`,
        );
        worker.onmessage = ({
          data,
        }: MessageEvent<{ compressed: string | null }>) => {
          if (data.compressed) {
            setUrl(
              `${customFields.LIVE_PREVIEW_URL}/${data.compressed}${
                css ? `?css=${base64url.encode(css)}` : ""
              }${query ? `${query}` : ""}`,
            );
          }
          worker.terminate();
        };
        worker.postMessage({ code: uncompressed });
      }
    },
    [query],
  );

  React.useEffect(() => {
    compressCode(code);
  }, [code, compressCode]);

  if (url) {
    return (
      <iframe
        loading="lazy"
        src={url}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      />
    );
  }

  return null;
};

const LivePreviewFrame = React.memo(LivePreviewFrameBase, (prev, next) => {
  return (
    prev.code === next.code &&
    prev.query === next.query &&
    prev.css === next.css
  );
});

const CircleChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g fill="currentColor">
      <path d="M5.854 6.646a.5.5 0 1 0-.708.708l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5a.5.5 0 0 0-.708-.708L8 8.793 5.854 6.646Z" />
      <path
        fillRule="evenodd"
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);

/**
 * Editor with header
 */
function Editor({ hidden, code }: { hidden: boolean; code: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(!hidden);
  const [settled, setSettled] = React.useState(!hidden);

  const onToggle = () => {
    if (!visible) {
      setSettled(false);
      setVisible((p) => !p);

      setTimeout(() => {
        setSettled(true);
      }, 300);
    } else {
      setSettled(false);
      setTimeout(() => {
        setVisible((p) => !p);
        setTimeout(() => {
          setSettled(true);
        }, 300);
      }, 100);
    }
  };

  return (
    <div
      className={clsx("bg-zinc-200 dark:bg-zinc-800", "p-1", "rounded-b-lg")}
    >
      <button
        type="button"
        className={clsx(
          "refine-live-preview-editor-toggle-button",
          "w-full",
          "focus:outline-none",
          "appearance-none",
          "px-2.5 py-2",
          "flex items-center gap-2",
          "bg-zinc-50 dark:bg-zinc-900",
          visible && "rounded-t-[0.25rem]",
          !visible && "rounded",
          !visible && "delay-200",
          "transition-[border-radius] ease-in-out duration-200",
          "group",
          "text-zinc-900 dark:text-white",
        )}
        onClick={onToggle}
      >
        <CircleChevronDownIcon
          className={clsx(
            visible && "rotate-180",
            "transition-transform",
            "duration-200",
            "ease-in-out",
          )}
        />
        <span className={clsx("text-base", "block", "overflow-hidden", "h-6")}>
          <span
            className={clsx(
              "block",
              visible && "opacity-0",
              "transition-opacity duration-200 ease-in-out",
            )}
          >
            Show Code
          </span>
          <span
            className={clsx(
              "block",
              "transition-transform duration-200 ease-in-out",
              visible && "-translate-y-6",
            )}
          >
            Hide Code
          </span>
        </span>
      </button>
      <div
        className={clsx("rounded-bl-lg", "rounded-br-lg")}
        style={{
          maxHeight: visible ? (settled ? "unset" : "100vh") : "0px",
          transition: "0.3s all ease-in-out",
          overflow: "hidden",
        }}
        ref={ref}
      >
        <CodeBlock
          language="tsx"
          style={{
            marginBottom: 0,
            marginRight: "0",
            marginLeft: "0",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
          }}
        >
          {code}
        </CodeBlock>
      </div>
    </div>
  );
}

type PlaygroundProps = {
  children?: string;
  className?: string;
  disableScroll?: boolean;
  noInline?: boolean;
  hideCode?: boolean;
  previewHeight?: string;
  url?: string;
  previewOnly?: boolean;
  tailwind?: boolean;
};

/**
 * Live codeblock component
 */
const LivePreviewBase = ({
  children,
  disableScroll,
  previewHeight,
  hideCode = false,
  url = "http://localhost:3000",
  previewOnly = false,
  tailwind = false,
}: PlaygroundProps): JSX.Element => {
  const code = String(children);
  const { shared, sharedCss } = useLivePreviewContext();
  const { visible } = splitCode(
    `
    ${shared ?? ""}
    ${code}
    `.replace(/\n$/, ""),
  );
  const ref = React.useRef(null);

  const inView = useInView(ref);

  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const { isLast } = useDocsVersion();

  return (
    <div
      className={clsx(
        "refine-live-preview",
        "overflow-hidden",
        "mb-6",
        "refine-wider-container",
      )}
    >
      <>
        <BrowserWindow url={url} hasBottom={!previewOnly}>
          <div
            className={clsx(styles.playgroundPreview, "live-editor-wrapper")}
            style={{
              maxHeight: previewHeight,
              minHeight: previewHeight,
              overflow: disableScroll ? "hidden" : undefined,
              position: "relative",
            }}
            ref={ref}
          >
            {isLast ? (
              <Conditional if={inView} maxWait={3000}>
                {() => {
                  return (
                    <LivePreviewFrame
                      code={`
${shared ?? ""}
${code}
                                        `}
                      css={sharedCss}
                      query={`${disableScroll ? "&disableScroll=true" : ""}${
                        tailwind ? "&tailwind=true" : ""
                      }`}
                    />
                  );
                }}
              </Conditional>
            ) : (
              <div
                style={{
                  height: "100%",
                  minHeight: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                }}
              >
                <span>
                  Live previews only work with the latest documentation.
                </span>
              </div>
            )}
          </div>
        </BrowserWindow>
        {!previewOnly && <Editor hidden={hideCode} code={visible} />}
      </>
    </div>
  );
};

export const LivePreview = React.memo(LivePreviewBase, (prev, next) => {
  return String(prev.children) === String(next.children);
});
