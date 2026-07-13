import { useTranslate } from "../../i18n";
import { useDelete } from "../../data/useDelete";
import { useButtonCanAccess } from "../button-can-access";
import { useResourceParams } from "../../use-resource-params";
import { useMutationMode, useWarnAboutChange } from "../../refine";

import type { BaseKey, DeleteOneResponse } from "../../../contexts/data/types";
import type { CanReturnType } from "../../../contexts/accessControl/types";
import type { DeleteParams } from "../../data/useDelete";

export type DeleteButtonProps = {
  resource?: string;
  id?: BaseKey;
  dataProviderName?: string;
  meta?: Record<string, unknown>;
  accessControl?: {
    enabled?: boolean;
    hideIfUnauthorized?: boolean;
  };
  onSuccess?: (value: DeleteOneResponse) => void;
} & Pick<
  DeleteParams<any, any, any>,
  "mutationMode" | "successNotification" | "errorNotification" | "invalidates"
>;

export type DeleteButtonValues = {
  label: string;
  title: string;
  hidden: boolean;
  loading: boolean;
  disabled: boolean;
  canAccess: CanReturnType | undefined;
  confirmOkLabel: string;
  cancelLabel: string;
  confirmTitle: string;
  onConfirm: () => void;
};

export function useDeleteButton(props: DeleteButtonProps): DeleteButtonValues {
  const translate = useTranslate();
  const {
    mutation: { mutate, isPending, variables },
  } = useDelete();
  const { setWarnWhen } = useWarnAboutChange();
  const { mutationMode } = useMutationMode(props.mutationMode);

  const { id, resource, identifier } = useResourceParams({
    resource: props.resource,
    id: props.id,
  });

  const { title, disabled, hidden, canAccess } = useButtonCanAccess({
    action: "delete",
    accessControl: props.accessControl,
    meta: props.meta,
    id,
    resource,
  });

  const label = translate("buttons.delete", "Delete");

  const confirmOkLabel = translate("buttons.delete", "Delete");

  const confirmTitle = translate("buttons.confirm", "Are you sure?");

  const cancelLabel = translate("buttons.cancel", "Cancel");

  const loading = id === variables?.id && isPending;

  const onConfirm = () => {
    if (id && identifier) {
      setWarnWhen(false);
      mutate(
        {
          id,
          resource: identifier,
          mutationMode,
          successNotification: props.successNotification,
          errorNotification: props.errorNotification,
          meta: props.meta,
          dataProviderName: props.dataProviderName,
          invalidates: props.invalidates,
        },
        {
          onSuccess: props.onSuccess,
        },
      );
    }
  };

  return {
    label,
    title,
    hidden,
    disabled,
    canAccess,
    loading,
    confirmOkLabel,
    cancelLabel,
    confirmTitle,
    onConfirm,
  };
}
