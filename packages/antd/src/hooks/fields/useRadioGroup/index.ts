import type { QueryObserverResult } from "@tanstack/react-query";
import type { Radio } from "antd";

import {
  type BaseKey,
  type BaseOption,
  type BaseRecord,
  type GetListResponse,
  type HttpError,
  useSelect,
  type UseSelectProps,
} from "@refinedev/core";

export type UseRadioGroupReturnType<
  TData extends BaseRecord = BaseRecord,
  TOption extends BaseOption = BaseOption,
  TError extends HttpError = HttpError,
> = {
  radioGroupProps: Omit<React.ComponentProps<typeof Radio.Group>, "options"> & {
    options: TOption[];
  };
  query: QueryObserverResult<GetListResponse<TData>, TError>;
};

type UseRadioGroupProps<TQueryFnData, TError, TData> = Omit<
  UseSelectProps<TQueryFnData, TError, TData>,
  "defaultValue"
> & {
  /**
   * Sets the default value
   */
  defaultValue?: BaseKey;
};

/**
 * `useRadioGroup` hook allows you to manage an Ant Design {@link https://ant.design/components/radio/#components-radio-demo-radiogroup-with-name Radio.Group} component when records in a resource needs to be used as radio options.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/hooks/field/useRadioGroup/} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useRadioGroup = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
  TOption extends BaseOption = BaseOption,
>({
  resource,
  sorters,
  filters,
  optionLabel,
  optionValue,
  queryOptions,
  pagination,
  liveMode,
  defaultValue,
  selectedOptionsOrder,
  onLiveEvent,
  liveParams,
  meta,
  dataProviderName,
  ...rest
}: UseRadioGroupProps<TQueryFnData, TError, TData>): UseRadioGroupReturnType<
  TData,
  TOption
> => {
  const { query, options } = useSelect<TQueryFnData, TError, TData, TOption>({
    resource,
    sorters,
    filters,
    optionLabel,
    optionValue,
    queryOptions,
    pagination,
    liveMode,
    defaultValue,
    selectedOptionsOrder,
    onLiveEvent,
    liveParams,
    meta,
    dataProviderName,
    ...rest,
  });

  return {
    radioGroupProps: {
      options,
      defaultValue,
    },
    query,
  };
};
