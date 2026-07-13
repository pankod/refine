import {
  authHeaderBeforeRequestHook,
  refreshTokenAfterResponseHook,
} from "@refinedev/rest";
import { createNestjsxCrudDataProvider } from "@refinedev/rest/nestjsx-crud";

import {
  ACCESS_TOKEN_KEY,
  BASE_URL,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_URL,
} from "@/utilities/constants";

export const { dataProvider, kyInstance } = createNestjsxCrudDataProvider({
  apiURL: BASE_URL,
  kyOptions: {
    hooks: {
      beforeRequest: [authHeaderBeforeRequestHook({ ACCESS_TOKEN_KEY })],
      afterResponse: [
        refreshTokenAfterResponseHook({
          ACCESS_TOKEN_KEY,
          REFRESH_TOKEN_KEY,
          REFRESH_TOKEN_URL,
        }),
      ],
    },
  },
});
