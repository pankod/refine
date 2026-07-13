import type { FormInstance, FormProps } from "antd";
import type { UseFormConfig, UseModalFormConfig } from "sunflower-antd";
export interface UseStepsFormConfig
  extends Omit<UseFormConfig, "defaultFormValues"> {
  defaultCurrent?: number;
  total?: number;
  isBackValidate?: boolean;
}
declare module "sunflower-antd" {
  export const useStepsForm: <TData, TVariables>(
    config: UseStepsFormConfig,
  ) => {
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
    submit: (values?: TVariables) => Promise<TData>;
  };

  export declare const useForm: <TData, TVariables>(
    config: UseFormConfig,
  ) => {
    form: FormInstance<TVariables>;
    formProps:
      | {
          form: FormInstance<TVariables>;
          onFinish: (formValue: TVariables) => Promise<TData>;
          initialValues: {};
        }
      | {
          onSubmit(e: any): void;
          form?: undefined;
          onFinish?: undefined;
          initialValues?: undefined;
        };
    defaultFormValuesLoading: boolean;
    formValues: {};
    initialValues: {};
    formResult: undefined;
    formLoading: boolean;
    submit: (values?: TVariables) => Promise<TData>;
  };

  export declare const useModalForm: <TData, TVariables>(
    config: Omit<UseModalFormConfig, "defaultFormValues">,
  ) => {
    form: FormInstance<TVariables>;
    show: () => void;
    close: () => void;
    modalProps: {
      onOk: () => void;
      visible: boolean;
      onCancel: () => void;
    };
    formProps: {
      form: FormInstance<TVariables>;
      onFinish: (formValue: TVariables) => Promise<TData>;
      initialValues: {};
    };
    formLoading: boolean;
    defaultFormValuesLoading: boolean;
    formValues: {};
    initialValues: {};
    formResult: undefined;
    submit: (values?: TVariables) => Promise<TData>;
    /** @deprecated Please use `open` instead. */
    visible: boolean;
  };
}
