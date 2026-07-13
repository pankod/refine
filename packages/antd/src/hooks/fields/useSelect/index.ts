import type { SelectProps } from "antd/lib/select";
import type { QueryObserverResult } from "@tanstack/react-query";

import {
  useSelect as useSelectCore,
  type BaseRecord,
  type GetManyResponse,
  type GetListResponse,
  type HttpError,
  type UseSelectProps,
  type BaseOption,
} from "@refinedev/core";

export type UseSelectReturnType<
  TData extends BaseRecord = BaseRecord,
  TOption extends BaseOption = BaseOption,
  TError extends HttpError = HttpError,
> = {
  selectProps: SelectProps<TOption>;
  query: QueryObserverResult<GetListResponse<TData>, TError>;
  defaultValueQuery: QueryObserverResult<GetManyResponse<TData>, TError>;
};

/**
 * `useSelect` hook allows you to manage an Ant Design {@link https://ant.design/components/select/ Select} component when records in a resource needs to be used as select options.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/hooks/field/useSelect/} for more details.
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
): UseSelectReturnType<TData, TOption> => {
  const { query, defaultValueQuery, onSearch, options } = useSelectCore<
    TQueryFnData,
    TError,
    TData,
    TOption
  >(props);

  return {
    selectProps: {
      options,
      onSearch,
      loading: defaultValueQuery.query.isFetching,
      showSearch: true,
      filterOption: false,
    },
    query,
    defaultValueQuery: defaultValueQuery.query,
  };
};
