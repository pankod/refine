/**
 * @author aliemir
 *
 * In the current internal structure, sometimes we pass params and args from one function to another,
 * like in case of `check` (formerly `checkAuth`) function, we pass the reject value to `useLogout` hook,
 * which handles the redirect after logout.
 *
 * These actions should be separated,
 *
 * Apps can exist with an optional auth,
 * or do not redirect after logout,
 * or do the redirect but not log out,
 * or do the redirect to a different page than `/login`.
 *
 * To cover all those cases, we should return more information from auth functions.
 *
 * Let's say, they should always resolve, even if user is not authenticated,
 * but have the proper information to handle the situation.
 *
 * like `authenticated: false`, `redirect: '/login'` and `logout: true`
 * which will inform refine that user is not authenticated and should be redirected to `/login` and logout.
 * In some cases, redirect might need to be transferred to other hooks (like `useLogout` hook),
 * but these cases can be handled internally.
 *
 * If the response from `check` is `{ authenticated: false, logout: false, redirect: "/not-authenticated" }`,
 * then the user will be redirected to `/not-authenticated` without logging out.
 *
 * If the response from `check` is `{ authenticated: false, logout: true, redirect: false }`,
 * then the user will be logged out without redirecting.
 *
 * Same goes for `onError` function, it should always resolve.
 */

import type { RefineError } from "../data/types";

export type CheckResponse = {
  authenticated: boolean;
  redirectTo?: string;
  logout?: boolean;
  error?: RefineError | Error;
};

export type OnErrorResponse = {
  redirectTo?: string;
  logout?: boolean;
  error?: RefineError | Error;
};

export type SuccessNotificationResponse = {
  message: string;
  description?: string;
};

export type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: RefineError | Error;
  [key: string]: unknown;
  successNotification?: SuccessNotificationResponse;
};

export type PermissionResponse = unknown;

export type IdentityResponse = unknown;

export type AuthProvider = {
  login: (params: any) => Promise<AuthActionResponse>;
  logout: (params: any) => Promise<AuthActionResponse>;
  check: (params?: any) => Promise<CheckResponse>;
  onError: (error: any) => Promise<OnErrorResponse>;
  register?: (params: any) => Promise<AuthActionResponse>;
  forgotPassword?: (params: any) => Promise<AuthActionResponse>;
  updatePassword?: (params: any) => Promise<AuthActionResponse>;
  updateIdentity?: (params: any) => Promise<AuthActionResponse>;
  getPermissions?: (
    params?: Record<string, any>,
  ) => Promise<PermissionResponse>;
  getIdentity?: (params?: any) => Promise<IdentityResponse>;
};

export interface IAuthContext extends Partial<AuthProvider> {
  isProvided: boolean;
}

export type TLogoutData = void | false | string;
export type TLoginData = void | false | string | object;
export type TRegisterData = void | false | string;
export type TForgotPasswordData = void | false | string;
export type TUpdatePasswordData = void | false | string;
