import React, { type PropsWithChildren } from "react";

import type { IAuditLogContext } from "./types";

export const AuditLogContext = React.createContext<IAuditLogContext>({});

export const AuditLogContextProvider: React.FC<
  PropsWithChildren<IAuditLogContext>
> = ({ create, get, update, children }) => {
  return (
    <AuditLogContext.Provider value={{ create, get, update }}>
      {children}
    </AuditLogContext.Provider>
  );
};
