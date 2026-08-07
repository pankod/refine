import { useDataProvider, useResourceParams } from "@hooks";

export const useApiUrl = (dataProviderName?: string): string => {
  const dataProvider = useDataProvider();
  const { resource } = useResourceParams();

  const { getApiUrl } = dataProvider(
    dataProviderName ?? resource?.meta?.dataProviderName,
  );

  return getApiUrl();
};
