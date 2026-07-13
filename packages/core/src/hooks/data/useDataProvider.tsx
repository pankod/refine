import { useCallback, useContext } from "react";

import { DataContext } from "@contexts/data";
import { type DataProvider, IDataContext } from "../../contexts/data/types";
export const useDataProvider = (): ((
  /**
   * The name of the `data provider` you want to access
   */
  dataProviderName?: string,
) => DataProvider) => {
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

        return context[dataProviderName];
      }

      if (context.default) {
        return context.default;
      }

      throw new Error(
        `There is no "default" data provider. Please pass dataProviderName.`,
      );
    },
    [context],
  );

  return handleDataProvider;
};
