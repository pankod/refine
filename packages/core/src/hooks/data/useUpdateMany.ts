import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type MutateOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { handleMultiple, pickDataProvider } from "@definitions/helpers";
import {
  useCancelNotification,
  useDataProvider,
  useHandleNotification,
  useInvalidate,
  useKeys,
  useLog,
  useMeta,
  useMutationMode,
  useOnError,
  usePublish,
  useRefineContext,
  useResourceParams,
  useTranslate,
} from "@hooks";

import type {
  BaseKey,
  BaseRecord,
  GetListResponse,
  GetManyResponse,
  GetOneResponse,
  HttpError,
  IQueryKeys,
  MetaQuery,
  MutationMode,
  PrevContext as UpdateContext,
  QueryResponse,
  UpdateManyResponse,
} from "../../contexts/data/types";
import type { UseMutationResult } from "../../definitions/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

import type { SuccessErrorNotification } from "../../contexts/notification/types";
import { ActionTypes } from "../../contexts/undoableQueue/types";

export type OptimisticUpdateManyMapType<TData, TVariables> = {
  list?:
    | ((
        previous: GetListResponse<TData> | null | undefined,
        values: TVariables,
        ids: BaseKey[],
      ) => GetListResponse<TData> | null)
    | boolean;
  many?:
    | ((
        previous: GetManyResponse<TData> | null | undefined,
        values: TVariables,
        ids: BaseKey[],
      ) => GetManyResponse<TData> | null)
    | boolean;
  detail?:
    | ((
        previous: GetOneResponse<TData> | null | undefined,
        values: TVariables,
        id: BaseKey,
      ) => GetOneResponse<TData> | null)
    | boolean;
};

export type UpdateManyParams<TData, TError, TVariables> = {
  /**
   * ids for mutation function
   */
  ids?: BaseKey[];
  /**
   * Resource name for API data interactions
   */
  resource?: string;
  /**
   * [Determines when mutations are executed](/docs/advanced-tutorials/mutation-mode/)
   */
  mutationMode?: MutationMode;
  /**
   * Duration in ms to wait before executing the mutation when `mutationMode = "undoable"`
   */
  undoableTimeout?: number;
  /**
   * Provides a function to cancel the mutation when `mutationMode = "undoable"`
   */
  onCancel?: (cancelMutation: () => void) => void;
  /**
   * Values for mutation function
   */
  values?: TVariables;
  /**
   * meta data for `dataProvider`
   */
  meta?: MetaQuery;
  /**
   * meta data for `dataProvider`
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   * @default "default"
   */
  dataProviderName?: string;
  /**
   *  You can use it to manage the invalidations that will occur at the end of the mutation.
   */
  invalidates?: Array<keyof IQueryKeys>;
  /**
   * You can use it to manage the invalidations that will occur at the end of the mutation.
   * @default {
   *   list: true,
   *   many: true,
   *   detail: true,
   * }
   */
  optimisticUpdateMap?: OptimisticUpdateManyMapType<TData, TVariables>;
} & SuccessErrorNotification<
  UpdateManyResponse<TData>,
  TError,
  { ids: BaseKey[]; values: TVariables }
>;

export type UseUpdateManyReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = UseMutationResult<
  UpdateManyResponse<TData>,
  TError,
  UpdateManyParams<TData, TError, TVariables>,
  UpdateContext<TData>
> &
  UseLoadingOvertimeReturnType;

export type UseUpdateManyProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  mutationOptions?: Omit<
    UseMutationOptions<
      UpdateManyResponse<TData>,
      TError,
      UpdateManyParams<TData, TError, TVariables>,
      UpdateContext<TData>
    >,
    "mutationFn" | "onMutate"
  >;
} & UseLoadingOvertimeOptionsProps &
  UpdateManyParams<TData, TError, TVariables>;

/**
 * `useUpdateMany` is a modified version of `react-query`'s {@link https://tanstack.com/query/v5/docs/framework/react/reference/useMutation `useMutation`} for multiple update mutations.
 *
 * It uses `updateMany` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useUpdateMany = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
>({
  ids: idsFromProps,
  resource: resourceFromProps,
  values: valuesFromProps,
  dataProviderName: dataProviderNameFromProps,
  successNotification: successNotificationFromProps,
  errorNotification: errorNotificationFromProps,
  meta: metaFromProps,
  mutationMode: mutationModeFromProps,
  undoableTimeout: undoableTimeoutFromProps,
  onCancel: onCancelFromProps,
  optimisticUpdateMap: optimisticUpdateMapFromProps,
  invalidates: invalidatesFromProps,
  mutationOptions,
  overtimeOptions,
}: UseUpdateManyProps<TData, TError, TVariables> = {}): UseUpdateManyReturnType<
  TData,
  TError,
  TVariables
> => {
  const { resources, select } = useResourceParams();
  const queryClient = useQueryClient();
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const {
    mutationMode: mutationModeContext,
    undoableTimeout: undoableTimeoutContext,
  } = useMutationMode();
  const { mutate: checkError } = useOnError();
  const { notificationDispatch } = useCancelNotification();
  const publish = usePublish();
  const handleNotification = useHandleNotification();
  const invalidateStore = useInvalidate();
  const { log } = useLog();
  const getMeta = useMeta();
  const {
    options: { textTransformers },
  } = useRefineContext();
  const { keys } = useKeys();

  const mutationResult = useMutation<
    UpdateManyResponse<TData>,
    TError,
    UpdateManyParams<TData, TError, TVariables>,
    UpdateContext<TData>
  >({
    mutationFn: ({
      ids = idsFromProps,
      values = valuesFromProps,
      resource: resourceName = resourceFromProps,
      onCancel = onCancelFromProps,
      mutationMode = mutationModeFromProps,
      undoableTimeout = undoableTimeoutFromProps,
      meta = metaFromProps,
      dataProviderName = dataProviderNameFromProps,
    }: UpdateManyParams<TData, TError, TVariables>) => {
      if (!ids) throw missingIdError;
      if (!values) throw missingValuesError;
      if (!resourceName) throw missingResourceError;

      const { resource, identifier } = select(resourceName);

      const combinedMeta = getMeta({
        resource,
        meta: meta,
      });

      const mutationModePropOrContext = mutationMode ?? mutationModeContext;

      const undoableTimeoutPropOrContext =
        undoableTimeout ?? undoableTimeoutContext;

      const selectedDataProvider = dataProvider(
        pickDataProvider(identifier, dataProviderName, resources),
      );

      const mutationFn = () => {
        if (selectedDataProvider.updateMany) {
          return selectedDataProvider.updateMany<TData, TVariables>({
            resource: resource.name,
            ids,
            variables: values,
            meta: combinedMeta,
          });
        }
        return handleMultiple(
          ids.map((id) =>
            selectedDataProvider.update<TData, TVariables>({
              resource: resource.name,
              id,
              variables: values,
              meta: combinedMeta,
            }),
          ),
        );
      };

      if (!(mutationModePropOrContext === "undoable")) {
        return mutationFn();
      }

      const updatePromise = new Promise<UpdateManyResponse<TData>>(
        (resolve, reject) => {
          const doMutation = () => {
            mutationFn()
              .then((result) => resolve(result))
              .catch((err) => reject(err));
          };

          const cancelMutation = () => {
            reject({ message: "mutationCancelled" });
          };

          if (onCancel) {
            onCancel(cancelMutation);
          }

          notificationDispatch({
            type: ActionTypes.ADD,
            payload: {
              id: ids,
              resource: identifier,
              cancelMutation: cancelMutation,
              doMutation: doMutation,
              seconds: undoableTimeoutPropOrContext,
              isSilent: !!onCancel,
            },
          });
        },
      );
      return updatePromise;
    },
    onMutate: async ({
      resource: resourceName = resourceFromProps,
      ids = idsFromProps,
      values = valuesFromProps,
      mutationMode = mutationModeFromProps,
      dataProviderName = dataProviderNameFromProps,
      meta = metaFromProps,
      optimisticUpdateMap = optimisticUpdateMapFromProps ?? {
        list: true,
        many: true,
        detail: true,
      },
    }) => {
      if (!ids) throw missingIdError;
      if (!values) throw missingValuesError;
      if (!resourceName) throw missingResourceError;

      const { identifier } = select(resourceName);
      const { gqlMutation: _, gqlQuery: __, ...preferredMeta } = meta ?? {};

      const queryKey = keys()
        .data(pickDataProvider(identifier, dataProviderName, resources))
        .resource(identifier);

      const resourceKeys = keys()
        .data(pickDataProvider(identifier, dataProviderName, resources))
        .resource(identifier);

      const mutationModePropOrContext = mutationMode ?? mutationModeContext;

      await queryClient.cancelQueries({
        queryKey: resourceKeys.get(),
      });

      const previousQueries = queryClient.getQueriesData<QueryResponse<TData>>({
        queryKey: resourceKeys.get(),
      });

      if (mutationModePropOrContext !== "pessimistic") {
        if (optimisticUpdateMap.list) {
          // Set the previous queries to the new ones:
          queryClient.setQueriesData(
            {
              queryKey: resourceKeys
                .action("list")
                .params(preferredMeta ?? {})
                .get(),
            },
            (previous?: GetListResponse<TData> | null) => {
              if (typeof optimisticUpdateMap.list === "function") {
                return optimisticUpdateMap.list(previous, values, ids);
              }

              if (!previous) {
                return null;
              }

              const data = previous.data.map((record: TData) => {
                if (
                  record.id !== undefined &&
                  ids
                    .filter((id) => id !== undefined)
                    .map(String)
                    .includes(record.id.toString())
                ) {
                  return {
                    ...record,
                    ...values,
                  };
                }

                return record;
              });

              return {
                ...previous,
                data,
              };
            },
          );
        }

        if (optimisticUpdateMap.many) {
          queryClient.setQueriesData(
            {
              queryKey: resourceKeys.action("many").get(),
            },
            (previous?: GetManyResponse<TData> | null) => {
              if (typeof optimisticUpdateMap.many === "function") {
                return optimisticUpdateMap.many(previous, values, ids);
              }

              if (!previous) {
                return null;
              }

              const data = previous.data.map((record: TData) => {
                if (
                  record.id !== undefined &&
                  ids
                    .filter((id) => id !== undefined)
                    .map(String)
                    .includes(record.id.toString())
                ) {
                  return {
                    ...record,
                    ...values,
                  };
                }
                return record;
              });
              return {
                ...previous,
                data,
              };
            },
          );
        }

        if (optimisticUpdateMap.detail) {
          for (const id of ids) {
            queryClient.setQueriesData(
              {
                queryKey: resourceKeys
                  .action("one")
                  .id(id)
                  .params(preferredMeta ?? {})
                  .get(),
              },
              (previous?: GetOneResponse<TData> | null) => {
                if (typeof optimisticUpdateMap.detail === "function") {
                  return optimisticUpdateMap.detail(previous, values, id);
                }

                if (!previous) {
                  return null;
                }

                const data = {
                  ...previous.data,
                  ...values,
                };
                return {
                  ...previous,
                  data,
                };
              },
            );
          }
        }
      }

      return {
        previousQueries,
      };
    },
    onSettled: (data, error, variables, context) => {
      const {
        ids = idsFromProps,
        resource: resourceName = resourceFromProps,
        dataProviderName = dataProviderNameFromProps,
        invalidates = invalidatesFromProps,
      } = variables;
      if (!ids) throw missingIdError;
      if (!resourceName) throw missingResourceError;

      const { identifier } = select(resourceName);

      // invalidate the cache for the list and many queries:
      invalidateStore({
        resource: identifier,
        invalidates: invalidates ?? ["list", "many"],
        dataProviderName: pickDataProvider(
          identifier,
          dataProviderName,
          resources,
        ),
      });

      ids.forEach((id) =>
        invalidateStore({
          resource: identifier,
          invalidates: invalidates ?? ["detail"],
          dataProviderName: pickDataProvider(
            identifier,
            dataProviderName,
            resources,
          ),
          id,
        }),
      );

      notificationDispatch({
        type: ActionTypes.REMOVE,
        payload: { id: ids, resource: identifier },
      });

      mutationOptions?.onSettled?.(data, error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      const {
        ids = idsFromProps,
        resource: resourceName = resourceFromProps,
        values = valuesFromProps,
        meta = metaFromProps,
        dataProviderName: dataProviderNameFromProp = dataProviderNameFromProps,
        successNotification = successNotificationFromProps,
      } = variables;
      if (!ids) throw missingIdError;
      if (!values) throw missingValuesError;
      if (!resourceName) throw missingResourceError;

      const { resource, identifier } = select(resourceName);
      const resourceSingular = textTransformers.singular(identifier);

      const dataProviderName = pickDataProvider(
        identifier,
        dataProviderNameFromProp,
        resources,
      );

      const combinedMeta = getMeta({
        resource,
        meta: meta,
      });

      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(data, { ids, values }, identifier)
          : successNotification;

      handleNotification(notificationConfig, {
        key: `${ids}-${identifier}-notification`,
        description: translate("notifications.success", "Successful"),
        message: translate(
          "notifications.editSuccess",
          {
            resource: translate(`${identifier}.${identifier}`, identifier),
          },
          `Successfully updated ${resourceSingular}`,
        ),
        type: "success",
      });

      publish?.({
        channel: `resources/${resource.name}`,
        type: "updated",
        payload: {
          ids: ids.map(String),
        },
        date: new Date(),
        meta: {
          ...combinedMeta,
          dataProviderName,
        },
      });

      const previousData: any[] = [];
      if (context) {
        const resourceKeys = keys()
          .data(pickDataProvider(identifier, dataProviderName, resources))
          .resource(identifier);

        ids.forEach((id) => {
          const queryData = queryClient.getQueryData<UpdateManyResponse<TData>>(
            resourceKeys.action("one").id(id).get(),
          );

          previousData.push(
            Object.keys(values || {}).reduce<any>((acc, item: any) => {
              acc[item] = queryData?.data?.[item];
              return acc;
            }, {}),
          );
        });
      }

      const {
        fields: _fields,
        operation: _operation,
        variables: _variables,
        ...rest
      } = combinedMeta || {};
      log?.mutate({
        action: "updateMany",
        resource: resource.name,
        data: values,
        previousData,
        meta: {
          ...rest,
          dataProviderName,
          ids,
        },
      });

      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (err: TError, variables, context) => {
      const {
        ids = idsFromProps,
        resource: resourceName = resourceFromProps,
        errorNotification = errorNotificationFromProps,
        values = valuesFromProps,
      } = variables;
      if (!ids) throw missingIdError;
      if (!values) throw missingValuesError;
      if (!resourceName) throw missingResourceError;

      const { identifier } = select(resourceName);

      // set back the queries to the context:
      if (context) {
        for (const query of context.previousQueries) {
          queryClient.setQueryData(query[0], query[1]);
        }
      }

      if (err.message !== "mutationCancelled") {
        checkError(err);

        const resourceSingular = textTransformers.singular(identifier);

        const notificationConfig =
          typeof errorNotification === "function"
            ? errorNotification(err, { ids, values }, identifier)
            : errorNotification;

        handleNotification(notificationConfig, {
          key: `${ids}-${identifier}-updateMany-error-notification`,
          message: translate(
            "notifications.editError",
            {
              resource: resourceSingular,
              statusCode: err.statusCode,
            },
            `Error when updating ${resourceSingular} (status code: ${err.statusCode})`,
          ),
          description: err.message,
          type: "error",
        });
      }

      mutationOptions?.onError?.(err, variables, context);
    },
    mutationKey: keys().data().mutation("updateMany").get(),
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useUpdateMany"),
    },
  });
  const { mutate, mutateAsync, ...mutation } = mutationResult;

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading: mutation.isPending,
  });

  // this function is used to make the `variables` parameter optional
  const handleMutation = (
    variables?: UpdateManyParams<TData, TError, TVariables>,
    options?: MutateOptions<
      UpdateManyResponse<TData>,
      TError,
      UpdateManyParams<TData, TError, TVariables>,
      UpdateContext<TData>
    >,
  ) => {
    return mutate(variables || {}, options);
  };

  // this function is used to make the `variables` parameter optional
  const handleMutateAsync = (
    variables?: UpdateManyParams<TData, TError, TVariables>,
    options?: MutateOptions<
      UpdateManyResponse<TData>,
      TError,
      UpdateManyParams<TData, TError, TVariables>,
      UpdateContext<TData>
    >,
  ) => {
    return mutateAsync(variables || {}, options);
  };

  return {
    mutation: mutationResult,
    mutate: handleMutation,
    mutateAsync: handleMutateAsync,
    overtime: { elapsedTime },
  };
};

const missingResourceError = new Error(
  "[useUpdateMany]: `resource` is not defined or not matched but is required",
);

const missingIdError = new Error(
  "[useUpdateMany]: `id` is not defined but is required in edit and clone actions",
);

const missingValuesError = new Error(
  "[useUpdateMany]: `values` is not provided but is required",
);
