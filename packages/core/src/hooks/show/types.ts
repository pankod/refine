import React from "react";

import type {
  QueryObserverResult,
  UseQueryOptions,
} from "@tanstack/react-query";

import type {
  UseLoadingOvertimeOptionsProps,
  UseLoadingOvertimeReturnType,
} from "../useLoadingOvertime";
import type {
  BaseKey,
  BaseRecord,
  GetOneResponse,
  HttpError,
  MetaQuery,
  Prettify,
} from "../../contexts/data/types";
import type { LiveModeProps } from "../../contexts/live/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import type { MakeOptional } from "../../definitions/types";

export type UseShowReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
> = {
  query: QueryObserverResult<GetOneResponse<TData>, TError>;
  result: TData | undefined;
  showId?: BaseKey;
  setShowId: React.Dispatch<React.SetStateAction<BaseKey | undefined>>;
} & UseLoadingOvertimeReturnType;

export type UseShowProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
> = {
  /**
   * Resource name for API data interactions
   * @default Reads `:resource` from the URL
   */
  resource?: string;
  /**
   * Data item ID for API data interactions
   * @default Reads `:id` from the URL
   */
  id?: BaseKey;
  /**
   * react-query's [useQuery](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) options
   */
  queryOptions?: MakeOptional<
    UseQueryOptions<
      GetOneResponse<TQueryFnData>,
      TError,
      GetOneResponse<TData>
    >,
    "queryKey" | "queryFn"
  >;
  /**
   * Additional meta data to pass to the data provider's `getOne`
   */
  meta?: MetaQuery;
  /**
   * Additional meta data to pass to the data provider's `getOne`
  /**
   * Target data provider name for API call to be made
   * @default `"default"`
   */
  dataProviderName?: string;
} & LiveModeProps &
  SuccessErrorNotification<
    GetOneResponse<TData>,
    TError,
    Prettify<{ id?: BaseKey } & MetaQuery>
  > &
  UseLoadingOvertimeOptionsProps;
