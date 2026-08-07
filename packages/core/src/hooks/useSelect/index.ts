import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type {
  QueryObserverResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import debounce from "lodash/debounce";
import get from "lodash/get";
import uniqBy from "lodash/uniqBy";

import { useList, useMany, useMeta } from "@hooks";
import type { UseManyReturnType } from "../data/useMany";

import type {
  BaseKey,
  BaseOption,
  BaseRecord,
  CrudFilter,
  CrudSort,
  GetListResponse,
  GetManyResponse,
  HttpError,
  MetaQuery,
  Pagination,
  Prettify,
} from "../../contexts/data/types";
import type { LiveModeProps } from "../../contexts/live/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import type { BaseListProps } from "../data/useList";
import { useResourceParams } from "../use-resource-params";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";
import type { MakeOptional } from "../../definitions/types";

export type SelectedOptionsOrder = "in-place" | "selected-first";

export type UseSelectProps<TQueryFnData, TError, TData> = {
  /**
   * Resource name for API data interactions
   */
  resource: string;
  /**
   * Set the option's label value
   * @default `"title"`
   */
  optionLabel?:
    | (keyof TData extends string ? keyof TData : never)
    | ((item: TData) => string);
  /**
   * Set the option's value
   * @default `"id"`
   */
  optionValue?:
    | (keyof TData extends string ? keyof TData : never)
    | ((item: TData) => string);
  /**
   * Field name to search for.
   * @description If provided `optionLabel` is a string, uses `optionLabel`'s value.
   * @default `"title"`
   * @example
   * // when optionLabel is string.
   * useSelect({ optionLabel: "name" })
   * // uses `name` field.
   * @example
   * // when optionLabel is function.
   * useSelect({ optionLabel: (field) => field.description })
   * // uses `title`, since `optionLabel` is a function.
   */
  searchField?: keyof TData extends string ? keyof TData : never;
  /**
   * Allow us to sort the options
   */
  sorters?: CrudSort[];
  /**
   * Resource name for API data interactions
   */
  filters?: CrudFilter[];
  /**
   * Adds extra `options`
   */
  defaultValue?: BaseKey | BaseKey[];
  /**
   * Allow us to sort the selection options
   * @default `in-place`
   */
  selectedOptionsOrder?: SelectedOptionsOrder;
  /**
   * The number of milliseconds to delay
   * @default `300`
   */
  debounce?: number;
  /**
   * react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options
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
   * Pagination option from [`useList()`](/docs/api-reference/core/hooks/data/useList/)
   * @type {  currentPage?: number; pageSize?: number;}
   * @default `undefined`
   */
  pagination?: Prettify<
    Omit<Pagination, "mode"> & {
      /**
       * Whether to use server side pagination or not.
       * @default "off"
       */
      mode?: Pagination["mode"];
    }
  >;
  /**
   * react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options
   */
  defaultValueQueryOptions?: MakeOptional<
    UseQueryOptions<
      GetManyResponse<TQueryFnData>,
      TError,
      GetManyResponse<TData>
    >,
    "queryKey" | "queryFn"
  >;
  /**
   * If defined, this callback allows us to override all filters for every search request.
   * @default `undefined`
   */
  onSearch?: (value: string) => CrudFilter[];
  /**
   * Additional meta data to pass to the `useMany` from the data provider
   */
  meta?: MetaQuery;
  /**
   * Additional meta data to pass to the `useMany` from the data provider
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   * @default `default`
   */
  dataProviderName?: string;
} & SuccessErrorNotification<
  GetListResponse<TData>,
  TError,
  Prettify<BaseListProps>
> &
  LiveModeProps &
  UseLoadingOvertimeOptionsProps;

export type UseSelectReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TOption extends BaseOption = BaseOption,
> = {
  query: QueryObserverResult<GetListResponse<TData>, TError>;
  defaultValueQuery: UseManyReturnType<TData, TError>;
  onSearch: (value: string) => void;
  options: TOption[];
} & UseLoadingOvertimeReturnType;

/**
 * `useSelect` hook is used to fetch data from the dataProvider and return the options for the select box.
 *
 * It uses `getList` method as query function from the dataProvider that is
 * passed to {@link https://refine.dev/docs/api-reference/core/components/refine-config/ `<Refine>`}.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/useSelect} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useSelect = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
  TOption extends BaseOption = BaseOption,
>(
  props: UseSelectProps<TQueryFnData, TError, TData>,
): UseSelectReturnType<TData, TError, TOption> => {
  const [search, setSearch] = useState<CrudFilter[]>([]);
  const [options, setOptions] = useState<TOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<TOption[]>([]);

  const {
    resource: resourceFromProps,
    sorters,
    filters = [],
    optionLabel = "title",
    optionValue = "id",
    searchField = typeof optionLabel === "string" ? optionLabel : "title",
    debounce: debounceValue = 300,
    successNotification,
    errorNotification,
    defaultValueQueryOptions: defaultValueQueryOptionsFromProps,
    queryOptions,
    pagination,
    liveMode,
    defaultValue = [],
    selectedOptionsOrder = "in-place",
    onLiveEvent,
    onSearch: onSearchFromProp,
    liveParams,
    meta,
    dataProviderName,
    overtimeOptions,
  } = props;

  const getOptionLabel = useCallback(
    (item: TData) => {
      if (typeof optionLabel === "string") {
        return get(item, optionLabel);
      }

      return optionLabel(item);
    },
    [optionLabel],
  );

  const getOptionValue = useCallback(
    (item: TData) => {
      if (typeof optionValue === "string") {
        return get(item, optionValue);
      }

      return optionValue(item);
    },
    [optionValue],
  );

  const { resource, identifier } = useResourceParams({
    resource: resourceFromProps,
  });

  const getMeta = useMeta();

  const combinedMeta = getMeta({
    resource,
    meta: meta,
  });

  const defaultValues = Array.isArray(defaultValue)
    ? defaultValue
    : [defaultValue];

  const defaultValueQueryOptions =
    defaultValueQueryOptionsFromProps ?? (queryOptions as any);

  const defaultValueQueryOnSuccess = useCallback(
    (data: GetManyResponse<TData>) => {
      setSelectedOptions(
        data.data.map(
          (item) =>
            ({
              label: getOptionLabel(item),
              value: getOptionValue(item),
            }) as TOption,
        ),
      );
    },
    [optionLabel, optionValue],
  );

  const defaultQueryOnSuccess = useCallback(
    (data: GetListResponse<TData>) => {
      setOptions(
        data.data.map(
          (item) =>
            ({
              label: getOptionLabel(item),
              value: getOptionValue(item),
            }) as TOption,
        ),
      );
    },
    [optionLabel, optionValue],
  );

  const defaultValueQueryResult = useMany<TQueryFnData, TError, TData>({
    resource: identifier ?? resource?.name ?? "",
    ids: defaultValues,
    queryOptions: {
      ...defaultValueQueryOptions,
      enabled:
        defaultValues.length > 0 && (defaultValueQueryOptions?.enabled ?? true),
    },
    overtimeOptions: { enabled: false },
    meta: combinedMeta,
    liveMode: "off",
    dataProviderName,
  });

  const queryResult = useList<TQueryFnData, TError, TData>({
    resource: identifier,
    sorters,
    filters: filters.concat(search),
    pagination: {
      currentPage: pagination?.currentPage,
      pageSize: pagination?.pageSize ?? 10,
      mode: pagination?.mode,
    },
    queryOptions,
    overtimeOptions: { enabled: false },
    successNotification,
    errorNotification,
    meta: combinedMeta,
    liveMode,
    liveParams,
    onLiveEvent,
    dataProviderName,
  });

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading:
      queryResult.query.isFetching || defaultValueQueryResult.query.isFetching,
  });

  const combinedOptions = useMemo(
    () =>
      uniqBy(
        selectedOptionsOrder === "in-place"
          ? [...options, ...selectedOptions]
          : [...selectedOptions, ...options],
        "value",
      ),
    [options, selectedOptions],
  );

  /**
   * To avoid any changes in the `onSearch` callback,
   * We're storing `onSearchFromProp` in a ref and accessing it in the `onSearch` callback.
   */
  const onSearchFromPropRef = useRef(onSearchFromProp);

  const onSearch = useMemo(() => {
    return debounce((value: string) => {
      if (onSearchFromPropRef.current) {
        setSearch(onSearchFromPropRef.current(value));
        return;
      }

      if (!value) {
        setSearch([]);
        return;
      }

      setSearch([
        {
          field: searchField,
          operator: "contains",
          value,
        },
      ]);
    }, debounceValue);
  }, [searchField, debounceValue]);

  useEffect(() => {
    onSearchFromPropRef.current = onSearchFromProp;
  }, [onSearchFromProp]);

  // default value query onSuccess
  useEffect(() => {
    const data = defaultValueQueryResult.query.data;
    if (data && defaultValueQueryResult.query.isSuccess) {
      defaultValueQueryOnSuccess(data);
    }
  }, [
    defaultValueQueryResult.query.data,
    defaultValueQueryResult.query.isSuccess,
  ]);

  // query onSuccess
  useEffect(() => {
    const data = queryResult.query.data;
    if (data && queryResult.query.isSuccess) {
      defaultQueryOnSuccess(data);
    }
  }, [queryResult.result.data, queryResult.query.isSuccess]);

  return {
    query: queryResult.query,
    defaultValueQuery: defaultValueQueryResult,
    options: combinedOptions,
    onSearch,
    overtime: { elapsedTime },
  };
};
