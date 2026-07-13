import React from "react";

import { useDeepMemo } from "@hooks/deepMemo";

import type { IResourceContext, IResourceItem, ResourceProps } from "./types";

export const ResourceContext = React.createContext<IResourceContext>({
  resources: [],
});

export const ResourceContextProvider: React.FC<
  React.PropsWithChildren<{ resources: ResourceProps[] }>
> = ({ resources: providedResources, children }) => {
  const resources: IResourceItem[] = useDeepMemo(() => {
    return providedResources ?? [];
  }, [providedResources]);

  return (
    <ResourceContext.Provider value={{ resources }}>
      {children}
    </ResourceContext.Provider>
  );
};
