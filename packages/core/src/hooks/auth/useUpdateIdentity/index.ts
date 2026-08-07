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

export type UseUpdateIdentityProps<TVariables> = {
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

export type UseUpdateIdentityReturnType<TVariables> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  TVariables,
  unknown
>;

/**
 * `useUpdateIdentity` calls `updateIdentity` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/providers/auth-provider} for more details.
 *
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useUpdateIdentity<TVariables = {}>({
  mutationOptions,
}: UseUpdateIdentityProps<TVariables> = {}): UseUpdateIdentityReturnType<TVariables> {
  const go = useGo();
  const { updateIdentity: updateIdentityFromContext } =
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
    mutationKey: keys().auth().action("updateIdentity").get(),
    mutationFn: async (variables) => {
      return updateIdentityFromContext?.({
        ...params,
        ...variables,
      }) as Promise<AuthActionResponse>;
    },
    onSuccess: ({ success, redirectTo, error, successNotification }) => {
      if (success) {
        close?.("update-identity-error");

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
      ...getXRay("useUpdateIdentity"),
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
    message: error?.name || "Update Identity Error",
    description: error?.message || "Error while updating identity",
    key: "update-identity-error",
    type: "error",
  };
};

const buildSuccessNotification = (
  successNotification: SuccessNotificationResponse,
): OpenNotificationParams => {
  return {
    message: successNotification.message,
    description: successNotification.description,
    key: "update-identity-success",
    type: "success",
  };
};
