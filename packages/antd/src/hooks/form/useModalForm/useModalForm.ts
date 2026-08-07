import React, { useCallback } from "react";
import type { FormInstance, FormProps, ModalProps } from "antd";

import {
  useTranslate,
  useWarnAboutChange,
  type HttpError,
  type UseFormProps as UseFormPropsCore,
  type BaseRecord,
  type LiveModeProps,
  type BaseKey,
  useUserFriendlyName,
  useResourceParams,
  type FormWithSyncWithLocationParams,
  useParsed,
  useGo,
  useInvalidate,
} from "@refinedev/core";
import { useForm, type UseFormProps, type UseFormReturnType } from "../useForm";
import { useModal } from "@hooks/modal";

export type useModalFormFromSFReturnType<TResponse, TVariables> = {
  open: boolean;
  form: FormInstance<TVariables>;
  show: (id?: BaseKey) => void;
  close: () => void;
  modalProps: ModalProps;
  formProps: FormProps<TVariables>;
  formLoading: boolean;
  defaultFormValuesLoading: boolean;
  formValues: {};
  initialValues: {};
  formResult: undefined;
  submit: (values?: TVariables) => Promise<TResponse>;
};

type useModalFormConfig = {
  action: "show" | "edit" | "create" | "clone";
};

export type UseModalFormReturnType<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = Omit<
  UseFormReturnType<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  >,
  "saveButtonProps" | "deleteButtonProps"
> &
  useModalFormFromSFReturnType<TResponse, TVariables>;

export type UseModalFormProps<
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
  useModalFormConfig &
  LiveModeProps &
  FormWithSyncWithLocationParams & {
    defaultVisible?: boolean;
    autoSubmitClose?: boolean;
    autoResetForm?: boolean;
    autoResetFormWhenClose?: boolean;
  };
/**
 * `useModalForm` hook allows you to manage a form within a modal. It returns Ant Design {@link https://ant.design/components/form/ Form} and {@link https://ant.design/components/modal/ Modal} components props.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/hooks/form/useModalForm} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences/#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 *
 */
export const useModalForm = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
>({
  syncWithLocation,
  defaultVisible = false,
  autoSubmitClose = true,
  autoResetForm = true,
  autoResetFormWhenClose = true,
  autoSave,
  invalidates,
  ...rest
}: UseModalFormProps<
  TQueryFnData,
  TError,
  TVariables,
  TData,
  TResponse,
  TResponseError
>): UseModalFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TData,
  TResponse,
  TResponseError
> => {
  const [initiallySynced, setInitiallySynced] = React.useState(false);
  const invalidate = useInvalidate();

  const {
    resource,
    action: actionFromParams,
    identifier,
  } = useResourceParams({ resource: rest.resource });

  const parsed = useParsed();
  const go = useGo();
  const getUserFriendlyName = useUserFriendlyName();

  const action = rest.action ?? actionFromParams ?? "";

  const syncingId = !(
    typeof syncWithLocation === "object" && syncWithLocation?.syncId === false
  );

  const syncWithLocationKey =
    typeof syncWithLocation === "object" && "key" in syncWithLocation
      ? syncWithLocation.key
      : resource && action && syncWithLocation
        ? `modal-${identifier}-${action}`
        : undefined;

  const useFormProps = useForm<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  >({
    meta: {
      ...(syncWithLocationKey ? { [syncWithLocationKey]: undefined } : {}),
      ...rest.meta,
    },
    autoSave,
    invalidates,
    ...rest,
  });

  const { form, formProps, id, setId, formLoading, onFinish, autoSaveProps } =
    useFormProps;

  const translate = useTranslate();

  const { warnWhen, setWarnWhen } = useWarnAboutChange();

  const { show, close, modalProps } = useModal({
    modalProps: {
      open: defaultVisible,
    },
  });

  const visible = modalProps.open || false;
  const sunflowerUseModal: useModalFormFromSFReturnType<TResponse, TVariables> =
    {
      modalProps,
      form,
      formLoading,
      formProps,
      formResult: undefined,
      formValues: form.getFieldsValue,
      defaultFormValuesLoading: false,
      initialValues: {},
      submit: onFinish as any,
      close,
      open: modalProps.open || false,
      show,
    };

  React.useEffect(() => {
    if (initiallySynced === false && syncWithLocationKey) {
      const openStatus = parsed?.params?.[syncWithLocationKey]?.open;

      if (typeof openStatus === "boolean") {
        if (openStatus) {
          show();
        }
      } else if (typeof openStatus === "string") {
        if (openStatus === "true") {
          show();
        }
      }

      if (syncingId) {
        const idFromParams = parsed?.params?.[syncWithLocationKey]?.id;
        if (idFromParams) {
          setId?.(idFromParams);
        }
      }

      setInitiallySynced(true);
    }
  }, [syncWithLocationKey, parsed, syncingId, setId]);

  React.useEffect(() => {
    if (initiallySynced === true) {
      if (visible && syncWithLocationKey) {
        go({
          query: {
            [syncWithLocationKey]: {
              ...parsed?.params?.[syncWithLocationKey],
              open: true,
              ...(syncingId && id && { id }),
            },
          },
          options: { keepQuery: true },
          type: "replace",
        });
      } else if (syncWithLocationKey && !visible) {
        go({
          query: {
            [syncWithLocationKey]: undefined,
          },
          options: { keepQuery: true },
          type: "replace",
        });
      }
    }
  }, [id, visible, show, syncWithLocationKey, syncingId]);

  const saveButtonPropsSF = {
    disabled: formLoading,
    loading: formLoading,
    onClick: () => {
      form.submit();
    },
  };

  const handleClose = useCallback(() => {
    if (autoSaveProps.status === "success" && autoSave?.invalidateOnClose) {
      invalidate({
        id,
        invalidates: invalidates || ["list", "many", "detail"],
        dataProviderName: rest.dataProviderName,
        resource: identifier,
      });
    }

    if (warnWhen) {
      const warnWhenConfirm = window.confirm(
        translate(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes.",
        ),
      );

      if (warnWhenConfirm) {
        setWarnWhen(false);
      } else {
        return;
      }
    }

    setId?.(undefined);
    sunflowerUseModal.close();

    if (autoResetFormWhenClose) {
      form.resetFields();
    }
  }, [warnWhen, autoSaveProps.status]);

  const handleShow = useCallback(
    (showId?: BaseKey) => {
      if (typeof showId !== "undefined") {
        setId?.(showId);
      }
      const needsIdToOpen = action === "edit" || action === "clone";
      const hasId = typeof showId !== "undefined" || typeof id !== "undefined";
      if (needsIdToOpen ? hasId : true) {
        sunflowerUseModal.show();
      }
    },
    [id],
  );

  const { visible: _visible, ...otherModalProps } = modalProps;
  const newModalProps = { open: _visible, ...otherModalProps };

  return {
    ...useFormProps,
    ...sunflowerUseModal,
    show: handleShow,
    close: handleClose,
    open: visible,
    formProps: {
      ...formProps,
      ...useFormProps.formProps,
      onValuesChange: formProps?.onValuesChange,
      onKeyUp: formProps?.onKeyUp,
      onFinish: async (values) => {
        await onFinish(values);

        if (autoSubmitClose) {
          close();
        }

        if (autoResetForm) {
          form.resetFields();
        }
      },
    },
    modalProps: {
      ...newModalProps,
      width: "1000px",
      okButtonProps: saveButtonPropsSF,
      title: translate(
        `${identifier}.titles.${rest.action}`,
        `${getUserFriendlyName(
          `${rest.action} ${resource?.meta?.label ?? identifier}`,
          "singular",
        )}`,
      ),
      okText: translate("buttons.save", "Save"),
      cancelText: translate("buttons.cancel", "Cancel"),
      onCancel: handleClose,
      forceRender: true,
    },
    formLoading,
  };
};
