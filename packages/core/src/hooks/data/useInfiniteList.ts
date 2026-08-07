import { useEffect } from "react";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type InfiniteData,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";

import {
  getNextPageParam,
  getPreviousPageParam,
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
import type { MakeOptional } from "../../definitions/types";

import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

export interface UseInfiniteListConfig {
  pagination?: Pagination;
  hasPagination?: boolean;
  filters?: CrudFilter[];
}

type BaseInfiniteListProps = {
  /**
   *  Metadata query for `dataProvider`
   */
  meta?: MetaQuery;
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
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use
   */
  dataProviderName?: string;
};

// Custom type to extend UseInfiniteQueryOptions
export type UseInfiniteListQueryOptions<TQueryFnData, TError, TData> =
  MakeOptional<
    UseInfiniteQueryOptions<
      GetListResponse<TQueryFnData>,
      TError,
      InfiniteData<GetListResponse<TData>>
    >,
    "queryKey" | "queryFn" | "initialPageParam"
  >;

export type UseInfiniteListProps<TQueryFnData, TError, TData> = {
  /**
   * Resource name for API data interactions
   */
  resource: string;
  /**
   * Tanstack Query's [useInfiniteQuery](https://tanstack.com/query/v5/docs/framework/react/reference/useInfiniteQuery) options
   */
  queryOptions?: Omit<
    UseInfiniteListQueryOptions<TQueryFnData, TError, TData>,
    "getNextPageParam"
  > & {
    /**
     * Make `getNextPageParam` optional to allow custom pagination logic
     */
    getNextPageParam?: UseInfiniteListQueryOptions<
      TQueryFnData,
      TError,
      TData
    >["getNextPageParam"];
  };
} & BaseInfiniteListProps &
  SuccessErrorNotification<
    InfiniteData<GetListResponse<TData>>,
    TError,
    Prettify<BaseInfiniteListProps>
  > &
  LiveModeProps &
  UseLoadingOvertimeOptionsProps & {
    onSuccess?: (data: InfiniteData<GetListResponse<TData>>) => void;
    onError?: (error: TError) => void;
  };

export type UseInfiniteListReturnType<TData, TError> = {
  query: UseInfiniteQueryResult<InfiniteData<GetListResponse<TData>>, TError>;
  result: {
    data: InfiniteData<GetListResponse<TData>> | undefined;
    hasNextPage: boolean | undefined;
    hasPreviousPage: boolean | undefined;
  };
} & UseLoadingOvertimeReturnType;

/**
 * `useInfiniteList` is a modified version of `react-query`'s {@link https://tanstack.com/query/latest/docs/react/guides/infinite-queries `useInfiniteQuery`} used for retrieving items from a `resource` with pagination, sort, and filter configurations.
 *
 * It uses the `getList` method as the query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useInfiniteList} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useInfiniteList = <
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
  onSuccess,
  onError,
}: UseInfiniteListProps<
  TQueryFnData,
  TError,
  TData
>): UseInfiniteListReturnType<TData, TError> => {
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
  const notificationValues = {
    meta: preferredMeta,
    filters: prefferedFilters,
    hasPagination: isServerPagination,
    pagination: prefferedPagination,
    sorters: prefferedSorters,
  };

  const isEnabled =
    queryOptions?.enabled === undefined || queryOptions?.enabled === true;

  const combinedMeta = getMeta({ resource, meta: preferredMeta });

  const { getList } = dataProvider(pickedDataProvider);

  useResourceSubscription({
    resource: identifier,
    types: ["*"],
    params: {
      meta: combinedMeta,
      pagination: prefferedPagination,
      hasPagination: isServerPagination,
      sort: prefferedSorters,
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
      ...combinedMeta,
      dataProviderName: pickedDataProvider,
    },
  });

  const queryResponse = useInfiniteQuery<
    GetListResponse<TQueryFnData>,
    TError,
    InfiniteData<GetListResponse<TData>>
  >({
    queryKey: keys()
      .data(pickedDataProvider)
      .resource(identifier)
      .action("infinite")
      .params({
        ...(preferredMeta || {}),
        filters: prefferedFilters,
        hasPagination: isServerPagination,
        ...(isServerPagination && {
          pagination: prefferedPagination,
        }),
        ...(sorters && {
          sorters,
        }),
      })
      .get(),
    queryFn: (context) => {
      const paginationProperties = {
        ...prefferedPagination,
        currentPage:
          (context.pageParam as number) ?? prefferedPagination.currentPage,
      };

      const meta = prepareQueryContext(context, combinedMeta);

      return getList<TQueryFnData>({
        resource: resource?.name || "",
        pagination: paginationProperties,
        filters: prefferedFilters,
        sorters: prefferedSorters,
        meta,
      }).then(({ data, total, ...rest }) => {
        return {
          data,
          total,
          pagination: paginationProperties,
          ...rest,
        };
      });
    },
    initialPageParam:
      queryOptions?.initialPageParam ?? prefferedPagination.currentPage,
    getNextPageParam: (lastPage) => getNextPageParam(lastPage),
    getPreviousPageParam: (lastPage) => getPreviousPageParam(lastPage),
    ...queryOptions,
    meta: {
      ...(queryOptions?.meta ?? {}),
      ...getXRay("useInfiniteList", resource?.name),
    },
  });

  // Handle success
  useEffect(() => {
    if (queryResponse.isSuccess && queryResponse.data) {
      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(
              queryResponse.data as unknown as InfiniteData<
                GetListResponse<TData>
              >,
              notificationValues,
              identifier,
            )
          : successNotification;

      handleNotification(notificationConfig);

      onSuccess?.(
        queryResponse.data as unknown as InfiniteData<GetListResponse<TData>>,
      );
    }
  }, [
    queryResponse.isSuccess,
    queryResponse.data,
    successNotification,
    onSuccess,
  ]);

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
        key: `${identifier}-useInfiniteList-notification`,
        message: translate(
          "notifications.error",
          { statusCode: queryResponse.error.statusCode },
          `Error (status code: ${queryResponse.error.statusCode})`,
        ),
        description: queryResponse.error.message,
        type: "error",
      });

      onError?.(queryResponse.error);
    }
  }, [queryResponse.isError, queryResponse.error?.message]);

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading: queryResponse.isFetching,
  });

  return {
    query: queryResponse,
    result: {
      data: queryResponse.data,
      hasNextPage: queryResponse.hasNextPage,
      hasPreviousPage: queryResponse.hasPreviousPage,
    },
    overtime: { elapsedTime },
  };
};
