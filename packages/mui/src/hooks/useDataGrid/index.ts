import {
  useUpdate,
  useLiveMode,
  useTable as useTableCore,
  type BaseRecord,
  type CrudFilter,
  type CrudFilters,
  type CrudSort,
  type HttpError,
  type Pagination,
  type Prettify,
  type UseUpdateProps,
  type useTableProps as useTablePropsCore,
  type useTableReturnType as useTableReturnTypeCore,
  useResourceParams,
} from "@refinedev/core";
import { useEffect, useMemo, useRef, useState } from "react";

import type {
  DataGridProps,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid";

import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";

import {
  transformCrudFiltersToFilterModel,
  transformCrudSortingToSortModel,
  transformFilterModelToCrudFilters,
  transformSortModelToCrudSorting,
} from "@definitions";

type DataGridPropsOverride = Omit<DataGridProps, "onFilterModelChange"> & {
  onFilterModelChange: (model: GridFilterModel) => void;
};

type DataGridPropsType = Required<
  Pick<
    DataGridPropsOverride,
    | "rows"
    | "loading"
    | "rowCount"
    | "sortingMode"
    | "sortModel"
    | "onSortModelChange"
    | "filterMode"
    | "onFilterModelChange"
    | "disableRowSelectionOnClick"
    | "onStateChange"
    | "paginationMode"
  >
> &
  Pick<
    DataGridProps,
    | "paginationModel"
    | "onPaginationModelChange"
    | "filterModel"
    | "filterDebounceMs"
    | "processRowUpdate"
  >;

export type UseDataGridProps<
  TQueryFnData,
  TError extends HttpError,
  TSearchVariables,
  TData extends BaseRecord,
> = Omit<
  useTablePropsCore<TQueryFnData, TError, TData>,
  "pagination" | "filters"
> & {
  onSearch?: (data: TSearchVariables) => CrudFilters | Promise<CrudFilters>;
  pagination?: Prettify<
    Omit<Pagination, "pageSize"> & {
      /**
       * Initial number of items per page
       * @default 25
       */
      pageSize?: number;
    }
  >;
  filters?: Prettify<
    Omit<
      NonNullable<useTablePropsCore<TQueryFnData, TError, TData>["filters"]>,
      "defaultBehavior"
    > & {
      /**
       * Default behavior of the `setFilters` function
       * @default "replace"
       */
      defaultBehavior?: "replace" | "merge";
    }
  >;
  editable?: boolean;
  updateMutationOptions?: UseUpdateProps<
    TData,
    TError,
    TData
  >["mutationOptions"];
};

export type UseDataGridReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TSearchVariables = unknown,
> = useTableReturnTypeCore<TData, TError> & {
  dataGridProps: DataGridPropsType;
  search: (value: TSearchVariables) => Promise<void>;
};

/**
 * By using useDataGrid, you are able to get properties that are compatible with
 * Material UI {@link https://mui.com/x/react-data-grid/ `<DataGrid>`} component.
 * All features such as sorting, filtering and pagination comes as out of box.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/hooks/useDataGrid/} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TSearchVariables - Values for search params
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

const defaultPermanentFilter: CrudFilter[] = [];
const defaultPermanentSort: CrudSort[] = [];
const DEFAULT_FILTER_DEBOUNCE_MS = 300;

export function useDataGrid<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TSearchVariables = unknown,
  TData extends BaseRecord = TQueryFnData,
>({
  onSearch: onSearchProp,
  pagination = { pageSize: 25 },
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
  editable = false,
  updateMutationOptions,
}: UseDataGridProps<
  TQueryFnData,
  TError,
  TSearchVariables,
  TData
> = {}): UseDataGridReturnType<TData, TError, TSearchVariables> {
  const liveMode = useLiveMode(liveModeFromProp);

  const columnsTypes = useRef<Record<string, string>>({});
  // Debounce server-side filter fetches so UI input stays responsive.
  const filterDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { identifier } = useResourceParams({ resource: resourceFromProp });

  const {
    tableQuery,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    filters,
    setFilters,
    sorters,
    setSorters,
    pageCount,
    createLinkForSyncWithLocation,
    overtime,
    result,
  } = useTableCore<TQueryFnData, TError, TData>({
    pagination: {
      ...pagination,
      pageSize: pagination?.pageSize ?? 25,
    },
    filters: { ...filtersFromProp, defaultBehavior: "replace" },
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
  });

  const [muiCrudFilters, setMuiCrudFilters] = useState<CrudFilters>(filters);

  const { data, isFetched, isLoading } = tableQuery;

  const rowCountRef = useRef(data?.total || 0);
  const rowCount = useMemo(() => {
    if (data?.total) {
      rowCountRef.current = data.total;
    }
    return rowCountRef.current;
  }, [data]);

  const isServerSideFilteringEnabled =
    (filtersFromProp?.mode || "server") === "server";
  const isServerSideSortingEnabled =
    (sortersFromProp?.mode || "server") === "server";
  const isPaginationEnabled = (pagination?.mode ?? "server") !== "off";

  const preferredPermanentSorters =
    sortersFromProp?.permanent ?? defaultPermanentSort;
  const preferredPermanentFilters =
    filtersFromProp?.permanent ?? defaultPermanentFilter;

  const handlePageChange = (page: number) => {
    if (isPaginationEnabled) {
      setCurrentPage(page + 1);
    }
  };
  const handlePageSizeChange = (pageSize: number) => {
    if (isPaginationEnabled) {
      setPageSize(pageSize);
    }
  };

  const clearFilterDebounce = () => {
    if (filterDebounceRef.current) {
      clearTimeout(filterDebounceRef.current);
      filterDebounceRef.current = null;
    }
  };

  // Ensure no pending filter update fires after unmount.
  useEffect(() => {
    return () => {
      clearFilterDebounce();
    };
  }, []);

  // Apply filters immediately to local state (and reset page if needed).
  const applyFilters = (crudFilters: CrudFilters) => {
    setFilters(crudFilters.filter((f) => f.value !== ""));
    if (isPaginationEnabled) {
      setCurrentPage(1);
    }
  };

  const handleSortModelChange = (sortModel: GridSortModel) => {
    const crudSorting = transformSortModelToCrudSorting(sortModel);
    setSorters(crudSorting);
  };

  const handleFilterModelChange = (filterModel: GridFilterModel) => {
    const crudFilters = transformFilterModelToCrudFilters(filterModel);
    setMuiCrudFilters(crudFilters);
    if (isServerSideFilteringEnabled) {
      // Let the input update immediately; debounce only the server query.
      clearFilterDebounce();
      filterDebounceRef.current = setTimeout(() => {
        applyFilters(crudFilters);
      }, DEFAULT_FILTER_DEBOUNCE_MS);
      return;
    }
    applyFilters(crudFilters);
  };

  const search = async (value: TSearchVariables) => {
    if (onSearchProp) {
      const searchFilters = await onSearchProp(value);
      clearFilterDebounce();
      setMuiCrudFilters(searchFilters);
      applyFilters(searchFilters);
    }
  };

  const dataGridPaginationValues = (): Pick<
    DataGridProps,
    "paginationModel" | "onPaginationModelChange"
  > &
    Required<Pick<DataGridProps, "paginationMode">> => {
    if (isPaginationEnabled) {
      return {
        paginationMode: "server" as const,
        paginationModel: {
          page: currentPage - 1,
          pageSize,
        },
        onPaginationModelChange: (model) => {
          handlePageChange(model.page);
          handlePageSizeChange(model.pageSize);
        },
      };
    }

    return {
      paginationMode: "client" as const,
    };
  };

  const { mutate } = useUpdate<TData, TError, TData>({
    mutationOptions: updateMutationOptions,
  });

  const processRowUpdate = async (newRow: TData, oldRow: TData) => {
    if (!editable) {
      return Promise.resolve(oldRow);
    }

    if (!identifier) {
      return Promise.reject(new Error("Resource is not defined"));
    }

    return new Promise((resolve, reject) => {
      mutate(
        {
          resource: identifier,
          id: newRow.id as string,
          values: newRow,
          meta: updateMutationOptions?.meta,
        },
        {
          onError: (error) => {
            reject(error);
          },
          onSuccess: () => {
            resolve(newRow);
          },
        },
      );
    });
  };

  const transformedSortModel = useMemo(
    () =>
      transformCrudSortingToSortModel(
        differenceWith(sorters, preferredPermanentSorters, isEqual),
      ),
    [sorters, preferredPermanentSorters],
  );

  return {
    tableQuery,
    dataGridProps: {
      disableRowSelectionOnClick: true,
      rows: data?.data || [],
      loading: liveMode === "auto" ? isLoading : !isFetched,
      rowCount,
      ...dataGridPaginationValues(),
      sortingMode: isServerSideSortingEnabled ? "server" : "client",
      sortModel: transformedSortModel,
      onSortModelChange: handleSortModelChange,
      filterMode: isServerSideFilteringEnabled ? "server" : "client",
      // Disable DataGrid's debounce for server filtering to prevent input resets.
      filterDebounceMs: isServerSideFilteringEnabled ? 0 : undefined,
      filterModel: transformCrudFiltersToFilterModel(
        differenceWith(muiCrudFilters, preferredPermanentFilters, isEqual),
        columnsTypes.current,
      ),
      onFilterModelChange: handleFilterModelChange,
      onStateChange: (state) => {
        const newColumnsTypes = Object.fromEntries(
          Object.entries(state.columns.lookup).map(([key, value]) => {
            return [key, (value as any).type];
          }),
        );
        const isStateChanged = !isEqual(newColumnsTypes, columnsTypes.current);

        if (isStateChanged) {
          columnsTypes.current = newColumnsTypes;
        }
      },
      processRowUpdate: editable ? processRowUpdate : undefined,
    },
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    pageCount,
    sorters,
    setSorters,
    filters,
    setFilters,
    search,
    createLinkForSyncWithLocation,
    overtime,
    result,
  };
}
