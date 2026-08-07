import { useCallback } from "react";
import {
  type BaseKey,
  type BaseRecord,
  type FormWithSyncWithLocationParams,
  type HttpError,
  useGo,
  useModal,
  useParsed,
  useUserFriendlyName,
  useTranslate,
  useWarnAboutChange,
  useInvalidate,
  useResourceParams,
} from "@refinedev/core";
import type { FieldValues } from "react-hook-form";

import { useForm, type UseFormProps, type UseFormReturnType } from "../useForm";
import React from "react";

export type UseModalFormReturnType<
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
  modal: {
    submit: (values: TVariables) => void;
    close: () => void;
    show: (id?: BaseKey) => void;
    visible: boolean;
    title: string;
  };
};

export type UseModalFormProps<
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
     * @description Configuration object for the modal.
     * `defaultVisible`: Initial visibility state of the modal.
     *
     * `autoSubmitClose`: Whether the form should be submitted when the modal is closed.
     *
     * `autoResetForm`: Whether the form should be reset when the form is submitted.
     *
     * `autoResetFormWhenClose`: Whether the form should be reset to defaultValues when the modal is closed.
     * @type `{
      defaultVisible?: boolean;
      autoSubmitClose?: boolean;
      autoResetForm?: boolean;
      autoResetFormWhenClose?: boolean;
      }`
     * @default `defaultVisible = false` `autoSubmitClose = true` `autoResetForm = true` `autoResetFormWhenClose = true`
     */
  modalProps?: {
    defaultVisible?: boolean;
    autoSubmitClose?: boolean;
    autoResetForm?: boolean;
    autoResetFormWhenClose?: boolean;
  };
} & FormWithSyncWithLocationParams;

export const useModalForm = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables extends FieldValues = FieldValues,
  TContext extends object = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
>({
  modalProps,
  refineCoreProps,
  syncWithLocation,
  ...rest
}: UseModalFormProps<
  TQueryFnData,
  TError,
  TVariables,
  TContext,
  TData,
  TResponse,
  TResponseError
> = {}): UseModalFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TContext,
  TData,
  TResponse,
  TResponseError
> => {
  const invalidate = useInvalidate();
  const [initiallySynced, setInitiallySynced] = React.useState(false);

  const translate = useTranslate();

  const { resource: resourceProp, action: actionProp } = refineCoreProps ?? {};

  const { resource, identifier } = useResourceParams({
    resource: resourceProp,
  });
  const { action: actionFromParams } = useResourceParams({
    resource: resourceProp,
    action: actionProp,
  });

  const parsed = useParsed();
  const go = useGo();
  const getUserFriendlyName = useUserFriendlyName();

  const action = actionProp ?? actionFromParams ?? "";

  const syncingId = !(
    typeof syncWithLocation === "object" && syncWithLocation?.syncId === false
  );

  const syncWithLocationKey =
    typeof syncWithLocation === "object" && "key" in syncWithLocation
      ? syncWithLocation.key
      : resource && action && syncWithLocation
        ? `modal-${identifier}-${action}`
        : undefined;

  const {
    defaultVisible = false,
    autoSubmitClose = true,
    autoResetForm = true,
    autoResetFormWhenClose = true,
  } = modalProps ?? {};

  const useHookFormResult = useForm<
    TQueryFnData,
    TError,
    TVariables,
    TContext,
    TData,
    TResponse,
    TResponseError
  >({
    refineCoreProps: {
      ...refineCoreProps,
      meta: {
        ...(syncWithLocationKey ? { [syncWithLocationKey]: undefined } : {}),
        ...refineCoreProps?.meta,
      },
    },
    ...rest,
  });

  const {
    reset,
    refineCore: { onFinish, id, setId, autoSaveProps, query },
    saveButtonProps,
    handleSubmit,
  } = useHookFormResult;

  const { visible, show, close } = useModal({
    defaultVisible,
  });

  // compensate for setting of initial form values in useForm since it doesnt track modal visibility
  React.useEffect(() => {
    if (!visible || !query?.data?.data) return;

    const formData = query.data.data;
    if (!formData) return;

    reset(formData as any, {
      ...(!autoResetFormWhenClose && {
        keepDirtyValues: true,
      }),
    });
  }, [visible, query?.data?.data, autoResetFormWhenClose]);

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

  const submit = async (values: TVariables) => {
    await onFinish(values);

    if (autoSubmitClose) {
      close();
    }

    if (autoResetForm) {
      reset();
    }
  };

  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const handleClose = useCallback(() => {
    if (
      autoSaveProps.status === "success" &&
      refineCoreProps?.autoSave?.invalidateOnClose
    ) {
      invalidate({
        id,
        invalidates: refineCoreProps.invalidates || ["list", "many", "detail"],
        dataProviderName: refineCoreProps.dataProviderName,
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
    close();

    if (autoResetFormWhenClose) {
      reset();
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
        show();
      }
    },
    [id, action, setId, show],
  );

  const title = translate(
    `${identifier}.titles.${actionProp}`,
    undefined,
    `${getUserFriendlyName(
      `${actionProp} ${resource?.meta?.label ?? identifier}`,
      "singular",
    )}`,
  );

  return {
    modal: {
      submit,
      close: handleClose,
      show: handleShow,
      visible,
      title,
    },
    ...useHookFormResult,
    saveButtonProps: {
      ...saveButtonProps,
      onClick: (e) => handleSubmit(submit)(e),
    },
  };
};
