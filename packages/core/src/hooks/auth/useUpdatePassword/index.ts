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

export type UseUpdatePasswordProps<TVariables> = {
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

export type UseUpdatePasswordReturnType<TVariables> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  TVariables,
  unknown
>;

/**
 * `useUpdatePassword` calls `updatePassword` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useUpdatePassword} for more details.
 *
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useUpdatePassword<TVariables = {}>({
  mutationOptions,
}: UseUpdatePasswordProps<TVariables> = {}): UseUpdatePasswordReturnType<TVariables> {
  const go = useGo();
  const { updatePassword: updatePasswordFromContext } =
    useAuthProviderContext();
  const { close, open } = useNotification();
  const { keys } = useKeys();
  const parsed = useParsed();
  const params = parsed.params ?? {};

  const mutation = useMutation<
    AuthActionResponse,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: keys().auth().action("updatePassword").get(),
    mutationFn: async (variables) => {
      return updatePasswordFromContext?.({
        ...params,
        ...variables,
      }) as Promise<AuthActionResponse>;
    },
    onSuccess: ({ success, redirectTo, error, successNotification }) => {
      if (success) {
        close?.("update-password-error");

        if (successNotification) {
          open?.(buildSuccessNotification(successNotification));
        }
      }

      if (error || !success) {
        open?.(buildNotification(error));
      }

      if (redirectTo) {
        go({ to: redirectTo, type: "replace" });
      }
    },
    onError: (error: any) => {
      open?.(buildNotification(error));
    },
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useUpdatePassword"),
    },
  });

  return {
    ...mutation,
  };
}

const buildNotification = (
  error?: Error | RefineError,
): OpenNotificationParams => {
  return {
    message: error?.name || "Update Password Error",
    description: error?.message || "Error while updating password",
    key: "update-password-error",
    type: "error",
  };
};

const buildSuccessNotification = (
  successNotification: SuccessNotificationResponse,
): OpenNotificationParams => {
  return {
    message: successNotification.message,
    description: successNotification.description,
    key: "update-password-success",
    type: "success",
  };
};
