import React, { useContext } from "react";
import { useNavigate } from "react-router";
import {
  DevToolsContext,
  DevtoolsEvent,
  receive,
} from "@refinedev/devtools-shared";

export const MonitorHighlightHandler = () => {
  const navigate = useNavigate();
  const { ws } = useContext(DevToolsContext);

  React.useEffect(() => {
    if (!ws) return () => 0;

    const unsub = receive(
      ws,
      DevtoolsEvent.DEVTOOLS_HIGHLIGHT_IN_MONITOR_ACTION,
      ({ name }) => {
        if (name) {
          navigate(`/monitor?highlight=${name}`);
        }
      },
    );

    return () => {
      unsub();
    };
  }, [ws, navigate]);

  return null;
};
