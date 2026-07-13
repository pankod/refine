import React from "react";
import { DevtoolsPin } from "./components/devtools-pin";
import { ResizablePane } from "./components/resizable-pane";

import {
  DevToolsContext,
  DevtoolsEvent,
  send,
} from "@refinedev/devtools-shared";

import type { Placement } from "./interfaces/placement";

const MAX_IFRAME_WAIT_TIME = 1500;

export const DevtoolsPanel =
  __DEV_CONDITION__ !== "development"
    ? () => null
    : () => {
        const [browser, setBrowser] = React.useState<boolean>(false);
        const [visible, setVisible] = React.useState(false);
        const [placement] = React.useState<Placement>("bottom");
        const { httpUrl, ws } = React.useContext(DevToolsContext);
        const [width, setWidth] = React.useState<number>(0);
        const [selectorActive, setSelectorActive] = React.useState(false);
        const [iframeStatus, setIframeStatus] = React.useState<
          "loading" | "loaded" | "failed"
        >("loading");

        const onSelectorHighlight = React.useCallback(
          (name: string) => {
            if (ws) {
              send(ws, DevtoolsEvent.DEVTOOLS_HIGHLIGHT_IN_MONITOR, {
                name,
              });
            }
            setVisible(true);
          },
          [ws],
        );

        React.useEffect(() => {
          if (selectorActive) {
            setVisible(false);
          }
        }, [selectorActive]);

        React.useEffect(() => {
          if (typeof window !== "undefined") {
            setBrowser(true);
          }
        }, []);

        React.useEffect(() => {
          if (browser) {
            // set width by window size dynamically
            setWidth(window.innerWidth);

            const onResize = () => {
              setWidth(window.innerWidth);
            };

            window.addEventListener("resize", onResize);

            return () => {
              window.removeEventListener("resize", onResize);
            };
          }

          return () => undefined;
        }, [browser]);

        React.useEffect(() => {
          if (iframeStatus !== "loaded") {
            const onMessage = (event: MessageEvent) => {
              if (event.data.type === "refine-devtools-iframe-loaded") {
                setIframeStatus("loaded");
              }
            };

            window.addEventListener("message", onMessage);

            return () => {
              window.removeEventListener("message", onMessage);
            };
          }

          return () => 0;
        }, []);

        React.useEffect(() => {
          let timeout: number;
          if (iframeStatus === "loading") {
            timeout = window.setTimeout(() => {
              setIframeStatus("failed");
              if (timeout) {
                clearInterval(timeout);
              }
            }, MAX_IFRAME_WAIT_TIME);
          }
          return () => {
            if (typeof timeout !== "undefined") {
              clearInterval(timeout);
            }
          };
        }, [iframeStatus]);

        if (!browser) {
          return null;
        }

        return (
          <div
            style={{
              position: "fixed",
              left: `${Math.round(width / 2)}px`,
              transform: "translateX(-50%)",
              bottom: 0,
              zIndex: 99999,
            }}
          >
            <DevtoolsPin
              onClick={() => {
                setVisible((v) => !v);
                setSelectorActive(false);
              }}
              onSelectorHighlight={onSelectorHighlight}
              selectorActive={selectorActive}
              setSelectorActive={setSelectorActive}
            />
            <ResizablePane visible={visible} placement={placement}>
              {({ resizing }) => (
                <iframe
                  allow="clipboard-write;"
                  src={httpUrl}
                  srcDoc={
                    httpUrl
                      ? iframeStatus === "failed"
                        ? failedConnectionContent
                        : undefined
                      : missingUrlContent
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "7px",
                    pointerEvents: resizing ? "none" : "auto",
                    background: "#14141F",
                  }}
                />
              )}
            </ResizablePane>
          </div>
        );
      };

const missingUrlContent = `
      <html style="height:100%;padding:0;margin:0;background:#14141F;">
        <body style="background:#14141F;display:flex;justify-content:center;height:100%;padding:24px;margin:0;align-items:center;box-sizing:border-box;">
          <h1 style="font-family:ui-monospace,monospace;font-weight:400;color:#CFD7E2;text-align:center;font-size:24px;">Could not connect to the devtools server.</h1>
        </body>
      </html>
      `;

const failedConnectionContent = `
      <html style="height:100%;padding:0;margin:0;background:#14141F;">
        <body style="background:#14141F;display:flex;flex-direction:column;justify-content:center;height:100%;padding:24px;margin:0;align-items:center;box-sizing:border-box;">
          <h1 style="max-width:480px;min-width:480px;font-family:ui-monospace,monospace;font-weight:400;color:#CFD7E2;text-align:left;font-size:24px;margin-bottom:12px;line-height:24px;">Devtools Server is unreachable.</h1>
          <p style="max-width:480px;font-family:ui-monospace,monospace;font-weight:400;color:#6C7793;text-align:left;font-size:16px;line-height:32px;">Please make sure Refine Devtools is running and <code style="background:#303450;color:#A3ADC2;padding:3px 6px;border-radius:4px;">&lt;DevtoolsProvider /&gt;</code> has valid <code style="background:#303450;color:#A3ADC2;padding:3px 6px;border-radius:4px;">url</code> prop. Environment variables may not always be available in browser depending on your project setup.</p>
        </body>
      </html>
      `;
