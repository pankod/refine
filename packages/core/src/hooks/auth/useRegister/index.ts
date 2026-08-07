import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

import { useAuthProviderContext } from "@contexts/auth";
import { useGo, useKeys, useNavigation, useNotification } from "@hooks";

import type {
  AuthActionResponse,
  SuccessNotificationResponse,
} from "../../../contexts/auth/types";
import type { RefineError } from "../../../contexts/data/types";
import type { OpenNotificationParams } from "../../../contexts/notification/types";
import { useInvalidateAuthStore } from "../useInvalidateAuthStore";

export type UseRegisterProps<TVariables> = {
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

export type UseRegisterReturnType<TVariables> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  TVariables,
  unknown
>;

/**
 * `useRegister` calls `register` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useRegister} for more details.
 *
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useRegister<TVariables = {}>({
  mutationOptions,
}: UseRegisterProps<TVariables> = {}): UseRegisterReturnType<TVariables> {
  const invalidateAuthStore = useInvalidateAuthStore();
  const go = useGo();
  const { close, open } = useNotification();
  const { register: registerFromContext } = useAuthProviderContext();
  const { keys } = useKeys();

  const mutation = useMutation<
    AuthActionResponse,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: keys().auth().action("register").get(),
    mutationFn: registerFromContext,

    onSuccess: async ({ success, redirectTo, error, successNotification }) => {
      if (success) {
        close?.("register-error");

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

      if (success) {
        setTimeout(() => {
          invalidateAuthStore();
        }, 32);
      }
    },
    onError: (error: any) => {
      open?.(buildNotification(error));
    },
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useRegister"),
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
    message: error?.name || "Register Error",
    description: error?.message || "Error while registering",
    key: "register-error",
    type: "error",
  };
};

const buildSuccessNotification = (
  successNotification: SuccessNotificationResponse,
): OpenNotificationParams => {
  return {
    message: successNotification.message,
    description: successNotification.description,
    key: "register-success",
    type: "success",
  };
};
