import { useEffect } from "react";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type QueryObserverResult,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

import {
  handleMultiple,
  pickDataProvider,
  prepareQueryContext,
} from "@definitions/helpers";
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
  GetManyResponse,
  HttpError,
  MetaQuery,
} from "../../contexts/data/types";
import type { LiveModeProps } from "../../contexts/live/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";
import warnOnce from "warn-once";
import type { MakeOptional } from "../../definitions/types";

export type UseManyQueryOptions<TQueryFnData, TError, TData> = MakeOptional<
  UseQueryOptions<
    GetManyResponse<TQueryFnData>,
    TError,
    GetManyResponse<TData>
  >,
  "queryKey" | "queryFn"
>;

export type UseManyReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
> = {
  query: QueryObserverResult<GetManyResponse<TData>, TError>;
  result: {
    data: TData[];
  };
} & UseLoadingOvertimeReturnType;

export type UseManyProps<TQueryFnData, TError, TData> = {
  /**
   * Resource name for API data interactions
   */
  resource: string;
  /**
   * ids of the item in the resource
   * @type [`BaseKey[]`](/docs/api-reference/core/interfaceReferences/#basekey)
   */
  ids: BaseKey[];
  /**
   * react-query's [useQuery](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) options
   */
  queryOptions?: UseManyQueryOptions<TQueryFnData, TError, TData>;
  /**
   * Meta data for `dataProvider`
   */
  meta?: MetaQuery;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   * @default "default"
   */
  dataProviderName?: string;
} & SuccessErrorNotification<GetManyResponse<TData>, TError, BaseKey[]> &
  LiveModeProps &
  UseLoadingOvertimeOptionsProps;

const EMPTY_ARRAY = Object.freeze([]) as [];

/**
 * `useMany` is a modified version of `react-query`'s {@link https://tanstack.com/query/v5/docs/framework/react/guides/queries `useQuery`} used for retrieving multiple items from a `resource`.
 *
 * It uses `getMany` method as query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useMany} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useMany = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>({
  resource: resourceFromProp,
  ids,
  queryOptions,
  successNotification,
  errorNotification,
  meta,
  liveMode,
  onLiveEvent,
  liveParams,
  dataProviderName,
  overtimeOptions,
}: UseManyProps<TQueryFnData, TError, TData>): UseManyReturnType<
  TData,
  TError
> &
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
  const isEnabled =
    queryOptions?.enabled === undefined || queryOptions?.enabled === true;

  const { getMany, getOne } = dataProvider(pickedDataProvider);

  const combinedMeta = getMeta({ resource, meta: preferredMeta });

  const hasIds = Array.isArray(ids);
  const hasResource = Boolean(resource?.name);
  const manuallyEnabled = queryOptions?.enabled === true;

  warnOnce(
    !hasIds && !manuallyEnabled,
    idsWarningMessage(ids, resource?.name || resource?.identifier || ""),
  );
  warnOnce(!hasResource && !manuallyEnabled, resourceWarningMessage());

  useResourceSubscription({
    resource: identifier,
    types: ["*"],
    params: {
      ids: ids ?? [],
      meta: combinedMeta,
      subscriptionType: "useMany",
      ...liveParams,
    },
    channel: `resources/${resource?.name ?? ""}`,
    enabled: isEnabled,
    liveMode,
    onLiveEvent,
    meta: {
      ...meta,
      dataProviderName: pickedDataProvider,
    },
  });

  const queryResponse = useQuery<
    GetManyResponse<TQueryFnData>,
    TError,
    GetManyResponse<TData>
  >({
    queryKey: keys()
      .data(pickedDataProvider)
      .resource(identifier)
      .action("many")
      .ids(...(ids ?? []))
      .params({
        ...(preferredMeta || {}),
      })
      .get(),
    queryFn: (context) => {
      const meta = prepareQueryContext(context as any, combinedMeta);

      if (getMany) {
        return getMany({
          resource: resource?.name || "",
          ids,
          meta,
        });
      }
      return handleMultiple(
        ids.map((id) =>
          getOne<TQueryFnData>({
            resource: resource?.name || "",
            id,
            meta,
          }),
        ),
      );
    },
    enabled: hasIds && hasResource,
    ...queryOptions,
    meta: {
      ...queryOptions?.meta,
      ...getXRay("useMany", resource?.name),
    },
  });

  // Handle success
  useEffect(() => {
    if (queryResponse.isSuccess && queryResponse.data) {
      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(queryResponse.data, ids, identifier)
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
          ? errorNotification(queryResponse.error, ids, identifier)
          : errorNotification;

      handleNotification(notificationConfig, {
        key: `${ids[0]}-${identifier}-getMany-notification`,
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
      data: queryResponse?.data?.data || EMPTY_ARRAY,
    },
    overtime: { elapsedTime },
  };
};

const idsWarningMessage = (
  ids: BaseKey[],
  resource: string,
) => `[useMany]: Missing "ids" prop. Expected an array of ids, but got "${typeof ids}". Resource: "${resource}"

See https://refine.dev/docs/data/hooks/use-many/#ids-`;

const resourceWarningMessage = () => `[useMany]: Missing "resource" prop. Expected a string, but got undefined.

See https://refine.dev/docs/data/hooks/use-many/#resource-`;
