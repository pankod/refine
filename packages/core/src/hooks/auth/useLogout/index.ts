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
} from "../../../contexts/auth/types";
import type { RefineError } from "../../../contexts/data/types";
import type { OpenNotificationParams } from "../../../contexts/notification/types";
import { useInvalidateAuthStore } from "../useInvalidateAuthStore";

type Variables = {
  redirectPath?: string | false;
};

export type UseLogoutProps<TVariables> = {
  mutationOptions?: Omit<
    UseMutationOptions<
      AuthActionResponse,
      Error | RefineError,
      (TVariables & Variables) | void,
      unknown
    >,
    "mutationFn"
  >;
};

export type UseLogoutReturnType<TVariables> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  (TVariables & Variables) | void,
  unknown
>;

/**
 * `useLogout` calls the `logout` method from the {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useLogout} for more details.
 *
 */
export function useLogout<TVariables = {}>({
  mutationOptions,
}: UseLogoutProps<TVariables> = {}): UseLogoutReturnType<TVariables> {
  const invalidateAuthStore = useInvalidateAuthStore();
  const go = useGo();
  const { open, close } = useNotification();
  const { logout: logoutFromContext } = useAuthProviderContext();
  const { keys } = useKeys();

  const mutation = useMutation<
    AuthActionResponse,
    Error | RefineError,
    (TVariables & Variables) | void,
    unknown
  >({
    mutationKey: keys().auth().action("logout").get(),
    mutationFn: logoutFromContext,
    ...mutationOptions,
    onSuccess: (data, variables) => {
      const { success, error, redirectTo, successNotification } = data;
      const { redirectPath } = variables ?? {};

      const redirect = redirectPath ?? redirectTo;

      if (success) {
        close?.("useLogout-error");

        if (successNotification) {
          open?.(buildSuccessNotification(successNotification));
        }
      }

      if (error || !success) {
        open?.(buildNotification(error));
      }

      if (redirect !== false) {
        if (redirect) {
          go({ to: redirect });
        }
      }

      invalidateAuthStore();
    },
    onError: (error) => {
      open?.(buildNotification(error));
    },
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useLogout"),
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
    key: "useLogout-error",
    type: "error",
    message: error?.name || "Logout Error",
    description: error?.message || "Something went wrong during logout",
  };
};

const buildSuccessNotification = (
  successNotification: SuccessNotificationResponse,
): OpenNotificationParams => {
  return {
    message: successNotification.message,
    description: successNotification.description,
    key: "logout-success",
    type: "success",
  };
};
