import ky, { type Hooks } from "ky";

type RefreshTokenAfterResponseHookOptions = {
  ACCESS_TOKEN_KEY: string;
  REFRESH_TOKEN_KEY: string;
  REFRESH_TOKEN_URL: string;
};

/**
 * Middleware to handle token refresh on 401 responses.
 *
 * @param {string} refineOptions.ACCESS_TOKEN_KEY - The key used to retrieve the access token from localStorage.
 * @param {string} refineOptions.REFRESH_TOKEN_KEY - The key used to retrieve the refresh token from localStorage.
 * @param {string} refineOptions.REFRESH_TOKEN_URL - The URL to send the refresh token request to.
 * @returns Ky afterResponse hook function.
 * @example
 * ```ts
 * import { refreshTokenAfterResponseHook } from "@refinedev/rest";
 *
 * const dataProvider = createDataProvider("https://api.example.com", {}, {
 *   hooks: {
 *     afterResponse: [refreshTokenAfterResponseHook({
 *       ACCESS_TOKEN_KEY: "accessToken",
 *       REFRESH_TOKEN_KEY: "refreshToken",
 *       REFRESH_TOKEN_URL: "https://api.example.com/refresh-token",
 *     })],
 *   },
 * });
 * ```
 */
export const refreshTokenAfterResponseHook =
  (
    refineOptions: RefreshTokenAfterResponseHookOptions,
  ): NonNullable<Hooks["afterResponse"]>[number] =>
  async (request, _options, response) => {
    if (response.status === 401) {
      const currentRefreshToken = localStorage.getItem(
        refineOptions.REFRESH_TOKEN_KEY,
      );

      try {
        const data = await ky<{ token: string; refreshToken: string }>(
          refineOptions.REFRESH_TOKEN_URL,
          {
            method: "post",
            body: JSON.stringify({ refreshToken: currentRefreshToken }),
          },
        ).json();

        const accessToken = data.token;
        const refreshToken = data.refreshToken;

        localStorage.setItem(refineOptions.ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(refineOptions.REFRESH_TOKEN_KEY, refreshToken);

        request.headers.set("Authorization", `token ${accessToken}`);

        return ky(request);
      } catch (e) {
        return response;
      }
    }

    return response;
  };
