import type { Options as KyOptions } from "ky";

import { createDataProvider } from "../../create-data-provider";
import { simpleRestDataProviderOptions } from "./simple-rest.options";

type CreateSimpleRestDataProviderParams = {
  apiURL: string;
  kyOptions?: KyOptions;
};

export const createSimpleRestDataProvider = (
  params: CreateSimpleRestDataProviderParams,
) => {
  const { apiURL, kyOptions } = params;

  return createDataProvider(apiURL, simpleRestDataProviderOptions, kyOptions);
};
