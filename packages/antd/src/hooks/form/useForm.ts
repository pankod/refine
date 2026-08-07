import React from "react";
import {
  type FormInstance,
  type FormProps,
  Form,
  type ButtonProps,
} from "antd";
import { useForm as useFormSF, type UseFormConfig } from "sunflower-antd";

import {
  type AutoSaveProps,
  flattenObjectKeys,
  propertyPathToArray,
  type HttpError,
  type BaseRecord,
  useForm as useFormCore,
  type UseFormReturnType as UseFormReturnTypeCore,
  useWarnAboutChange,
  type UseFormProps as UseFormPropsCore,
  type CreateResponse,
  type UpdateResponse,
  useTranslate,
  useRefineContext,
} from "@refinedev/core";

export type UseFormProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = UseFormPropsCore<
  TQueryFnData,
  TError,
  TVariables,
  TData,
  TResponse,
  TResponseError
> & {
  submitOnEnter?: boolean;
  /**
   * Shows notification when unsaved changes exist
   */
  warnWhenUnsavedChanges?: boolean;
  /**
   * Disables server-side validation
   * @default false
   * @see {@link https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/}
   */
  disableServerSideValidation?: boolean;
} & AutoSaveProps<TVariables> &
  Pick<UseFormConfig, "defaultFormValues">;

export type UseFormReturnType<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = UseFormReturnTypeCore<
  TQueryFnData,
  TError,
  TVariables,
  TData,
  TResponse,
  TResponseError
> & {
  form: FormInstance<TVariables>;
  formProps: FormProps<TVariables>;
  saveButtonProps: ButtonProps & {
    onClick: () => void;
  };
  onFinish: (
    values?: TVariables,
  ) => Promise<CreateResponse<TResponse> | UpdateResponse<TResponse> | void>;
} & Pick<
    ReturnType<typeof useFormSF<TResponse, TVariables>>,
    "defaultFormValuesLoading"
  >;

/**
 * `useForm` is used to manage forms. It uses Ant Design {@link https://ant.design/components/form/ Form} data scope management under the hood and returns the required props for managing the form actions.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/useForm} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences/#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 * @typeParam TResponse - Result data returned by the mutation function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TData`
 * @typeParam TResponseError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}. Defaults to `TError`
 *
 *
 */
export const useForm = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
>({
  action,
  resource,
  onMutationSuccess: onMutationSuccessProp,
  onMutationError: onMutationErrorProp,
  autoSave,
  submitOnEnter = false,
  warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
  redirect,
  successNotification,
  errorNotification,
  meta,
  queryMeta,
  mutationMeta,
  liveMode,
  liveParams,
  mutationMode,
  dataProviderName,
  onLiveEvent,
  invalidates,
  undoableTimeout,
  queryOptions,
  createMutationOptions,
  updateMutationOptions,
  id: idFromProps,
  overtimeOptions,
  optimisticUpdateMap,
  defaultFormValues,
  disableServerSideValidation: disableServerSideValidationProp = false,
}: UseFormProps<
  TQueryFnData,
  TError,
  TVariables,
  TData,
  TResponse,
  TResponseError
> = {}): UseFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TData,
  TResponse,
  TResponseError
> => {
  const { options } = useRefineContext();
  const disableServerSideValidation =
    options?.disableServerSideValidation || disableServerSideValidationProp;

  const translate = useTranslate();

  const [formAnt] = Form.useForm();
  const formSF = useFormSF<TResponse, TVariables>({
    form: formAnt,
    defaultFormValues,
  });
  const { form } = formSF;

  const useFormCoreResult = useFormCore<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  >({
    onMutationSuccess: onMutationSuccessProp
      ? onMutationSuccessProp
      : undefined,
    onMutationError: async (error, _variables, _context) => {
      if (disableServerSideValidation) {
        onMutationErrorProp?.(error, _variables, _context);
        return;
      }

      type FieldData = Parameters<typeof form.setFields>[0];
      type NamePath = FieldData[number]["name"];
      // antd form expects error object to be in a specific format.
      let parsedErrors: FieldData = [];

      // reset antd errors before setting new errors
      const fieldsValue = form.getFieldsValue() as unknown as object;

      const fields = Object.keys(flattenObjectKeys(fieldsValue));

      parsedErrors = fields.map((field) => {
        return {
          name: propertyPathToArray(field) as NamePath,
          errors: undefined,
        };
      });

      form.setFields(parsedErrors);

      const errors = error?.errors;
      // parse errors to antd form errors
      for (const key in errors) {
        const fieldError = errors[key];

        let newError: string[] = [];

        if (Array.isArray(fieldError)) {
          newError = fieldError;
        }

        if (typeof fieldError === "string") {
          newError = [fieldError];
        }

        if (typeof fieldError === "boolean" && fieldError) {
          newError = ["Field is not valid."];
        }

        if (typeof fieldError === "object" && "key" in fieldError) {
          const translatedMessage = translate(
            fieldError.key,
            fieldError.message,
          );

          newError = [translatedMessage];
        }

        parsedErrors.push({
          name: propertyPathToArray(key) as NamePath,
          errors: newError,
        });
      }

      form.setFields([...parsedErrors]);

      onMutationErrorProp?.(error, _variables, _context);
    },
    redirect,
    action,
    resource,
    successNotification,
    errorNotification,
    meta,
    queryMeta,
    mutationMeta,
    liveMode,
    liveParams,
    mutationMode,
    dataProviderName,
    onLiveEvent,
    invalidates,
    undoableTimeout,
    queryOptions,
    createMutationOptions,
    updateMutationOptions,
    id: idFromProps,
    overtimeOptions,
    optimisticUpdateMap,
    autoSave,
  });

  const { formLoading, onFinish, query, id, onFinishAutoSave } =
    useFormCoreResult;

  const { warnWhenUnsavedChanges: warnWhenUnsavedChangesRefine, setWarnWhen } =
    useWarnAboutChange();
  const warnWhenUnsavedChanges =
    warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesRefine;

  // populate form with data when query is ready or id changes
  // form populated via initialValues prop
  React.useEffect(() => {
    form.resetFields();
  }, [query?.data?.data, id]);

  const onKeyUp = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (submitOnEnter && event.key === "Enter") {
      form.submit();
    }
  };

  const onValuesChange = (changeValues: object, allValues: any) => {
    if (changeValues && warnWhenUnsavedChanges) {
      setWarnWhen(true);
    }

    if (autoSave?.enabled) {
      setWarnWhen(false);

      const onFinishFromProps = autoSave?.onFinish ?? ((values) => values);

      return onFinishAutoSave(onFinishFromProps(allValues)).catch(
        (error) => error,
      );
    }

    return changeValues;
  };

  const saveButtonProps = {
    disabled: formLoading,
    onClick: () => {
      form.submit();
    },
  };

  return {
    form: formSF.form,
    formProps: {
      ...formSF.formProps,
      onFinish: (values: TVariables) =>
        onFinish(values).catch((error) => error),
      onKeyUp,
      onValuesChange,
      initialValues: query?.data?.data,
    },
    saveButtonProps,
    defaultFormValuesLoading: formSF.defaultFormValuesLoading,
    ...useFormCoreResult,
    onFinish: async (values?: TVariables) => {
      return await onFinish(values ?? formSF.form.getFieldsValue(true));
    },
  };
};
