import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

import {
  useDataProvider,
  useHandleNotification,
  useKeys,
  useMeta,
  useOnError,
  useTranslate,
} from "@hooks";

import type {
  BaseRecord,
  CreateResponse,
  HttpError,
  MetaQuery,
  Prettify,
} from "../../contexts/data/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

interface UseCustomMutationConfig {
  headers?: {};
}

type useCustomMutationParams<TData, TError, TVariables> = {
  url: string;
  method: "post" | "put" | "patch" | "delete";
  values: TVariables;
  /**
   * Meta data for `dataProvider`
   */
  meta?: MetaQuery;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   */
  dataProviderName?: string;
  config?: UseCustomMutationConfig;
} & SuccessErrorNotification<
  CreateResponse<TData>,
  TError,
  Prettify<UseCustomMutationConfig & MetaQuery>
>;

export type UseCustomMutationReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  mutation: UseMutationResult<
    CreateResponse<TData>,
    TError,
    useCustomMutationParams<TData, TError, TVariables>,
    unknown
  >;
  mutate: UseMutationResult<
    CreateResponse<TData>,
    TError,
    useCustomMutationParams<TData, TError, TVariables>,
    unknown
  >["mutate"];
  mutateAsync: UseMutationResult<
    CreateResponse<TData>,
    TError,
    useCustomMutationParams<TData, TError, TVariables>,
    unknown
  >["mutateAsync"];
} & UseLoadingOvertimeReturnType;

export type UseCustomMutationOptions<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = UseMutationOptions<
  CreateResponse<TData>,
  TError,
  useCustomMutationParams<TData, TError, TVariables>,
  unknown
>;

export type UseCustomMutationProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  mutationOptions?: UseCustomMutationOptions<TData, TError, TVariables>;
} & UseLoadingOvertimeOptionsProps;

/**
 * `useCustomMutation` is a modified version of `react-query`'s {@link https://tanstack.com/query/v5/docs/framework/react/reference/useMutation `useMutation`} for create mutations.
 *
 * It uses the `custom` method from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useCustomMutation} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences/#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */

export const useCustomMutation = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
>({
  mutationOptions,
  overtimeOptions,
}: UseCustomMutationProps<
  TData,
  TError,
  TVariables
> = {}): UseCustomMutationReturnType<TData, TError, TVariables> &
  UseLoadingOvertimeReturnType => {
  const { mutate: checkError } = useOnError();
  const handleNotification = useHandleNotification();
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const getMeta = useMeta();
  const { keys } = useKeys();

  const mutationResult = useMutation<
    CreateResponse<TData>,
    TError,
    useCustomMutationParams<TData, TError, TVariables>,
    unknown
  >({
    mutationKey: keys().data().mutation("customMutation").get(),
    mutationFn: ({
      url,
      method,
      values,
      meta,
      dataProviderName,
      config,
    }: useCustomMutationParams<TData, TError, TVariables>) => {
      const combinedMeta = getMeta({
        meta: meta,
      });

      const { custom } = dataProvider(dataProviderName);

      if (custom) {
        return custom<TData>({
          url,
          method,
          payload: values,
          meta: combinedMeta,
          headers: { ...config?.headers },
        });
      }

      throw Error("Not implemented custom on data provider.");
    },
    onSuccess: (data, variables, context) => {
      const {
        successNotification: successNotificationFromProp,
        config,
        meta,
      } = variables;

      const notificationConfig =
        typeof successNotificationFromProp === "function"
          ? successNotificationFromProp(data, {
              ...config,
              ...(meta || {}),
            })
          : successNotificationFromProp;

      handleNotification(notificationConfig);

      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (err: TError, variables, context) => {
      const {
        errorNotification: errorNotificationFromProp,
        method,
        config,
        meta,
      } = variables;

      checkError(err);

      const notificationConfig =
        typeof errorNotificationFromProp === "function"
          ? errorNotificationFromProp(err, {
              ...config,
              ...(meta || {}),
            })
          : errorNotificationFromProp;

      handleNotification(notificationConfig, {
        key: `${method}-notification`,
        message: translate(
          "notifications.error",
          { statusCode: err.statusCode },
          `Error (status code: ${err.statusCode})`,
        ),
        description: err.message,
        type: "error",
      });

      mutationOptions?.onError?.(err, variables, context);
    },
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useCustomMutation"),
    },
  });

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading: mutationResult.isPending,
  });

  return {
    mutation: mutationResult,
    mutate: mutationResult.mutate,
    mutateAsync: mutationResult.mutateAsync,
    overtime: { elapsedTime },
  };
};
