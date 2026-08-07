import { getXRay } from "@refinedev/devtools-internal";
import { type UseMutationResult, useMutation } from "@tanstack/react-query";

import { useAuthProviderContext } from "@contexts/auth";
import { useGo, useLogout } from "@hooks";
import { useKeys } from "@hooks/useKeys";

import type { OnErrorResponse } from "../../../contexts/auth/types";

export type UseOnErrorReturnType = UseMutationResult<
  OnErrorResponse,
  unknown,
  unknown,
  unknown
>;

/**
 * `useOnError` calls the `checkError` method from the {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useCheckError} for more details.
 *
 */
export function useOnError(): UseOnErrorReturnType {
  const go = useGo();

  const { onError: onErrorFromContext } = useAuthProviderContext();

  const { keys } = useKeys();

  const { mutate: logout } = useLogout();

  const mutation = useMutation<OnErrorResponse, unknown, unknown, unknown>({
    mutationKey: keys().auth().action("onError").get(),
    ...(onErrorFromContext
      ? {
          mutationFn: onErrorFromContext,
          onSuccess: ({ logout: shouldLogout, redirectTo }) => {
            if (shouldLogout) {
              logout({ redirectPath: redirectTo });
              return;
            }

            if (redirectTo) {
              go({ to: redirectTo, type: "replace" });
              return;
            }
          },
        }
      : {
          mutationFn: () => ({}) as Promise<OnErrorResponse>,
        }),
    meta: {
      ...getXRay("useOnError"),
    },
  });

  return {
    ...mutation,
  };
}
