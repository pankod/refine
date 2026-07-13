import { pickDataProvider } from "@definitions/helpers";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type MutateOptions,
  useMutation,
} from "@tanstack/react-query";

import {
  useDataProvider,
  useHandleNotification,
  useInvalidate,
  useKeys,
  useLog,
  useMeta,
  useOnError,
  usePublish,
  useRefineContext,
  useResourceParams,
  useTranslate,
} from "@hooks";

import type {
  BaseRecord,
  CreateResponse,
  HttpError,
  IQueryKeys,
  MetaQuery,
} from "../../contexts/data/types";
import type { UseMutationResult } from "../../definitions/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

export type UseCreateParams<TData, TError, TVariables> = {
  /**
   * Resource name for API data interactions
   */
  resource?: string;
  /**
   * Values for mutation function
   */
  values?: TVariables;
  /**
   * Meta data for `dataProvider`
   */
  meta?: MetaQuery;
  /**
   * Meta data for `dataProvider`
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   */
  dataProviderName?: string;
  /**
   * You can use it to manage the invalidations that will occur at the end of the mutation.
   */
  invalidates?: Array<keyof IQueryKeys>;
} & SuccessErrorNotification<CreateResponse<TData>, TError, TVariables>;

export type UseCreateReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = UseMutationResult<
  CreateResponse<TData>,
  TError,
  UseCreateParams<TData, TError, TVariables>,
  unknown
>;

export type UseCreateProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  mutationOptions?: Omit<
    UseMutationOptions<
      CreateResponse<TData>,
      TError,
      UseCreateParams<TData, TError, TVariables>,
      unknown
    >,
    "mutationFn"
  >;
} & UseLoadingOvertimeOptionsProps &
  UseCreateParams<TData, TError, TVariables>;

/**
 * `useCreate` is a modified version of `react-query`'s {@link https://tanstack.com/query/v5/docs/framework/react/reference/useMutation `useMutation`} for create mutations.
 *
 * It uses `create` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useCreate} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences/#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */

export const useCreate = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
>({
  resource: resourceFromProps,
  values: valuesFromProps,
  dataProviderName: dataProviderNameFromProps,
  successNotification: successNotificationFromProps,
  errorNotification: errorNotificationFromProps,
  invalidates: invalidatesFromProps,
  meta: metaFromProps,
  mutationOptions,
  overtimeOptions,
}: UseCreateProps<TData, TError, TVariables> = {}): UseCreateReturnType<
  TData,
  TError,
  TVariables
> &
  UseLoadingOvertimeReturnType => {
  const { mutate: checkError } = useOnError();
  const dataProvider = useDataProvider();
  const invalidateStore = useInvalidate();
  const { resources, select } = useResourceParams();
  const translate = useTranslate();
  const publish = usePublish();
  const { log } = useLog();
  const handleNotification = useHandleNotification();
  const getMeta = useMeta();
  const {
    options: { textTransformers },
  } = useRefineContext();
  const { keys } = useKeys();

  const mutationResult = useMutation<
    CreateResponse<TData>,
    TError,
    UseCreateParams<TData, TError, TVariables>,
    unknown
  >({
    mutationFn: ({
      resource: resourceName = resourceFromProps,
      values = valuesFromProps,
      meta = metaFromProps,
      dataProviderName = dataProviderNameFromProps,
    }: UseCreateParams<TData, TError, TVariables>) => {
      if (!values) throw missingValuesError;
      if (!resourceName) throw missingResourceError;

      const { resource, identifier } = select(resourceName);

      const combinedMeta = getMeta({
        resource,
        meta,
      });

      return dataProvider(
        pickDataProvider(identifier, dataProviderName, resources),
      ).create<TData, TVariables>({
        resource: resource.name,
        variables: values,
        meta: combinedMeta,
      });
    },
    onSuccess: (data, variables, context) => {
      const {
        resource: resourceName = resourceFromProps,
        successNotification:
          successNotificationFromProp = successNotificationFromProps,
        dataProviderName: dataProviderNameFromProp = dataProviderNameFromProps,
        invalidates = invalidatesFromProps ?? ["list", "many"],
        values = valuesFromProps,
        meta = metaFromProps,
      } = variables;
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
        typeof successNotificationFromProp === "function"
          ? successNotificationFromProp(data, values, identifier)
          : successNotificationFromProp;

      handleNotification(notificationConfig, {
        key: `create-${identifier}-notification`,
        message: translate(
          "notifications.createSuccess",
          {
            resource: translate(
              `${identifier}.${identifier}`,
              resourceSingular,
            ),
          },
          `Successfully created ${resourceSingular}`,
        ),
        description: translate("notifications.success", "Success"),
        type: "success",
      });

      invalidateStore({
        resource: identifier,
        dataProviderName,
        invalidates,
      });

      publish?.({
        channel: `resources/${resource.name}`,
        type: "created",
        payload: {
          ids: data?.data?.id ? [data.data.id] : undefined,
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
        action: "create",
        resource: resource.name,
        data: values,
        meta: {
          ...rest,
          dataProviderName,
          id: data?.data?.id ?? undefined,
        },
      });

      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (err: TError, variables, context) => {
      const {
        resource: resourceName = resourceFromProps,
        errorNotification:
          errorNotificationFromProp = errorNotificationFromProps,
        values = valuesFromProps,
      } = variables;
      if (!values) throw missingValuesError;
      if (!resourceName) throw missingResourceError;

      checkError(err);

      const { identifier } = select(resourceName);

      const resourceSingular = textTransformers.singular(identifier);

      const notificationConfig =
        typeof errorNotificationFromProp === "function"
          ? errorNotificationFromProp(err, values, identifier)
          : errorNotificationFromProp;

      handleNotification(notificationConfig, {
        key: `create-${identifier}-notification`,
        description: err.message,
        message: translate(
          "notifications.createError",
          {
            resource: translate(
              `${identifier}.${identifier}`,
              resourceSingular,
            ),
            statusCode: err.statusCode,
          },
          `There was an error creating ${resourceSingular} (status code: ${err.statusCode})`,
        ),
        type: "error",
      });

      mutationOptions?.onError?.(err, variables, context);
    },
    mutationKey: keys().data().mutation("create").get(),
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useCreate"),
    },
  });
  const { mutate, mutateAsync, ...mutation } = mutationResult;

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading: mutation.isPending,
  });

  // this function is used to make the `variables` parameter optional
  const handleMutation = (
    variables?: UseCreateParams<TData, TError, TVariables>,
    options?: MutateOptions<
      CreateResponse<TData>,
      TError,
      UseCreateParams<TData, TError, TVariables>,
      unknown
    >,
  ) => {
    return mutate(variables || {}, options);
  };

  // this function is used to make the `variables` parameter optional
  const handleMutateAsync = (
    variables?: UseCreateParams<TData, TError, TVariables>,
    options?: MutateOptions<
      CreateResponse<TData>,
      TError,
      UseCreateParams<TData, TError, TVariables>,
      unknown
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
  "[useCreate]: `resource` is not defined or not matched but is required",
);

const missingValuesError = new Error(
  "[useCreate]: `values` is not provided but is required",
);
