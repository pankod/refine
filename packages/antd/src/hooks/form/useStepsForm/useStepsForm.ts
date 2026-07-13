import {
  useStepsForm as useStepsFormSF,
  type UseStepsFormConfig,
} from "sunflower-antd";
import type { FormInstance, FormProps } from "antd";

import type {
  HttpError,
  UseFormProps as UseFormPropsCore,
  BaseRecord,
} from "@refinedev/core";

import { useForm, type UseFormProps, type UseFormReturnType } from "../useForm";

export type UseStepsFormFromSFReturnType<TResponse, TVariables> = {
  current: number;
  gotoStep: (step: number) => Promise<TVariables> | true;
  stepsProps: {
    current: number;
    onChange: (currentStep: number) => void;
  };
  formProps: FormProps<TVariables>;
  formLoading: boolean;
  defaultFormValuesLoading: boolean;
  formValues: {};
  initialValues: {};
  formResult: undefined;
  form: FormInstance<TVariables>;
  submit: (values?: TVariables) => Promise<TResponse>;
};

export type UseStepsFormReturnType<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = UseFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TData,
  TResponse,
  TResponseError
> &
  UseStepsFormFromSFReturnType<TResponse, TVariables>;

export type UseStepsFormProps<
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
> &
  UseFormProps<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  > &
  UseStepsFormConfig;

/**
 * `useStepsForm` hook allows you to split your form under an Ant Design based {@link https://ant.design/components/steps/ Steps} component and provides you with a few useful functionalities that will help you manage your form.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/hooks/form/useStepsForm} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences/#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 *
 */
export const useStepsForm = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
>(
  props: UseStepsFormProps<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  > = {},
): UseStepsFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TData,
  TResponse,
  TResponseError
> => {
  const useFormProps = useForm<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  >({
    ...props,
  });
  const { form, formProps } = useFormProps;

  const stepsPropsSunflower = useStepsFormSF<TResponse, TVariables>({
    isBackValidate: false,
    form: form,
    submit: (values: any) => {
      formProps?.onFinish?.(values);
    },
    ...props,
  });

  return {
    ...useFormProps,
    ...stepsPropsSunflower,
    formLoading: useFormProps.formLoading,
    formProps: {
      ...stepsPropsSunflower.formProps,
      ...useFormProps.formProps,
      onValuesChange: formProps?.onValuesChange,
      onKeyUp: formProps?.onKeyUp,
    },
    saveButtonProps: {
      ...useFormProps.saveButtonProps,
      onClick: () => stepsPropsSunflower.submit(),
    },
  };
};
