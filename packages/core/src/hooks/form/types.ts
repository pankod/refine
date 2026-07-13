import type { Dispatch, SetStateAction } from "react";
import type {
  QueryObserverResult,
  UseQueryOptions,
} from "@tanstack/react-query";

import type {
  OptimisticUpdateMapType,
  UseUpdateProps,
  UseUpdateReturnType,
} from "../data/useUpdate";
import type { UseCreateProps, UseCreateReturnType } from "../data/useCreate";
import type {
  UseLoadingOvertimeOptionsProps,
  UseLoadingOvertimeReturnType,
} from "../useLoadingOvertime";
import type {
  BaseKey,
  BaseRecord,
  CreateResponse,
  GetOneResponse,
  HttpError,
  IQueryKeys,
  MetaQuery,
  MutationMode,
  UpdateResponse,
} from "../../contexts/data/types";
import type { LiveModeProps } from "../../contexts/live/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import type { Action } from "../../contexts/router/types";
import type { MakeOptional } from "../../definitions/types";

export type FormAction = Extract<Action, "create" | "edit" | "clone">;

export type RedirectAction =
  | Extract<Action, "create" | "edit" | "list" | "show">
  | false;

export type AutoSaveProps<TVariables> = {
  autoSave?: {
    enabled: boolean;
    debounce?: number;
    onFinish?: (values: TVariables) => TVariables;
    invalidateOnUnmount?: boolean;
    invalidateOnClose?: boolean;
  };
};

export type AutoSaveReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  autoSaveProps: Pick<
    UseUpdateReturnType<TData, TError, TVariables>["mutation"],
    "data" | "error" | "status"
  >;
  onFinishAutoSave: (
    values: TVariables,
  ) => Promise<UpdateResponse<TData> | void>;
};

export type AutoSaveIndicatorElements = Partial<
  Record<"success" | "error" | "loading" | "idle", React.ReactNode>
>;

export type ActionParams = {
  /**
   * Type of the form mode
   * @default Action that it reads from route otherwise "create" is used
   */
  action?: FormAction;
};

type ActionFormProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = {
  /**
   * Resource name for API data interactions
   * @default Resource name that it reads from route
   */
  resource?: string;
  /**
   * Record id for fetching
   * @default Id that it reads from the URL
   */
  id?: BaseKey;
  /**
   * Page to redirect after a succesfull mutation
   * @type `"show" | "edit" | "list" | "create" | false`
   * @default `"list"`
   */
  redirect?: RedirectAction;
  /**
   * Metadata query for dataProvider
   */
  meta?: MetaQuery;
  /**
   * Metadata to pass for the `useOne` query
   */
  queryMeta?: MetaQuery;
  /**
   * Metadata to pass for the mutation (`useCreate` for `create` and `clone` actions, `useUpdate` for `edit` action)
   */
  mutationMeta?: MetaQuery;
  /**
   * [Determines when mutations are executed](/docs/advanced-tutorials/mutation-mode/)
   * @default `"pessimistic"*`
   */
  mutationMode?: MutationMode;
  /**
   * Called when a mutation is successful
   */
  onMutationSuccess?: (
    data: CreateResponse<TResponse> | UpdateResponse<TResponse>,
    variables: TVariables,
    context: any,
    isAutoSave?: boolean,
  ) => void;
  /**
   * Called when a mutation encounters an error
   */
  onMutationError?: (
    error: TResponseError,
    variables: TVariables,
    context: any,
    isAutoSave?: boolean,
  ) => void;
  /**
   * Duration to wait before executing mutations when `mutationMode = "undoable"`
   * @default `5000*`
   */
  undoableTimeout?: number;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   */
  dataProviderName?: string;
  /**
   * You can use it to manage the invalidations that will occur at the end of the mutation.
   * @type  `all`, `resourceAll`, `list`, `many`, `detail`, `false`
   * @default `["list", "many", "detail"]`
   */
  invalidates?: Array<keyof IQueryKeys>;
  /**
   * react-query's [useQuery](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) options of useOne hook used while in edit mode.
   */
  queryOptions?: MakeOptional<
    UseQueryOptions<
      GetOneResponse<TQueryFnData>,
      TError,
      GetOneResponse<TData>
    >,
    "queryFn" | "queryKey"
  >;
  /**
   * react-query's [useMutation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) options of useCreate hook used while submitting in create and clone modes.
   */
  createMutationOptions?: UseCreateProps<
    TResponse,
    TResponseError,
    TVariables
  >["mutationOptions"];
  /**
   * react-query's [useMutation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) options of useUpdate hook used while submitting in edit mode.
   */
  updateMutationOptions?: UseUpdateProps<
    TResponse,
    TResponseError,
    TVariables
  >["mutationOptions"];
  /**
   * If you customize the [`optimisticUpdateMap`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/#optimisticupdatemap) option, you can use it to manage the invalidations that will occur at the end of the mutation.
   * @default {
   *   list: true,
   *   many: true,
   *   detail: true,
   * }
   */
  optimisticUpdateMap?: OptimisticUpdateMapType<TResponse, TVariables>;
} & SuccessErrorNotification<
  UpdateResponse<TResponse> | CreateResponse<TResponse>,
  TResponseError,
  { id: BaseKey; values: TVariables } | TVariables
> &
  ActionParams &
  LiveModeProps;

export type UseFormProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = ActionFormProps<
  TQueryFnData,
  TError,
  TVariables,
  TData,
  TResponse,
  TResponseError
> &
  ActionParams &
  LiveModeProps &
  UseLoadingOvertimeOptionsProps &
  AutoSaveProps<TVariables>;

export type UseFormReturnType<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = {
  id?: BaseKey;
  setId: Dispatch<SetStateAction<BaseKey | undefined>>;
  query?: QueryObserverResult<GetOneResponse<TData>, TError>;

  mutation:
    | UseUpdateReturnType<TResponse, TResponseError, TVariables>["mutation"]
    | UseCreateReturnType<TResponse, TResponseError, TVariables>["mutation"];
  formLoading: boolean;
  onFinish: (
    values: TVariables,
  ) => Promise<CreateResponse<TResponse> | UpdateResponse<TResponse> | void>;
  redirect: (
    redirect: RedirectAction,
    idFromFunction?: BaseKey | undefined,
    routeParams?: Record<string, string | number>,
  ) => void;
} & UseLoadingOvertimeReturnType &
  AutoSaveReturnType<TResponse, TResponseError, TVariables>;

export type FormWithSyncWithLocationParams = {
  /**
   * If true, the form will be synced with the location.
   * If an object is passed, the key property will be used as the key for the query params.
   * By default, query params are placed under the key, `${resource.name}-${action}`.
   */
  syncWithLocation?: boolean | { key?: string; syncId?: boolean };
};
