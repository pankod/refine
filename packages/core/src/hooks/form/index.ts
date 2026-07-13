import React from "react";
import warnOnce from "warn-once";

import {
  useMeta,
  useOne,
  useCreate,
  useUpdate,
  useResourceParams,
  useInvalidate,
  useMutationMode,
  useRefineOptions,
  useLoadingOvertime,
  useWarnAboutChange,
  useRedirectionAfterSubmission,
} from "@hooks";

import {
  redirectPage,
  asyncDebounce,
  deferExecution,
} from "@definitions/helpers";

import type { UpdateParams } from "../data/useUpdate";
import type { UseCreateParams } from "../data/useCreate";
import type { UseFormProps, UseFormReturnType } from "./types";
import type {
  BaseKey,
  BaseRecord,
  CreateResponse,
  HttpError,
  UpdateResponse,
} from "../../contexts/data/types";

export type {
  ActionParams,
  UseFormProps,
  UseFormReturnType,
  AutoSaveIndicatorElements,
  AutoSaveProps,
  AutoSaveReturnType,
  FormAction,
  RedirectAction,
  FormWithSyncWithLocationParams,
} from "./types";

/**
 * This hook orchestrates Refine's data hooks to create, edit, and clone data. It also provides a set of features to make it easier for users to implement their real world needs and handle edge cases such as redirects, invalidation, auto-save and more.
 *
 * @see {@link https://refine.dev/docs/data/hooks/use-form} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/core/interface-references/#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interface-references/#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/core/interface-references/#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 * @typeParam TResponse - Result data returned by the mutation function. Extends {@link https://refine.dev/docs/core/interface-references/#baserecord `BaseRecord`}. Defaults to `TData`
 * @typeParam TResponseError - Custom error object that extends {@link https://refine.dev/docs/core/interface-references/#httperror `HttpError`}. Defaults to `TError`
 *
 */
export const useForm = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
>(
  props: UseFormProps<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  > = {},
): UseFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TData,
  TResponse,
  TResponseError
> => {
  const getMeta = useMeta();
  const invalidate = useInvalidate();
  const { redirect: defaultRedirect } = useRefineOptions();
  const { mutationMode: defaultMutationMode } = useMutationMode();

  const { setWarnWhen } = useWarnAboutChange();
  const handleSubmitWithRedirect = useRedirectionAfterSubmission();

  const pickedMeta = props.meta;
  const mutationMode = props.mutationMode ?? defaultMutationMode;

  const {
    id,
    setId,
    resource,
    identifier,
    formAction: action,
  } = useResourceParams({
    resource: props.resource,
    id: props.id,
    action: props.action,
  });

  const [autosaved, setAutosaved] = React.useState(false);

  const isEdit = action === "edit";
  const isClone = action === "clone";
  const isCreate = action === "create";

  const combinedMeta = getMeta({
    resource,
    meta: pickedMeta,
  });

  const isIdRequired = (isEdit || isClone) && Boolean(props.resource);
  const isIdDefined = typeof props.id !== "undefined";
  const isQueryDisabled = props.queryOptions?.enabled === false;

  /**
   * When a custom resource is provided through props, `id` will not be inferred from the URL to avoid any potential faulty requests.
   * In this case, `id` is required to be passed through props.
   * If `id` is not handled, a warning will be thrown in development mode.
   */
  warnOnce(
    isIdRequired && !isIdDefined && !isQueryDisabled,
    idWarningMessage(action, identifier, id),
  );

  /**
   * Target action to redirect after form submission.
   */
  const redirectAction = redirectPage({
    redirectFromProps: props.redirect,
    action,
    redirectOptions: defaultRedirect,
  });

  /**
   * Redirection function to be used in internal redirects and to be provided to the user.
   */
  const redirect: UseFormReturnType["redirect"] = (
    redirect = isEdit ? "list" : "edit",
    redirectId = id,
    routeParams = {},
  ) => {
    handleSubmitWithRedirect({
      redirect: redirect,
      resource,
      id: redirectId,
      meta: { ...pickedMeta, ...routeParams },
    });
  };

  const queryResult = useOne<TQueryFnData, TError, TData>({
    resource: identifier,
    id,
    queryOptions: {
      // Only enable the query if it's not a create action and the `id` is defined
      ...props.queryOptions,
      // AND the external enabled condition (if provided) is also true
      enabled:
        !isCreate && id !== undefined && (props.queryOptions?.enabled ?? true),
    },
    liveMode: props.liveMode,
    onLiveEvent: props.onLiveEvent,
    liveParams: props.liveParams,
    meta: { ...combinedMeta, ...props.queryMeta },
    dataProviderName: props.dataProviderName,
    overtimeOptions: { enabled: false },
  });

  const createMutation = useCreate<TResponse, TResponseError, TVariables>({
    mutationOptions: props.createMutationOptions,
    overtimeOptions: { enabled: false },
  });

  const updateMutation = useUpdate<TResponse, TResponseError, TVariables>({
    mutationOptions: props.updateMutationOptions,
    overtimeOptions: { enabled: false },
  });

  const mutationResult = isEdit ? updateMutation : createMutation;
  const isMutationLoading = mutationResult.mutation.isPending;
  const formLoading = isMutationLoading || queryResult.query.isFetching;

  const { elapsedTime } = useLoadingOvertime({
    ...props.overtimeOptions,
    isLoading: formLoading,
  });

  React.useEffect(() => {
    // After `autosaved` is set to `true`, it won't be set to `false` again.
    // Therefore, the `invalidate` function will be called only once at the end of the hooks lifecycle.
    return () => {
      if (
        props.autoSave?.invalidateOnUnmount &&
        autosaved &&
        identifier &&
        typeof id !== "undefined"
      ) {
        invalidate({
          id,
          invalidates: props.invalidates || ["list", "many", "detail"],
          dataProviderName: props.dataProviderName,
          resource: identifier,
        });
      }
    };
  }, [props.autoSave?.invalidateOnUnmount, autosaved]);

  const onFinish = async (
    values: TVariables,
    { isAutosave = false }: { isAutosave?: boolean } = {},
  ) => {
    const isPessimistic = mutationMode === "pessimistic";

    // Disable warning trigger when the form is being submitted
    setWarnWhen(false);

    // Redirect after a successful form submission
    const onSuccessRedirect = (id?: BaseKey) => redirect(redirectAction, id);

    const submissionPromise = new Promise<
      CreateResponse<TResponse> | UpdateResponse<TResponse> | void
    >((resolve, reject) => {
      // Reject the mutation if the resource is not defined
      if (!resource) return reject(missingResourceError);
      // Reject the mutation if the `id` is not defined in edit action
      // This line is commented out because the `id` might not be set for some cases and edit is done on a resource.
      // if (isEdit && !id) return reject(missingIdError);
      // Reject the mutation if the `id` is not defined in clone action
      if (isClone && !id) return reject(missingIdError);
      // Reject the mutation if there's no `values` passed
      if (!values) return reject(missingValuesError);
      // Auto Save is only allowed in edit action
      if (isAutosave && !isEdit) return reject(autosaveOnNonEditError);

      if (!isPessimistic && !isAutosave) {
        // If the mutation mode is not pessimistic, handle the redirect immediately in an async manner
        // `setWarnWhen` blocks the redirects until set to `false`
        // If redirect is done before the value is properly set, it will be blocked.
        // We're deferring the execution of the redirect to ensure that the value is set properly.
        deferExecution(() => onSuccessRedirect());
        // Resolve the promise immediately
        resolve();
      }

      const variables:
        | UpdateParams<TResponse, TResponseError, TVariables>
        | UseCreateParams<TResponse, TResponseError, TVariables> = {
        values,
        resource: identifier ?? resource.name,
        meta: { ...combinedMeta, ...props.mutationMeta },
        dataProviderName: props.dataProviderName,
        invalidates: isAutosave ? [] : props.invalidates,
        successNotification: isAutosave ? false : props.successNotification,
        errorNotification: isAutosave ? false : props.errorNotification,
        // Update specific variables
        ...(isEdit
          ? {
              id: id ?? "",
              mutationMode,
              undoableTimeout: props.undoableTimeout,
              optimisticUpdateMap: props.optimisticUpdateMap,
            }
          : {}),
      };

      const { mutateAsync } = isEdit ? updateMutation : createMutation;

      mutateAsync(variables as any, {
        // Call user-defined `onMutationSuccess` and `onMutationError` callbacks if provided
        // These callbacks will not have an effect on the submission promise
        onSuccess: props.onMutationSuccess
          ? (data, _, context) => {
              props.onMutationSuccess?.(data, values, context, isAutosave);
            }
          : undefined,
        onError: props.onMutationError
          ? (error: TResponseError, _, context) => {
              props.onMutationError?.(error, values, context, isAutosave);
            }
          : undefined,
      })
        // If the mutation mode is pessimistic, resolve the promise after the mutation is succeeded
        .then((data) => {
          if (isPessimistic && !isAutosave) {
            deferExecution(() => onSuccessRedirect(data?.data?.id));
          }
          if (isAutosave) {
            setAutosaved(true);
          }
          resolve(data);
        })
        // If the mutation mode is pessimistic, reject the promise after the mutation is failed
        .catch(reject);
    });

    return submissionPromise;
  };

  const onFinishRef = React.useRef(onFinish);
  React.useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const onFinishAutoSave = React.useMemo(
    () =>
      asyncDebounce(
        (values: TVariables) =>
          onFinishRef.current(values, { isAutosave: true }),
        props.autoSave?.debounce ?? 1000,
        "Cancelled by debounce",
      ),
    [props.autoSave?.debounce],
  );

  React.useEffect(() => {
    return () => {
      onFinishAutoSave.cancel();
    };
  }, [onFinishAutoSave]);

  const overtime = {
    elapsedTime,
  };

  const autoSaveProps = {
    status: updateMutation.mutation.status,
    data: updateMutation.mutation.data,
    error: updateMutation.mutation.error,
  };

  return {
    onFinish,
    onFinishAutoSave,
    formLoading,
    mutation: mutationResult.mutation,
    query: queryResult.query,
    autoSaveProps,
    id,
    setId,
    redirect,
    overtime,
  };
};

const missingResourceError = new Error(
  "[useForm]: `resource` is not defined or not matched but is required",
);

const missingIdError = new Error(
  "[useForm]: `id` is not defined but is required in edit and clone actions",
);

const missingValuesError = new Error(
  "[useForm]: `values` is not provided but is required",
);

const autosaveOnNonEditError = new Error(
  "[useForm]: `autoSave` is only allowed in edit action",
);

const idWarningMessage = (action?: string, identifier?: string, id?: BaseKey) =>
  `[useForm]: action: "${action}", resource: "${identifier}", id: ${id}

If you don't use the \`setId\` method to set the \`id\`, you should pass the \`id\` prop to \`useForm\`. Otherwise, \`useForm\` will not be able to infer the \`id\` from the current URL with custom resource provided.

See https://refine.dev/docs/data/hooks/use-form/#id-`;
