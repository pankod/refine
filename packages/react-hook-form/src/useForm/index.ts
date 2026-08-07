import React, { useEffect } from "react";
import get from "lodash/get";
import has from "lodash/has";

import {
  useForm as useHookForm,
  type UseFormProps as UseHookFormProps,
  type UseFormReturn,
  type FieldValues,
  type UseFormHandleSubmit,
  type Path,
} from "react-hook-form";
import {
  type BaseRecord,
  type HttpError,
  useForm as useFormCore,
  useWarnAboutChange,
  type UseFormProps as UseFormCoreProps,
  type UseFormReturnType as UseFormReturnTypeCore,
  useTranslate,
  useRefineContext,
  flattenObjectKeys,
} from "@refinedev/core";

export type UseFormReturnType<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables extends FieldValues = FieldValues,
  TContext extends object = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = UseFormReturn<TVariables, TContext> & {
  refineCore: UseFormReturnTypeCore<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  >;
  saveButtonProps: {
    disabled: boolean;
    onClick: (e: React.BaseSyntheticEvent) => void;
  };
};

export type UseFormProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables extends FieldValues = FieldValues,
  TContext extends object = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = {
  /**
   * Configuration object for the core of the [useForm](/docs/api-reference/core/hooks/useForm/)
   * @type [`UseFormCoreProps<TQueryFnData, TError, TVariables, TData, TResponse, TResponseError>`](/docs/api-reference/core/hooks/useForm/#properties)
   */
  refineCoreProps?: UseFormCoreProps<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  >;
  /**
   * When you have unsaved changes and try to leave the current page, **refine** shows a confirmation modal box.
   * @default `false*`
   */
  warnWhenUnsavedChanges?: boolean;
  /**
   * Disables server-side validation
   * @default false
   * @see {@link https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/}
   */
  disableServerSideValidation?: boolean;
} & UseHookFormProps<TVariables, TContext>;

export const useForm = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables extends FieldValues = FieldValues,
  TContext extends object = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
>({
  refineCoreProps,
  warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
  disableServerSideValidation: disableServerSideValidationProp = false,
  ...rest
}: UseFormProps<
  TQueryFnData,
  TError,
  TVariables,
  TContext,
  TData,
  TResponse,
  TResponseError
> = {}): UseFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TContext,
  TData,
  TResponse,
  TResponseError
> => {
  const { options } = useRefineContext();
  const disableServerSideValidation =
    options?.disableServerSideValidation || disableServerSideValidationProp;

  const translate = useTranslate();

  const { warnWhenUnsavedChanges: warnWhenUnsavedChangesRefine, setWarnWhen } =
    useWarnAboutChange();
  const warnWhenUnsavedChanges =
    warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesRefine;

  const useHookFormResult = useHookForm<TVariables, TContext>({
    ...rest,
  });

  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit: handleSubmitReactHookForm,
    setError,
    formState: { dirtyFields },
  } = useHookFormResult;

  // Keep query data and sync registered fields as they mount (e.g. Controller), without overriding dirty values.
  const queryDataRef = React.useRef<TData | undefined>(undefined);
  // Track which fields have already been synced to avoid repeated setValue calls.
  const syncedFieldsRef = React.useRef<Set<string>>(new Set());
  // Track mounted field names so late-registered fields can be detected.
  const mountedFieldsRef = React.useRef<Set<string>>(new Set());

  const useFormCoreResult = useFormCore<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  >({
    ...refineCoreProps,
    onMutationError: (error, _variables, _context) => {
      if (disableServerSideValidation) {
        refineCoreProps?.onMutationError?.(error, _variables, _context);
        return;
      }

      const errors = error?.errors;

      for (const key in errors) {
        // when the key is not registered in the form, react-hook-form not working
        const isKeyInVariables = Object.keys(
          flattenObjectKeys(_variables),
        ).includes(key);

        if (!isKeyInVariables) {
          continue;
        }

        const fieldError = errors[key];

        let newError = "";

        if (Array.isArray(fieldError)) {
          newError = fieldError.join(" ");
        }

        if (typeof fieldError === "string") {
          newError = fieldError;
        }

        if (typeof fieldError === "boolean" && fieldError) {
          newError = "Field is not valid.";
        }

        if (typeof fieldError === "object" && "key" in fieldError) {
          const translatedMessage = translate(
            fieldError.key,
            fieldError.message,
          );

          newError = translatedMessage;
        }

        setError(key as Path<TVariables>, {
          message: newError,
        });
      }

      refineCoreProps?.onMutationError?.(error, _variables, _context);
    },
  });

  const { query, onFinish, formLoading, onFinishAutoSave } = useFormCoreResult;

  const getMountedFields = () => {
    const mounted =
      (
        control as {
          _names?: {
            mount?: Set<string>;
          };
        }
      )._names?.mount ?? new Set<string>();

    return new Set(mounted);
  };

  const getRegisteredFields = () => {
    const registeredFields = new Set<string>();
    const mounted = getMountedFields();
    mounted.forEach((name) => registeredFields.add(name));

    const values = getValues();
    Object.keys(flattenObjectKeys(values)).forEach((path) => {
      registeredFields.add(path);
    });

    return registeredFields;
  };

  const applyValuesToFields = (
    fieldNames: Set<string>,
    data: TData,
    respectDirty = false,
  ) => {
    fieldNames.forEach((path) => {
      if (syncedFieldsRef.current.has(path)) {
        return;
      }

      if (respectDirty && get(dirtyFields, path)) {
        syncedFieldsRef.current.add(path);
        return;
      }

      syncedFieldsRef.current.add(path);

      if (has(data, path)) {
        setValue(path as Path<TVariables>, get(data, path));
      }
    });
  };

  // On query load, attempt a first sync after registration effects run.
  useEffect(() => {
    const data = query?.data?.data;
    if (!data) {
      queryDataRef.current = undefined;
      syncedFieldsRef.current = new Set();
      mountedFieldsRef.current = new Set();
      return;
    }

    let isActive = true;

    const applyQueryValues = () => {
      if (!isActive) return;

      applyValuesToFields(getRegisteredFields(), data, false);
    };

    queryDataRef.current = data;
    syncedFieldsRef.current = new Set();
    mountedFieldsRef.current = getMountedFields();

    // defer until after field registration effects
    if (typeof queueMicrotask === "function") {
      queueMicrotask(applyQueryValues);
    } else {
      Promise.resolve().then(applyQueryValues);
    }

    return () => {
      isActive = false;
    };
  }, [query?.data, setValue, getValues]);

  // Re-sync when new fields register; do not override user edits.
  useEffect(() => {
    const subscription = watch((values: any, { type }: { type?: any }) => {
      if (type === "change") {
        onValuesChange(values);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Detect late-registered fields (e.g. Controller) and sync once they mount.
  // Intentionally no deps: RHF mutates the mount set in place and doesn't notify React,
  // so we check per-render and only apply values when new field names appear.
  useEffect(() => {
    const data = queryDataRef.current;
    if (!data) {
      return;
    }

    const mountedFieldNames = getMountedFields();
    if (!mountedFieldNames.size) {
      return;
    }

    let hasNewField = false;
    mountedFieldNames.forEach((name) => {
      if (!mountedFieldsRef.current.has(name)) {
        hasNewField = true;
      }
    });

    if (!hasNewField) {
      return;
    }

    mountedFieldsRef.current = new Set(mountedFieldNames);
    applyValuesToFields(mountedFieldNames, data, true);
  });

  const onValuesChange = (changeValues: TVariables) => {
    if (warnWhenUnsavedChanges) {
      setWarnWhen(true);
    }

    if (refineCoreProps?.autoSave?.enabled) {
      setWarnWhen(false);

      const onFinishProps =
        refineCoreProps.autoSave?.onFinish ?? ((values: TVariables) => values);

      return onFinishAutoSave(onFinishProps(changeValues)).catch(
        (error) => error,
      );
    }

    return changeValues;
  };

  const handleSubmit: UseFormHandleSubmit<TVariables> =
    (onValid, onInvalid) => async (e) => {
      setWarnWhen(false);
      return handleSubmitReactHookForm(onValid, onInvalid)(e);
    };

  const saveButtonProps = {
    disabled: formLoading,
    onClick: (e: React.BaseSyntheticEvent) => {
      handleSubmit(
        (v) => onFinish(v).catch(() => {}),
        () => false,
      )(e);
    },
  };

  return {
    ...useHookFormResult,
    handleSubmit,
    refineCore: useFormCoreResult,
    saveButtonProps,
  };
};
