import React, { type PropsWithChildren } from "react";

import type {
  IAccessControlContext,
  IAccessControlContextReturnType,
} from "./types";

export const AccessControlContext =
  React.createContext<IAccessControlContextReturnType>({
    options: {
      buttons: { enableAccessControl: true, hideIfUnauthorized: false },
    },
  });

export const AccessControlContextProvider: React.FC<
  PropsWithChildren<IAccessControlContext>
> = ({ can, children, options }) => {
  return (
    <AccessControlContext.Provider
      value={{
        can,
        options: options
          ? {
              ...options,
              buttons: {
                enableAccessControl: true,
                hideIfUnauthorized: false,
                ...options.buttons,
              },
            }
          : {
              buttons: {
                enableAccessControl: true,
                hideIfUnauthorized: false,
              },
              queryOptions: undefined,
            },
      }}
    >
      {children}
    </AccessControlContext.Provider>
  );
};
