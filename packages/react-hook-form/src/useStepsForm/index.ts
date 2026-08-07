import { useEffect, useState } from "react";
import type { FieldValues, Path } from "react-hook-form";
import type { BaseRecord, HttpError } from "@refinedev/core";
import get from "lodash/get";

import { useForm, type UseFormProps, type UseFormReturnType } from "../useForm";

export type UseStepsFormReturnType<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables extends FieldValues = FieldValues,
  TContext extends object = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = UseFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TContext,
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
  TVariables extends FieldValues = FieldValues,
  TContext extends object = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = UseFormProps<
  TQueryFnData,
  TError,
  TVariables,
  TContext,
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
  TVariables extends FieldValues = FieldValues,
  TContext extends object = {},
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
  TContext,
  TData,
  TResponse,
  TResponseError
> = {}): UseStepsFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TContext,
  TData,
  TResponse,
  TResponseError
> => {
  const { defaultStep = 0, isBackValidate = false } = stepsProps ?? {};
  const [current, setCurrent] = useState(defaultStep);

  const useHookFormResult = useForm<
    TQueryFnData,
    TError,
    TVariables,
    TContext,
    TData,
    TResponse,
    TResponseError
  >({
    ...rest,
  });

  const {
    trigger,
    getValues,
    setValue,
    formState: { dirtyFields },
    refineCore: { query },
  } = useHookFormResult;

  useEffect(() => {
    const data = query?.data?.data;
    if (!data) return;

    const registeredFields = Object.keys(getValues());

    Object.entries(data).forEach(([key, value]) => {
      const name = key as Path<TVariables>;

      if (registeredFields.includes(name)) {
        if (!get(dirtyFields, name)) {
          setValue(name, value);
        }
      }
    });
  }, [query?.data, current, setValue, getValues]);

  const go = (step: number) => {
    let targetStep = step;

    if (step < 0) {
      targetStep = 0;
    }

    setCurrent(targetStep);
  };

  const gotoStep = async (step: number) => {
    if (step === current) {
      return;
    }

    if (step < current && !isBackValidate) {
      go(step);
      return;
    }

    const isValid = await trigger();
    if (isValid) {
      go(step);
    }
  };

  return {
    ...useHookFormResult,
    steps: {
      currentStep: current,
      gotoStep,
    },
  };
};
