import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type MutateOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { pickDataProvider } from "@definitions/helpers";
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
  PreviousQuery,
  UpdateResponse,
} from "../../contexts/data/types";
import type { UseMutationResult } from "../../definitions/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import { ActionTypes } from "../../contexts/undoableQueue/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

export type OptimisticUpdateMapType<TData, TVariables> = {
  list?:
    | ((
        previous: GetListResponse<TData> | null | undefined,
        values: TVariables,
        id: BaseKey,
      ) => GetListResponse<TData> | null)
    | boolean;
  many?:
    | ((
        previous: GetManyResponse<TData> | null | undefined,
        values: TVariables,
        id: BaseKey,
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

export type UpdateParams<TData, TError, TVariables> = {
  /**
   * Resource name for API data interactions
   */
  resource?: string;
  /**
   * id for mutation function
   */
  id?: BaseKey;
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
   * Metadata query for dataProvider
   */
  meta?: MetaQuery;
  /**
   * Metadata query for dataProvider
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
   * You can use it to customize the optimistic update logic.
   * @default {
   *   list: true,
   *   many: true,
   *   detail: true,
   * }
   */
  optimisticUpdateMap?: OptimisticUpdateMapType<TData, TVariables>;
} & SuccessErrorNotification<
  UpdateResponse<TData>,
  TError,
  { id: BaseKey; values: TVariables }
>;

export type UseUpdateReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = UseMutationResult<
  UpdateResponse<TData>,
  TError,
  UpdateParams<TData, TError, TVariables>,
  UpdateContext<TData>
> &
  UseLoadingOvertimeReturnType;

export type UseUpdateProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  mutationOptions?: Omit<
    UseMutationOptions<
      UpdateResponse<TData>,
      TError,
      UpdateParams<TData, TError, TVariables>,
      UpdateContext<TData>
    >,
    "mutationFn" | "onMutate"
  >;
} & UseLoadingOvertimeOptionsProps &
  UpdateParams<TData, TError, TVariables>;

/**
 * `useUpdate` is a modified version of `react-query`'s {@link https://tanstack.com/query/v5/docs/framework/react/reference/useMutation `useMutation`} for update mutations.
 *
 * It uses `update` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useUpdate} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences/#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useUpdate = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
>({
  id: idFromProps,
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
}: UseUpdateProps<TData, TError, TVariables> = {}): UseUpdateReturnType<
  TData,
  TError,
  TVariables
> => {
  const { resources, select } = useResourceParams({
    resource: resourceFromProps,
  });
  const queryClient = useQueryClient();
  const dataProvider = useDataProvider();

  const {
    mutationMode: mutationModeContext,
    undoableTimeout: undoableTimeoutContext,
  } = useMutationMode();
  const { mutate: checkError } = useOnError();
  const translate = useTranslate();
  const publish = usePublish();
  const { log } = useLog();
  const { notificationDispatch } = useCancelNotification();
  const handleNotification = useHandleNotification();
  const invalidateStore = useInvalidate();
  const getMeta = useMeta();
  const {
    options: { textTransformers },
  } = useRefineContext();
  const { keys } = useKeys();

  const mutationResult = useMutation<
    UpdateResponse<TData>,
    TError,
    UpdateParams<TData, TError, TVariables>,
    UpdateContext<TData>
  >({
    mutationFn: ({
      id = idFromProps,
      values = valuesFromProps,
      resource: resourceName = resourceFromProps,
      mutationMode = mutationModeFromProps,
      undoableTimeout = undoableTimeoutFromProps,
      onCancel = onCancelFromProps,
      meta = metaFromProps,
      dataProviderName = dataProviderNameFromProps,
    }) => {
      if (typeof id === "undefined") throw missingIdError;
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

      if (!(mutationModePropOrContext === "undoable")) {
        return dataProvider(
          pickDataProvider(identifier, dataProviderName, resources),
        ).update<TData, TVariables>({
          resource: resource.name,
          id,
          variables: values,
          meta: combinedMeta,
        });
      }
      const updatePromise = new Promise<UpdateResponse<TData>>(
        (resolve, reject) => {
          const doMutation = () => {
            dataProvider(
              pickDataProvider(identifier, dataProviderName, resources),
            )
              .update<TData, TVariables>({
                resource: resource.name,
                id,
                variables: values,
                meta: combinedMeta,
              })
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
              id: id,
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
      id = idFromProps,
      mutationMode = mutationModeFromProps,
      values = valuesFromProps,
      dataProviderName = dataProviderNameFromProps,
      meta = metaFromProps,
      optimisticUpdateMap = optimisticUpdateMapFromProps ?? {
        list: true,
        many: true,
        detail: true,
      },
    }) => {
      if (typeof id === "undefined") throw missingIdError;
      if (!values) throw missingValuesError;
      if (!resourceName) throw missingResourceError;

      const { identifier } = select(resourceName);

      const { gqlMutation: _, gqlQuery: __, ...preferredMeta } = meta ?? {};

      const resourceKeys = keys()
        .data(pickDataProvider(identifier, dataProviderName, resources))
        .resource(identifier);

      const previousQueries: PreviousQuery<TData>[] =
        queryClient.getQueriesData({
          queryKey: resourceKeys.get(),
        });

      const mutationModePropOrContext = mutationMode ?? mutationModeContext;

      await queryClient.cancelQueries({
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
                return optimisticUpdateMap.list(previous, values, id);
              }

              if (!previous) {
                return null;
              }

              const data = previous.data.map((record: TData) => {
                if (record.id?.toString() === id?.toString()) {
                  return {
                    id,
                    ...record,
                    ...values,
                  } as unknown as TData;
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
                return optimisticUpdateMap.many(previous, values, id);
              }

              if (!previous) {
                return null;
              }

              const data = previous.data.map((record: TData) => {
                if (record.id?.toString() === id?.toString()) {
                  record = {
                    id,
                    ...record,
                    ...values,
                  } as unknown as TData;
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

              return {
                ...previous,
                data: {
                  ...previous.data,
                  ...values,
                },
              };
            },
          );
        }
      }

      return {
        previousQueries,
      };
    },
    onSettled: (data, error, variables, context) => {
      const {
        id = idFromProps,
        resource: resourceName = resourceFromProps,
        dataProviderName = dataProviderNameFromProps,
        invalidates = invalidatesFromProps ?? ["list", "many", "detail"],
      } = variables;
      if (typeof id === "undefined") throw missingIdError;
      if (!resourceName) throw missingResourceError;

      const { identifier } = select(resourceName);

      invalidateStore({
        resource: identifier,
        dataProviderName: pickDataProvider(
          identifier,
          dataProviderName,
          resources,
        ),
        invalidates,
        id,
      });

      notificationDispatch({
        type: ActionTypes.REMOVE,
        payload: { id, resource: identifier },
      });

      mutationOptions?.onSettled?.(data, error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      const {
        id = idFromProps,
        resource: resourceName = resourceFromProps,
        successNotification = successNotificationFromProps,
        dataProviderName: dataProviderNameFromProp = dataProviderNameFromProps,
        values = valuesFromProps,
        meta = metaFromProps,
      } = variables;
      if (typeof id === "undefined") throw missingIdError;
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
        meta,
      });

      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(data, { id, values }, identifier)
          : successNotification;

      handleNotification(notificationConfig, {
        key: `${id}-${identifier}-notification`,
        description: translate("notifications.success", "Successful"),
        message: translate(
          "notifications.editSuccess",
          {
            resource: translate(
              `${identifier}.${identifier}`,
              resourceSingular,
            ),
          },
          `Successfully updated ${resourceSingular}`,
        ),
        type: "success",
      });

      publish?.({
        channel: `resources/${resource.name}`,
        type: "updated",
        payload: {
          ids: data.data?.id ? [data.data.id] : undefined,
        },
        date: new Date(),
        meta: {
          ...combinedMeta,
          dataProviderName,
        },
      });

      let previousData: any;
      if (context) {
        const resourceKeys = keys()
          .data(pickDataProvider(identifier, dataProviderName, resources))
          .resource(identifier);

        const queryData = queryClient.getQueryData<UpdateResponse<TData>>(
          resourceKeys.action("one").id(id).get(),
        );

        previousData = Object.keys(values || {}).reduce<any>((acc, item) => {
          acc[item] = queryData?.data?.[item];
          return acc;
        }, {});
      }

      const {
        fields: _fields,
        operation: _operation,
        variables: _variables,
        ...rest
      } = combinedMeta || {};
      log?.mutate({
        action: "update",
        resource: resource.name,
        data: values,
        previousData,
        meta: {
          ...rest,
          dataProviderName,
          id,
        },
      });

      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (err: TError, variables, context) => {
      const {
        id = idFromProps,
        resource: resourceName = resourceFromProps,
        errorNotification = errorNotificationFromProps,
        values = valuesFromProps,
      } = variables;
      if (typeof id === "undefined") throw missingIdError;
      if (!values) throw missingValuesError;
      if (!resourceName) throw missingResourceError;

      const { identifier } = select(resourceName);

      // set back the queries to the context:
      if (context?.previousQueries) {
        for (const query of context.previousQueries) {
          queryClient.setQueryData(query[0], query[1]);
        }
      }

      if (err.message !== "mutationCancelled") {
        checkError?.(err);

        const resourceSingular = textTransformers.singular(identifier);

        const notificationConfig =
          typeof errorNotification === "function"
            ? errorNotification(err, { id, values }, identifier)
            : errorNotification;

        handleNotification(notificationConfig, {
          key: `${id}-${identifier}-notification`,
          message: translate(
            "notifications.editError",
            {
              resource: translate(
                `${identifier}.${identifier}`,
                resourceSingular,
              ),
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
    mutationKey: keys().data().mutation("update").get(),
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useUpdate"),
    },
  });

  const { mutate, mutateAsync } = mutationResult;

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading: mutationResult.isPending,
  });

  // this function is used to make the `variables` parameter optional
  const handleMutation = (
    variables?: UpdateParams<TData, TError, TVariables>,
    options?: MutateOptions<
      UpdateResponse<TData>,
      TError,
      UpdateParams<TData, TError, TVariables>,
      UpdateContext<TData>
    >,
  ) => {
    return mutate(variables || {}, options);
  };

  // this function is used to make the `variables` parameter optional
  const handleMutateAsync = (
    variables?: UpdateParams<TData, TError, TVariables>,
    options?: MutateOptions<
      UpdateResponse<TData>,
      TError,
      UpdateParams<TData, TError, TVariables>,
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
  "[useUpdate]: `resource` is not defined or not matched but is required",
);

const missingIdError = new Error(
  "[useUpdate]: `id` is not defined but is required in edit and clone actions",
);

const missingValuesError = new Error(
  "[useUpdate]: `values` is not provided but is required",
);
