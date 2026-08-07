import { authHeaderBeforeRequestHook } from "@refinedev/rest";
import { createStrapiV4DataProvider } from "@refinedev/rest/strapi-v4";

import { API_URL, TOKEN_KEY } from "../constants";

export const { dataProvider } = createStrapiV4DataProvider({
  apiURL: `${API_URL}/api`,
  kyOptions: {
    hooks: {
      beforeRequest: [
        authHeaderBeforeRequestHook({ ACCESS_TOKEN_KEY: TOKEN_KEY }),
      ],
    },
  },
});
