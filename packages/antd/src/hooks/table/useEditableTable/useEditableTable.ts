import { useTable } from "@hooks";
import type {
  BaseKey,
  BaseRecord,
  HttpError,
  UseFormProps,
} from "@refinedev/core";
import type { ButtonProps } from "antd";

import type { useTableProps, useTableReturnType } from "../useTable";
import { type UseFormReturnType, useForm } from "../../form/useForm";

export type useEditableTableReturnType<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TSearchVariables = unknown,
  TData extends BaseRecord = TQueryFnData,
> = useTableReturnType<TData, TError, TSearchVariables> &
  UseFormReturnType<TQueryFnData, TError, TVariables> & {
    saveButtonProps: ButtonProps & {
      onClick: () => void;
    };
    cancelButtonProps: ButtonProps & {
      onClick: () => void;
    };
    editButtonProps: (id: BaseKey) => ButtonProps & {
      onClick: () => void;
    };
    isEditing: (id: BaseKey) => boolean;
  };

type useEditableTableProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TSearchVariables = unknown,
  TData extends BaseRecord = TQueryFnData,
> = Omit<
  useTableProps<TQueryFnData, TError, TSearchVariables, TData>,
  "successNotification" | "errorNotification"
> &
  UseFormProps<TQueryFnData, TError, TVariables> & {
    /**
     * When true, row will be closed after successful submit.
     */
    autoSubmitClose?: boolean;
  };

/**
 * `useEditeableTable` allows you to implement edit feature on the table with ease,
 * on top of all the features that {@link https://refine.dev/docs/api-reference/core/hooks/useTable/ `useTable`} provides.
 * `useEditableTable` return properties that can be used on Ant Design's {@link https://ant.design/components/table/ `<Table>`}
 * and {@link https://ant.design/components/form/ `<Form>`} components.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/hooks/table/useTable/} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params
 * @typeParam TSearchVariables - Values for search params
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */
export const useEditableTable = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TSearchVariables = unknown,
  TData extends BaseRecord = TQueryFnData,
>({
  autoSubmitClose = true,
  ...props
}: useEditableTableProps<
  TQueryFnData,
  TError,
  TVariables,
  TSearchVariables,
  TData
> = {}): useEditableTableReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TSearchVariables,
  TData
> => {
  const table = useTable<TQueryFnData, TError, TSearchVariables, TData>({
    ...props,
    successNotification: undefined,
    errorNotification: undefined,
  });
  const edit = useForm<TQueryFnData, TError, TVariables>({
    ...props,
    action: "edit",
    redirect: false,
  });

  const { id: editId, setId, saveButtonProps } = edit;

  const cancelButtonProps = {
    onClick: () => {
      setId(undefined);
    },
  };

  const editButtonProps = (id: BaseKey) => {
    return {
      onClick: () => setId(id),
    };
  };

  const isEditing = (id: BaseKey) => id === editId;

  return {
    ...table,
    ...edit,
    formProps: {
      ...edit.formProps,
      onFinish: async (values) => {
        try {
          const result = await edit.onFinish(values);
          if (autoSubmitClose) {
            setId(undefined);
          }
          return result;
        } catch (error) {
          return error;
        }
      },
    },
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
    isEditing,
  };
};
