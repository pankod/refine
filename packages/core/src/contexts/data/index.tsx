import React, { type PropsWithChildren } from "react";

import type { DataProvider, DataProviders, IDataContext } from "./types";

export const defaultDataProvider: DataProviders = {
  default: {} as DataProvider,
};

export const DataContext =
  React.createContext<IDataContext>(defaultDataProvider);

type Props = PropsWithChildren<{
  dataProvider?: DataProvider | DataProviders;
}>;

export const DataContextProvider: React.FC<Props> = ({
  children,
  dataProvider,
}) => {
  let providerValue = defaultDataProvider;

  if (dataProvider) {
    if (
      !("default" in dataProvider) &&
      ("getList" in dataProvider || "getOne" in dataProvider)
    ) {
      providerValue = {
        default: dataProvider,
      };
    } else {
      providerValue = dataProvider;
    }
  }

  return (
    <DataContext.Provider value={providerValue}>
      {children}
    </DataContext.Provider>
  );
};
