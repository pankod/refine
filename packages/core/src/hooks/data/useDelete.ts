import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
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
  DeleteOneResponse,
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

export type DeleteParams<TData, TError, TVariables> = {
  /**
   * id for mutation function
   */
  id: BaseKey;
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
} & SuccessErrorNotification<DeleteOneResponse<TData>, TError, BaseKey>;

export type UseDeleteReturnType<
  TData extends BaseRecord = BaseRecord,
  TError = HttpError,
  TVariables = {},
> = {
  mutation: UseMutationResult<
    DeleteOneResponse<TData>,
    TError,
    DeleteParams<TData, TError, TVariables>,
    DeleteContext<TData>
  >;
  mutate: UseMutationResult<
    DeleteOneResponse<TData>,
    TError,
    DeleteParams<TData, TError, TVariables>,
    DeleteContext<TData>
  >["mutate"];
  mutateAsync: UseMutationResult<
    DeleteOneResponse<TData>,
    TError,
    DeleteParams<TData, TError, TVariables>,
    DeleteContext<TData>
  >["mutateAsync"];
} & UseLoadingOvertimeReturnType;

export type UseDeleteProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  mutationOptions?: Omit<
    UseMutationOptions<
      DeleteOneResponse<TData>,
      TError,
      DeleteParams<TData, TError, TVariables>,
      DeleteContext<TData>
    >,
    "mutationFn" | "onError" | "onSuccess" | "onSettled" | "onMutate"
  >;
} & UseLoadingOvertimeOptionsProps;

/**
 * `useDelete` is a modified version of `react-query`'s {@link https://tanstack.com/query/v5/docs/framework/react/reference/useMutation `useMutation`} for delete mutations.
 *
 * It uses `deleteOne` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useDelete} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences/#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 */
export const useDelete = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
>({
  mutationOptions,
  overtimeOptions,
}: UseDeleteProps<TData, TError, TVariables> = {}): UseDeleteReturnType<
  TData,
  TError,
  TVariables
> => {
  const { mutate: checkError } = useOnError();
  const dataProvider = useDataProvider();

  const { resources, select } = useResourceParams();
  const queryClient = useQueryClient();

  const {
    mutationMode: mutationModeContext,
    undoableTimeout: undoableTimeoutContext,
  } = useMutationMode();

  const { notificationDispatch } = useCancelNotification();
  const translate = useTranslate();
  const publish = usePublish();
  const { log } = useLog();
  const handleNotification = useHandleNotification();
  const invalidateStore = useInvalidate();
  const getMeta = useMeta();
  const {
    options: { textTransformers },
  } = useRefineContext();
  const { keys } = useKeys();

  const mutation = useMutation<
    DeleteOneResponse<TData>,
    TError,
    DeleteParams<TData, TError, TVariables>,
    DeleteContext<TData>
  >({
    mutationFn: ({
      id,
      mutationMode,
      undoableTimeout,
      resource: resourceName,
      onCancel,
      meta,
      dataProviderName,
      values,
    }) => {
      const { resource, identifier } = select(resourceName);

      const combinedMeta = getMeta({
        resource,
        meta,
      });

      const mutationModePropOrContext = mutationMode ?? mutationModeContext;

      const undoableTimeoutPropOrContext =
        undoableTimeout ?? undoableTimeoutContext;

      if (!(mutationModePropOrContext === "undoable")) {
        return dataProvider(
          pickDataProvider(identifier, dataProviderName, resources),
        ).deleteOne<TData, TVariables>({
          resource: resource.name,
          id,
          meta: combinedMeta,
          variables: values,
        });
      }

      const deletePromise = new Promise<DeleteOneResponse<TData>>(
        (resolve, reject) => {
          const doMutation = () => {
            dataProvider(
              pickDataProvider(identifier, dataProviderName, resources),
            )
              .deleteOne<TData, TVariables>({
                resource: resource.name,
                id,
                meta: combinedMeta,
                variables: values,
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
              id,
              resource: identifier,
              cancelMutation: cancelMutation,
              doMutation: doMutation,
              seconds: undoableTimeoutPropOrContext,
              isSilent: !!onCancel,
            },
          });
        },
      );
      return deletePromise;
    },
    onMutate: async ({
      id,
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
              (record: TData) => record.id?.toString() !== id.toString(),
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
              return record.id?.toString() !== id?.toString();
            });

            return {
              ...previous,
              data,
            };
          },
        );
      }

      return {
        previousQueries,
        queryKey: resourceKeys.get(),
      };
    },
    onSettled: (
      _data,
      _error,
      {
        id,
        resource: resourceName,
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
        payload: { id, resource: identifier },
      });
    },
    onSuccess: (
      _data,
      {
        id,
        resource: resourceName,
        successNotification,
        dataProviderName: dataProviderNameFromProp,
        meta,
      },
      context,
    ) => {
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

      const resourceKeys = keys()
        .data(pickDataProvider(identifier, dataProviderName, resources))
        .resource(identifier);

      // Remove the queries from the cache:
      queryClient.removeQueries({
        queryKey: resourceKeys.action("one").get(),
      });

      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(_data, id, identifier)
          : successNotification;

      handleNotification(notificationConfig, {
        key: `${id}-${identifier}-notification`,
        description: translate("notifications.success", "Success"),
        message: translate(
          "notifications.deleteSuccess",
          {
            resource: translate(
              `${identifier}.${identifier}`,
              resourceSingular,
            ),
          },
          `Successfully deleted a ${resourceSingular}`,
        ),
        type: "success",
      });

      publish?.({
        channel: `resources/${resource.name}`,
        type: "deleted",
        payload: {
          ids: [id],
        },
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
        action: "delete",
        resource: resource.name,
        meta: {
          ...rest,
          dataProviderName,
          id,
        },
      });

      // Remove the queries from the cache:
      queryClient.removeQueries({
        queryKey: resourceKeys.action("one").get(),
      });
    },
    onError: (
      err: TError,
      { id, resource: resourceName, errorNotification },
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
            ? errorNotification(err, id, identifier)
            : errorNotification;

        handleNotification(notificationConfig, {
          key: `${id}-${identifier}-notification`,
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
    mutationKey: keys().data().mutation("delete").get(),
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useDelete"),
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
