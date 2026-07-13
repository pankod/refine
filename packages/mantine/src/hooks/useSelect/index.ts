import type { SelectProps } from "@mantine/core";
import type { QueryObserverResult } from "@tanstack/react-query";

import {
  useSelect as useSelectCore,
  type BaseRecord,
  type GetManyResponse,
  type GetListResponse,
  type HttpError,
  type UseSelectProps,
  type BaseOption,
  type Prettify,
} from "@refinedev/core";

export type UseSelectReturnType<
  TData extends BaseRecord = BaseRecord,
  TOption extends BaseOption = BaseOption,
  TError = Error,
> = {
  selectProps: Prettify<
    Omit<SelectProps, "data"> & {
      data: TOption[];
    }
  >;
  query: QueryObserverResult<GetListResponse<TData>, TError>;
  defaultValueQuery: QueryObserverResult<GetManyResponse<TData>, TError>;
};

/**
 * `useSelect` hook is used to fetch data from the dataProvider and return the options for the select box.
 *
 * It uses `getList` method as query function from the dataProvider that is
 * passed to {@link https://refine.dev/docs/api-reference/core/components/refine-config `<Refine>`}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/hooks/useSelect} for more details.
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
): UseSelectReturnType<TData, TOption, TError> => {
  const { query, defaultValueQuery, onSearch, options } = useSelectCore<
    TQueryFnData,
    TError,
    TData,
    TOption
  >(props);

  return {
    selectProps: {
      data: options,
      onSearchChange: onSearch,
      searchable: true,
      filterDataOnExactSearchMatch: true,
      clearable: true,
    },
    query,
    defaultValueQuery: defaultValueQuery.query,
  };
};
