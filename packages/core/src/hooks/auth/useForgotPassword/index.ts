import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

import { useAuthProviderContext } from "@contexts/auth";
import { useGo, useKeys, useNotification } from "@hooks";

import type {
  AuthActionResponse,
  SuccessNotificationResponse,
  TForgotPasswordData,
} from "../../../contexts/auth/types";
import type { RefineError } from "../../../contexts/data/types";
import type { OpenNotificationParams } from "../../../contexts/notification/types";

export type UseForgotPasswordProps<TVariables> = {
  mutationOptions?: Omit<
    UseMutationOptions<
      AuthActionResponse | TForgotPasswordData,
      Error | RefineError,
      TVariables,
      unknown
    >,
    "mutationFn"
  >;
};

export type UseForgotPasswordReturnType<TVariables> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  TVariables,
  unknown
>;

/**
 * `useForgotPassword` calls `forgotPassword` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useForgotPassword} for more details.
 *
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useForgotPassword<TVariables = {}>({
  mutationOptions,
}: UseForgotPasswordProps<TVariables> = {}): UseForgotPasswordReturnType<TVariables> {
  const go = useGo();
  const { open, close } = useNotification();
  const { forgotPassword: forgotPasswordFromContext } =
    useAuthProviderContext();
  const { keys } = useKeys();

  const mutation = useMutation<
    AuthActionResponse,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: keys().auth().action("forgotPassword").get(),
    mutationFn: forgotPasswordFromContext,

    onSuccess: ({ success, redirectTo, error, successNotification }) => {
      if (success) {
        close?.("forgot-password-error");

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
      ...getXRay("useForgotPassword"),
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
    message: error?.name || "Forgot Password Error",
    description: error?.message || "Error while resetting password",
    key: "forgot-password-error",
    type: "error",
  };
};

const buildSuccessNotification = (
  successNotification: SuccessNotificationResponse,
): OpenNotificationParams => {
  return {
    message: successNotification.message,
    description: successNotification.description,
    key: "forgot-password-success",
    type: "success",
  };
};
