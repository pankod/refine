import React, { type PropsWithChildren } from "react";

import type { II18nContext } from "./types";

export const I18nContext = React.createContext<II18nContext>({});

export const I18nContextProvider: React.FC<PropsWithChildren<II18nContext>> = ({
  children,
  i18nProvider,
}) => {
  return (
    <I18nContext.Provider
      value={{
        i18nProvider,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};
