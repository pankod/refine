import React, { createContext, type PropsWithChildren } from "react";
import type { RouterProvider } from "./types";

const defaultRouterProvider = {};

export const RouterContext = createContext<RouterProvider>(
  defaultRouterProvider,
);

export const RouterContextProvider: React.FC<
  PropsWithChildren<{ router?: RouterProvider }>
> = ({ children, router }) => {
  return (
    <RouterContext.Provider value={router ?? defaultRouterProvider}>
      {children}
    </RouterContext.Provider>
  );
};
