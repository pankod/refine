import React, { type PropsWithChildren } from "react";

import type { ILiveContext } from "./types";

export const LiveContext = React.createContext<ILiveContext>({});

export const LiveContextProvider: React.FC<PropsWithChildren<ILiveContext>> = ({
  liveProvider,
  children,
}) => {
  return (
    <LiveContext.Provider value={{ liveProvider }}>
      {children}
    </LiveContext.Provider>
  );
};
