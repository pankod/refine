import { useEffect } from "react";

import { getXRay } from "@refinedev/devtools-internal";
import { useMemo } from "react";
import {
  type QueryObserverResult,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

import {
  handlePaginationParams,
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
  BaseRecord,
  CrudFilter,
  CrudSort,
  GetListResponse,
  HttpError,
  MetaQuery,
  Pagination,
  Prettify,
} from "../../contexts/data/types";
import type { LiveModeProps } from "../../contexts/live/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";
import type { MakeOptional } from "../../definitions/types/index";

export type BaseListProps = {
  /**
   * Pagination properties
   */
  pagination?: Pagination;
  /**
   * Sorter parameters
   */
  sorters?: CrudSort[];
  /**
   * Filter parameters
   */
  filters?: CrudFilter[];
  /**
   * Meta data query for `dataProvider`
   */
  meta?: MetaQuery;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use
   */
  dataProviderName?: string;
};

export type UseListQueryOptions<TQueryFnData, TError, TData> = MakeOptional<
  UseQueryOptions<
    GetListResponse<TQueryFnData>,
    TError,
    GetListResponse<TData>
  >,
  "queryKey" | "queryFn"
>;

export type UseListProps<TQueryFnData, TError, TData> = {
  /**
   * Resource name for API data interactions
   */
  resource?: string;

  /**
   * Tanstack Query's [useQuery](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) options
   */
  queryOptions?: UseListQueryOptions<TQueryFnData, TError, TData>;
} & BaseListProps &
  SuccessErrorNotification<
    GetListResponse<TData>,
    TError,
    Prettify<BaseListProps>
  > &
  LiveModeProps &
  UseLoadingOvertimeOptionsProps;

export type UseListReturnType<TData, TError> = {
  query: QueryObserverResult<GetListResponse<TData>, TError>;
  result: {
    data: TData[];
    total: number | undefined;
    [key: string]: any;
  };
} & UseLoadingOvertimeReturnType;

const EMPTY_ARRAY = Object.freeze([]) as [];

/**
 * `useList` is a modified version of `react-query`'s {@link https://tanstack.com/query/v5/docs/framework/react/guides/queries `useQuery`} used for retrieving items from a `resource` with pagination, sort, and filter configurations.
 *
 * It uses the `getList` method as the query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useList} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useList = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>({
  resource: resourceFromProp,
  filters,
  pagination,
  sorters,
  queryOptions,
  successNotification,
  errorNotification,
  meta,
  liveMode,
  onLiveEvent,
  liveParams,
  dataProviderName,
  overtimeOptions,
}: UseListProps<TQueryFnData, TError, TData> = {}): UseListReturnType<
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

  const pickedDataProvider = pickDataProvider(
    identifier,
    dataProviderName,
    resources,
  );
  const preferredMeta = meta;
  const prefferedFilters = filters;
  const prefferedSorters = sorters;
  const prefferedPagination = handlePaginationParams({
    pagination,
  });
  const isServerPagination = prefferedPagination.mode === "server";

  const combinedMeta = getMeta({ resource, meta: preferredMeta });

  const notificationValues = {
    meta: combinedMeta,
    filters: prefferedFilters,
    hasPagination: isServerPagination,
    pagination: prefferedPagination,
    sorters: prefferedSorters,
  };

  const isEnabled =
    queryOptions?.enabled === undefined || queryOptions?.enabled === true;

  const { getList } = dataProvider(pickedDataProvider);

  useResourceSubscription({
    resource: identifier,
    types: ["*"],
    params: {
      meta: combinedMeta,
      pagination: prefferedPagination,
      hasPagination: isServerPagination,
      sorters: prefferedSorters,
      filters: prefferedFilters,
      subscriptionType: "useList",
      ...liveParams,
    },
    channel: `resources/${resource?.name}`,
    enabled: isEnabled,
    liveMode,
    onLiveEvent,
    meta: {
      ...meta,
      dataProviderName: pickedDataProvider,
    },
  });

  // Memoize the select function to prevent it from running multiple times
  // Note: If queryOptions.select is not memoized by the user, this will still
  // re-run on every render. Users should wrap their select function in useCallback.
  const memoizedSelect = useMemo(() => {
    return (rawData: GetListResponse<TQueryFnData>): GetListResponse<TData> => {
      let data = rawData;

      if (prefferedPagination.mode === "client") {
        data = {
          ...data,
          data: data.data.slice(
            (prefferedPagination.currentPage - 1) *
              prefferedPagination.pageSize,
            prefferedPagination.currentPage * prefferedPagination.pageSize,
          ),
          total: data.total,
        };
      }

      if (queryOptions?.select) {
        return queryOptions?.select?.(data);
      }

      return data as unknown as GetListResponse<TData>;
    };
  }, [
    prefferedPagination.currentPage,
    prefferedPagination.pageSize,
    prefferedPagination.mode,
    queryOptions?.select,
  ]);

  const queryResponse = useQuery<
    GetListResponse<TQueryFnData>,
    TError,
    GetListResponse<TData>
  >({
    queryKey: keys()
      .data(pickedDataProvider)
      .resource(identifier ?? "")
      .action("list")
      .params({
        ...(preferredMeta || {}),
        filters: prefferedFilters,
        ...(isServerPagination && {
          pagination: prefferedPagination,
        }),
        ...(sorters && {
          sorters,
        }),
      })
      .get(),
    queryFn: (context) => {
      const meta = prepareQueryContext(context, combinedMeta);
      return getList<TQueryFnData>({
        resource: resource?.name ?? "",
        pagination: prefferedPagination,
        filters: prefferedFilters,
        sorters: prefferedSorters,
        meta,
      });
    },
    ...queryOptions,
    enabled:
      typeof queryOptions?.enabled !== "undefined"
        ? queryOptions?.enabled
        : !!resource?.name,
    select: memoizedSelect,
    meta: {
      ...queryOptions?.meta,
      ...getXRay("useList", resource?.name),
    },
  });

  // Handle success
  useEffect(() => {
    if (queryResponse.isSuccess && queryResponse.data) {
      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(
              queryResponse.data,
              notificationValues,
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
              notificationValues,
              identifier,
            )
          : errorNotification;

      handleNotification(notificationConfig, {
        key: `${identifier}-useList-notification`,
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
      ...queryResponse?.data,
      data: queryResponse?.data?.data || EMPTY_ARRAY,
      total: queryResponse?.data?.total,
    },
    overtime: { elapsedTime },
  };
};
