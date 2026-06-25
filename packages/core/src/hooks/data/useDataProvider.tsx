import { useCallback, useContext } from "react";

import { DataContext } from "@contexts/data";
import { type DataProvider, IDataContext } from "../../contexts/data/types";
export const useDataProvider = <
  TDataProvider extends DataProvider = DataProvider,
>(): ((
  /**
   * The name of the `data provider` you want to access
   */
  dataProviderName?: string,
) => TDataProvider) => {
  const context = useContext(DataContext);

  const handleDataProvider = useCallback(
    (dataProviderName?: string) => {
      if (dataProviderName) {
        const dataProvider = context?.[dataProviderName];
        if (!dataProvider) {
          throw new Error(`"${dataProviderName}" Data provider not found`);
        }

        if (dataProvider && !context?.default) {
          throw new Error(
            "If you have multiple data providers, you must provide default data provider property",
          );
        }

        return context[dataProviderName] as TDataProvider;
      }

      if (context.default) {
        return context.default as TDataProvider;
      }

      throw new Error(
        `There is no "default" data provider. Please pass dataProviderName.`,
      );
    },
    [context],
  );

  return handleDataProvider;
};

