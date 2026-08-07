import type { Options as KyOptions } from "ky";

import { createDataProvider } from "../../create-data-provider";
import { nestjsxCrudDataProviderOptions } from "./nestjsx-crud.options";

type CreateNestjsxCrudDataProviderParams = {
  apiURL: string;
  kyOptions?: KyOptions;
};

export const createNestjsxCrudDataProvider = (
  params: CreateNestjsxCrudDataProviderParams,
) => {
  const { apiURL, kyOptions } = params;

  return createDataProvider(apiURL, nestjsxCrudDataProviderOptions, kyOptions);
};
