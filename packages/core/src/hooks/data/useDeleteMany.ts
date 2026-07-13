import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { handleMultiple, pickDataProvider } from "@definitions";
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
  DeleteManyResponse,
  GetListResponse,
  HttpError,
  IQueryKeys,
  MetaQuery,
  MutationMode,
  PrevContext as DeleteContext,
  PreviousQuery,
} from "../../contexts/data/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import { ActionTypes } from "../../contexts/undoableQueue/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

export type DeleteManyParams<TData, TError, TVariables> = {
  /**
   * ids for mutation function
   */
  ids: BaseKey[];
  /**
   * Resource name for API data interactions
   */
  resource: string;
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
   * Metadata query for dataProvider
   */
  meta?: MetaQuery;
  /**
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
   * Values for mutation function
   */
  values?: TVariables;
} & SuccessErrorNotification<DeleteManyResponse<TData>, TError, BaseKey[]>;

export type UseDeleteManyReturnType<
  TData extends BaseRecord = BaseRecord,
  TError = HttpError,
  TVariables = {},
> = {
  mutation: UseMutationResult<
    DeleteManyResponse<TData>,
    TError,
    DeleteManyParams<TData, TError, TVariables>,
    unknown
  >;
  mutate: UseMutationResult<
    DeleteManyResponse<TData>,
    TError,
    DeleteManyParams<TData, TError, TVariables>,
    DeleteContext<TData>
  >["mutate"];
  mutateAsync: UseMutationResult<
    DeleteManyResponse<TData>,
    TError,
    DeleteManyParams<TData, TError, TVariables>,
    DeleteContext<TData>
  >["mutateAsync"];
} & UseLoadingOvertimeReturnType;

export type UseDeleteManyProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  mutationOptions?: Omit<
    UseMutationOptions<
      DeleteManyResponse<TData>,
      TError,
      DeleteManyParams<TData, TError, TVariables>,
      DeleteContext<TData>
    >,
    "mutationFn" | "onError" | "onSuccess" | "onSettled" | "onMutate"
  >;
} & UseLoadingOvertimeOptionsProps;

/**
 * `useDeleteMany` is a modified version of `react-query`'s {@link https://tanstack.com/query/v5/docs/framework/react/reference/useMutation `useMutation`} for multiple delete mutations.
 *
 * It uses `deleteMany` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useDeleteMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 */
export const useDeleteMany = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
>({
  mutationOptions,
  overtimeOptions,
}: UseDeleteManyProps<TData, TError, TVariables> = {}): UseDeleteManyReturnType<
  TData,
  TError,
  TVariables
> => {
  const { mutate: checkError } = useOnError();

  const {
    mutationMode: mutationModeContext,
    undoableTimeout: undoableTimeoutContext,
  } = useMutationMode();
  const dataProvider = useDataProvider();
  const { notificationDispatch } = useCancelNotification();
  const translate = useTranslate();
  const publish = usePublish();
  const handleNotification = useHandleNotification();
  const invalidateStore = useInvalidate();
  const { log } = useLog();
  const { resources, select } = useResourceParams();
  const queryClient = useQueryClient();
  const getMeta = useMeta();
  const {
    options: { textTransformers },
  } = useRefineContext();
  const { keys } = useKeys();

  const mutation = useMutation<
    DeleteManyResponse<TData>,
    TError,
    DeleteManyParams<TData, TError, TVariables>,
    DeleteContext<TData>
  >({
    mutationFn: ({
      resource: resourceName,
      ids,
      mutationMode,
      undoableTimeout,
      onCancel,
      meta,
      dataProviderName,
      values,
    }: DeleteManyParams<TData, TError, TVariables>) => {
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
        if (selectedDataProvider.deleteMany) {
          return selectedDataProvider.deleteMany<TData, TVariables>({
            resource: resource.name,
            ids,
            meta: combinedMeta,
            variables: values,
          });
        }
        return handleMultiple(
          ids.map((id) =>
            selectedDataProvider.deleteOne<TData, TVariables>({
              resource: resource.name,
              id,
              meta: combinedMeta,
              variables: values,
            }),
          ),
        );
      };

      if (!(mutationModePropOrContext === "undoable")) {
        return mutationFn();
      }

      const updatePromise = new Promise<DeleteManyResponse<TData>>(
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
      ids,
      resource: resourceName,
      mutationMode,
      dataProviderName,
      meta,
    }) => {
      const { identifier } = select(resourceName);

      const { gqlMutation: _, gqlQuery: __, ...preferredMeta } = meta ?? {};

      const resourceKeys = keys()
        .data(pickDataProvider(identifier, dataProviderName, resources))
        .resource(identifier);

      const mutationModePropOrContext = mutationMode ?? mutationModeContext;

      await queryClient.cancelQueries({
        queryKey: resourceKeys.get(),
      });

      const previousQueries: PreviousQuery<TData>[] =
        queryClient.getQueriesData({
          queryKey: resourceKeys.get(),
        });

      if (mutationModePropOrContext !== "pessimistic") {
        // Set the previous queries to the new ones:
        queryClient.setQueriesData(
          {
            queryKey: resourceKeys
              .action("list")
              .params(preferredMeta ?? {})
              .get(),
          },
          (previous?: GetListResponse<TData> | null) => {
            if (!previous) {
              return null;
            }

            const data = previous.data.filter(
              (item) =>
                item.id && !ids.map(String).includes(item.id.toString()),
            );

            return {
              data,
              total: previous.total - 1,
            };
          },
        );

        queryClient.setQueriesData(
          {
            queryKey: resourceKeys.action("many").get(),
          },
          (previous?: GetListResponse<TData> | null) => {
            if (!previous) {
              return null;
            }

            const data = previous.data.filter((record: TData) => {
              if (record.id) {
                return !ids.map(String).includes(record.id.toString());
              }
              return false;
            });

            return {
              ...previous,
              data,
            };
          },
        );

        for (const id of ids) {
          queryClient.setQueriesData(
            {
              queryKey: resourceKeys
                .action("one")
                .id(id)
                .params(preferredMeta)
                .get(),
            },
            (previous?: any | null) => {
              if (!previous || previous.data.id === id) {
                return null;
              }
              return {
                ...previous,
              };
            },
          );
        }
      }

      return {
        previousQueries,
      };
    },
    // Always refetch after error or success:
    onSettled: (
      _data,
      _error,
      {
        resource: resourceName,
        ids,
        dataProviderName,
        invalidates = ["list", "many"],
      },
    ) => {
      const { identifier } = select(resourceName);

      // invalidate the cache for the list and many queries:
      invalidateStore({
        resource: identifier,
        dataProviderName: pickDataProvider(
          identifier,
          dataProviderName,
          resources,
        ),
        invalidates,
      });

      notificationDispatch({
        type: ActionTypes.REMOVE,
        payload: { id: ids, resource: identifier },
      });
    },
    onSuccess: (
      _data,
      {
        ids,
        resource: resourceName,
        meta,
        dataProviderName: dataProviderNameFromProp,
        successNotification,
      },
    ) => {
      const { resource, identifier } = select(resourceName);

      const dataProviderName = pickDataProvider(
        identifier,
        dataProviderNameFromProp,
        resources,
      );

      const combinedMeta = getMeta({
        resource,
        meta: meta,
      });

      // Remove the queries from the cache:
      const resourceKeys = keys()
        .data(pickDataProvider(identifier, dataProviderName, resources))
        .resource(identifier);

      ids.forEach((id) =>
        queryClient.removeQueries({
          queryKey: resourceKeys.action("one").id(id).get(),
        }),
      );

      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(_data, ids, identifier)
          : successNotification;

      handleNotification(notificationConfig, {
        key: `${ids}-${identifier}-notification`,
        description: translate("notifications.success", "Success"),
        message: translate(
          "notifications.deleteSuccess",
          {
            resource: translate(`${identifier}.${identifier}`, identifier),
          },
          `Successfully deleted ${identifier}`,
        ),
        type: "success",
      });

      publish?.({
        channel: `resources/${resource.name}`,
        type: "deleted",
        payload: { ids },
        date: new Date(),
        meta: {
          ...combinedMeta,
          dataProviderName,
        },
      });

      const {
        fields: _fields,
        operation: _operation,
        variables: _variables,
        ...rest
      } = combinedMeta || {};
      log?.mutate({
        action: "deleteMany",
        resource: resource.name,
        meta: {
          ids,
          dataProviderName,
          ...rest,
        },
      });

      ids.forEach((id) =>
        queryClient.removeQueries({
          queryKey: resourceKeys.action("one").id(id).get(),
        }),
      );
    },
    onError: (
      err,
      { ids, resource: resourceName, errorNotification },
      context,
    ) => {
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
            ? errorNotification(err, ids, identifier)
            : errorNotification;

        handleNotification(notificationConfig, {
          key: `${ids}-${identifier}-notification`,
          message: translate(
            "notifications.deleteError",
            {
              resource: resourceSingular,
              statusCode: err.statusCode,
            },
            `Error (status code: ${err.statusCode})`,
          ),
          description: err.message,
          type: "error",
        });
      }
    },
    mutationKey: keys().data().mutation("deleteMany").get(),
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useDeleteMany"),
    },
  });

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading: mutation.isPending,
  });

  return {
    mutation,
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    overtime: { elapsedTime },
  };
};
