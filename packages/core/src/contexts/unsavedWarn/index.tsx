import React, { useState, type PropsWithChildren } from "react";

import type { IUnsavedWarnContext } from "./types";

export const UnsavedWarnContext = React.createContext<IUnsavedWarnContext>({});

export const UnsavedWarnContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [warnWhen, setWarnWhen] = useState(false);

  return (
    <UnsavedWarnContext.Provider value={{ warnWhen, setWarnWhen }}>
      {children}
    </UnsavedWarnContext.Provider>
  );
};
