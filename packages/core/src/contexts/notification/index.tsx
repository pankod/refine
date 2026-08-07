import React, { createContext, type PropsWithChildren } from "react";

import type { INotificationContext } from "./types";

export const NotificationContext = createContext<INotificationContext>({});

export const NotificationContextProvider: React.FC<
  PropsWithChildren<INotificationContext>
> = ({ open, close, children }) => {
  return (
    <NotificationContext.Provider value={{ open, close }}>
      {children}
    </NotificationContext.Provider>
  );
};
