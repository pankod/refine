import React from "react";
import clsx from "clsx";

import { LogoIcon } from "./icons/logo";
import { ContactIcon } from "./icons/contact";
import { NotificationIcon } from "./icons/notification";
import {
  DevToolsContext,
  DevtoolsEvent,
  receive,
} from "@refinedev/devtools-shared";

export const Header = () => {
  const [connectedApp, setConnectedApp] = React.useState<string | null>(null);
  const { ws } = React.useContext(DevToolsContext);

  const fetchConnectedApp = React.useCallback(async () => {
    try {
      const response = await fetch("api/connected-app");
      const data = (await response.json()) as { url: string | null };
      setConnectedApp(data.url);
    } catch (error) {
      //
    }
  }, []);

  React.useEffect(() => {
    fetchConnectedApp();
  }, [fetchConnectedApp]);

  React.useEffect(() => {
    if (!ws) return () => 0;

    const unsubscribeConnected = receive(
      ws,
      DevtoolsEvent.DEVTOOLS_CONNECTED_APP,
      (data) => {
        setConnectedApp(data.url);
      },
    );

    const unsubscribeDisconnected = receive(
      ws,
      DevtoolsEvent.DEVTOOLS_DISCONNECTED_APP,
      () => {
        setConnectedApp(null);
      },
    );

    return () => {
      unsubscribeConnected();
      unsubscribeDisconnected();
    };
  }, [ws]);

  return (
    <div
      className={clsx(
        "re-flex-shrink-0",
        "re-bg-gray-800",
        "re-py-2",
        "re-pr-1",
        "re-pl-px",
        "re-border-b",
        "re-border-b-gray-700",
        "re-flex",
        "re-w-full",
        "re-items-center",
        "re-justify-between",
      )}
    >
      <div className="re-flex-shrink-0 re-min-w-[200px]">
        <LogoIcon className="re-h-9" />
      </div>
      <div
        className={clsx(
          "re-bg-gray-900",
          "re-flex-1",
          "re-border-gray-700",
          "re-py-1.5",
          "re-px-2",
          "re-rounded-lg",
          "re-text-sm",
          "re-leading-6",
          "re-flex",
          "re-items-center",
          "re-justify-center",
          "re-text-gray-300",
        )}
      >
        <span
          className={clsx(
            "re-block",
            "re-h-2",
            "re-w-2",
            "re-rounded-full",
            connectedApp && "re-bg-alt-green",
            !connectedApp && "re-bg-alt-red",
            "re-flex-shrink-0",
            "re-mr-2",
          )}
        />

        <span className="re-font-mono re-whitespace-nowrap re-text-ellipsis re-overflow-hidden">
          {connectedApp ?? "No App Connected"}
        </span>
      </div>
      <div
        className={clsx(
          "re-flex",
          "re-items-center",
          "re-justify-end",
          "re-gap-2",
          "re-flex-shrink-0",
          "re-min-w-[200px]",
        )}
      >
        {false && (
          <>
            <div
              className={clsx(
                "re-w-9",
                "re-h-9",
                "re-text-gray-500",
                "re-flex",
                "re-justify-center",
                "re-items-center",
              )}
            >
              <ContactIcon />
            </div>
            <div
              className={clsx(
                "re-w-9",
                "re-h-9",
                "re-text-gray-500",
                "re-flex",
                "re-justify-center",
                "re-items-center",
              )}
            >
              <NotificationIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
