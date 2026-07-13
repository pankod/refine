import type { Hooks } from "ky";

type AuthHeaderBeforeRequestHookOptions = {
  ACCESS_TOKEN_KEY: string;
};

/**
 * Gets the token from localStorage and adds `Bearer <token>` to the Authorization header.
 *
 * @param {string} options.ACCESS_TOKEN_KEY - The key used to retrieve the access token from localStorage.
 * @returns Ky beforeRequest hook function.
 * @example
 * ```ts
 * import { authHeaderBeforeRequestHook } from "@refinedev/rest";
 *
 * const dataProvider = createDataProvider("https://api.example.com", {}, {
 *   hooks: {
 *     beforeRequest: [authHeaderBeforeRequestHook({ ACCESS_TOKEN_KEY: "accessToken" })],
 *   },
 * });
 * ```
 */
export const authHeaderBeforeRequestHook =
  (
    options: AuthHeaderBeforeRequestHookOptions,
  ): NonNullable<Hooks["beforeRequest"]>[number] =>
  async (req) => {
    const token = localStorage.getItem(options.ACCESS_TOKEN_KEY);

    if (token) {
      req.headers.set("Authorization", `Bearer ${token}`);
    }
  };
