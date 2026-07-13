import { useEffect } from "react";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type QueryObserverResult,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

import { prepareQueryContext } from "@definitions/helpers";
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
  CrudFilter,
  CrudSort,
  CustomResponse,
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

interface UseCustomConfig<TQuery, TPayload> {
  sorters?: CrudSort[];
  filters?: CrudFilter[];
  query?: TQuery;
  payload?: TPayload;
  headers?: {};
}

// Clean type without custom callback extensions
export type UseCustomQueryOptions<TQueryFnData, TError, TData> = Omit<
  UseQueryOptions<CustomResponse<TQueryFnData>, TError, CustomResponse<TData>>,
  "queryKey" | "queryFn"
> & {
  // Make queryKey and queryFn optional for backward compatibility
  queryKey?: UseQueryOptions<
    CustomResponse<TQueryFnData>,
    TError,
    CustomResponse<TData>
  >["queryKey"];
  queryFn?: UseQueryOptions<
    CustomResponse<TQueryFnData>,
    TError,
    CustomResponse<TData>
  >["queryFn"];
};

export type UseCustomProps<TQueryFnData, TError, TQuery, TPayload, TData> = {
  /**
   * request's URL
   */
  url: string;
  /**
   * request's method (`GET`, `POST`, etc.)
   */
  method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
  /**
   * The config of your request. You can send headers, payload, query, filters and sorters using this field
   */
  config?: UseCustomConfig<TQuery, TPayload>;
  /**
   * react-query's [useQuery](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) options
   */
  queryOptions?: UseCustomQueryOptions<TQueryFnData, TError, TData>;
  /**
   * meta data for `dataProvider`
   */
  meta?: MetaQuery;
  /**
   * meta data for `dataProvider`
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   */
  dataProviderName?: string;
} & SuccessErrorNotification<
  CustomResponse<TData>,
  TError,
  Prettify<UseCustomConfig<TQuery, TPayload> & MetaQuery>
> &
  UseLoadingOvertimeOptionsProps;

/**
 * `useCustom` is a modified version of `react-query`'s {@link https://tanstack.com/query/v5/docs/framework/react/guides/queries `useQuery`} used for custom requests.
 *
 * It uses the `custom` method from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useCustom} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TQuery - Values for query params
 * @typeParam TPayload - Values for params
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export type UseCustomReturnType<TData, TError> = {
  query: QueryObserverResult<CustomResponse<TData>, TError>;
  result: {
    data: CustomResponse<TData>["data"];
  };
} & UseLoadingOvertimeReturnType;

const EMPTY_OBJECT = Object.freeze({}) as any;

export const useCustom = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TQuery = unknown,
  TPayload = unknown,
  TData extends BaseRecord = TQueryFnData,
>({
  url,
  method,
  config,
  queryOptions,
  successNotification,
  errorNotification,
  meta,
  dataProviderName,
  overtimeOptions,
}: UseCustomProps<
  TQueryFnData,
  TError,
  TQuery,
  TPayload,
  TData
>): UseCustomReturnType<TData, TError> => {
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const { mutate: checkError } = useOnError();
  const handleNotification = useHandleNotification();
  const getMeta = useMeta();
  const { keys } = useKeys();

  const preferredMeta = meta;

  const { custom } = dataProvider(dataProviderName);

  const combinedMeta = getMeta({ meta: preferredMeta });

  if (custom) {
    const queryResponse = useQuery<
      CustomResponse<TQueryFnData>,
      TError,
      CustomResponse<TData>
    >({
      queryKey: keys()
        .data(dataProviderName)
        .mutation("custom")
        .params({
          method,
          url,
          ...config,
          ...(preferredMeta || {}),
        })
        .get(),
      queryFn: (context) =>
        custom<TQueryFnData>({
          url,
          method,
          ...config,
          meta: prepareQueryContext(context as any, combinedMeta),
        }),
      ...queryOptions,
      meta: {
        ...queryOptions?.meta,
        ...getXRay("useCustom"),
      },
    });

    // Handle success
    useEffect(() => {
      if (queryResponse.isSuccess && queryResponse.data) {
        const notificationConfig =
          typeof successNotification === "function"
            ? successNotification(queryResponse.data, {
                ...config,
                ...combinedMeta,
              })
            : successNotification;

        handleNotification(notificationConfig);
      }
    }, [queryResponse.isSuccess, queryResponse.data, successNotification]);

    // Handle error
    useEffect(() => {
      if (queryResponse.isError && queryResponse.error) {
        checkError(queryResponse.error);

        const notificationConfig =
          typeof errorNotification === "function"
            ? errorNotification(queryResponse.error, {
                ...config,
                ...combinedMeta,
              })
            : errorNotification;

        handleNotification(notificationConfig, {
          key: `${method}-notification`,
          message: translate(
            "notifications.error",
            { statusCode: queryResponse.error.statusCode },
            `Error (status code: ${queryResponse.error.statusCode})`,
          ),
          description: queryResponse.error.message,
          type: "error",
        });
      }
    }, [queryResponse.isError, queryResponse.error?.message]);
    const { elapsedTime } = useLoadingOvertime({
      ...overtimeOptions,
      isLoading: queryResponse.isFetching,
    });

    return {
      query: queryResponse,
      result: {
        data: queryResponse.data?.data || EMPTY_OBJECT,
      },
      overtime: { elapsedTime },
    };
  }
  throw Error("Not implemented custom on data provider.");
};
