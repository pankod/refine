import React, { useState, useEffect, useCallback } from "react";

import type {
  QueryObserverResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";
import warnOnce from "warn-once";

import {
  parseTableParams,
  setInitialFilters,
  setInitialSorters,
  unionFilters,
  unionSorters,
} from "@definitions/table";
import {
  useGo,
  useList,
  useLiveMode,
  useMeta,
  useParsed,
  useResourceParams,
  useSyncWithLocation,
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
import type { BaseListProps } from "../data/useList";
import type { MakeOptional } from "../../definitions/types/index";
import type {
  UseLoadingOvertimeOptionsProps,
  UseLoadingOvertimeReturnType,
} from "../useLoadingOvertime";

type SetFilterBehavior = "merge" | "replace";

export type useTableProps<TQueryFnData, TError, TData> = {
  /**
   * Resource name for API data interactions
   * @default Resource name that it reads from route
   */
  resource?: string;
  /**
   * Configuration for pagination
   */
  pagination?: Pagination;
  /**
   * Sort configs
   */
  sorters?: {
    /**
     * Initial sorter state
     */
    initial?: CrudSort[];
    /**
     * Default and unchangeable sorter state
     *  @default `[]`
     */
    permanent?: CrudSort[];
    /**
     * Whether to use server side sorting or not.
     * @default "server"
     */
    mode?: "server" | "off";
  };
  /**
   * Filter configs
   */
  filters?: {
    /**
     * Initial filter state
     */
    initial?: CrudFilter[];
    /**
     * Default and unchangeable filter state
     *  @default `[]`
     */
    permanent?: CrudFilter[];
    /**
     * Default behavior of the `setFilters` function
     * @default `"merge"`
     */
    defaultBehavior?: SetFilterBehavior;
    /**
     * Whether to use server side filter or not.
     * @default "server"
     */
    mode?: "server" | "off";
  };
  /**
   * Sortings, filters, page index and records shown per page are tracked by browser history
   * @default Value set in [Refine](/docs/api-reference/core/components/refine-config/#syncwithlocation). If a custom resource is given, it will be `false`
   */
  syncWithLocation?: boolean;
  /**
   * react-query's [useQuery](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) options
   */
  queryOptions?: MakeOptional<
    UseQueryOptions<
      GetListResponse<TQueryFnData>,
      TError,
      GetListResponse<TData>
    >,
    "queryKey" | "queryFn"
  >;
  /**
   * Metadata query for dataProvider
   */
  meta?: MetaQuery;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   */
  dataProviderName?: string;
} & SuccessErrorNotification<
  GetListResponse<TData>,
  TError,
  Prettify<BaseListProps>
> &
  LiveModeProps &
  UseLoadingOvertimeOptionsProps;

type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

type SyncWithLocationParams = {
  pagination: { currentPage?: number; pageSize?: number };
  sorters: CrudSort[];
  filters: CrudFilter[];
};

export type useTableReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
> = {
  tableQuery: QueryObserverResult<GetListResponse<TData>, TError>;
  sorters: CrudSort[];
  setSorters: (sorter: CrudSort[]) => void;
  filters: CrudFilter[];
  setFilters: ((filters: CrudFilter[], behavior?: SetFilterBehavior) => void) &
    ((setter: (prevFilters: CrudFilter[]) => CrudFilter[]) => void);
  createLinkForSyncWithLocation: (params: SyncWithLocationParams) => string;
  currentPage: number;
  setCurrentPage: ReactSetState<useTableReturnType["currentPage"]>;
  pageSize: number;
  setPageSize: ReactSetState<useTableReturnType["pageSize"]>;
  pageCount: number;
  result: {
    data: TData[];
    total: number | undefined;
    [key: string]: any;
  };
} & UseLoadingOvertimeReturnType;

/**
 * By using useTable, you are able to get properties that are compatible with
 * Ant Design {@link https://ant.design/components/table/ `<Table>`} component.
 * All features such as sorting, filtering and pagination comes as out of box.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/useTable} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

const defaultPermanentFilter: CrudFilter[] = [];
const defaultPermanentSorter: CrudSort[] = [];
const EMPTY_ARRAY = Object.freeze([]) as [];

export function useTable<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>({
  pagination,
  filters: filtersFromProp,
  sorters: sortersFromProp,
  syncWithLocation: syncWithLocationProp,
  resource: resourceFromProp,
  successNotification,
  errorNotification,
  queryOptions,
  liveMode: liveModeFromProp,
  onLiveEvent,
  liveParams,
  meta,
  dataProviderName,
  overtimeOptions,
}: useTableProps<TQueryFnData, TError, TData> = {}): useTableReturnType<
  TData,
  TError
> {
  const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

  const syncWithLocation = syncWithLocationProp ?? syncWithLocationContext;

  const liveMode = useLiveMode(liveModeFromProp);

  const getMeta = useMeta();
  const parsedParams = useParsed();

  const isServerSideFilteringEnabled =
    (filtersFromProp?.mode || "server") === "server";
  const isServerSideSortingEnabled =
    (sortersFromProp?.mode || "server") === "server";
  const isPaginationEnabled = pagination?.mode !== "off";
  const prefferedCurrentPage = pagination?.currentPage;
  const prefferedPageSize = pagination?.pageSize;
  const preferredMeta = meta;

  // Parse table params from URL if available
  const { parsedCurrentPage, parsedPageSize, parsedSorter, parsedFilters } =
    parseTableParams(parsedParams.params?.search ?? "?");

  const preferredInitialFilters = filtersFromProp?.initial;
  const preferredPermanentFilters =
    filtersFromProp?.permanent ?? defaultPermanentFilter;

  const preferredInitialSorters = sortersFromProp?.initial;
  const preferredPermanentSorters =
    sortersFromProp?.permanent ?? defaultPermanentSorter;

  const prefferedFilterBehavior = filtersFromProp?.defaultBehavior ?? "merge";

  let defaultCurrentPage: number;
  let defaultPageSize: number;
  let defaultSorter: CrudSort[] | undefined;
  let defaultFilter: CrudFilter[] | undefined;

  if (syncWithLocation) {
    defaultCurrentPage =
      parsedParams?.params?.currentPage ||
      parsedCurrentPage ||
      prefferedCurrentPage ||
      1;
    defaultPageSize =
      parsedParams?.params?.pageSize ||
      parsedPageSize ||
      prefferedPageSize ||
      10;
    defaultSorter =
      parsedParams?.params?.sorters ||
      (parsedSorter.length ? parsedSorter : preferredInitialSorters);
    defaultFilter =
      parsedParams?.params?.filters ||
      (parsedFilters.length ? parsedFilters : preferredInitialFilters);
  } else {
    defaultCurrentPage = prefferedCurrentPage || 1;
    defaultPageSize = prefferedPageSize || 10;
    defaultSorter = preferredInitialSorters;
    defaultFilter = preferredInitialFilters;
  }

  const go = useGo();

  const { resource, identifier } = useResourceParams({
    resource: resourceFromProp,
  });

  const combinedMeta = getMeta({
    resource,
    meta: preferredMeta,
  });

  React.useEffect(() => {
    warnOnce(
      typeof identifier === "undefined",
      "useTable: `resource` is not defined.",
    );
  }, [identifier]);

  const [sorters, setSorters] = useState<CrudSort[]>(
    setInitialSorters(preferredPermanentSorters, defaultSorter ?? []),
  );
  const [filters, setFilters] = useState<CrudFilter[]>(
    setInitialFilters(preferredPermanentFilters, defaultFilter ?? []),
  );
  const [currentPage, setCurrentPage] = useState<number>(defaultCurrentPage);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);

  const getCurrentQueryParams = (): object => {
    // We get QueryString parameters that are uncontrolled by refine.
    const { sorters, filters, pageSize, current, ...rest } =
      parsedParams?.params ?? {};

    return rest;
  };

  const createLinkForSyncWithLocation = ({
    pagination: { currentPage, pageSize },
    sorters,
    filters,
  }: SyncWithLocationParams) => {
    return (
      go({
        type: "path",
        options: {
          keepHash: true,
          keepQuery: true,
        },
        query: {
          ...(isPaginationEnabled ? { currentPage, pageSize } : {}),
          sorters,
          filters,
          ...getCurrentQueryParams(),
        },
      }) ?? ""
    );
  };

  useEffect(() => {
    if (parsedParams?.params?.search === "") {
      setCurrentPage(defaultCurrentPage);
      setPageSize(defaultPageSize);
      setSorters(
        setInitialSorters(preferredPermanentSorters, defaultSorter ?? []),
      );
      setFilters(
        setInitialFilters(preferredPermanentFilters, defaultFilter ?? []),
      );
    }
  }, [parsedParams?.params?.search]);

  useEffect(() => {
    if (syncWithLocation) {
      go({
        type: "replace",
        options: {
          keepQuery: true,
        },
        query: {
          ...(isPaginationEnabled ? { pageSize, currentPage } : {}),
          sorters: differenceWith(sorters, preferredPermanentSorters, isEqual),
          filters: differenceWith(filters, preferredPermanentFilters, isEqual),
        },
      });
    }
  }, [syncWithLocation, currentPage, pageSize, sorters, filters]);

  const queryResult = useList<TQueryFnData, TError, TData>({
    resource: identifier,
    pagination: { currentPage: currentPage, pageSize, mode: pagination?.mode },
    filters: isServerSideFilteringEnabled
      ? unionFilters(preferredPermanentFilters, filters)
      : undefined,
    sorters: isServerSideSortingEnabled
      ? unionSorters(preferredPermanentSorters, sorters)
      : undefined,
    queryOptions,
    overtimeOptions,
    successNotification,
    errorNotification,
    meta: combinedMeta,
    liveMode,
    liveParams,
    onLiveEvent,
    dataProviderName,
  });

  const setFiltersAsMerge = useCallback(
    (newFilters: CrudFilter[]) => {
      setFilters((prevFilters) =>
        unionFilters(preferredPermanentFilters, newFilters, prevFilters),
      );
    },
    [preferredPermanentFilters],
  );

  const setFiltersAsReplace = useCallback(
    (newFilters: CrudFilter[]) => {
      setFilters(unionFilters(preferredPermanentFilters, newFilters));
    },
    [preferredPermanentFilters],
  );

  const setFiltersWithSetter = useCallback(
    (setter: (prevFilters: CrudFilter[]) => CrudFilter[]) => {
      setFilters((prev) =>
        unionFilters(preferredPermanentFilters, setter(prev)),
      );
    },
    [preferredPermanentFilters],
  );

  const setFiltersFn: useTableReturnType<TQueryFnData>["setFilters"] =
    useCallback(
      (
        setterOrFilters,
        behavior: SetFilterBehavior = prefferedFilterBehavior,
      ) => {
        if (typeof setterOrFilters === "function") {
          setFiltersWithSetter(setterOrFilters);
        } else {
          if (behavior === "replace") {
            setFiltersAsReplace(setterOrFilters);
          } else {
            setFiltersAsMerge(setterOrFilters);
          }
        }
      },
      [setFiltersWithSetter, setFiltersAsReplace, setFiltersAsMerge],
    );

  const setSortWithUnion = useCallback(
    (newSorter: CrudSort[]) => {
      setSorters(() => unionSorters(preferredPermanentSorters, newSorter));
    },
    [preferredPermanentSorters],
  );

  return {
    tableQuery: queryResult.query,
    sorters,
    setSorters: setSortWithUnion,
    filters,
    setFilters: setFiltersFn,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    pageCount: pageSize
      ? Math.ceil((queryResult.result?.total ?? 0) / pageSize)
      : 1,
    createLinkForSyncWithLocation,
    overtime: queryResult.overtime,
    result: {
      ...queryResult.result,
      data: queryResult.result?.data || EMPTY_ARRAY,
      total: queryResult.result?.total,
    },
  };
}
