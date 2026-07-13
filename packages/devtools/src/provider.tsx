import React from "react";
import { DevToolsContextProvider } from "@refinedev/devtools-shared";
import { getDevtoolsUrlFromEnv } from "./utilities/get-devtools-url-from-env";

type Props = React.PropsWithChildren<{
  /**
   * Devtools URL to connect to the server. This will also be used for the WebSocket connections and serving the Devtools UI.
   * By default, it will use the `REFINE_DEVTOOLS_PORT` environment variable to construct to URL or use `5001` as the default port.
   * If you're using `refine dev` command, it will try to automatically set the environment variable for you and use it.
   * If environment variable is not working for you, you can manually set the URL as a string or a tuple of `[httpUrl: string, wsUrl: string]`.
   */
  url?: string | [httpUrl: string, wsUrl: string];
}>;

export const DevtoolsProvider =
  __DEV_CONDITION__ !== "development"
    ? ({ children }: Props) => children as any
    : ({ children, url = getDevtoolsUrlFromEnv() }: Props) => {
        return (
          <DevToolsContextProvider url={url}>
            {children}
          </DevToolsContextProvider>
        );
      };
