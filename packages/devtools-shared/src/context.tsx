import React from "react";
import { DevtoolsEvent } from "./event-types";
import { send } from "./send";
import { receive } from "./receive";

type DevtoolsContextValue = {
  __devtools: boolean;
  httpUrl: string;
  wsUrl: string;
  ws: WebSocket | null;
};

export const DevToolsContext = React.createContext<DevtoolsContextValue>({
  __devtools: false,
  httpUrl: "http://localhost:5001",
  wsUrl: "ws://localhost:5001",
  ws: null,
});

type Props = React.PropsWithChildren<{
  __devtools?: boolean;
  url?: string | [httpUrl: string, wsUrl: string];
}>;

export const DevToolsContextProvider: React.FC<Props> = ({
  __devtools,
  url = ["http://localhost:5001", "ws://localhost:5001"],
  children,
}) => {
  const httpUrl = Array.isArray(url) ? url[0] : url;
  const wsUrl = Array.isArray(url)
    ? url[1]
    : url.replace(/http(s)?:\/\//, "ws$1://");

  const [values, setValues] = React.useState<DevtoolsContextValue>({
    __devtools: __devtools ?? false,
    httpUrl,
    wsUrl,
    ws: null,
  });

  const [ws, setWs] = React.useState<WebSocket | null>(null);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    const wsInstance = new WebSocket(values.wsUrl);

    wsInstance.addEventListener("open", () => {
      if (!values.__devtools) {
        timeout = setTimeout(() => {
          send(wsInstance, DevtoolsEvent.DEVTOOLS_INIT, {
            url: window.location.origin,
          });
        }, 300);
      }
    });

    setWs(wsInstance);

    return () => {
      if (timeout) clearTimeout(timeout);

      // In strict mode, the WebSocket instance might not be connected yet
      // so we need to wait for it to connect before closing it
      // otherwise it will log an unnecessary error in the console
      if (wsInstance.readyState === WebSocket.CONNECTING) {
        wsInstance.addEventListener("open", () => {
          wsInstance.close(1000, window.location.origin);
        });
      } else {
        wsInstance.close(1000, window.location.origin);
      }
    };
  }, []);

  const contextValues = React.useMemo<DevtoolsContextValue>(
    () => ({
      ...values,
      ws,
    }),
    [values, ws],
  );

  return (
    <DevToolsContext.Provider value={contextValues}>
      {children}
    </DevToolsContext.Provider>
  );
};
