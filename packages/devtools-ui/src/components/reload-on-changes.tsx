import React from "react";
import {
  DevToolsContext,
  DevtoolsEvent,
  receive,
} from "@refinedev/devtools-shared";

export const ReloadOnChanges = () => {
  const { ws } = React.useContext(DevToolsContext);

  React.useEffect(() => {
    if (ws) {
      const unsubscribe = receive(ws, DevtoolsEvent.RELOAD, () => {
        window.location.reload();
      });

      return unsubscribe;
    }

    return () => 0;
  }, [ws]);

  return null;
};
