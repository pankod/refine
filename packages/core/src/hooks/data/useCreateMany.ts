import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type MutateOptions,
  useMutation,
} from "@tanstack/react-query";

import { handleMultiple, pickDataProvider } from "@definitions";
import {
  useDataProvider,
  useHandleNotification,
  useInvalidate,
  useKeys,
  useLog,
  useMeta,
  usePublish,
  useRefineContext,
  useResourceParams,
  useTranslate,
} from "@hooks";

import type {
  BaseRecord,
  CreateManyResponse,
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

export type UseCreateManyParams<TData, TError, TVariables> = {
  resource?: string;
  values?: TVariables[];
  meta?: MetaQuery;
  dataProviderName?: string;
  invalidates?: Array<keyof IQueryKeys>;
} & SuccessErrorNotification<CreateManyResponse<TData>, TError, TVariables[]>;

export type UseCreateManyReturnType<
  TData extends BaseRecord = BaseRecord,
  TError = HttpError,
  TVariables = {},
> = UseMutationResult<
  CreateManyResponse<TData>,
  TError,
  UseCreateManyParams<TData, TError, TVariables>,
  unknown
>;

export type UseCreateManyProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  mutationOptions?: Omit<
    UseMutationOptions<
      CreateManyResponse<TData>,
      TError,
      UseCreateManyParams<TData, TError, TVariables>
    >,
    "mutationFn"
  >;
} & UseLoadingOvertimeOptionsProps &
  UseCreateManyParams<TData, TError, TVariables>;

/**
 * `useCreateMany` is a modified version of `react-query`'s {@link https://tanstack.com/query/v5/docs/framework/react/reference/useMutation `useMutation`} for multiple create mutations.
 *
 * It uses `createMany` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useCreateMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useCreateMany = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
>({
  resource: resourceFromProps,
  values: valuesFromProps,
  dataProviderName: dataProviderNameFromProps,
  successNotification: successNotificationFromProps,
  errorNotification: errorNotificationFromProps,
  meta: metaFromProps,
  invalidates: invalidatesFromProps,
  mutationOptions,
  overtimeOptions,
}: UseCreateManyProps<TData, TError, TVariables> = {}): UseCreateManyReturnType<
  TData,
  TError,
  TVariables
> &
  UseLoadingOvertimeReturnType => {
  const dataProvider = useDataProvider();
  const { resources, select } = useResourceParams();
  const translate = useTranslate();
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
    CreateManyResponse<TData>,
    TError,
    UseCreateManyParams<TData, TError, TVariables>
  >({
    mutationFn: ({
      resource: resourceName = resourceFromProps,
      values = valuesFromProps,
      meta = metaFromProps,
      dataProviderName = dataProviderNameFromProps,
    }: UseCreateManyParams<TData, TError, TVariables>) => {
      if (!values) throw missingValuesError;
      if (!resourceName) throw missingResourceError;

      const { resource, identifier } = select(resourceName);

      const combinedMeta = getMeta({
        resource,
        meta,
      });

      const selectedDataProvider = dataProvider(
        pickDataProvider(identifier, dataProviderName, resources),
      );

      if (selectedDataProvider.createMany) {
        return selectedDataProvider.createMany<TData, TVariables>({
          resource: resource.name,
          variables: values,
          meta: combinedMeta,
        });
      }
      return handleMultiple(
        values.map((val) =>
          selectedDataProvider.create<TData, TVariables>({
            resource: resource.name,
            variables: val,
            meta: combinedMeta,
          }),
        ),
      );
    },
    onSuccess: (response, variables, context) => {
      const {
        resource: resourceName = resourceFromProps,
        successNotification = successNotificationFromProps,
        dataProviderName: dataProviderNameFromProp = dataProviderNameFromProps,
        invalidates = invalidatesFromProps ?? ["list", "many"],
        values = valuesFromProps,
        meta = metaFromProps,
      } = variables;
      if (!values) throw missingValuesError;
      if (!resourceName) throw missingResourceError;

      const { resource, identifier } = select(resourceName);
      const resourcePlural = textTransformers.plural(identifier);

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
          ? successNotification(response, values, identifier)
          : successNotification;

      handleNotification(notificationConfig, {
        key: `createMany-${identifier}-notification`,
        message: translate(
          "notifications.createSuccess",
          {
            resource: translate(`${identifier}.${identifier}`, identifier),
          },
          `Successfully created ${resourcePlural}`,
        ),
        description: translate("notifications.success", "Success"),
        type: "success",
      });

      invalidateStore({
        resource: identifier,
        dataProviderName,
        invalidates,
      });

      const ids = response?.data
        .filter((item) => item?.id !== undefined)
        .map((item) => item.id!);
      publish?.({
        channel: `resources/${resource.name}`,
        type: "created",
        payload: {
          ids,
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
        action: "createMany",
        resource: resource.name,
        data: values,
        meta: {
          dataProviderName,
          ids,
          ...rest,
        },
      });

      mutationOptions?.onSuccess?.(response, variables, context);
    },
    onError: (err: TError, variables, context) => {
      const {
        resource: resourceName = resourceFromProps,
        errorNotification = errorNotificationFromProps,
        values = valuesFromProps,
      } = variables;
      if (!values) throw missingValuesError;
      if (!resourceName) throw missingResourceError;

      const { identifier } = select(resourceName);

      const notificationConfig =
        typeof errorNotification === "function"
          ? errorNotification(err, values, identifier)
          : errorNotification;

      handleNotification(notificationConfig, {
        key: `createMany-${identifier}-notification`,
        description: err.message,
        message: translate(
          "notifications.createError",
          {
            resource: translate(`${identifier}.${identifier}`, identifier),
            statusCode: err.statusCode,
          },
          `There was an error creating ${identifier} (status code: ${err.statusCode}`,
        ),
        type: "error",
      });

      mutationOptions?.onError?.(err, variables, context);
    },
    mutationKey: keys().data().mutation("createMany").get(),
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useCreateMany"),
    },
  });
  const { mutate, mutateAsync } = mutationResult;

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading: mutationResult.isPending,
  });

  // this function is used to make the `variables` parameter optional
  const handleMutation = (
    variables?: UseCreateManyParams<TData, TError, TVariables>,
    options?: MutateOptions<
      CreateManyResponse<TData>,
      TError,
      UseCreateManyParams<TData, TError, TVariables>,
      unknown
    >,
  ) => {
    return mutate(variables || {}, options);
  };

  // this function is used to make the `variables` parameter optional
  const handleMutateAsync = (
    variables?: UseCreateManyParams<TData, TError, TVariables>,
    options?: MutateOptions<
      CreateManyResponse<TData>,
      TError,
      UseCreateManyParams<TData, TError, TVariables>,
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
  "[useCreateMany]: `resource` is not defined or not matched but is required",
);

const missingValuesError = new Error(
  "[useCreateMany]: `values` is not provided but is required",
);
