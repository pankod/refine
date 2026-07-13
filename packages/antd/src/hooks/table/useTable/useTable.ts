import React, { Children, createElement, Fragment } from "react";
import {
  Grid,
  type FormProps,
  Form,
  type TablePaginationConfig,
  type TableProps,
} from "antd";
import { useForm as useFormSF } from "sunflower-antd";

import {
  useLiveMode,
  type BaseRecord,
  type CrudFilters,
  type HttpError,
  useTable as useTableCore,
  type useTableProps as useTablePropsCore,
  type useTableReturnType as useTableCoreReturnType,
  useSyncWithLocation,
} from "@refinedev/core";

import {
  mapAntdSorterToCrudSorting,
  mapAntdFilterToCrudFilter,
} from "@definitions/table";
import { PaginationLink } from "./paginationLink";
import type { FilterValue, SorterResult } from "../../../definitions/table";

export type useTableProps<TQueryFnData, TError, TSearchVariables, TData> =
  useTablePropsCore<TQueryFnData, TError, TData> & {
    onSearch?: (data: TSearchVariables) => CrudFilters | Promise<CrudFilters>;
  };

export type useTableReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TSearchVariables = unknown,
> = useTableCoreReturnType<TData, TError> & {
  searchFormProps: FormProps<TSearchVariables>;
  tableProps: TableProps<TData>;
};

/**
 * By using useTable, you are able to get properties that are compatible with
 * Ant Design {@link https://ant.design/components/table/ `<Table>`} component.
 * All features such as sorting, filtering and pagination comes as out of box.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/hooks/table/useTable/} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TSearchVariables - Values for search params
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useTable = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TSearchVariables = unknown,
  TData extends BaseRecord = TQueryFnData,
>({
  onSearch,
  pagination: paginationFromProp,
  filters: filtersFromProp,
  sorters: sortersFromProp,
  syncWithLocation,
  resource,
  successNotification,
  errorNotification,
  queryOptions,
  liveMode: liveModeFromProp,
  onLiveEvent,
  liveParams,
  meta,
  dataProviderName,
}: useTableProps<
  TQueryFnData,
  TError,
  TSearchVariables,
  TData
> = {}): useTableReturnType<TData, TError, TSearchVariables> => {
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
    createLinkForSyncWithLocation,
    pageCount,
    overtime,
    result,
  } = useTableCore<TQueryFnData, TError, TData>({
    pagination: paginationFromProp,
    filters: filtersFromProp,
    sorters: sortersFromProp,
    syncWithLocation,
    resource,
    successNotification,
    errorNotification,
    queryOptions,
    liveMode: liveModeFromProp,
    onLiveEvent,
    liveParams,
    meta,
    dataProviderName,
  });
  const { syncWithLocation: defaultSyncWithLocation } = useSyncWithLocation();
  const shouldSyncWithLocation = syncWithLocation ?? defaultSyncWithLocation;
  const breakpoint = Grid.useBreakpoint();
  const [form] = Form.useForm<TSearchVariables>();
  const formSF = useFormSF<any, TSearchVariables>({
    form: form,
  });
  const liveMode = useLiveMode(liveModeFromProp);

  const isPaginationEnabled = paginationFromProp?.mode !== "off";

  const preferredInitialFilters = filtersFromProp?.initial;

  const { data, isFetched, isLoading } = tableQuery;

  React.useEffect(() => {
    if (shouldSyncWithLocation) {
      // get registered fields of form
      const registeredFields = formSF.form.getFieldsValue() as Record<
        string,
        any
      >;
      // map `filters` for registered fields
      const filterFilterMap = Object.keys(registeredFields).reduce(
        (acc, curr) => {
          // find filter for current field
          const filter = filters.find(
            (filter) => "field" in filter && filter.field === curr,
          );
          // if filter exists, set value to filter value
          if (filter) {
            acc[curr] = filter?.value;
          }
          return acc;
        },
        {} as Record<string, any>,
      );
      // set values to form
      formSF.form.setFieldsValue(filterFilterMap as any);
    }
  }, [shouldSyncWithLocation]);

  const onChange = (
    paginationState: TablePaginationConfig,
    tableFilters: Record<string, FilterValue | null>,
    sorter: SorterResult | SorterResult[],
  ) => {
    if (tableFilters && Object.keys(tableFilters).length > 0) {
      // Map Antd:Filter -> refine:CrudFilter
      const crudFilters = mapAntdFilterToCrudFilter(
        tableFilters,
        filters,
        preferredInitialFilters,
      );
      setFilters(crudFilters);
    }

    if (sorter && Object.keys(sorter).length > 0) {
      // Map Antd:Sorter -> refine:CrudSorting
      const crudSorting = mapAntdSorterToCrudSorting(sorter);
      setSorters(crudSorting);
    }

    if (isPaginationEnabled) {
      setCurrentPage?.(paginationState.current || 1);
      setPageSize?.(paginationState.pageSize || 10);
    }
  };

  const onFinish = async (value: TSearchVariables) => {
    if (onSearch) {
      const searchFilters = await onSearch(value);
      setFilters(searchFilters);

      if (isPaginationEnabled) {
        setCurrentPage?.(1);
      }
    }
  };

  const antdPagination = (): false | TablePaginationConfig => {
    if (isPaginationEnabled) {
      return {
        itemRender: (page, type, element) => {
          const link = createLinkForSyncWithLocation({
            pagination: {
              pageSize,
              currentPage: page,
            },
            sorters,
            filters,
          });

          if (type === "page") {
            return createElement(PaginationLink, {
              to: link,
              element: `${page}`,
            });
          }
          if (type === "next" || type === "prev") {
            return createElement(PaginationLink, {
              to: link,
              element: element,
            });
          }

          if (type === "jump-next" || type === "jump-prev") {
            const elementChildren = (element as React.ReactElement<any>)?.props
              ?.children;

            return createElement(PaginationLink, {
              to: link,
              element:
                Children.count(elementChildren) > 1
                  ? createElement(Fragment, {}, elementChildren)
                  : elementChildren,
            });
          }

          return element;
        },
        pageSize,
        current: currentPage,
        simple: !breakpoint.sm,
        position: !breakpoint.sm ? ["bottomCenter"] : ["bottomRight"],
        total: data?.total,
      };
    }

    return false;
  };

  return {
    searchFormProps: {
      ...formSF.formProps,
      onFinish,
    },
    tableProps: {
      dataSource: data?.data,
      loading: liveMode === "auto" ? isLoading : !isFetched,
      onChange,
      pagination: antdPagination(),
      scroll: { x: true },
    },
    tableQuery,
    sorters,
    filters,
    setSorters,
    setFilters,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    pageCount,
    createLinkForSyncWithLocation,
    overtime,
    result,
  };
};
