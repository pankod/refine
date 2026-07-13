import React, { useEffect } from "react";
import {
  useForm as useMantineForm,
  type UseFormReturnType as UseMantineFormReturnType,
} from "@mantine/form";
import get from "lodash/get";
import has from "lodash/has";
import set from "lodash/set";
import type { UseFormInput } from "@mantine/form/lib/types";
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

type FormVariableType<TVariables, TTransformed> = ReturnType<
  NonNullable<
    UseFormInput<
      TVariables,
      (values: TVariables) => TTransformed
    >["transformValues"]
  >
>;

export type UseFormReturnType<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = Record<string, unknown>,
  TTransformed = TVariables,
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = UseMantineFormReturnType<
  TVariables,
  (values: TVariables) => TTransformed
> & {
  refineCore: UseFormReturnTypeCore<
    TQueryFnData,
    TError,
    FormVariableType<TVariables, TTransformed>,
    TData,
    TResponse,
    TResponseError
  >;
  saveButtonProps: {
    disabled: boolean;
    onClick: (e: React.PointerEvent<HTMLButtonElement>) => void;
  };
};

export type UseFormProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = Record<string, unknown>,
  TTransformed = TVariables,
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = {
  refineCoreProps?: UseFormCoreProps<
    TQueryFnData,
    TError,
    FormVariableType<TVariables, TTransformed>,
    TData,
    TResponse,
    TResponseError
  > & {
    warnWhenUnsavedChanges?: boolean;
  };
} & UseFormInput<TVariables, (values: TVariables) => TTransformed> & {
    /**
     * Disables server-side validation
     * @default false
     * @see {@link https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/}
     */
    disableServerSideValidation?: boolean;
  };

export const useForm = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = Record<string, unknown>,
  TTransformed = TVariables,
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
>({
  refineCoreProps,
  disableServerSideValidation: disableServerSideValidationProp = false,
  ...rest
}: UseFormProps<
  TQueryFnData,
  TError,
  TVariables,
  TTransformed,
  TData,
  TResponse,
  TResponseError
> = {}): UseFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TTransformed,
  TData,
  TResponse,
  TResponseError
> => {
  const { options } = useRefineContext();
  const disableServerSideValidation =
    options?.disableServerSideValidation || disableServerSideValidationProp;

  const translate = useTranslate();

  const warnWhenUnsavedChangesProp = refineCoreProps?.warnWhenUnsavedChanges;

  const { warnWhenUnsavedChanges: warnWhenUnsavedChangesRefine, setWarnWhen } =
    useWarnAboutChange();
  const warnWhenUnsavedChanges =
    warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesRefine;

  const useMantineFormResult = useMantineForm<
    TVariables,
    (values: TVariables) => TTransformed
  >({
    ...rest,
  });

  const {
    setValues,
    onSubmit: onMantineSubmit,
    isDirty,
    resetDirty,
    setFieldError,
    values,
  } = useMantineFormResult;

  const useFormCoreResult = useFormCore<
    TQueryFnData,
    TError,
    FormVariableType<TVariables, TTransformed>,
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
        const fieldError = errors[key];

        let newError = "";

        if (Array.isArray(fieldError)) {
          newError = fieldError.join(" ");
        }

        if (typeof fieldError === "string") {
          newError = fieldError;
        }

        if (typeof fieldError === "boolean") {
          newError = "Field is not valid.";
        }

        if (typeof fieldError === "object" && "key" in fieldError) {
          const translatedMessage = translate(
            fieldError.key,
            fieldError.message,
          );

          newError = translatedMessage;
        }
        setFieldError(key, newError);
      }

      refineCoreProps?.onMutationError?.(error, _variables, _context);
    },
  });

  const { query, formLoading, onFinish, onFinishAutoSave } = useFormCoreResult;

  useEffect(() => {
    if (typeof query?.data !== "undefined") {
      const fields: any = {};

      const registeredFields = flattenObjectKeys(rest.initialValues ?? {});

      const data = query?.data?.data ?? {};

      Object.keys(registeredFields).forEach((key) => {
        const hasValue = has(data, key);
        const dataValue = get(data, key);

        if (hasValue) {
          set(fields, key, dataValue);
        }
      });

      setValues(fields);
      resetDirty(fields);
    }
  }, [query?.data]);

  const isValuesChanged = isDirty();

  useEffect(() => {
    if (warnWhenUnsavedChanges) {
      setWarnWhen(isValuesChanged);
    }
  }, [isValuesChanged]);

  useEffect(() => {
    if (isValuesChanged && refineCoreProps?.autoSave && values) {
      setWarnWhen(false);

      const transformedValues = rest.transformValues
        ? rest.transformValues(values)
        : (values as unknown as TTransformed);

      onFinishAutoSave(transformedValues).catch((error) => error);
    }
  }, [values]);

  const onSubmit: (typeof useMantineFormResult)["onSubmit"] =
    (handleSubmit, handleValidationFailure) => async (e) => {
      setWarnWhen(false);
      return await onMantineSubmit(handleSubmit, handleValidationFailure)(e);
    };

  const saveButtonProps = {
    disabled: formLoading,
    onClick: (e: React.PointerEvent<HTMLButtonElement>) => {
      onSubmit(
        (v) => onFinish(v).catch((error) => error),
        () => false,
        // @ts-expect-error event type is not compatible with pointer event
      )(e);
    },
  };

  return {
    ...useMantineFormResult,
    onSubmit,
    refineCore: useFormCoreResult,
    saveButtonProps,
  };
};
