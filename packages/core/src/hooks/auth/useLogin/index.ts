import React from "react";

import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

import { useAuthProviderContext } from "@contexts/auth";
import { useGo, useKeys, useNotification, useParsed } from "@hooks";

import type {
  AuthActionResponse,
  SuccessNotificationResponse,
} from "../../../contexts/auth/types";
import type { RefineError } from "../../../contexts/data/types";
import type { OpenNotificationParams } from "../../../contexts/notification/types";
import { useInvalidateAuthStore } from "../useInvalidateAuthStore";

export type UseLoginProps<TVariables> = {
  mutationOptions?: Omit<
    UseMutationOptions<
      AuthActionResponse,
      Error | RefineError,
      TVariables,
      unknown
    >,
    "mutationFn"
  >;
};

export type UseLoginReturnType<TVariables> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  TVariables,
  unknown
>;

/**
 * `useLogin` calls `login` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useLogin} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useLogin<TVariables = {}>({
  mutationOptions,
}: UseLoginProps<TVariables> = {}): UseLoginReturnType<TVariables> {
  const invalidateAuthStore = useInvalidateAuthStore();
  const go = useGo();
  const parsed = useParsed();

  const { close, open } = useNotification();
  const { login: loginFromContext } = useAuthProviderContext();
  const { keys } = useKeys();

  const to = parsed.params?.to;

  const mutation = useMutation<
    AuthActionResponse,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: keys().auth().action("login").get(),
    mutationFn: loginFromContext,
    onSuccess: async ({ success, redirectTo, error, successNotification }) => {
      if (success) {
        close?.("login-error");

        if (successNotification) {
          open?.(buildSuccessNotification(successNotification));
        }
      }

      if (error || !success) {
        open?.(buildNotification(error));
      }

      if (success) {
        if (to) {
          go({ to: to, type: "replace" });
        } else if (redirectTo) {
          go({ to: redirectTo, type: "replace" });
        }
      }

      setTimeout(() => {
        invalidateAuthStore();
      }, 32);
    },
    onError: (error: any) => {
      open?.(buildNotification(error));
    },
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useLogin"),
    },
  });

  return {
    ...mutation,
  };
}

const getOAuthCancellationNotification = (
  error?: Error | RefineError,
): OpenNotificationParams | undefined => {
  if (!error) {
    return undefined;
  }

  const errorMessage = String(
    error?.message ||
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "",
  );

  const statusCode =
    typeof error?.response?.status === "number"
      ? error.response.status
      : undefined;

  if (
    /access_denied/i.test(errorMessage) ||
    /authorization was denied/i.test(errorMessage) ||
    /no user information from oauth provider/i.test(errorMessage) ||
    (statusCode === 401 && /oauth/i.test(errorMessage))
  ) {
    return {
      key: "login-error",
      type: "error",
      message: "Login cancelled",
      description:
        "The OAuth authorization was cancelled or denied. Please try again.",
    };
  }

  return undefined;
};

const buildNotification = (
  error?: Error | RefineError,
): OpenNotificationParams => {
  const oauthCancellationNotification = getOAuthCancellationNotification(error);

  if (oauthCancellationNotification) {
    return oauthCancellationNotification;
  }

  return {
    message: error?.name || "Login Error",
    description: error?.message || "Invalid credentials",
    key: "login-error",
    type: "error",
  };
};

const buildSuccessNotification = (
  successNotification: SuccessNotificationResponse,
): OpenNotificationParams => {
  return {
    message: successNotification.message,
    description: successNotification.description,
    key: "login-success",
    type: "success",
  };
};
