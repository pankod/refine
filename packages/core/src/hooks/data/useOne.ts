import { useEffect } from "react";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type QueryObserverResult,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

import { pickDataProvider, prepareQueryContext } from "@definitions";
import {
  useDataProvider,
  useHandleNotification,
  useKeys,
  useMeta,
  useOnError,
  useResourceParams,
  useResourceSubscription,
  useTranslate,
} from "@hooks";

import type {
  BaseKey,
  BaseRecord,
  GetOneResponse,
  HttpError,
  MetaQuery,
  Prettify,
} from "../../contexts/data/types";
import type { LiveModeProps } from "../../contexts/live/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

export type UseOneProps<TQueryFnData, TError, TData> = {
  /**
   * Resource name for API data interactions
   */
  resource?: string;
  /**
   * id of the item in the resource
   * @type [`BaseKey`](/docs/api-reference/core/interfaceReferences/#basekey)
   */
  id?: BaseKey;
  /**
   * react-query's [useQuery](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) options
   */
  queryOptions?: Omit<
    UseQueryOptions<
      GetOneResponse<TQueryFnData>,
      TError,
      GetOneResponse<TData>
    >,
    "queryKey" | "queryFn"
  > & {
    // Make queryKey and queryFn optional
    queryKey?: UseQueryOptions<
      GetOneResponse<TQueryFnData>,
      TError,
      GetOneResponse<TData>
    >["queryKey"];
    queryFn?: UseQueryOptions<
      GetOneResponse<TQueryFnData>,
      TError,
      GetOneResponse<TData>
    >["queryFn"];
  };
  /**
   * Metadata query for `dataProvider`,
   */
  meta?: MetaQuery;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   * @default `"default"``
   */
  dataProviderName?: string;
} & SuccessErrorNotification<
  GetOneResponse<TData>,
  TError,
  Prettify<{ id?: BaseKey } & MetaQuery>
> &
  LiveModeProps &
  UseLoadingOvertimeOptionsProps;

export type UseOneReturnType<TData, TError> = {
  query: QueryObserverResult<GetOneResponse<TData>, TError>;
  result: TData | undefined;
} & UseLoadingOvertimeReturnType;

/**
 * `useOne` is a modified version of `react-query`'s {@link https://tanstack.com/query/v5/docs/framework/react/guides/queries `useQuery`} used for retrieving single items from a `resource`.
 *
 * It uses `getOne` method as query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useOne} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useOne = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>({
  resource: resourceFromProp,
  id,
  queryOptions,
  successNotification,
  errorNotification,
  meta,
  liveMode,
  onLiveEvent,
  liveParams,
  dataProviderName,
  overtimeOptions,
}: UseOneProps<TQueryFnData, TError, TData>): UseOneReturnType<TData, TError> &
  UseLoadingOvertimeReturnType => {
  const { resources, resource, identifier } = useResourceParams({
    resource: resourceFromProp,
  });

  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const { mutate: checkError } = useOnError();
  const handleNotification = useHandleNotification();
  const getMeta = useMeta();
  const { keys } = useKeys();

  const preferredMeta = meta;
  const pickedDataProvider = pickDataProvider(
    identifier,
    dataProviderName,
    resources,
  );

  const { getOne } = dataProvider(pickedDataProvider);

  const combinedMeta = getMeta({ resource, meta: preferredMeta });

  const isEnabled =
    typeof queryOptions?.enabled !== "undefined"
      ? queryOptions?.enabled === true
      : typeof resource?.name !== "undefined" && typeof id !== "undefined";

  useResourceSubscription({
    resource: identifier,
    types: ["*"],
    channel: `resources/${resource?.name}`,
    params: {
      ids: id ? [id] : [],
      id: id,
      meta: combinedMeta,
      subscriptionType: "useOne",
      ...liveParams,
    },
    enabled: isEnabled,
    liveMode,
    onLiveEvent,
    meta: {
      ...meta,
      dataProviderName: pickedDataProvider,
    },
  });

  const queryResponse = useQuery<
    GetOneResponse<TQueryFnData>,
    TError,
    GetOneResponse<TData>
  >({
    queryKey: keys()
      .data(pickedDataProvider)
      .resource(identifier ?? "")
      .action("one")
      .id(id ?? "")
      .params({
        ...(preferredMeta || {}),
      })
      .get(),
    queryFn: (context) =>
      getOne<TQueryFnData>({
        resource: resource?.name ?? "",
        id: id!,
        meta: prepareQueryContext(context as any, combinedMeta),
      }),
    ...queryOptions,
    enabled: isEnabled,
    meta: {
      ...queryOptions?.meta,
      ...getXRay("useOne", resource?.name),
    },
  });

  // Handle success
  useEffect(() => {
    if (queryResponse.isSuccess && queryResponse.data) {
      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(
              queryResponse.data,
              {
                id,
                ...combinedMeta,
              },
              identifier,
            )
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
          ? errorNotification(
              queryResponse.error,
              {
                id,
                ...combinedMeta,
              },
              identifier,
            )
          : errorNotification;

      handleNotification(notificationConfig, {
        key: `${id}-${identifier}-getOne-notification`,
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
    result: queryResponse.data?.data,
    overtime: { elapsedTime },
  };
};
