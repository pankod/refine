import { useState } from "react";
import type { BaseRecord, HttpError } from "@refinedev/core";

import { useForm, type UseFormProps, type UseFormReturnType } from "../useForm";

export type UseStepsFormReturnType<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = Record<string, unknown>,
  TTransformed = TVariables,
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = UseFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TTransformed,
  TData,
  TResponse,
  TResponseError
> & {
  steps: {
    currentStep: number;
    gotoStep: (step: number) => void;
  };
};

export type UseStepsFormProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = Record<string, unknown>,
  TTransformed = TVariables,
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = UseFormProps<
  TQueryFnData,
  TError,
  TVariables,
  TTransformed,
  TData,
  TResponse,
  TResponseError
> & {
  /**
     * @description Configuration object for the steps.
     * `defaultStep`: Allows you to set the initial step.
     * 
     * `isBackValidate`: Whether to validation the current step when going back.
     * @type `{
      defaultStep?: number;
      isBackValidate?: boolean;
      }`
     * @default `defaultStep = 0` `isBackValidate = false`
     */
  stepsProps?: {
    defaultStep?: number;
    isBackValidate?: boolean;
  };
};

export const useStepsForm = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = Record<string, unknown>,
  TTransformed = TVariables,
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
>({
  stepsProps,
  ...rest
}: UseStepsFormProps<
  TQueryFnData,
  TError,
  TVariables,
  TTransformed,
  TData,
  TResponse,
  TResponseError
> = {}): UseStepsFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TTransformed,
  TData,
  TResponse,
  TResponseError
> => {
  const { defaultStep = 0, isBackValidate = false } = stepsProps ?? {};
  const [current, setCurrent] = useState(defaultStep);

  const useMantineFormResult = useForm<
    TQueryFnData,
    TError,
    TVariables,
    TTransformed,
    TData,
    TResponse,
    TResponseError
  >({
    ...rest,
  });

  const { validate } = useMantineFormResult;

  const go = (step: number) => {
    let targetStep = step;

    if (step < 0) {
      targetStep = 0;
    }

    setCurrent(targetStep);
  };

  const gotoStep = (step: number) => {
    if (step === current) {
      return;
    }

    if (step < current && !isBackValidate) {
      go(step);
      return;
    }

    const isValid = !validate().hasErrors;
    if (isValid) {
      go(step);
    }
  };

  return {
    ...useMantineFormResult,
    steps: {
      currentStep: current,
      gotoStep,
    },
  };
};
